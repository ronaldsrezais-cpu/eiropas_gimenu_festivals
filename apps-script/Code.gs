const SPREADSHEET_ID = '';
const SHEET_NAME = 'Pieteikumi';

// Anti-spam values used by the website form.
// This token is not a password; it helps reject generic bots that post directly to the Web App URL.
const FORM_PROTECTION_TOKEN = 'HH26-REG-7b4f9c2e-a81d';
const MIN_FORM_FILL_MS = 1500;
const MAX_FORM_FILL_MS = 12 * 60 * 60 * 1000;

const REGISTRATION_HEADERS = [
  'Laiks',
  'Ģimenes nosaukums aktivitāšu kartei',
  'E-pasts',
  'Pieaugušo skaits',
  'Bērnu skaits',
  'Bērnu vecuma grupas',
  'Piekrišana organizatoriskajām vajadzībām un foto/video izmantošanai',
  'Ieraksta avots',
  'Apstiprinājuma e-pasta statuss',
  'Apstiprinājuma e-pasta laiks',
  'Apstiprinājuma e-pasta kļūda',
  'Atlikusī e-pastu kvota'
];

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const allParams = e && e.parameters ? e.parameters : {};

    const familyName = firstValue_(params, [
      'familyName',
      'gimenes_nosaukums',
      'gimenesNosaukums',
      'Ģimenes nosaukums aktivitāšu kartei'
    ]);

    const email = firstValue_(params, [
      'contactEmail',
      'email',
      'kontaktpersonas_epasts',
      'kontaktpersonasEpasts',
      'Kontaktpersonas e-pasts',
      'E-pasts'
    ]);

    const adults = firstValue_(params, [
      'adultsCount',
      'adults',
      'pieaugusie',
      'Pieaugušie',
      'Pieaugušo skaits',
      'Cik pieaugušie plāno ierasties?'
    ]);

    const children = firstValue_(params, [
      'childrenCount',
      'children',
      'berni',
      'Bērni',
      'Bērnu skaits',
      'Cik bērni plāno ierasties?'
    ]);

    const childAges = joinMulti_(params, allParams, [
      'childrenAgeGroups',
      'childAges',
      'bernu_vecuma_grupas',
      'bernuVecumaGrupas',
      'Bērnu vecuma grupas'
    ]);

    const consent = firstValue_(params, [
      'dataConsent',
      'consent',
      'piekritu',
      'Piekrišana'
    ]) || 'Jā';

    // IMPORTANT: anti-spam checks happen BEFORE opening the sheet and BEFORE sending any e-mail.
    // This protects the Google e-mail quota from bot submissions.
    const protection = validateSubmission_(params, familyName, email, adults, children, childAges);
    if (!protection.ok) {
      console.log('Blocked registration: ' + protection.reason);

      // For obvious bots, return a generic success response so they receive no useful feedback.
      if (protection.silent) {
        return jsonResponse_({
          ok: true,
          message: 'Paldies, pieteikums saņemts.'
        });
      }

      return jsonResponse_({
        ok: false,
        message: protection.message || 'Pieteikumu neizdevās nosūtīt. Lūdzu, pārlādējiet lapu un mēģiniet vēlreiz.'
      });
    }

    // Prevent accidental double-clicks / repeated identical submissions for two minutes.
    if (isRecentDuplicate_(familyName, email)) {
      return jsonResponse_({
        ok: true,
        message: 'Paldies, pieteikums saņemts.'
      });
    }

    const ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    const registrationSheet = getOrCreateSheet_(ss, SHEET_NAME);
    prepareSheet_(registrationSheet, REGISTRATION_HEADERS);

    const submittedAt = new Date();
    let emailStatus = 'Nav e-pasta';
    let emailSentAt = '';
    let emailError = '';
    let remainingQuota = '';

    if (email) {
      try {
        remainingQuota = MailApp.getRemainingDailyQuota();

        if (Number(remainingQuota) <= 0) {
          emailStatus = 'Neizdevās';
          emailError = 'Sasniegts Google dienas e-pastu nosūtīšanas limits.';
        } else {
          sendConfirmationEmail_(email, familyName);
          emailStatus = 'Nosūtīts';
          emailSentAt = new Date();
          remainingQuota = MailApp.getRemainingDailyQuota();
        }
      } catch (mailError) {
        emailStatus = 'Neizdevās';
        emailError = mailError && mailError.message ? mailError.message : String(mailError);

        try {
          remainingQuota = MailApp.getRemainingDailyQuota();
        } catch (quotaError) {
          remainingQuota = '';
        }
      }
    }

    registrationSheet.appendRow([
      submittedAt,
      familyName,
      email,
      adults,
      children,
      childAges,
      consent,
      'Mājaslapas forma',
      emailStatus,
      emailSentAt,
      emailError,
      remainingQuota
    ]);

    return jsonResponse_({
      ok: true,
      message: emailStatus === 'Nosūtīts'
        ? 'Paldies, pieteikums saņemts. Dalības apstiprinājumu saņemsiet norādītajā e-pastā.'
        : (emailStatus === 'Neizdevās'
          ? 'Paldies, pieteikums ir saglabāts, bet apstiprinājuma e-pastu neizdevās nosūtīt.'
          : 'Paldies, pieteikums saņemts.')
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : 'Neizdevās saglabāt pieteikumu.'
    });
  }
}

function validateSubmission_(params, familyName, email, adults, children, childAges) {
  const honeypot = firstValue_(params, ['website', 'websiteUrl', 'companyWebsite']);
  if (honeypot) {
    return { ok: false, silent: true, reason: 'honeypot-filled' };
  }

  const token = firstValue_(params, ['formProtectionToken']);
  if (token !== FORM_PROTECTION_TOKEN) {
    return {
      ok: false,
      silent: false,
      reason: 'missing-or-invalid-form-token',
      message: 'Lūdzu, pārlādējiet lapu un mēģiniet pieteikumu nosūtīt vēlreiz.'
    };
  }

  const startedAtRaw = firstValue_(params, ['formStartedAt']);
  const startedAt = Number(startedAtRaw);
  const elapsed = Date.now() - startedAt;

  if (!startedAtRaw || !isFinite(startedAt) || elapsed < MIN_FORM_FILL_MS || elapsed > MAX_FORM_FILL_MS) {
    return {
      ok: false,
      silent: false,
      reason: 'invalid-form-timing',
      message: 'Lūdzu, pārlādējiet lapu un mēģiniet pieteikumu nosūtīt vēlreiz.'
    };
  }

  if (looksLikeSpamText_(familyName)) {
    return { ok: false, silent: true, reason: 'spam-pattern-in-family-name' };
  }

  if (!familyName || familyName.length > 120) {
    return {
      ok: false,
      silent: false,
      reason: 'invalid-family-name',
      message: 'Lūdzu, pārbaudiet ģimenes nosaukumu.'
    };
  }

  if (!isValidEmail_(email)) {
    return {
      ok: false,
      silent: false,
      reason: 'invalid-email',
      message: 'Lūdzu, pārbaudiet norādīto e-pasta adresi.'
    };
  }

  const adultCount = Number(adults);
  const childCount = Number(children);

  if (!Number.isInteger(adultCount) || adultCount < 0 || adultCount > 20 ||
      !Number.isInteger(childCount) || childCount < 0 || childCount > 20 ||
      adultCount + childCount < 1) {
    return {
      ok: false,
      silent: false,
      reason: 'invalid-participant-count',
      message: 'Lūdzu, pārbaudiet norādīto dalībnieku skaitu.'
    };
  }

  if (childCount > 0 && !childAges) {
    return {
      ok: false,
      silent: false,
      reason: 'missing-child-age-group',
      message: 'Lūdzu, izvēlieties vismaz vienu bērnu vecuma grupu.'
    };
  }

  return { ok: true };
}

function looksLikeSpamText_(value) {
  const text = String(value || '').toLowerCase();
  if (!text) return false;

  const spamPatterns = [
    /https?:\/\//i,
    /www\./i,
    /graph\.org/i,
    /cloud[\s-]*mining/i,
    /message\s+for\s+you/i,
    /one\s+message/i,
    /a\s+new\s+message/i,
    /\b(?:open|read)\s*(?:=>|->|>>>|>>)/i,
    /telegram/i,
    /crypto/i,
    /bitcoin/i
  ];

  return spamPatterns.some(function(pattern) {
    return pattern.test(text);
  });
}

function isValidEmail_(email) {
  const value = String(email || '').trim();
  if (!value || value.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
}

function isRecentDuplicate_(familyName, email) {
  try {
    const cache = CacheService.getScriptCache();
    const rawKey = String(familyName || '').toLowerCase().trim() + '|' + String(email || '').toLowerCase().trim();
    const digest = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, rawKey, Utilities.Charset.UTF_8);
    const key = 'reg-' + Utilities.base64EncodeWebSafe(digest).replace(/=+$/g, '').substring(0, 40);

    if (cache.get(key)) return true;
    cache.put(key, '1', 120);
    return false;
  } catch (error) {
    // If cache is unavailable, never block a legitimate registration.
    return false;
  }
}

function sendConfirmationEmail_(email, familyName) {
  const subject = 'Apstiprinājums dalībai Eiropas Ģimeņu festivālā';

  const greeting = familyName
    ? 'Labdien, ' + familyName + '!'
    : 'Labdien!';

  const textBody =
    greeting + '\n\n' +
    'Paldies! Jūsu ģimenes pieteikums Eiropas Ģimeņu festivālam ir saņemts un apstiprināts.\n\n' +
    'Pasākums norisināsies 2026. gada 19. septembrī Uzvaras parkā, Rīgā, no plkst. 11.00 līdz 17.00.\n\n' +
    'Pasākuma dienā reģistrācijas punktā nosauciet savu ģimenes nosaukumu un saņemsiet savas aktivitāšu kartītes.\n\n' +
    'Dalība pasākumā ir bez maksas.\n\n' +
    'Uz tikšanos Eiropas Ģimeņu festivālā!\n\n' +
    'Latvijas Sporta federāciju padome';

  const htmlBody =
    '<p>' + escapeHtml_(greeting) + '</p>' +
    '<p><strong>Paldies! Jūsu ģimenes pieteikums Eiropas Ģimeņu festivālam ir saņemts un apstiprināts.</strong></p>' +
    '<p>Pasākums norisināsies <strong>2026. gada 19. septembrī Uzvaras parkā, Rīgā, no plkst. 11.00 līdz 17.00.</strong></p>' +
    '<p>Pasākuma dienā reģistrācijas punktā nosauciet savu ģimenes nosaukumu un saņemsiet savas aktivitāšu kartītes.</p>' +
    '<p>Dalība pasākumā ir bez maksas.</p>' +
    '<p>Uz tikšanos Eiropas Ģimeņu festivālā!</p>' +
    '<p>Latvijas Sporta federāciju padome</p>' +
    '<p style="margin-top:18px;"><img src="https://www.gimenufestivals.lv/assets/logos/lsfp-email-logo.png" alt="Latvijas Sporta federāciju padome" style="max-width:220px;width:100%;height:auto;display:block;"></p>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody,
    name: 'Eiropas Ģimeņu festivāls'
  });
}

function getOrCreateSheet_(ss, sheetName) {
  return ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
}

function prepareSheet_(sheet, headers) {
  const currentColumns = sheet.getMaxColumns();

  if (currentColumns < headers.length) {
    sheet.insertColumnsAfter(currentColumns, headers.length - currentColumns);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);

  const lastColumn = sheet.getLastColumn();

  if (lastColumn > headers.length) {
    sheet.getRange(1, headers.length + 1, 1, lastColumn - headers.length).clearContent();
  }
}

function firstValue_(params, keys) {
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (params[key] !== undefined && params[key] !== null && String(params[key]).trim() !== '') {
      return String(params[key]).trim();
    }
  }
  return '';
}

function joinMulti_(params, allParams, keys) {
  var values = [];

  keys.forEach(function(key) {
    if (allParams[key] && Array.isArray(allParams[key])) {
      allParams[key].forEach(function(item) {
        const value = String(item || '').trim();
        if (value) values.push(value);
      });
    } else if (params[key] !== undefined && params[key] !== null && String(params[key]).trim() !== '') {
      const raw = String(params[key]).trim();
      raw.split(',').forEach(function(item) {
        const value = String(item || '').trim();
        if (value) values.push(value);
      });
    }
  });

  return values.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  }).join(', ');
}

function jsonResponse_(payload) {
  const html = '<!doctype html><html><body><script>' +
    'window.parent.postMessage(' + JSON.stringify(Object.assign({ source: 'familyRegistrationForm' }, payload)) + ', "*");' +
    '</script></body></html>';

  return HtmlService
    .createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
