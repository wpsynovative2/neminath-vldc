<?php
/**
 * Neminath VLDC — enquiry endpoint for Hostinger (PHP 8+).
 *
 * Flow: validate fields → verify reCAPTCHA v3 with Google → forward to Google Apps Script.
 * Settings come from neminath-config.php (see hostinger/neminath-config.example.php).
 * Validation rules mirror lib/enquiry.ts: only name and mobile number are required.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const RECAPTCHA_ACTION = 'enquiry';
const SOURCES = ['popup', 'contact-section', 'blog'];

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function fail(string $message, int $status): never
{
    respond($status, ['ok' => false, 'error' => $message]);
}

/** Config lives outside public_html when possible; falls back to this folder (blocked by .htaccess). */
function load_config(): array
{
    $candidates = [
        dirname(__DIR__, 2) . '/neminath-config.php',
        __DIR__ . '/neminath-config.php',
    ];
    foreach ($candidates as $file) {
        if (is_file($file)) {
            $config = require $file;
            if (is_array($config)) {
                return $config;
            }
        }
    }
    return [];
}

function text(mixed $value, int $max): string
{
    return mb_substr(trim(is_scalar($value) ? (string) $value : ''), 0, $max);
}

function post_form(string $url, array $fields): ?array
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($fields),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true, // Apps Script answers with a redirect
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 20,
    ]);
    $body = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $error = curl_error($curl);
    curl_close($curl);

    if ($body === false || $status >= 400) {
        error_log("[enquiry] POST {$url} failed: HTTP {$status} {$error}");
        return null;
    }
    $data = json_decode((string) $body, true);
    return is_array($data) ? $data : null;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail('Method not allowed.', 405);
}

$config = load_config();

// Optional: only accept submissions from your own domain(s).
$allowedOrigins = $config['allowed_origins'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($allowedOrigins && $origin !== '' && !in_array(rtrim($origin, '/'), $allowedOrigins, true)) {
    fail('Forbidden.', 403);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$payload = json_decode((string) $raw, true);
if (!is_array($payload)) {
    fail('Invalid request.', 400);
}

$input = [
    'name' => text($payload['name'] ?? '', 100),
    'phone' => text($payload['phone'] ?? '', 20),
    'email' => text($payload['email'] ?? '', 200),
    'requirement' => text($payload['requirement'] ?? '', 500),
    'consent' => ($payload['consent'] ?? false) === true,
    'source' => in_array($payload['source'] ?? '', SOURCES, true) ? $payload['source'] : 'contact-section',
    'pageUrl' => text($payload['pageUrl'] ?? '', 500),
    'submittedAt' => text($payload['submittedAt'] ?? '', 100),
];

// --- Validation (same rules as lib/enquiry.ts) ---
$nameLength = mb_strlen($input['name']);
if ($nameLength < 2 || $nameLength > 100) {
    fail('Please enter your name.', 422);
}
$digits = preg_replace('/\D/', '', $input['phone']);
if (!preg_match('/^[0-9+()\-\s.]+$/', $input['phone']) || strlen($digits) < 10 || strlen($digits) > 13) {
    fail('Please enter a valid contact number.', 422);
}
if ($input['email'] !== '' && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    fail('Please enter a valid email address.', 422);
}

// --- reCAPTCHA v3 ---
$token = text($payload['token'] ?? '', 4000);
$secret = (string) ($config['recaptcha_secret_key'] ?? '');
$skipRecaptcha = ($config['skip_recaptcha_for_testing'] ?? false) === true;

if ($token === '') {
    fail('We could not verify your submission. Please try again.', 400);
}
if ($secret === '' && !$skipRecaptcha) {
    error_log('[enquiry] recaptcha_secret_key is not configured — rejecting submission.');
    fail('Something went wrong. Please try again.', 500);
}
if (!$skipRecaptcha) {
    $verify = post_form('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    $minScore = (float) ($config['recaptcha_min_score'] ?? 0.5);
    $passed = $verify
        && ($verify['success'] ?? false) === true
        && ($verify['action'] ?? '') === RECAPTCHA_ACTION
        && (float) ($verify['score'] ?? 0) >= $minScore;
    if (!$passed) {
        fail('We could not verify your submission. Please try again.', 400);
    }
}

// --- Forward to Google Apps Script ---
$scriptUrl = (string) ($config['google_script_url'] ?? '');
if ($scriptUrl === '') {
    error_log('[enquiry] google_script_url is not configured.');
    fail('Something went wrong. Please try again.', 500);
}

$result = post_form($scriptUrl, [
    'name' => $input['name'],
    'phone' => $input['phone'],
    'phoneDigits' => $digits,
    'email' => $input['email'],
    'requirement' => $input['requirement'],
    'consent' => $input['consent'] ? 'Yes' : 'No',
    'source' => $input['source'],
    'pageUrl' => $input['pageUrl'],
    'submittedAt' => $input['submittedAt'],
]);

if (($result['result'] ?? '') !== 'success') {
    error_log('[enquiry] Apps Script rejected the submission: ' . json_encode($result));
    fail('Something went wrong. Please try again.', 502);
}

respond(200, ['ok' => true]);
