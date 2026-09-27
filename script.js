/* =========================================================================
   HANGZHOU BYGL GLOBAL TRADING COMPANY — script.js
   JavaScript vanilla. Seule dépendance externe : la bibliothèque EmailJS,
   chargée en CDN depuis index.html (aucune installation npm nécessaire).
   ========================================================================= */
(function () {
  "use strict";

  /* =======================================================================
     CONFIGURATION — à modifier ici, rien d'autre à toucher dans ce fichier.
     Voir README.md pour la procédure complète (compte EmailJS, réseaux
     sociaux, numéro WhatsApp).
     ======================================================================= */
  var CONFIG = {/* =========================================================================
   HANGZHOU BYGL GLOBAL TRADING COMPANY — script.js
   JavaScript vanilla. Seule dépendance externe : la bibliothèque EmailJS,
   chargée en CDN depuis index.html (aucune installation npm nécessaire).
   ========================================================================= */
(function () {
  "use strict";

  /* =======================================================================
     CONFIGURATION — à modifier ici, rien d'autre à toucher dans ce fichier.
     Voir README.md pour la procédure complète (compte EmailJS, réseaux
     sociaux, numéro WhatsApp).
     ======================================================================= */
  var CONFIG = {
    // --- EmailJS (formulaire de contact) ---------------------------------
    // Remplacez les 3 valeurs ci-dessous par celles de votre compte EmailJS
    // (README, section "Récupérer les identifiants EmailJS").
    emailjs: {
      publicKey: "-ASGWQM7zZti3GGOq",
      serviceId: " COFFI_URIEL ",
      templateId: "template_aw107qb",
    },

    // --- Réseaux sociaux ---------------------------------------------------
    // Collez l'URL complète de chaque profil officiel BYGL. Un réseau dont
    // la valeur reste vide ("") est automatiquement masqué sur le site :
    // aucun bouton mort n'est jamais affiché.
    social: {
      facebook: "", // FACEBOOK_URL — ex. "https://facebook.com/byglglobal"
      x: "", // X_URL — ex. "https://x.com/byglglobal"
      instagram: "", // INSTAGRAM_URL
      tiktok: "", // TIKTOK_URL
      // Numéro WhatsApp au format international, SANS "+", espace ou tiret.
      // Ex. pour +86 185 1629 8726 → "8618516298726"
      whatsappNumber: "", // WHATSAPP_NUMERO_A_CONFIGURER
    },
  };

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var isTouchDevice =
    "ontouchstart" in window ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    window.matchMedia("(pointer: coarse)").matches;

  /* -----------------------------------------------------------------------
     1. EN-TÊTE — fond au scroll
  ----------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -----------------------------------------------------------------------
     2. MENU MOBILE
  ----------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var panel = document.getElementById("mobileNav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* -----------------------------------------------------------------------
     3. SCROLL-SPY — surligne le lien de navigation de la section visible
  ----------------------------------------------------------------------- */
  function initScrollSpy() {
    var sections = Array.prototype.slice
      .call(document.querySelectorAll("main > section[id]"))
      .filter(function (s) {
        return s.id;
      });
    var links = document.querySelectorAll("[data-nav-link]");
    if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            links.forEach(function (link) {
              var match = link.getAttribute("data-nav-link") === id;
              if (match) link.setAttribute("aria-current", "true");
              else link.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* -----------------------------------------------------------------------
     4. ANIMATIONS DISCRÈTES AU SCROLL
  ----------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     5. EFFET MAGNÉTIQUE SUR LES BOUTONS (désactivé sur tactile)
  ----------------------------------------------------------------------- */
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    var buttons = document.querySelectorAll(".js-magnetic");
    var MAX_OFFSET = 8; // déplacement maximum en pixels (jamais dépassé)
    var RADIUS = 100; // zone d'influence autour du centre du bouton (en pixels)

    buttons.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < RADIUS) {
          var strength = 1 - distance / RADIUS;
          var moveX = dx * strength;
          var moveY = dy * strength;

          // On limite le déplacement final à MAX_OFFSET px, quelle que
          // soit la position du curseur dans la zone d'influence, pour un
          // effet "magnétique" subtil qui ne fait jamais fuir le bouton.
          var magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
          if (magnitude > MAX_OFFSET) {
            var scale = MAX_OFFSET / magnitude;
            moveX *= scale;
            moveY *= scale;
          }

          btn.style.transform = "translate(" + moveX.toFixed(1) + "px, " + moveY.toFixed(1) + "px)";
        }
      });

      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }

  /* -----------------------------------------------------------------------
     6. CTA DE SECTION — pré-sélectionne le type de demande dans le
        formulaire de contact (ex. "Devenir partenaire" → Partenariat)
  ----------------------------------------------------------------------- */
  function initCtaPrefill() {
    var ctas = document.querySelectorAll("[data-demande]");
    var select = document.getElementById("typeDemande");
    if (!ctas.length || !select) return;

    ctas.forEach(function (cta) {
      cta.addEventListener("click", function () {
        var value = cta.getAttribute("data-demande");
        if (!value) return;
        select.value = value;
        select.setAttribute("aria-invalid", "false");
        var errorEl = document.querySelector('[data-error-for="typeDemande"]');
        if (errorEl) errorEl.textContent = "";
      });
    });
  }

  /* -----------------------------------------------------------------------
     7. EMAILJS — initialisation de la bibliothèque
  ----------------------------------------------------------------------- */
  function isConfigured(value) {
    return Boolean(value) && value.indexOf("YOUR_") !== 0;
  }

  function emailjsReady() {
    return (
      typeof emailjs !== "undefined" &&
      isConfigured(CONFIG.emailjs.publicKey) &&
      isConfigured(CONFIG.emailjs.serviceId) &&
      isConfigured(CONFIG.emailjs.templateId)
    );
  }

  function initEmailJs() {
    if (typeof emailjs === "undefined") {
      console.warn(
        "[BYGL] La bibliothèque EmailJS ne s'est pas chargée (vérifiez la connexion ou un bloqueur de scripts)."
      );
      return;
    }
    if (isConfigured(CONFIG.emailjs.publicKey)) {
      emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
    } else {
      console.warn(
        "[BYGL] Identifiants EmailJS non configurés : le formulaire n'enverra rien tant que " +
          "CONFIG.emailjs (en tête de script.js) n'est pas rempli. Voir README.md."
      );
    }
  }

  /* -----------------------------------------------------------------------
     7bis. RÉSEAUX SOCIAUX & WHATSAPP — affiche uniquement les liens
     configurés dans CONFIG.social (voir en tête de fichier)
  ----------------------------------------------------------------------- */
  function initSocialLinks() {
    var urls = {
      facebook: CONFIG.social.facebook,
      x: CONFIG.social.x,
      instagram: CONFIG.social.instagram,
      tiktok: CONFIG.social.tiktok,
      whatsapp: CONFIG.social.whatsappNumber
        ? "https://wa.me/" + CONFIG.social.whatsappNumber.replace(/\D/g, "")
        : "",
    };

    Object.keys(urls).forEach(function (key) {
      var url = urls[key];
      document.querySelectorAll('[data-social="' + key + '"]').forEach(function (el) {
        if (url) {
          el.href = url;
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     8. FORMULAIRE DE CONTACT — validation + envoi réel via EmailJS
  ----------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var successBox = document.getElementById("formSuccess");
    var serverErrorBox = document.getElementById("formServerError");
    var submitBtn = document.getElementById("formSubmitBtn");
    var submitLabel = submitBtn ? submitBtn.querySelector(".btn-label") : null;

    var rules = {
      nom: function (v) {
        return v.trim().length > 0 ? "" : "Merci d'indiquer votre nom.";
      },
      email: function (v) {
        if (!v.trim()) return "Merci d'indiquer votre email.";
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
        return ok ? "" : "Merci d'indiquer un email valide.";
      },
      typeDemande: function (v) {
        return v ? "" : "Merci de préciser le type de demande.";
      },
      message: function (v) {
        return v.trim().length > 0 ? "" : "Merci de décrire votre demande.";
      },
    };

    function showError(field, message) {
      var errorEl = form.querySelector('[data-error-for="' + field.name + '"]');
      if (errorEl) errorEl.textContent = message;
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function validateField(field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var message = rule(field.value);
      showError(field, message);
      return !message;
    }

    function setServerError(message) {
      if (!serverErrorBox) return;
      if (message) {
        serverErrorBox.textContent = message;
        serverErrorBox.hidden = false;
      } else {
        serverErrorBox.hidden = true;
        serverErrorBox.textContent = "";
      }
    }

    function setSubmitting(isSubmitting) {
      if (!submitBtn) return;
      submitBtn.disabled = isSubmitting;
      submitBtn.setAttribute("aria-busy", String(isSubmitting));
      if (submitLabel) {
        submitLabel.textContent = isSubmitting ? "Envoi en cours…" : "Envoyer ma demande";
      }
    }

    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener("blur", function () {
        validateField(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      setServerError("");

      var isValid = true;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (!field) return;
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Champ honeypot : un visiteur humain le laisse toujours vide. S'il est
      // rempli, on ignore silencieusement l'envoi (robot) sans appeler EmailJS,
      // mais sans jamais afficher d'erreur qui alerterait le script du robot.
      if (form.elements.website && form.elements.website.value) {
        form.hidden = true;
        if (successBox) successBox.hidden = false;
        return;
      }

      // On ne prétend jamais qu'un message est parti tant qu'EmailJS n'est
      // pas réellement configuré (voir CONFIG en tête de fichier et README).
      if (!emailjsReady()) {
        setServerError(
          "Le formulaire n'est pas encore configuré (EmailJS). Voir README.md, section \u00ab Configurer script.js \u00bb."
        );
        return;
      }

      var dateDemande = new Date().toLocaleString("fr-FR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Shanghai",
      });

      var templateParams = {
        nom: form.elements.nom.value.trim(),
        entreprise: form.elements.entreprise.value.trim() || "\u2014",
        email: form.elements.email.value.trim(),
        telephone: form.elements.telephone.value.trim() || "\u2014",
        pays: form.elements.pays.value.trim() || "\u2014",
        type_demande: form.elements.typeDemande.value,
        message: form.elements.message.value.trim(),
        date_demande: dateDemande + " (heure de Chine, Asia/Shanghai)",
        // Utilisée comme Reply-To si le modèle EmailJS la référence ainsi
        // (voir README, section "Configurer le modèle d'e-mail").
        reply_to: form.elements.email.value.trim(),
      };

      setSubmitting(true);

      emailjs
        .send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, templateParams)
        .then(function () {
          setSubmitting(false);
          form.hidden = true;
          if (successBox) successBox.hidden = false;
        })
        .catch(function (err) {
          console.error("[BYGL] Erreur lors de l'envoi via EmailJS :", err);
          setSubmitting(false);
          setServerError(
            "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement."
          );
        });
    });
  }

  /* -----------------------------------------------------------------------
     9. QR CODE WECHAT — AFFICHAGE D'UN PLACEHOLDER SI L'IMAGE EST ABSENTE
  ----------------------------------------------------------------------- */
  function initWeChatQr() {
    var img = document.getElementById("wechatQrImage");
    var placeholder = document.getElementById("wechatQrPlaceholder");
    if (!img || !placeholder) return;

    function showPlaceholder() {
      img.hidden = true;
      placeholder.hidden = false;
    }

    // Le navigateur commence à charger l'image dès l'analyse du HTML : si
    // elle échoue avant que ce script (placé en fin de page) ne s'exécute,
    // l'événement "error" serait déjà passé. On vérifie donc d'abord l'état
    // déjà connu de l'image.
    if (img.complete) {
      if (img.naturalWidth === 0) showPlaceholder();
    } else {
      img.addEventListener("error", showPlaceholder);
      img.addEventListener("load", function () {
        if (img.naturalWidth === 0) showPlaceholder();
      });
    }
  }

  /* -----------------------------------------------------------------------
     10. ANNÉE COURANTE DANS LE FOOTER
  ----------------------------------------------------------------------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------------------
     INIT
  ----------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initReveal();
    initMagneticButtons();
    initCtaPrefill();
    initEmailJs();
    initSocialLinks();
    initContactForm();
    initWeChatQr();
    initYear();
  });
})();

    // --- EmailJS (formulaire de contact) ---------------------------------
    // Remplacez les 3 valeurs ci-dessous par celles de votre compte EmailJS
    // (README, section "Récupérer les identifiants EmailJS").
    emailjs: {
      publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
      serviceId: "YOUR_EMAILJS_SERVICE_ID",
      templateId: "YOUR_EMAILJS_TEMPLATE_ID",
    },

    // --- Réseaux sociaux ---------------------------------------------------
    // Collez l'URL complète de chaque profil officiel BYGL. Un réseau dont
    // la valeur reste vide ("") est automatiquement masqué sur le site :
    // aucun bouton mort n'est jamais affiché.
    social: {
      facebook: "", // FACEBOOK_URL — ex. "https://facebook.com/byglglobal"
      x: "", // X_URL — ex. "https://x.com/byglglobal"
      instagram: "", // INSTAGRAM_URL
      tiktok: "", // TIKTOK_URL
      // Numéro WhatsApp au format international, SANS "+", espace ou tiret.
      // Ex. pour +86 185 1629 8726 → "8618516298726"
      whatsappNumber: "", // WHATSAPP_NUMERO_A_CONFIGURER
    },
  };

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var isTouchDevice =
    "ontouchstart" in window ||
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    window.matchMedia("(pointer: coarse)").matches;

  /* -----------------------------------------------------------------------
     1. EN-TÊTE — fond au scroll
  ----------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* -----------------------------------------------------------------------
     2. MENU MOBILE
  ----------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var panel = document.getElementById("mobileNav");
    if (!toggle || !panel) return;

    toggle.addEventListener("click", function () {
      var isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* -----------------------------------------------------------------------
     3. SCROLL-SPY — surligne le lien de navigation de la section visible
  ----------------------------------------------------------------------- */
  function initScrollSpy() {
    var sections = Array.prototype.slice
      .call(document.querySelectorAll("main > section[id]"))
      .filter(function (s) {
        return s.id;
      });
    var links = document.querySelectorAll("[data-nav-link]");
    if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            links.forEach(function (link) {
              var match = link.getAttribute("data-nav-link") === id;
              if (match) link.setAttribute("aria-current", "true");
              else link.removeAttribute("aria-current");
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* -----------------------------------------------------------------------
     4. ANIMATIONS DISCRÈTES AU SCROLL
  ----------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     5. EFFET MAGNÉTIQUE SUR LES BOUTONS (désactivé sur tactile)
  ----------------------------------------------------------------------- */
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    var buttons = document.querySelectorAll(".js-magnetic");
    var MAX_OFFSET = 8; // déplacement maximum en pixels (jamais dépassé)
    var RADIUS = 100; // zone d'influence autour du centre du bouton (en pixels)

    buttons.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < RADIUS) {
          var strength = 1 - distance / RADIUS;
          var moveX = dx * strength;
          var moveY = dy * strength;

          // On limite le déplacement final à MAX_OFFSET px, quelle que
          // soit la position du curseur dans la zone d'influence, pour un
          // effet "magnétique" subtil qui ne fait jamais fuir le bouton.
          var magnitude = Math.sqrt(moveX * moveX + moveY * moveY);
          if (magnitude > MAX_OFFSET) {
            var scale = MAX_OFFSET / magnitude;
            moveX *= scale;
            moveY *= scale;
          }

          btn.style.transform = "translate(" + moveX.toFixed(1) + "px, " + moveY.toFixed(1) + "px)";
        }
      });

      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }

  /* -----------------------------------------------------------------------
     6. CTA DE SECTION — pré-sélectionne le type de demande dans le
        formulaire de contact (ex. "Devenir partenaire" → Partenariat)
  ----------------------------------------------------------------------- */
  function initCtaPrefill() {
    var ctas = document.querySelectorAll("[data-demande]");
    var select = document.getElementById("typeDemande");
    if (!ctas.length || !select) return;

    ctas.forEach(function (cta) {
      cta.addEventListener("click", function () {
        var value = cta.getAttribute("data-demande");
        if (!value) return;
        select.value = value;
        select.setAttribute("aria-invalid", "false");
        var errorEl = document.querySelector('[data-error-for="typeDemande"]');
        if (errorEl) errorEl.textContent = "";
      });
    });
  }

  /* -----------------------------------------------------------------------
     7. EMAILJS — initialisation de la bibliothèque
  ----------------------------------------------------------------------- */
  function isConfigured(value) {
    return Boolean(value) && value.indexOf("YOUR_") !== 0;
  }

  function emailjsReady() {
    return (
      typeof emailjs !== "undefined" &&
      isConfigured(CONFIG.emailjs.publicKey) &&
      isConfigured(CONFIG.emailjs.serviceId) &&
      isConfigured(CONFIG.emailjs.templateId)
    );
  }

  function initEmailJs() {
    if (typeof emailjs === "undefined") {
      console.warn(
        "[BYGL] La bibliothèque EmailJS ne s'est pas chargée (vérifiez la connexion ou un bloqueur de scripts)."
      );
      return;
    }
    if (isConfigured(CONFIG.emailjs.publicKey)) {
      emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
    } else {
      console.warn(
        "[BYGL] Identifiants EmailJS non configurés : le formulaire n'enverra rien tant que " +
          "CONFIG.emailjs (en tête de script.js) n'est pas rempli. Voir README.md."
      );
    }
  }

  /* -----------------------------------------------------------------------
     7bis. RÉSEAUX SOCIAUX & WHATSAPP — affiche uniquement les liens
     configurés dans CONFIG.social (voir en tête de fichier)
  ----------------------------------------------------------------------- */
  function initSocialLinks() {
    var urls = {
      facebook: CONFIG.social.facebook,
      x: CONFIG.social.x,
      instagram: CONFIG.social.instagram,
      tiktok: CONFIG.social.tiktok,
      whatsapp: CONFIG.social.whatsappNumber
        ? "https://wa.me/" + CONFIG.social.whatsappNumber.replace(/\D/g, "")
        : "",
    };

    Object.keys(urls).forEach(function (key) {
      var url = urls[key];
      document.querySelectorAll('[data-social="' + key + '"]').forEach(function (el) {
        if (url) {
          el.href = url;
          el.hidden = false;
        } else {
          el.hidden = true;
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     8. FORMULAIRE DE CONTACT — validation + envoi réel via EmailJS
  ----------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var successBox = document.getElementById("formSuccess");
    var serverErrorBox = document.getElementById("formServerError");
    var submitBtn = document.getElementById("formSubmitBtn");
    var submitLabel = submitBtn ? submitBtn.querySelector(".btn-label") : null;

    var rules = {
      nom: function (v) {
        return v.trim().length > 0 ? "" : "Merci d'indiquer votre nom.";
      },
      email: function (v) {
        if (!v.trim()) return "Merci d'indiquer votre email.";
        var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
        return ok ? "" : "Merci d'indiquer un email valide.";
      },
      typeDemande: function (v) {
        return v ? "" : "Merci de préciser le type de demande.";
      },
      message: function (v) {
        return v.trim().length > 0 ? "" : "Merci de décrire votre demande.";
      },
    };

    function showError(field, message) {
      var errorEl = form.querySelector('[data-error-for="' + field.name + '"]');
      if (errorEl) errorEl.textContent = message;
      field.setAttribute("aria-invalid", message ? "true" : "false");
    }

    function validateField(field) {
      var rule = rules[field.name];
      if (!rule) return true;
      var message = rule(field.value);
      showError(field, message);
      return !message;
    }

    function setServerError(message) {
      if (!serverErrorBox) return;
      if (message) {
        serverErrorBox.textContent = message;
        serverErrorBox.hidden = false;
      } else {
        serverErrorBox.hidden = true;
        serverErrorBox.textContent = "";
      }
    }

    function setSubmitting(isSubmitting) {
      if (!submitBtn) return;
      submitBtn.disabled = isSubmitting;
      submitBtn.setAttribute("aria-busy", String(isSubmitting));
      if (submitLabel) {
        submitLabel.textContent = isSubmitting ? "Envoi en cours…" : "Envoyer ma demande";
      }
    }

    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      field.addEventListener("blur", function () {
        validateField(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      setServerError("");

      var isValid = true;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (!field) return;
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Champ honeypot : un visiteur humain le laisse toujours vide. S'il est
      // rempli, on ignore silencieusement l'envoi (robot) sans appeler EmailJS,
      // mais sans jamais afficher d'erreur qui alerterait le script du robot.
      if (form.elements.website && form.elements.website.value) {
        form.hidden = true;
        if (successBox) successBox.hidden = false;
        return;
      }

      // On ne prétend jamais qu'un message est parti tant qu'EmailJS n'est
      // pas réellement configuré (voir CONFIG en tête de fichier et README).
      if (!emailjsReady()) {
        setServerError(
          "Le formulaire n'est pas encore configuré (EmailJS). Voir README.md, section \u00ab Configurer script.js \u00bb."
        );
        return;
      }

      var dateDemande = new Date().toLocaleString("fr-FR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Shanghai",
      });

      var templateParams = {
        nom: form.elements.nom.value.trim(),
        entreprise: form.elements.entreprise.value.trim() || "\u2014",
        email: form.elements.email.value.trim(),
        telephone: form.elements.telephone.value.trim() || "\u2014",
        pays: form.elements.pays.value.trim() || "\u2014",
        type_demande: form.elements.typeDemande.value,
        message: form.elements.message.value.trim(),
        date_demande: dateDemande + " (heure de Chine, Asia/Shanghai)",
        // Utilisée comme Reply-To si le modèle EmailJS la référence ainsi
        // (voir README, section "Configurer le modèle d'e-mail").
        reply_to: form.elements.email.value.trim(),
      };

      setSubmitting(true);

      emailjs
        .send(CONFIG.emailjs.serviceId, CONFIG.emailjs.templateId, templateParams)
        .then(function () {
          setSubmitting(false);
          form.hidden = true;
          if (successBox) successBox.hidden = false;
        })
        .catch(function (err) {
          console.error("[BYGL] Erreur lors de l'envoi via EmailJS :", err);
          setSubmitting(false);
          setServerError(
            "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement."
          );
        });
    });
  }

  /* -----------------------------------------------------------------------
     9. QR CODE WECHAT — AFFICHAGE D'UN PLACEHOLDER SI L'IMAGE EST ABSENTE
  ----------------------------------------------------------------------- */
  function initWeChatQr() {
    var img = document.getElementById("wechatQrImage");
    var placeholder = document.getElementById("wechatQrPlaceholder");
    if (!img || !placeholder) return;

    function showPlaceholder() {
      img.hidden = true;
      placeholder.hidden = false;
    }

    // Le navigateur commence à charger l'image dès l'analyse du HTML : si
    // elle échoue avant que ce script (placé en fin de page) ne s'exécute,
    // l'événement "error" serait déjà passé. On vérifie donc d'abord l'état
    // déjà connu de l'image.
    if (img.complete) {
      if (img.naturalWidth === 0) showPlaceholder();
    } else {
      img.addEventListener("error", showPlaceholder);
      img.addEventListener("load", function () {
        if (img.naturalWidth === 0) showPlaceholder();
      });
    }
  }

  /* -----------------------------------------------------------------------
     10. ANNÉE COURANTE DANS LE FOOTER
  ----------------------------------------------------------------------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------------------
     INIT
  ----------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeaderScroll();
    initMobileNav();
    initScrollSpy();
    initReveal();
    initMagneticButtons();
    initCtaPrefill();
    initEmailJs();
    initSocialLinks();
    initContactForm();
    initWeChatQr();
    initYear();
  });
})();
