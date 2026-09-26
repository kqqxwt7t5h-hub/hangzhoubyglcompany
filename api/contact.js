/**
 * api/contact.js
 * ---------------------------------------------------------------------
 * Fonction serverless Vercel (Node.js) qui reçoit les demandes du
 * formulaire de contact et les envoie par email via l'API Gmail
 * officielle (OAuth 2.0 + users.messages.send).
 *
 * Aucun secret n'est écrit dans ce fichier : tout provient des variables
 * d'environnement (voir .env.example et README.md, sections "Gmail API"
 * et "OAuth 2.0").
 *
 * Flux : navigateur → POST /api/contact → cette fonction → Gmail API
 *        → boîte GMAIL_USER (avec Reply-To = email du visiteur).
 * --------------------------------------------------------------------- */

const { google } = require("googleapis");

// ---------------------------------------------------------------------
// Configuration simple (pas de dépendance externe pour rester léger)
// ---------------------------------------------------------------------
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

// Limitation de débit best-effort : en mémoire, par instance de fonction.
// Sur Vercel, chaque instance serverless est éphémère et peut être
// recréée à tout moment (cold start) ou exécutée en parallèle sur
// plusieurs instances : cette limite n'est donc PAS une garantie stricte,
// seulement une protection simple contre les envois en rafale sur une
// même instance. Pour une limite fiable à grande échelle, voir le
// README.md, section "Sécurité", qui explique comment brancher un store
// externe (ex. Upstash Redis) si nécessaire.
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

// Nettoie une valeur destinée à un en-tête MIME (évite l'injection d'en-têtes).
function sanitizeHeaderValue(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

function encodeSubject(subject) {
  // Encodage RFC 2047 pour un sujet contenant des caractères accentués.
  return "=?UTF-8?B?" + Buffer.from(subject, "utf-8").toString("base64") + "?=";
}

function buildRawMessage({ from, to, replyTo, subject, body }) {
  const headers = [
    `From: ${sanitizeHeaderValue(from)}`,
    `To: ${sanitizeHeaderValue(to)}`,
    `Reply-To: ${sanitizeHeaderValue(replyTo)}`,
    `Subject: ${encodeSubject(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
  ];

  const message = headers.join("\r\n") + "\r\n\r\n" + body;

  // Encodage base64url requis par l'API Gmail (RFC 4648 §5).
  return Buffer.from(message, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

module.exports = async function handler(req, res) {
  // ---- Méthode HTTP -----------------------------------------------------
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Méthode non autorisée." });
  }

  // ---- Limitation de débit (best-effort, voir commentaire ci-dessus) ----
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
  // Le champ "website" doit rester vide pour un visiteur humain (il est
  // masqué visuellement côté frontend). S'il est rempli, on répond succès
  // pour ne pas alerter le robot, mais on n'envoie AUCUN email.
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

  // ---- Variables d'environnement (Gmail API / OAuth 2.0) ------------------
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GMAIL_USER } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GMAIL_USER) {
    // On ne révèle jamais laquelle des variables manque dans la réponse
    // (pour ne pas donner d'information à un attaquant) : le détail va
    // uniquement dans les logs serveur (visibles dans le dashboard Vercel).
    console.error(
      "[BYGL] Variables d'environnement Gmail manquantes. Vérifiez GOOGLE_CLIENT_ID, " +
        "GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN et GMAIL_USER dans Vercel."
    );
    return res.status(500).json({
      success: false,
      message: "Le service d'envoi n'est pas encore configuré. Merci de réessayer plus tard.",
    });
  }

  // ---- Envoi via l'API Gmail ----------------------------------------------
  try {
    const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const subject = `[BYGL] Nouvelle demande — ${fields.typeDemande}`;
    const dateStr = new Date().toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Asia/Shanghai",
    });

    const body = [
      `Nom : ${fields.nom}`,
      `Entreprise : ${fields.entreprise || "—"}`,
      `Email : ${fields.email}`,
      `Téléphone : ${fields.telephone || "—"}`,
      `Pays : ${fields.pays || "—"}`,
      `Type de demande : ${fields.typeDemande}`,
      "",
      "Message :",
      fields.message,
      "",
      `Date de la demande : ${dateStr} (heure de Chine, Asia/Shanghai)`,
    ].join("\n");

    const raw = buildRawMessage({
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: fields.email,
      subject,
      body,
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return res.status(200).json({ success: true, message: "Votre demande a bien été envoyée." });
  } catch (err) {
    // On journalise le détail côté serveur uniquement (jamais dans la
    // réponse HTTP, pour ne pas exposer de détails internes/secrets).
    console.error("[BYGL] Erreur lors de l'envoi via Gmail API :", err && err.message ? err.message : err);
    return res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de l'envoi de votre demande. Merci de réessayer plus tard.",
    });
  }
};
