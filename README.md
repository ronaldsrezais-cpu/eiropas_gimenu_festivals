Updated footer logo layout:
- all footer logo sections now use shared white backgrounds instead of individual white tiles per logo
- all logos normalized to consistent display height
- updated LFS logo applied
- updated EU funding logo applied


Includes Vercel Web Analytics: @vercel/analytics dependency and <Analytics /> in app/layout.js.


## Meta Pixel and thank-you page update

Changed files:
- `app/layout.js` — added Meta Pixel base code in the shared `<head>`.
- `app/paldies/page.js` — added the `/paldies` thank-you page with `robots: noindex` and the Meta Pixel Lead event.
- `public/script.js` — redirects to `/paldies` only after the form backend posts an OK response.
- `apps-script/Code.gs` — returns a hidden-iframe `postMessage` response with OK/error status.
- `app/globals.css` — added thank-you page styling.

Thank-you page URL: `https://www.gimenufestivals.lv/paldies`

Redirect fix:
- Apps Script response now uses HtmlService with ALLOWALL so the hidden iframe can postMessage back to the website after successful submit.
- script.js now redirects to /paldies only when that OK postMessage is received.
- Added final CSS override so EK and IZM logos remain side by side despite earlier footer CSS duplicates.
