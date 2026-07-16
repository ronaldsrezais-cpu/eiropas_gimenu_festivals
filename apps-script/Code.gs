const SPREADSHEET_ID = '';
const SHEET_NAME = 'Pieteikumi';
const SURVEY_SHEET_NAME = 'Anonīmās atbildes';

const REGISTRATION_HEADERS = [
  'Laiks',
  'Ģimenes nosaukums aktivitāšu kartei',
  'E-pasts',
  'Pieaugušo skaits',
  'Bērnu skaits',
  'Bērnu vecuma grupas',
  'Piekrišana organizatoriskajām vajadzībām un foto/video izmantošanai',
  'Ieraksta avots'
];

const SURVEY_HEADERS = [
  'Laiks',
  'Cik bieži ģimene ir fiziski aktīva kopā?',
  'Zināšanas par veidiem, kā ikdienā iekļaut fiziskās aktivitātes',
  'Motivācija būt fiziski aktīvākiem kopā',
  'Kas traucē būt fiziski aktīviem kopā?',
  'Cits šķērslis',
  'Ieraksta avots'
];

function doPost(e) {
  try {
    const params = e.parameter || {};
    const allParams = e.parameters || {};

    const ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    const registrationSheet = getOrCreateSheet_(ss, SHEET_NAME);
    const surveySheet = getOrCreateSheet_(ss, SURVEY_SHEET_NAME);

    // This updates the first row to the current form structure.
    // It removes the old "Īpašas vajadzības / piekļūstamības piezīmes" column from the active structure.
    prepareSheet_(registrationSheet, REGISTRATION_HEADERS);
    prepareSheet_(surveySheet, SURVEY_HEADERS);

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

    registrationSheet.appendRow([
      new Date(),
      familyName,
      email,
      adults,
      children,
      childAges,
      consent,
      'Mājaslapas forma'
    ]);

    const familyActivity = firstValue_(params, [
      'gimenes_fiziska_aktivitate_kopa'
    ]);

    const knowledge = firstValue_(params, [
      'zinasanas_par_fiziskam_aktivitatem'
    ]);

    const motivation = firstValue_(params, [
      'gimenes_motivacija_but_aktivakai'
    ]);

    const barriers = firstValue_(params, [
      'aktivitate_skersli_selected'
    ]) || joinMulti_(params, allParams, [
      'aktivitate_skersli'
    ]);

    const barriersOther = firstValue_(params, [
      'aktivitate_skersli_cits'
    ]);

    if (familyActivity || knowledge || motivation || barriers || barriersOther) {
      surveySheet.appendRow([
        new Date(),
        familyActivity,
        knowledge,
        motivation,
        barriers,
        barriersOther,
        'Mājaslapas forma'
      ]);
    }

    if (email) {
      sendConfirmationEmail_(email, familyName);
    }

    return jsonResponse_({
      ok: true,
      message: email
        ? 'Pieteikums saņemts. Apstiprinājums nosūtīts uz norādīto e-pastu.'
        : 'Pieteikums saņemts, bet e-pasta adrese netika atrasta.'
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error && error.message ? error.message : 'Neizdevās saglabāt pieteikumu.'
    });
  }
}

function sendConfirmationEmail_(email, familyName) {
  const subject = 'Apstiprinājums dalībai Eiropas Ģimeņu festivālā';

  const greeting = familyName
    ? 'Labdien, ' + familyName + '!'
    : 'Labdien!';

  const textBody =
    greeting + '\n\n' +
    'Paldies! Jūsu ģimenes pieteikums Eiropas Ģimeņu festivālam ir saņemts.\n\n' +
    'Pasākums norisināsies 2026. gada 22. augustā Uzvaras parkā, Rīgā, no plkst. 11.00 līdz 17.00.\n\n' +
    'Pasākuma dienā reģistrācijas punktā nosauciet savu ģimenes nosaukumu un saņemsiet aktivitāšu kartītes — katram dalībniekam savu.\n\n' +
    'Dalība pasākumā ir bez maksas.\n\n' +
    'Uz tikšanos Eiropas Ģimeņu festivālā!\n\n' +
    'Latvijas Sporta federāciju padome';

  const htmlBody =
    '<p>' + escapeHtml_(greeting) + '</p>' +
    '<p><strong>Paldies! Jūsu ģimenes pieteikums Eiropas Ģimeņu festivālam ir saņemts.</strong></p>' +
    '<p>Pasākums norisināsies <strong>2026. gada 22. augustā Uzvaras parkā, Rīgā, no plkst. 11.00 līdz 17.00.</strong></p>' +
    '<p>Pasākuma dienā reģistrācijas punktā nosauciet savu ģimenes nosaukumu un saņemsiet aktivitāšu kartītes — katram dalībniekam savu.</p>' +
    '<p>Dalība pasākumā ir bez maksas.</p>' +
    '<p>Uz tikšanos Eiropas Ģimeņu festivālā!</p>' +
    '<p>Latvijas Sporta federāciju padome</p>';

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

  // Clear old extra header cells to the right, for example the old accessibility notes column.
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

  // Remove duplicates while keeping order.
  return values.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  }).join(', ');
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
