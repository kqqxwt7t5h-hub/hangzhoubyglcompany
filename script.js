/* ==========================================================================
   HANGZHOU BYGL GLOBAL TRADING COMPANY - SCRIPT
   EmailJS & Interactive Systems Integration
   ========================================================================== */

// EmailJS Credentials Configuration
const EMAILJS_PUBLIC_KEY = "-ASGWQM7zZti3GGOq";   // Update with EmailJS Public Key
const EMAILJS_SERVICE_ID = "COFFI_URIEL";   // Update with EmailJS Service ID
const EMAILJS_TEMPLATE_ID = "template_aw107qb"; // Update with EmailJS Template ID

// Translations Dictionary (FR / EN)
const translations = {
    fr: {
        "nav.home": "Accueil",
        "nav.about": "À Propos",
        "nav.services": "Services",
        "nav.products": "Produits",
        "nav.journey": "Parcours",
        "nav.partner": "Partenariat",
        "nav.project": "Projets",
        "nav.contact": "Contact",

        "hero.badge": "HANGZHOU BYGL GLOBAL TRADING COMPANY",
        "hero.title": "Votre passerelle directe et fluide avec le marché chinois",
        "hero.subtitle": "Nous connectons les entreprises internationales et d'Afrique de l'Ouest aux meilleurs fabricants grâce à un sourcing rigoureux et une coordination commerciale locale à Hangzhou.",
        "hero.btn_quote": "Demander un devis",
        "hero.btn_services": "Découvrir nos services",
        "hero.trust1": "Entité légalement enregistrée à Hangzhou",
        "hero.trust2": "Réponse sous 24 heures",

        "feat.1_title": "Présence Locale à Hangzhou",
        "feat.1_desc": "Implantation stratégique dans le Zhejiang facilitant les visites d'usines et le suivi direct.",
        "feat.2_title": "Sourcing & Contrôle Qualité",
        "feat.2_desc": "Sélection rigoureuse des fournisseurs selon vos critères exacts et vérification préalable.",
        "feat.3_title": "Coordination Logistique",
        "feat.3_desc": "Prise en charge administrative, négociation des coûts et sécurisation des expéditions.",

        "about.subtitle": "PRÉSENTATION INSTITUTIONNELLE",
        "about.title": "À Propos de Hangzhou BYGL Global Trading",
        "about.heading": "Une passerelle stratégique entre la Chine et le monde",
        "about.p1": "Hangzhou BYGL Global Trading Company est une société spécialisée dans le commerce international, le sourcing et la coordination d'affaires, enregistrée à Hangzhou, au cœur de la province dynamique du Zhejiang en Chine.",
        "about.p2": "Notre mission est d'offrir aux acheteurs, investisseurs et institutions du monde entier une présence locale transparente et fiable pour naviguer avec succès dans l'écosystème industriel et commercial chinois.",
        "about.val1_title": "Fiabilité & Transparence",
        "about.val1_desc": "Gestion rigoureuse des échanges et clarté absolue à chaque étape de votre commande.",
        "about.val2_title": "Coordination Sur-Mesure",
        "about.val2_desc": "Des solutions adaptées aux exigences de volume, de normes et de délais de nos clients.",
        "about.legal_title": "Informations Légales",
        "about.legal_name_label": "Raison Sociale :",
        "about.legal_rep_label": "Représentant Légal :",
        "about.legal_status_label": "Statut Juridique :",
        "about.legal_date_label": "Date d'enregistrement :",
        "about.legal_cap_label": "Capital Social :",
        "about.legal_addr_label": "Siège Social :",

        "services.subtitle": "EXPERTISES & SOLUTIONS",
        "services.title": "Nos Services Corporate",
        "services.link_quote": "Demander une étude",
        "services.link_contact": "Nous contacter",
        "services.link_partner": "Devenir partenaire",
        "services.link_project": "Proposer un projet",

        "service1.title": "Sourcing de Produits",
        "service1.desc": "Compréhension précise de votre besoin, recherche de fournisseurs chinois fiables, comparaison détaillée des devis et négociation des tarifs au plus juste.",
        "service2.title": "Coordination des Fournisseurs",
        "service2.desc": "Identification de partenaires industriels, collecte d'informations, comparaison des offres et suivi quotidien de l'exécution des commandes.",
        "service3.title": "Accompagnement Import-Export",
        "service3.desc": "Coordination des opérations d'expédition, assistance documentaire commerciale et facilitation auprès des prestataires logistiques partenaires.",
        "service4.title": "Conseil Commercial",
        "service4.desc": "Accompagnement stratégique pour les entreprises souhaitant s'implanter ou développer leurs opportunités d'affaires entre la Chine et l'international.",
        "service5.title": "Développement de Partenariats",
        "service5.desc": "Étude des propositions d'alliance stratégique, prise de contact, négociation des modalités et suivi continu des partenariats créés.",
        "service6.title": "Accompagnement de Projets",
        "service6.desc": "Analyse de faisabilité, structuration de propositions et coordination de projets commerciaux, industriels ou de développement spécialisés.",

        "products.subtitle": "CATALOGUE SOURCING",
        "products.title": "Catégories de Produits Principales",
        "products.intro": "Nous étudions vos demandes selon vos spécifications exactes, les volumes souhaités et la conformité exigée auprès de nos réseaux de fabricants.",
        "prod.btn_quote": "Demander un devis",
        "prod.textiles": "Textiles & Habillement",
        "prod.bags": "Sacs & Accessoires",
        "prod.jewelry": "Bijoux & Joaillerie",
        "prod.cosmetics": "Cosmétiques & Beauté",
        "prod.home": "Maison & Équipements",
        "prod.building": "Matériaux de Construction",
        "prod.auto": "Pièces Automobiles",
        "prod.electronics": "Produits Électroniques",

        "journey.subtitle": "ORGANIGRAMME DU PROCESSUS",
        "journey.title": "Parcours Client & Flux de Travail",
        "journey.intro": "Découvrez la méthode claire et structurée appliquée par BYGL pour traiter efficacement chaque typologie de demande.",

        "flow.visitor": "Soumission de la demande",
        "f1.step1": "Saisie de vos besoins détaillés dans nos formulaires sécurisés.",
        "f1.step2": "Qualification & Analyse",
        "f1.step3": "Étude de faisabilité par notre équipe locale à Hangzhou.",
        "f1.step4": "Sourcing Usines & Devis",
        "f1.step5": "Recherche des meilleurs fabricants et négociation directe.",
        "f1.step6": "Commande & Expédition",
        "f1.step7": "Suivi rigoureux de la production, contrôle qualité et logistique.",

        "quote.subtitle": "DEMANDE DE SOURCING",
        "quote.title": "Demander un Devis Commercial",
        "partner.subtitle": "COLLABORATION STRATÉGIQUE",
        "partner.title": "Devenir Partenaire BYGL",
        "project.subtitle": "PROJETS SPÉCIAUX",
        "project.title": "Demander ou Proposer un Projet",
        "contact.subtitle": "PRENDRE CONTACT",
        "contact.title": "Contactez Hangzhou BYGL",
        "contact.addr_title": "Adresse du Siège",
        "contact.email_title": "E-mail Officiel",
        "contact.phone_title": "Téléphone & WhatsApp",
        "contact.btn_email": "Envoyer un e-mail",

        "form.fullname": "Nom complet *",
        "form.company": "Entreprise / Organisation *",
        "form.email": "Adresse E-mail *",
        "form.phone": "Téléphone / WhatsApp",
        "form.country": "Pays de destination *",
        "form.category": "Catégorie de produit *",
        "form.select_cat": "-- Sélectionner une catégorie --",
        "form.qty": "Quantité estimée",
        "form.budget": "Budget indicatif (USD/CNY)",
        "form.desc": "Description précise du besoin *",
        "form.consent": "J'accepte que Hangzhou BYGL traite mes données dans le cadre de ma demande.",
        "form.submit_quote": "Envoyer la demande de devis",

        "partner.type_label": "Type de partenariat envisagé *",
        "partner.type_select": "-- Choisir un type --",
        "partner.opt1": "Fournisseur / Usine partenaire en Chine",
        "partner.opt2": "Distributeur / Agent International",
        "partner.opt3": "Partenaire Logistique & Transit",
        "partner.opt4": "Autre collaboration commerciale",
        "partner.desc_label": "Description de la proposition *",
        "partner.submit": "Soumettre la demande de partenariat",

        "project.title_label": "Titre du projet *",
        "project.domain_label": "Domaine du projet *",
        "project.domain_select": "-- Sélectionner le domaine --",
        "project.desc_label": "Description détaillée et objectifs *",
        "project.submit": "Soumettre le projet pour évaluation",

        "footer.desc": "Hangzhou BYGL Global Trading Company - Votre partenaire fiable pour le sourcing, la coordination commerciale et les échanges internationaux en Chine.",
        "footer.quick_links": "Navigation Rapide",
        "footer.services_links": "Nos Services",
        "footer.legal_heading": "Légal & Contact"
    },
    en: {
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.services": "Services",
        "nav.products": "Products",
        "nav.journey": "Journey",
        "nav.partner": "Partnership",
        "nav.project": "Projects",
        "nav.contact": "Contact",

        "hero.badge": "HANGZHOU BYGL GLOBAL TRADING COMPANY",
        "hero.title": "Your Direct & Seamless Gateway to the Chinese Market",
        "hero.subtitle": "Connecting global businesses and West African partners with verified Chinese manufacturers through rigorous sourcing and local presence in Hangzhou.",
        "hero.btn_quote": "Request a Quote",
        "hero.btn_services": "Explore Our Services",
        "hero.trust1": "Legally Registered Entity in Hangzhou",
        "hero.trust2": "Response Within 24 Hours",

        "feat.1_title": "Local Presence in Hangzhou",
        "feat.1_desc": "Strategic location in Zhejiang enabling direct factory visits and real-time coordination.",
        "feat.2_title": "Sourcing & Quality Control",
        "feat.2_desc": "Rigorous supplier qualification based on your exact product specifications.",
        "feat.3_title": "Logistics Coordination",
        "feat.3_desc": "Export documentation, cost negotiation, and freight management.",

        "about.subtitle": "CORPORATE OVERVIEW",
        "about.title": "About Hangzhou BYGL Global Trading",
        "about.heading": "A strategic bridge between China and the world",
        "about.p1": "Hangzhou BYGL Global Trading Company is a specialized trade, sourcing, and coordination firm registered in Hangzhou, Zhejiang Province, China.",
        "about.p2": "Our mission is to offer international buyers and institutions a transparent, trustworthy presence on the ground in China.",
        "about.val1_title": "Reliability & Transparency",
        "about.val1_desc": "Strict order management and total clarity at every step.",
        "about.val2_title": "Tailored Coordination",
        "about.val2_desc": "Solutions matched to your specific volume, quality, and delivery needs.",
        "about.legal_title": "Legal Information",
        "about.legal_name_label": "Company Name:",
        "about.legal_rep_label": "Legal Representative:",
        "about.legal_status_label": "Legal Status:",
        "about.legal_date_label": "Registration Date:",
        "about.legal_cap_label": "Registered Capital:",
        "about.legal_addr_label": "Headquarters:",

        "services.subtitle": "EXPERTISE & SOLUTIONS",
        "services.title": "Our Corporate Services",
        "services.link_quote": "Request a study",
        "services.link_contact": "Contact us",
        "services.link_partner": "Become a partner",
        "services.link_project": "Submit a project",

        "service1.title": "Product Sourcing",
        "service1.desc": "In-depth understanding of your needs, supplier verification, quotation analysis, and commercial negotiation.",
        "service2.title": "Supplier Coordination",
        "service2.desc": "Factory audits, partner identification, offer comparisons, and daily order execution tracking.",
        "service3.title": "Import & Export Support",
        "service3.desc": "Shipping management, export documentation assistance, and logistics provider coordination.",
        "service4.title": "Business Consulting",
        "service4.desc": "Strategic guidance for companies looking to establish or expand trade relationships in China.",
        "service5.title": "Partnership Development",
        "service5.desc": "Evaluation of strategic alliance proposals, negotiations, and ongoing alliance management.",
        "service6.title": "Project Support",
        "service6.desc": "Feasibility studies, proposal drafting, and project coordination across industrial and commercial domains.",

        "products.subtitle": "SOURCING CATALOG",
        "products.title": "Main Product Categories",
        "products.intro": "We assess requests based on your exact technical specs, target volumes, and required compliance standards.",
        "prod.btn_quote": "Request a Quote",
        "prod.textiles": "Textiles & Apparel",
        "prod.bags": "Bags & Accessories",
        "prod.jewelry": "Jewelry & Accessories",
        "prod.cosmetics": "Cosmetics & Beauty",
        "prod.home": "Home & Household",
        "prod.building": "Building Materials",
        "prod.auto": "Automotive Parts",
        "prod.electronics": "Electronics",

        "journey.subtitle": "PROCESS WORKFLOW",
        "journey.title": "Customer Journey & Operations",
        "journey.intro": "Discover the clear methodology BYGL applies to process every client request efficiently.",

        "flow.visitor": "Request Submission",
        "f1.step1": "Fill out your requirements in our secure forms.",
        "f1.step2": "Qualification & Analysis",
        "f1.step3": "Feasibility review by our local team in Hangzhou.",
        "f1.step4": "Factory Sourcing & Quotes",
        "f1.step5": "Direct factory searches and cost negotiations.",
        "f1.step6": "Order & Shipping",
        "f1.step7": "Production tracking, quality inspections, and export dispatch.",

        "quote.subtitle": "SOURCING REQUEST",
        "quote.title": "Request a Commercial Quote",
        "partner.subtitle": "STRATEGIC COLLABORATION",
        "partner.title": "Become a BYGL Partner",
        "project.subtitle": "SPECIAL PROJECTS",
        "project.title": "Request or Submit a Project",
        "contact.subtitle": "GET IN TOUCH",
        "contact.title": "Contact Hangzhou BYGL",
        "contact.addr_title": "Headquarters Address",
        "contact.email_title": "Official E-mail",
        "contact.phone_title": "Phone & WhatsApp",
        "contact.btn_email": "Send an email",

        "form.fullname": "Full Name *",
        "form.company": "Company / Organization *",
        "form.email": "E-mail Address *",
        "form.phone": "Phone / WhatsApp",
        "form.country": "Destination Country *",
        "form.category": "Product Category *",
        "form.select_cat": "-- Select a category --",
        "form.qty": "Estimated Quantity",
        "form.budget": "Indicative Budget (USD/CNY)",
        "form.desc": "Requirement Description *",
        "form.consent": "I agree to Hangzhou BYGL processing my data for this request.",
        "form.submit_quote": "Submit Quote Request",

        "partner.type_label": "Partnership Type *",
        "partner.type_select": "-- Select a type --",
        "partner.opt1": "Supplier / Factory Partner in China",
        "partner.opt2": "International Agent / Distributor",
        "partner.opt3": "Logistics & Freight Partner",
        "partner.opt4": "Other Commercial Collaboration",
        "partner.desc_label": "Proposal Description *",
        "partner.submit": "Submit Partnership Request",

        "project.title_label": "Project Title *",
        "project.domain_label": "Project Domain *",
        "project.domain_select": "-- Select domain --",
        "project.desc_label": "Detailed Description & Objectives *",
        "project.submit": "Submit Project for Evaluation",

        "footer.desc": "Hangzhou BYGL Global Trading Company - Your trusted partner for sourcing, trade coordination, and global commerce in China.",
        "footer.quick_links": "Quick Links",
        "footer.services_links": "Our Services",
        "footer.legal_heading": "Legal & Contact"
    }
};

// Global State
let currentLang = 'fr';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "VOTRE_PUBLIC_KEY") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    initThemeToggle();
    initNavigation();
    initLanguageSwitcher();
    initCategoryButtons();
    initForms();
});

// Theme Toggle System (Dark / Light)
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or preference
    const savedTheme = localStorage.getItem('bygl-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('bygl-theme', newTheme);
        });
    }
}

// Navigation Controls
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// Language Switcher System
function initLanguageSwitcher() {
    const btnFr = document.getElementById('lang-btn-fr');
    const btnEn = document.getElementById('lang-btn-en');

    if (btnFr && btnEn) {
        btnFr.addEventListener('click', () => switchLanguage('fr'));
        btnEn.addEventListener('click', () => switchLanguage('en'));
    }
}

function switchLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(`lang-btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Category Autofill in Form
function initCategoryButtons() {
    document.querySelectorAll('.quote-cat').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cat = e.currentTarget.getAttribute('data-cat');
            const catSelect = document.getElementById('quote-category');
            if (catSelect && cat) {
                catSelect.value = cat;
            }
        });
    });
}

// Form Handlers & EmailJS Integration
function initForms() {
    handleFormSubmit('quote-form', 'quote-message', {
        successFr: 'Votre demande de devis a été envoyée avec succès ! Notre équipe vous répondra sous 24h.',
        successEn: 'Your quote request has been sent successfully! Our team will reply within 24h.',
        getData: () => ({
            form_type: 'Sourcing Quote',
            from_name: document.getElementById('quote-name').value,
            company: document.getElementById('quote-company').value,
            reply_to: document.getElementById('quote-email').value,
            phone: document.getElementById('quote-phone').value || 'N/A',
            message: `Country: ${document.getElementById('quote-country').value} | Category: ${document.getElementById('quote-category').value} | Qty: ${document.getElementById('quote-qty').value || 'N/A'} | Budget: ${document.getElementById('quote-budget').value || 'N/A'} | Specs: ${document.getElementById('quote-desc').value}`
        })
    });

    handleFormSubmit('partner-form', 'partner-message', {
        successFr: 'Votre proposition de partenariat a été bien reçue. Merci pour votre intérêt.',
        successEn: 'Your partnership proposal has been received. Thank you for reaching out.',
        getData: () => ({
            form_type: 'Partnership',
            from_name: document.getElementById('partner-name').value,
            company: document.getElementById('partner-company').value,
            reply_to: document.getElementById('partner-email').value,
            phone: document.getElementById('partner-phone').value || 'N/A',
            message: `Type: ${document.getElementById('partner-type').value} | Desc: ${document.getElementById('partner-desc').value}`
        })
    });

    handleFormSubmit('project-form', 'project-message', {
        successFr: 'Votre projet a été soumis pour étude de pré-recevabilité par l’équipe de BYGL.',
        successEn: 'Your project has been submitted for evaluation by the BYGL team.',
        getData: () => ({
            form_type: 'Special Project',
            from_name: document.getElementById('project-name').value,
            company: document.getElementById('project-org').value,
            reply_to: document.getElementById('project-email').value,
            phone: 'N/A',
            message: `Title: ${document.getElementById('project-title').value} | Domain: ${document.getElementById('project-domain').value} | Desc: ${document.getElementById('project-desc').value}`
        })
    });
}

function handleFormSubmit(formId, messageId, config) {
    const form = document.getElementById(formId);
    const messageContainer = document.getElementById(messageId);

    if (form && messageContainer) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';

            const data = config.getData();

            if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "VOTRE_PUBLIC_KEY") {
                try {
                    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
                    messageContainer.className = 'form-message success';
                    messageContainer.textContent = currentLang === 'fr' ? config.successFr : config.successEn;
                    form.reset();
                } catch (err) {
                    console.error('EmailJS Error:', err);
                    messageContainer.className = 'form-message error';
                    messageContainer.textContent = currentLang === 'fr' 
                        ? 'Erreur lors de l’envoi. Veuillez réessayer ou envoyer un e-mail direct.' 
                        : 'Error sending message. Please try again or send a direct email.';
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            } else {
                // Simulation mode
                setTimeout(() => {
                    messageContainer.className = 'form-message success';
                    messageContainer.textContent = currentLang === 'fr' ? config.successFr : config.successEn;
                    form.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 800);
            }
        });
    }
}
