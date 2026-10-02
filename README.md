# Neminath VLDC

Next.js (App Router) + TypeScript + Tailwind CSS rebuild of [neminathvldc.com](https://neminathvldc.com/),
exported as a static site for **Hostinger**. The enquiry form posts directly to a Google Apps Script
web app, which verifies reCAPTCHA v3 and saves the lead to a Google Sheet. No server code is needed.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_GOOGLE_SCRIPT_URL
npm run dev
```

The form works on `npm run dev` too. Add `localhost` to the reCAPTCHA key's domains to test it.

## Google Sheet + Apps Script setup

1. Create a Google Sheet → **Extensions → Apps Script**, paste `google-apps-script/Code.gs`.
2. **Project Settings → Script Properties** → add `RECAPTCHA_SECRET` (your reCAPTCHA v3 secret key).
   Optional: `RECAPTCHA_MIN_SCORE` (default `0.5`) and `ALLOWED_HOSTNAMES`
   (e.g. `neminathvldc.com,www.neminathvldc.com,localhost`).
3. **Deploy → New deployment → Web app** — Execute as **Me**, access **Anyone**.
4. Put the web app URL (ends in `/exec`) in `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`.

After changing `Code.gs`, redeploy via **Manage deployments → Edit → New version** to keep the same URL.
Each enquiry is appended to an `Enquiries` sheet with the form source (`popup`, `contact-section`, `blog`),
page URL and reCAPTCHA score.

## Deploy to Hostinger

- **Git build:** in the build settings, add environment variables `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and
  `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` (they are baked in at build time). Build command: `npm run build`,
  output directory: `out`.
- **Manual upload:** `npm run build:zip`, then upload `hostinger-upload.zip` to `public_html` and extract.

## Configuration

| Where | Setting | Purpose |
| --- | --- | --- |
| `.env.local` / Hostinger build env | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 site key (public) |
| `.env.local` / Hostinger build env | `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | Apps Script web app URL (public) |
| Apps Script → Script Properties | `RECAPTCHA_SECRET` | reCAPTCHA secret key — required |
| Apps Script → Script Properties | `RECAPTCHA_MIN_SCORE` | Minimum score (default `0.5`) |
| Apps Script → Script Properties | `ALLOWED_HOSTNAMES` | Only accept tokens from these sites |

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
