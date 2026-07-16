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


## Latest layout update

- The standalone "Aktivitāšu karte" section has been removed.
- The activity-card / stamp explanation now appears as a compact side panel next to the registration form.
- The "Uz tikšanos / Sazināties" CTA panel has been removed.


## Latest update

- Removed "Par festivālu" from the top navigation.
- Added scroll offset for sticky header navigation so section titles are not cut off.
- Added `public/documents/pasakuma-nolikums.pdf`.
- Added a bottom page section linking to Pasākuma nolikums.


## Latest text update

Updated activity-card / stamp wording to refer to participation in a prize draw after collecting a certain number of stamps.


## Latest text update

Added note that pre-registered families will also participate in additional prize draws.


## Mobile optimization update
- Improved header/menu behavior on mobile.
- Tightened hero, cards, form, and footer layout for smaller screens.
- Better tap targets and stacked CTA/form controls on phones.


## Latest text update
Added note that pre-registered families can participate in an additional prize draw.


## Latest text update
Clarified that online-registered families can participate in the additional prize draw.


## Latest update

- Updated event time to 11:00–17:00.
- Updated programme start and closing time.
- Removed contact person name and accessibility notes fields from registration form.
- Added anonymous family activity survey questions.
- Added max-two selection validation for the barriers question.
- Expanded consent text to include photography/filming and use in LSFP communication materials.
- Updated Apps Script so registration data and anonymous survey answers are written to separate sheets.


## Confirmation email update

The Google Apps Script in `apps-script/Code.gs` now:
- saves the registration in `Pieteikumi`;
- saves survey answers separately in `Anonīmās atbildes`;
- sends a confirmation email to the address submitted in the form.

To activate it:
1. Open the Google Apps Script project used by the form.
2. Replace the current code with `apps-script/Code.gs` from this ZIP.
3. Save.
4. Deploy → Manage deployments → Edit → New version → Deploy.
5. Test the form with your own email address.


## Latest text update

- Removed references to additional prize draws.
- Removed references to personalised activity cards.
- Updated concept: activity card quantity is limited; online registration guarantees activity cards for the family, one for each participant.
- Updated stamp wording to punched marks in activity cards.
- Updated confirmation email text in Apps Script accordingly.


## Latest layout/text update

- Improved checkbox layout in the survey question so the checkbox and text stay together.
- Reworked the survey/form layout to use available horizontal space better on desktop.
- Updated introductory text to clearly state that families receive activity cards and can enter the prize draw after completing a minimum number of activities.
