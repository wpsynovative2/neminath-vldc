/**
 * Neminath VLDC — enquiry form receiver.
 *
 * Setup:
 *  1. Create a Google Sheet, then Extensions → Apps Script, and paste this file.
 *  2. Deploy → New deployment → Web app.
 *     Execute as: Me · Who has access: Anyone.
 *  3. Copy the web app URL into GOOGLE_SCRIPT_URL in .env.local.
 *
 * The Next.js server verifies reCAPTCHA before calling this script,
 * so the URL should be kept private (server-side env only).
 */

var SHEET_NAME = "Enquiries";
var HEADERS = [
  "Received At",
  "Full Name",
  "Contact No",
  "Contact No (digits)",
  "Email Address",
  "Business Requirements",
  "Consent",
  "Form",
  "Page URL",
  "Submitted At (IST)",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var p = (e && e.parameter) || {};
    var sheet = getSheet_();

    sheet.appendRow([
      new Date(),
      clean_(p.name),
      clean_(p.phone),
      clean_(p.phoneDigits),
      clean_(p.email),
      clean_(p.requirement),
      clean_(p.consent),
      clean_(p.source),
      clean_(p.pageUrl),
      clean_(p.submittedAt),
    ]);

    return json_({ result: "success" });
  } catch (error) {
    return json_({ result: "error", error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Prevent spreadsheet formula injection from user input.
function clean_(value) {
  var text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
