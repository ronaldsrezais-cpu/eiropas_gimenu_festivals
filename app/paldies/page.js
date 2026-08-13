import Script from "next/script";

export const metadata = {
  title: "Paldies! Jūsu pieteikums ir saņemts. | Eiropas Ģimeņu festivāls",
  robots: "noindex",
};

const pageHtml = `<header class="site-header" id="top">
      <a class="brand logo-brand" href="/" aria-label="Home & Heart sākumlapa">
      <img src="https://familyactivityhub.com/visuals/home-heart-logo.png" alt="Home & Heart European Family Festival logo" />
      </a>
      <nav class="main-nav" aria-label="Galvenā navigācija">
      <a href="/#programma">Programma</a>
      <a href="/#aktivitates">Aktivitātes</a>
      <a href="/#karte">Pasākuma karte</a>
      </nav>
      <div class="header-actions">
      <div class="social-icons header-socials" aria-label="Sociālie tīkli">
      <a class="social-link facebook" href="https://www.facebook.com/lsfp.lv/" target="_blank" rel="noreferrer" aria-label="Facebook">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.07C22 6.55 17.52 2.07 12 2.07S2 6.55 2 12.07c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.2 22 17.06 22 12.07z"/></svg>
      </a>
      <a class="social-link instagram" href="https://www.instagram.com/lsfp.lv/" target="_blank" rel="noreferrer" aria-label="Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.4" cy="6.7" r="1.3" fill="currentColor" stroke="none"/></svg>
      </a>
      <a class="social-link linkedin" href="https://www.linkedin.com/company/latvian-sports-federations-council" target="_blank" rel="noreferrer" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 7.06a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92zM20 20h-3.37v-5.59c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95V20H9.27V8.5h3.11v1.57h.04c.43-.82 1.49-1.74 3.06-1.74 3.28 0 3.89 2.16 3.89 4.97V20z"/></svg>
      </a>
      <a class="social-link youtube" href="https://www.youtube.com/@LatvijasSportafeder%C4%81cijupadome" target="_blank" rel="noreferrer" aria-label="YouTube">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7.5v9l8-4.5-8-4.5z"/></svg>
      </a>
      </div>
      <a class="nav-cta" href="/#registracija">Pieteikt ģimeni</a>
      </div>
      <button class="menu-button" aria-label="Atvērt izvēlni" aria-expanded="false">☰</button>
      </header>
      <main>
      <section class="section-pad thank-you-page">
      <div class="thank-you-card">
      <span class="section-label">Pieteikums saņemts</span>
      <h1>Paldies! Jūsu pieteikums ir saņemts.</h1>
      <p>Sazināsimies ar Jums uz norādīto e-pasta adresi.</p>
      <a class="button primary" href="/">Atpakaļ uz sākumlapu</a>
      </div>
      </section>
      </main>
      <footer class="site-footer">
      <div class="footer-top">
      <div>
      <strong>Home &amp; Heart</strong>
      <p>Eiropas Ģimeņu festivāls · Uzvaras parks, Rīga · 22. augusts 2026</p>
      </div>
      <div class="footer-contacts" aria-label="Kontaktinformācija">
      <strong>Kontakti</strong>
      <a href="mailto:latvijassportafederacijupadome@gmail.com">latvijassportafederacijupadome@gmail.com</a>
      <a href="https://lsfp.lv/" target="_blank" rel="noreferrer">lsfp.lv</a>
      <span>Tālrunis: +371 68622302</span>
      </div>
      </div>
      <div class="footer-org-grid" aria-label="Festivāla sadarbības partneru informācija">
      <div class="footer-logo-block">
      <span class="partner-label">Koordinē</span>
      <div class="logo-panel single-panel">
      <img class="org-logo org-logo--lsfp" src="/assets/logos/lsfp-logo-new.png" alt="Latvijas Sporta federāciju padome" />
      </div>
      </div>
      <div class="footer-logo-block">
      <span class="partner-label">Līdzfinansē</span>
      <div class="finance-stack">
      <img class="org-logo org-logo--eu" src="/assets/logos/eu-finanse-new.png" alt="Līdzfinansē Eiropas Savienība" />
      <img class="org-logo org-logo--izm" src="/assets/logos/izm-crest-new.png" alt="Izglītības un zinātnes ministrija" />
      </div>
      </div>
      <div class="footer-logo-block footer-logo-block--support">
      <span class="partner-label">Atbalsta</span>
      <div class="support-grid">
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/win-win-sport.png" alt="WIN WIN SPORT" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-barbora.png" alt="Barbora" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-tervete.png" alt="Dabas parks Tērvete" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-rigas-mezi.jpg" alt="Rīgas Meži" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-riga-policija.png" alt="Rīgas valstspilsētas pašvaldības policija" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-jspa.png" alt="Jaunatnes starptautisko programmu aģentūra" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-viaa.png" alt="Valsts izglītības attīstības aģentūra" /></div>
      <div class="support-logo-tile"><img class="org-logo org-logo--support" src="/assets/logos/support-antidopings.png" alt="Latvijas Antidopinga birojs" /></div>
      </div>
      </div>
      </div>
      <div class="footer-partners-grid-wrap">
      <span class="partner-label">Partneri</span>
      <div class="partners-grid">
      <div class="partner-logo-tile"><img src="/assets/logos/partner-ielu-vingrotaji.jpg" alt="Ielu Vingrotāji" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-vieglatletika.png" alt="Latvijas Vieglatlētikas savienība" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-kamaninu-sports.png" alt="Latvijas Kamaniņu sporta federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-alpinistu-savieniba.png" alt="Latvijas Alpīnistu savienība" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-moderna-pieccina.png" alt="Latvijas Modernās pieccīņas un šķēršļu skriešanas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-llsf.png" alt="Latvijas Loka šaušanas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-novuss.png" alt="Latvijas Novusa federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-lamsf-trials.png" alt="Latvijas Motosporta federācija Triāls" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-peldesana.png" alt="Latvijas Peldēšanas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-lpk.png" alt="Latvijas Paralimpiskā komiteja" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-gtf.png" alt="Latvijas Galda tenisa federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-krosmintons.png" alt="Latvijas Krosmintona federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-sausana.png" alt="Latvijas Šaušanas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-sailing-latvia.png" alt="Sailing Latvia" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-kerlings.jpg" alt="Latvijas Kērlinga asociācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-sporta-joga.png" alt="Latvijas Sporta jogas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-jiu-jitsu.png" alt="Latvijas Džiu-džitsu federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-kendo.png" alt="Latvijas Kendo federācija" /></div>
      <div class="partner-logo-tile partner-logo-tile--dark"><img src="/assets/logos/partner-disku-sports.png" alt="Latvijas Disku sportu savienība" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-handbols.png" alt="Latvijas Handbola federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-darts.png" alt="Latvijas Darts organizācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-boulings.png" alt="Latvijas Boulinga federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-sporta-cinas.png" alt="Latvijas Sporta cīņas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-ritenbrauksana.png" alt="Latvijas Riteņbraukšanas federācija" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-gracijas.png" alt="Sporta grāciju federācijas logo" /></div>
      <div class="partner-logo-tile"><img src="/assets/logos/partner-lfs.png" alt="Latvijas Florbola savienība" /></div>
      </div>
      </div>
      <div class="eu-note footer-legal">
      <p>Finansē Eiropas Savienība. Tomēr paustie uzskati un viedokļi ir tikai autora(-u) uzskati un viedokļi, un tie ne vienmēr atspoguļo Eiropas Savienības vai Eiropas Izglītības un kultūras izpildaģentūras (EACEA) viedokli. Ne Eiropas Savienība, ne EACEA par tiem neatbild.</p>
      </div>
      </footer>`;

export default function PaldiesPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: pageHtml }} />
      <Script
        id="meta-pixel-lead"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: "if (typeof fbq === 'function') { fbq('track', 'Lead'); }" }}
      />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
