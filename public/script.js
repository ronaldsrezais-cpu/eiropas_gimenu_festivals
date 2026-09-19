const target = new Date('2026-09-19T00:00:00+03:00').getTime();

const fields = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};


function pad(value) {
  return String(value).padStart(2, '0');
}


function tick() {
  if (
    !fields.days ||
    !fields.hours ||
    !fields.minutes ||
    !fields.seconds
  ) {
    return;
  }

  const distance = Math.max(
    0,
    target - Date.now()
  );

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (
      distance /
      (1000 * 60 * 60)
    ) % 24
  );

  const minutes = Math.floor(
    (
      distance /
      (1000 * 60)
    ) % 60
  );

  const seconds = Math.floor(
    (
      distance /
      1000
    ) % 60
  );

  fields.days.textContent = pad(days);
  fields.hours.textContent = pad(hours);
  fields.minutes.textContent = pad(minutes);
  fields.seconds.textContent = pad(seconds);
}


if (
  fields.days &&
  fields.hours &&
  fields.minutes &&
  fields.seconds
) {
  tick();

  setInterval(
    tick,
    1000
  );
}


// -------------------------------------------------
// GALVENE / MOBILĀ IZVĒLNE
// -------------------------------------------------

const header =
  document.querySelector('.site-header');

const menuButton =
  document.querySelector('.menu-button');


menuButton?.addEventListener(
  'click',
  () => {

    const isOpen =
      header.classList.toggle('open');

    menuButton.setAttribute(
      'aria-expanded',
      String(isOpen)
    );
  }
);


document
  .querySelectorAll('.main-nav a')
  .forEach(function(link) {

    link.addEventListener(
      'click',
      function() {

        header?.classList.remove('open');

        menuButton?.setAttribute(
          'aria-expanded',
          'false'
        );
      }
    );
  });


// -------------------------------------------------
// ĢIMENES REĢISTRĀCIJAS FORMA
// -------------------------------------------------

const familyForm =
  document.getElementById(
    'familyRegistrationForm'
  );

const formStatus =
  document.getElementById(
    'formStatus'
  );

const hiddenSubmitFrame =
  document.querySelector(
    'iframe[name="hiddenSubmitFrame"]'
  );


let registrationSubmissionInProgress =
  false;

let registrationSubmissionTimeout =
  null;

let registrationIframeFallbackTimer =
  null;


// -------------------------------------------------
// VEIKSMĪGAS REĢISTRĀCIJAS PAZIŅOJUMS
// -------------------------------------------------

function showRegistrationSuccess() {

  window.clearTimeout(
    registrationSubmissionTimeout
  );

  window.clearTimeout(
    registrationIframeFallbackTimer
  );

  registrationSubmissionInProgress =
    false;


  const submitButton =
    familyForm?.querySelector(
      'button[type="submit"], input[type="submit"]'
    );


  if (submitButton) {
    submitButton.disabled = false;
  }


  if (!formStatus || !familyForm) {
    return;
  }


  formStatus.innerHTML =
    '<strong>Paldies, reģistrācija veiksmīga.</strong><br>' +
    '<strong>Reģistrācijas punktā nosauciet savu ģimenes nosaukumu</strong> ' +
    'un saņemsiet savas aktivitāšu kartītes.';


  formStatus.style.color =
    '#16784b';


  // ---------------------------------------------
  // META PIXEL
  // ---------------------------------------------

  if (
    typeof window.fbq === 'function'
  ) {
    window.fbq(
      'track',
      'Lead'
    );
  }


  // ---------------------------------------------
  // NOTĪRĀM FORMU
  // ---------------------------------------------

  familyForm.reset();


  // ---------------------------------------------
  // PARĀDĀM PAZIŅOJUMU LIETOTĀJAM
  // ---------------------------------------------

  formStatus.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}


// -------------------------------------------------
// FORMAS IESNIEGŠANA
// -------------------------------------------------

if (
  familyForm &&
  formStatus
) {

  familyForm.addEventListener(
    'submit',
    function(event) {

      const action =
        familyForm.getAttribute(
          'action'
        ) || '';


      const selectedAgeGroups =
        familyForm.querySelectorAll(
          'input[name="childrenAgeGroups"]:checked'
        );


      // -----------------------------------------
      // BĒRNU VECUMA GRUPA
      // -----------------------------------------

      if (
        selectedAgeGroups.length === 0
      ) {

        event.preventDefault();

        registrationSubmissionInProgress =
          false;


        formStatus.textContent =
          'Lūdzu, izvēlieties vismaz vienu bērnu vecuma grupu.';


        formStatus.style.color =
          '#d84d39';


        return;
      }


      // -----------------------------------------
      // PĀRBAUDE, VAI FORMA PIESLĒGTA APPS SCRIPT
      // -----------------------------------------

      if (
        action.includes(
          'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
        )
      ) {

        event.preventDefault();

        registrationSubmissionInProgress =
          false;


        formStatus.textContent =
          'Forma vēl nav pieslēgta Google Sheets.';


        formStatus.style.color =
          '#d84d39';


        return;
      }


      // -----------------------------------------
      // NEĻAUJAM NOSPIEST POGU DIVREIZ
      // -----------------------------------------

      if (
        registrationSubmissionInProgress
      ) {

        event.preventDefault();

        return;
      }


      registrationSubmissionInProgress =
        true;


      const submitButton =
        familyForm.querySelector(
          'button[type="submit"], input[type="submit"]'
        );


      if (submitButton) {
        submitButton.disabled = true;
      }


      formStatus.textContent =
        'Nosūtām pieteikumu...';


      formStatus.style.color =
        '#1597c4';


      window.clearTimeout(
        registrationSubmissionTimeout
      );


      window.clearTimeout(
        registrationIframeFallbackTimer
      );


      // -----------------------------------------
      // 30 SEKUNŽU DROŠĪBAS TIMEOUT
      // -----------------------------------------

      registrationSubmissionTimeout =
        window.setTimeout(
          function() {

            if (
              !registrationSubmissionInProgress
            ) {
              return;
            }


            registrationSubmissionInProgress =
              false;


            if (submitButton) {
              submitButton.disabled = false;
            }


            formStatus.textContent =
              'Pieteikumu neizdevās nosūtīt. Lūdzu, pārbaudiet interneta savienojumu un mēģiniet vēlreiz.';


            formStatus.style.color =
              '#d84d39';

          },
          30000
        );
    }
  );


  // -------------------------------------------------
  // ATBILDE NO GOOGLE APPS SCRIPT
  // -------------------------------------------------

  window.addEventListener(
    'message',
    function(event) {

      const data =
        event.data || {};


      if (
        !registrationSubmissionInProgress ||
        data.source !==
          'familyRegistrationForm'
      ) {
        return;
      }


      window.clearTimeout(
        registrationSubmissionTimeout
      );


      window.clearTimeout(
        registrationIframeFallbackTimer
      );


      // -----------------------------------------
      // VEIKSMĪGA REĢISTRĀCIJA
      // -----------------------------------------

      if (
        data.ok === true
      ) {

        showRegistrationSuccess();

        return;
      }


      // -----------------------------------------
      // KĻŪDA
      // -----------------------------------------

      registrationSubmissionInProgress =
        false;


      const submitButton =
        familyForm.querySelector(
          'button[type="submit"], input[type="submit"]'
        );


      if (submitButton) {
        submitButton.disabled = false;
      }


      formStatus.textContent =
        data.message ||
        'Pieteikumu neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz.';


      formStatus.style.color =
        '#d84d39';
    }
  );


  // -------------------------------------------------
  // REZERVES MEHĀNISMS
  //
  // Ja Apps Script atbilde ielādējas iframe,
  // bet postMessage nenostrādā, parādām veiksmīgas
  // reģistrācijas paziņojumu turpat lapā.
  // -------------------------------------------------

  hiddenSubmitFrame?.addEventListener(
    'load',
    function() {

      if (
        !registrationSubmissionInProgress
      ) {
        return;
      }


      window.clearTimeout(
        registrationIframeFallbackTimer
      );


      registrationIframeFallbackTimer =
        window.setTimeout(
          function() {

            if (
              !registrationSubmissionInProgress
            ) {
              return;
            }


            window.clearTimeout(
              registrationSubmissionTimeout
            );


            showRegistrationSuccess();

          },
          700
        );
    }
  );
}


// -------------------------------------------------
// LOGO → UZ LAPAS AUGŠU
// -------------------------------------------------

const logoBrand =
  document.querySelector(
    '.logo-brand'
  );


logoBrand?.addEventListener(
  'click',
  function(event) {

    event.preventDefault();


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


    header?.classList.remove(
      'open'
    );


    menuButton?.setAttribute(
      'aria-expanded',
      'false'
    );
  }
);
