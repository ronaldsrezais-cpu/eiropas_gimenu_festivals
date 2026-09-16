document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('familyRegistrationForm');
  if (!form) return;

  // A lightweight anti-spam layer for the public registration form.
  // The backend also validates these values before saving data or sending e-mail.
  const protectionToken = 'HH26-REG-7b4f9c2e-a81d';

  function ensureHiddenField(name, value) {
    let input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = value;
    return input;
  }

  ensureHiddenField('formProtectionToken', protectionToken);
  ensureHiddenField('formStartedAt', String(Date.now()));
  ensureHiddenField('formVersion', '2026-09-antispam-v1');

  // Honeypot: real visitors never see or fill this field, while many form bots do.
  if (!form.querySelector('input[name="website"]')) {
    const trapWrap = document.createElement('div');
    trapWrap.setAttribute('aria-hidden', 'true');
    trapWrap.style.position = 'absolute';
    trapWrap.style.left = '-10000px';
    trapWrap.style.top = 'auto';
    trapWrap.style.width = '1px';
    trapWrap.style.height = '1px';
    trapWrap.style.overflow = 'hidden';

    const trapLabel = document.createElement('label');
    trapLabel.textContent = 'Website';

    const trapInput = document.createElement('input');
    trapInput.type = 'text';
    trapInput.name = 'website';
    trapInput.value = '';
    trapInput.tabIndex = -1;
    trapInput.autocomplete = 'off';
    trapInput.setAttribute('aria-hidden', 'true');

    trapLabel.appendChild(trapInput);
    trapWrap.appendChild(trapLabel);
    form.appendChild(trapWrap);
  }
});
