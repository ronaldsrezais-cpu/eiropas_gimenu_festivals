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

Update: Added full partner/support logo set and increased the European Union co-financing and IZM logos in the footer.


Final footer logo cleanup: added Krosmintons, Handbols, Riteņbraukšana and Šaušana logos; removed Sērfošanas/SUP logo; improved LDSS/LHF visibility; normalized partner logo sizing; reduced empty white space in Koordinē/Līdzfinansē blocks.


Update: Rīgas valstspilsētas pašvaldības policijas logo deduplicated so it appears only once in the support section on each page.


Update: fixed support-rigas-mezi.jpg so the support section now shows the actual Rīgas Meži logo instead of a duplicate police logo.


Update: removed the SUP activity card and added three support logos (Jaunatnes starptautisko programmu aģentūra, Valsts izglītības attīstības aģentūra, Latvijas Antidopinga birojs) to the Atbalsta section. Support logo assets were trimmed for better sizing and visibility.

Update: Pasākuma karte section now uses the uploaded festival territory map image, and the registration intro text no longer includes “Iepriekšēja reģistrācija iespējama līdz 18. augustam”.


Update: Changed map section text to “Uzvaras parks”, removed Google Maps link/text, and made the event map image fill the full section width.


Update: Made the event map slightly smaller and centered within the map section.


Update: Made the event map 30% smaller than the previous version and kept it centered.
