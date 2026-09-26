/**
 * api/contact.js
 * ---------------------------------------------------------------------
 * Fonction serverless Vercel (Node.js) qui reçoit les demandes du
 * formulaire de contact et les envoie par email via l'API REST EmailJS
 * (remplace l'ancienne implémentation Gmail OAuth)
 * --------------------------------------------------------------------- */
// On supprime googleapis, on utilise fetch natif Node.js
const ALLOWED_TYPES = ["Sourcing", "Partenariat", "Projet", "Autre"];
const MAX_LENGTHS = {
  nom: 100,
  entreprise: 150,
  email: 150,
  telephone: 40,
  pays: 60,
  typeDemande: 30,
  message: 3000,
};

// Rate limit inchangé
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const previous = requestLog.get(ip) || [];
  const recent = previous.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : "unknown";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async function handler(req, res) {
  // ---- Méthode HTTP -----------------------------------------------------
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  // ---- Limitation de débit ----------------------------------------------
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({
      success: false,
      message: "Trop de demandes envoyées. Merci de réessayer dans quelques minutes.",
    });
  }

  // ---- Lecture et validation du corps de la requête ----------------------
  let data = req.body;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (err) {
      return res.status(400).json({ success: false, message: "Requête invalide." });
    }
  }
  if (!data || typeof data !== "object") {
    return res.status(400).json({ success: false, message: "Requête invalide." });
  }

  // ---- Honeypot anti-spam -------------------------------------------------
  if (data.website) {
    return res.status(200).json({ success: true, message: "Votre demande a bien été envoyée." });
  }

  // ---- Validation des champs (présence, longueur) ------------------------
  const fields = {};
  for (const key of Object.keys(MAX_LENGTHS)) {
    let value = data[key];
    if (value === undefined || value === null) value = "";
    value = String(value).trim();
    if (value.length > MAX_LENGTHS[key]) {
      return res.status(400).json({
        success: false,
        message: `Le champ "${key}" dépasse la longueur autorisée.`,
      });
    }
    fields[key] = value;
  }

  if (!fields.nom || !fields.email || !fields.typeDemande || !fields.message) {
    return res.status(400).json({
      success: false,
      message: "Merci de remplir tous les champs obligatoires (nom, email, type de demande, message).",
    });
  }
  if (!isValidEmail(fields.email)) {
    return res.status(400).json({ success: false, message: "Adresse email invalide." });
  }
  if (!ALLOWED_TYPES.includes(fields.typeDemande)) {
    return res.status(400).json({ success: false, message: "Type de demande invalide." });
  }

  // ---- Variables d'environnement EmailJS ------------------
  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY) {
    console.error("[BYGL] Variables d'environnement EmailJS manquantes.");
    return res.status(500).json({
      success: false,
      message: "Le service d'envoi n'est pas encore configuré. Merci de réessayer plus tard.",
    });
  }

  // ---- Envoi via l'API REST EmailJS ----------------------------------------------
  try {
    const dateStr = new Date().toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Shanghai",
    });

    // Les paramètres correspondent aux placeholders de votre template EmailJS
    // {{name}}, {{email}}, {{title}}, {{message}}, {{time}}
    const templateParams = {
      name: fields.nom,
      email: fields.email,
      title: `[BYGL] Nouvelle demande — ${fields.typeDemande}`,
      message: `Entreprise : ${fields.entreprise || "—"}
Téléphone : ${fields.telephone || "—"}
Pays : ${fields.pays || "—"}

${fields.message}

Date de la demande : ${dateStr} (heure de Chine, Asia/Shanghai)`,
      time: dateStr
    };

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      }),
    });

    const result = await response.text();
    if (!response.ok) {
      throw new Error(`EmailJS erreur ${response.status}: ${result}`);
    }

    return res.status(200).json({ success: true, message: "Votre demande a bien été envoyée." });
  } catch (err) {
    console.error("[BYGL] Erreur lors de l'envoi via EmailJS :", err?.message || err);
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer plus tard.",
    });
  }
};
