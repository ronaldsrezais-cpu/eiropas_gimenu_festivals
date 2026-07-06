# Home & Heart – Eiropas Ģimeņu festivāls

This ZIP is a Next.js-compatible Vercel deployment package.

The registration form is already connected to this Google Apps Script Web App URL:

https://script.google.com/macros/s/AKfycbxFtZrMEgK9_B-xh4XpjXexUlBgRDSMigatcYA2XWigpNODxs3Y58mFv2AC5QNIeNewSg/exec

## Vercel deployment

Use this package if Vercel is currently treating the project as a Next.js app.

Root files/folders must be:

- `app/`
- `public/`
- `package.json`
- `vercel.json`
- `apps-script/` (reference only)

Vercel settings:

- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: leave empty
- Root Directory: repository root

If the GitHub repository still contains old files such as `index.html`, `styles.css`, `script.js` in the root, they can stay but are no longer needed. The important files are the Next.js files above.

## Apps Script

The Apps Script code is kept in `apps-script/Code.gs` for reference. If the Google Web App is redeployed later, update the form `action` URL in `app/page.js`.
