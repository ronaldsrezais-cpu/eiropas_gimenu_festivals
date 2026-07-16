const SPREADSHEET_ID = '';
const SHEET_NAME = 'Pieteikumi';
const SURVEY_SHEET_NAME = 'Anonīmās atbildes';

function doPost(e) {
  try {
    const params = e.parameter || {};
    const ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    const sheet = getOrCreateSheet_(ss, SHEET_NAME);
    const surveySheet = getOrCreateSheet_(ss, SURVEY_SHEET_NAME);

    ensureHeaders_(sheet, [
      'Laiks',
      'Ģimenes nosaukums aktivitāšu kartei',
      'Kontaktpersonas e-pasts',
      'Pieaugušie',
      'Bērni',
      'Bērnu vecuma grupas',
      'Piekrišana',
      'Ieraksta avots'
    ]);

    ensureHeaders_(surveySheet, [
      'Laiks',
      'Cik bieži ģimene ir fiziski aktīva kopā?',
      'Zināšanas par veidiem, kā ikdienā iekļaut fiziskās aktivitātes',
      'Motivācija būt fiziski aktīvākiem kopā',
      'Kas traucē būt fiziski aktīviem kopā?',
      'Cits šķērslis',
      'Ieraksta avots'
    ]);

    const familyName = firstValue_(params, [
      'familyName',
      'gimenes_nosaukums',
      'gimenesNosaukums',
      'Ģimenes nosaukums aktivitāšu kartei'
    ]);

    const email = firstValue_(params, [
      'email',
      'kontaktpersonas_epasts',
      'kontaktpersonasEpasts',
      'Kontaktpersonas e-pasts'
    ]);

    const adults = firstValue_(params, [
      'adults',
      'pieaugusie',
      'Pieaugušie',
      'Cik pieaugušie plāno ierasties?'
    ]);

    const children = firstValue_(params, [
      'children',
      'berni',
      'Bērni',
      'Cik bērni plāno ierasties?'
    ]);

    const childAges = joinMulti_(params, [
      'childAges',
      'bernu_vecuma_grupas',
      'bernuVecumaGrupas',
      'Bērnu vecuma grupas'
    ]);

    const consent = firstValue_(params, [
      'consent',
      'piekritu',
      'Piekrišana'
    ]);

    sheet.appendRow([
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

    const barriers = joinMulti_(params, [
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
      message: 'Pieteikums saņemts. Apstiprinājums nosūtīts uz norādīto e-pastu.'
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
    '' +
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

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), headers.length)).getValues()[0];
  const hasAnyHeader = existing.some(function(value) { return value !== ''; });

  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
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

function joinMulti_(params, keys) {
  var values = [];

  keys.forEach(function(key) {
    var allValues = [];
    try {
      allValues = params[key] !== undefined ? [params[key]] : [];
    } catch (err) {
      allValues = [];
    }

    allValues.forEach(function(value) {
      if (Array.isArray(value)) {
        value.forEach(function(item) {
          if (String(item).trim()) values.push(String(item).trim());
        });
      } else if (String(value).trim()) {
        values.push(String(value).trim());
      }
    });
  });

  return values.join(', ');
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
