# evart
Maison EVART — Haute Couture — Coming Soon
=========================================

This repository contains a minimal, modern “coming soon” landing page for a haute couture ecommerce brand. It features:

- Elegant typography with a black/ivory/gold palette
- Ambient grain texture, spotlight parallax, and subtle marquee
- Accessible, responsive layout with reduced motion support
- “Notify me” email form (client-side placeholder)

Project structure
-----------------

- `index.html` — Page markup and metadata
- `styles/main.css` — Styles, animations, and layout
- `scripts/main.js` — Grain canvas, spotlight, and form handling
- `assets/og-cover.svg` — Social sharing cover image

Run locally
-----------

No build step is required. Open `index.html` directly in a browser, or serve the folder to avoid cross-origin restrictions for some browsers.

Optional: start a tiny static server:

```bash
python3 -m http.server 8080
# then open http://localhost:8080/
```

Customize
---------

- Branding: Update the brand name in `index.html` and the favicon SVG data URL.
- Colors: Tweak CSS variables in `styles/main.css` (`--bg`, `--ink`, `--gold`).
- Form: Replace the placeholder submit logic in `scripts/main.js` with your email provider API (e.g., Mailchimp, Resend, Supabase). Add server-side validation when deploying.

Accessibility notes
-------------------

- Honors `prefers-reduced-motion`.
- Form includes proper labels and live status messaging.

License
-------

MIT — Use freely. Replace branding for your project.
