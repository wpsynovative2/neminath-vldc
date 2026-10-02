/**
 * Neminath VLDC — enquiry form receiver (the website posts here directly).
 *
 * Setup:
 *  1. Create a Google Sheet, then Extensions → Apps Script, and paste this file.
 *  2. Project Settings (gear icon) → Script Properties → add:
 *       RECAPTCHA_SECRET     your reCAPTCHA v3 secret key            (required)
 *       RECAPTCHA_MIN_SCORE  e.g. 0.5                                (optional, default 0.5)
 *       ALLOWED_HOSTNAMES    e.g. neminathvldc.com,www.neminathvldc.com,localhost
 *                            (optional — only accept tokens issued on these sites)
 *  3. Deploy → New deployment → Web app. Execute as: Me · Who has access: Anyone.
 *  4. Put the web app URL (ends in /exec) in NEXT_PUBLIC_GOOGLE_SCRIPT_URL.
 *
 * After editing this file, use Deploy → Manage deployments → Edit → Version: New version,
 * so the same /exec URL picks up the change.
 */

var SHEET_NAME = "Enquiries";
var RECAPTCHA_ACTION = "enquiry";
var HEADERS = [
  "Received At",
  "Full Name",
  "Contact No",
  "Email Address",
  "Business Requirements",
  "Consent",
  "Form",
  "Page URL",
  "Submitted At (IST)",
  "reCAPTCHA Score",
];

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // --- Validation: only name and mobile number are required ---
    var name = text_(p.name, 100);
    var phone = text_(p.phone, 20);
    var email = text_(p.email, 200);
    var digits = phone.replace(/\D/g, "");

    if (name.length < 2) return json_({ ok: false, error: "Please enter your name." });
    if (!/^[0-9+()\-\s.]+$/.test(phone) || digits.length < 10 || digits.length > 13) {
      return json_({ ok: false, error: "Please enter a valid contact number." });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: "Please enter a valid email address." });
    }

    // --- reCAPTCHA v3 ---
    var check = verifyRecaptcha_(text_(p.token, 4000));
    if (!check.ok) {
      console.warn("reCAPTCHA rejected: " + JSON.stringify(check.detail));
      return json_({ ok: false, error: "We could not verify your submission. Please try again." });
    }

    // --- Save ---
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet_().appendRow([
        new Date(),
        clean_(name),
        clean_(phone),
        clean_(email),
        clean_(text_(p.requirement, 500)),
        clean_(p.consent === "Yes" ? "Yes" : "No"),
        clean_(text_(p.source, 30)),
        clean_(text_(p.pageUrl, 500)),
        clean_(text_(p.submittedAt, 100)),
        check.score,
      ]);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: "Something went wrong. Please try again." });
  }
}

function verifyRecaptcha_(token) {
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty("RECAPTCHA_SECRET");
  if (!secret) throw new Error("Script property RECAPTCHA_SECRET is not set.");
  if (!token) return { ok: false, detail: "missing token" };

  var response = UrlFetchApp.fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "post",
    payload: { secret: secret, response: token },
    muteHttpExceptions: true,
  });
  var result = JSON.parse(response.getContentText());
  var minScore = Number(props.getProperty("RECAPTCHA_MIN_SCORE") || 0.5);
  var hosts = (props.getProperty("ALLOWED_HOSTNAMES") || "")
    .split(",")
    .map(function (h) { return h.trim(); })
    .filter(String);

  var ok =
    result.success === true &&
    result.action === RECAPTCHA_ACTION &&
    Number(result.score) >= minScore &&
    (hosts.length === 0 || hosts.indexOf(result.hostname) !== -1);

  return { ok: ok, score: result.score, detail: result };
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

function text_(value, max) {
  return (value == null ? "" : String(value)).trim().slice(0, max);
}

// Prevent spreadsheet formula injection from user input.
function clean_(value) {
  var text = value == null ? "" : String(value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
