<?php
/**
 * Server settings for public_html/api/enquiry.php.
 *
 * Copy to neminath-config.php and upload it to the folder ABOVE public_html
 * (e.g. /home/uXXXX/domains/neminathvldc.com/neminath-config.php) so it is never web-accessible.
 * If you can't place it there, upload it next to enquiry.php — api/.htaccess blocks direct access.
 */

return [
    // Secret key for the reCAPTCHA v3 site key in .env (NEXT_PUBLIC_RECAPTCHA_SITE_KEY).
    'recaptcha_secret_key' => '',

    // Submissions scoring below this are rejected (0.0 = bot, 1.0 = human).
    'recaptcha_min_score' => 0.5,

    // Google Apps Script web app URL (see google-apps-script/Code.gs).
    'google_script_url' => '',

    // Optional: only accept form posts from these origins. Leave empty to allow any.
    'allowed_origins' => ['https://neminathvldc.com', 'https://www.neminathvldc.com'],

    // Local testing only — never enable on the live site.
    'skip_recaptcha_for_testing' => false,
];
