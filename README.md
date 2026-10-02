# Neminath VLDC

Next.js (App Router) + TypeScript + Tailwind CSS rebuild of [neminathvldc.com](https://neminathvldc.com/),
exported as a static site for **Hostinger shared hosting** (Business plan). The enquiry form posts to a
small PHP endpoint that verifies reCAPTCHA v3 and forwards leads to Google Sheets via Apps Script.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev        # design work — the form endpoint is PHP, so submissions don't work here
npm run preview    # builds and serves out/ with PHP on http://localhost:8080 (form works)
```

`npm run preview` needs PHP 8.1+ with the curl and mbstring extensions, and a `neminath-config.php`
in the project root (see below).

## Deploy to Hostinger

1. **Build:** `npm run build:zip` → creates `out/` and `hostinger-upload.zip`.
2. **Upload:** hPanel → Files → File Manager → `public_html` → upload `hostinger-upload.zip` → Extract.
   (Remove the old WordPress files first, or back them up.)
3. **Server config:** copy `hostinger/neminath-config.example.php` to `neminath-config.php`, fill in the
   reCAPTCHA secret and Apps Script URL, and upload it to the folder **above** `public_html`
   (e.g. `domains/neminathvldc.com/neminath-config.php`) so it can never be downloaded.
4. **PHP version:** hPanel → Advanced → PHP Configuration → PHP 8.1 or newer.
5. **reCAPTCHA:** make sure your domain is listed for the site key in the reCAPTCHA admin console.

To redeploy, run `npm run build:zip` again and re-upload; the config file above `public_html` stays put.

## Configuration

| Where | Setting | Purpose |
| --- | --- | --- |
| `.env.local` (build time) | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (pre-filled with the live key) |
| `.env.local` (build time) | `NEXT_PUBLIC_ENQUIRY_ENDPOINT` | Optional, defaults to `/api/enquiry.php` |
| `neminath-config.php` (server) | `recaptcha_secret_key` | Required — submissions are rejected without it |
| `neminath-config.php` (server) | `recaptcha_min_score` | Minimum score (default `0.5`) |
| `neminath-config.php` (server) | `google_script_url` | Apps Script web app URL |
| `neminath-config.php` (server) | `allowed_origins` | Domains allowed to post the form |

## Google Apps Script setup

1. Create a Google Sheet → **Extensions → Apps Script**, paste `google-apps-script/Code.gs`.
2. **Deploy → New deployment → Web app** — Execute as **Me**, access **Anyone**.
3. Put the web app URL in `google_script_url`.

Each enquiry is appended to an `Enquiries` sheet with the form source (`popup`, `contact-section`, `blog`)
and page URL.

## Content

```
data/site.ts     contact details, navigation, SEO
data/home.ts     every home page section
data/blogs.ts    blog posts — `onHome: true` shows a post in the home Blogs section
data/forms.ts    form labels, privacy policy, terms, thank-you copy
data/footer.ts   footer text, mobile bar
public/images/   pre-optimised WebP images (no image server on static hosting)
```

The Specifications and Investment Returns sections are hidden, as on the live site —
set `visible: true` in `data/home.ts` to show them.
