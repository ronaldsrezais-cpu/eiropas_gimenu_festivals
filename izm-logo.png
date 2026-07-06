/**
 * Eiropas Ģimeņu festivāla reģistrācijas forma
 * 
 * Lietošana:
 * 1) Izveidojiet Google Sheets failu.
 * 2) Atveriet Extensions > Apps Script.
 * 3) Ielīmējiet šo kodu Code.gs failā.
 * 4) Deploy > New deployment > Web app.
 * 5) Execute as: Me.
 * 6) Who has access: Anyone.
 * 7) Nokopējiet Web app URL un ielīmējiet index.html formas action laukā.
 */

const SHEET_NAME = 'Pieteikumi';

function setupSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Laiks',
      'Ģimenes nosaukums',
      'Kontaktpersona',
      'E-pasts',
      'Pieaugušo skaits',
      'Bērnu skaits',
      'Bērnu vecuma grupas',
      'Īpašas vajadzības / piekļūstamības piezīmes',
      'Datu izmantošanas apstiprinājums',
      'Avots'
    ]);
  }

  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = setupSheet_();
    const p = e.parameter || {};
    const groups = e.parameters && e.parameters.childrenAgeGroups
      ? e.parameters.childrenAgeGroups.join(', ')
      : (p.childrenAgeGroups || '');

    sheet.appendRow([
      new Date(),
      p.familyName || '',
      p.contactName || '',
      p.contactEmail || '',
      p.adultsCount || '',
      p.childrenCount || '',
      groups,
      p.accessibilityNotes || '',
      p.dataConsent || '',
      p.source || 'Mājaslapas forma'
    ]);

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService
      .createTextOutput('ERROR: ' + error.message)
      .setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}
