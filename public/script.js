const target = new Date('2026-08-22T00:00:00+03:00').getTime();
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
  const distance = Math.max(0, target - Date.now());
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  fields.days.textContent = pad(days);
  fields.hours.textContent = pad(hours);
  fields.minutes.textContent = pad(minutes);
  fields.seconds.textContent = pad(seconds);
}

tick();
setInterval(tick, 1000);

const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
menuButton?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});


// Custom family registration form helper
const familyForm = document.getElementById("familyRegistrationForm");
const formStatus = document.getElementById("formStatus");

if (familyForm && formStatus) {
  familyForm.addEventListener("submit", function (event) {
    const action = familyForm.getAttribute("action") || "";
    const selectedAgeGroups = familyForm.querySelectorAll('input[name="childrenAgeGroups"]:checked');

    if (selectedAgeGroups.length === 0) {
      event.preventDefault();
      formStatus.textContent = "Lūdzu, izvēlieties vismaz vienu bērnu vecuma grupu.";
      formStatus.style.color = "#d84d39";
      return;
    }

    if (action.includes("PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE")) {
      event.preventDefault();
      formStatus.textContent = "Forma vēl nav pieslēgta Google Sheets. Lūdzu, ievietojiet Google Apps Script Web App URL.";
      formStatus.style.color = "#d84d39";
      return;
    }

    formStatus.textContent = "Pieteikums tiek nosūtīts…";
    formStatus.style.color = "#1597c4";

    window.setTimeout(function () {
      formStatus.textContent = "Paldies! Pieteikums ir nosūtīts.";
      formStatus.style.color = "#22b86f";
      familyForm.reset();
    }, 1100);
  });
}
