# Hangzhou BYGL Global Trading Company - Redesigned Website

## 🎨 Design System Principles
- **Vibe**: Fresh, clear, modern, and slightly playful.
- **Color Palette**:
  - Background: `#F4FBFA` | Surface: `#FFFFFF` | Text: `#0B2A2F` | Border: `#CFE6E4`
  - Primary Aqua: `#19C3C0` (Buttons with dark text `#062226` on top)
  - Links: `#0A7C82`
  - Accent Coral: `#F26B4F` (Single highlight per section)
- **Dark Mode**: Fully supported (`#071B1F` background, `#0D2A30` surface, `#E6F6F5` text, `#3FE0DB` primary aqua)
- **Typography**: Space Grotesk (headings) + Inter (body)
- **Icons**: Lucide Icons (clean, modern icon set)

## ✉️ Gmail / EmailJS Setup Instructions
To send form submissions directly to `hangzhoubyglcompany@gmail.com`:
1. Register for a free account at [EmailJS](https://www.emailjs.com/).
2. Add your Gmail service (Note down your `Service ID`).
3. Create an Email Template with fields `from_name`, `company`, `reply_to`, `phone`, `message` (Note down your `Template ID`).
4. Copy your `Public Key` from Account settings.
5. In `script.js`, replace:
   - `EMAILJS_PUBLIC_KEY = "VOTRE_PUBLIC_KEY"`
   - `EMAILJS_SERVICE_ID = "VOTRE_SERVICE_ID"`
   - `EMAILJS_TEMPLATE_ID = "VOTRE_TEMPLATE_ID"`
