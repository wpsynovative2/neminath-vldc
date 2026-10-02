# Neminath VLDC

Next.js (App Router) + TypeScript + Tailwind CSS rebuild of [neminathvldc.com](https://neminathvldc.com/).
Enquiries are protected by reCAPTCHA v3 and delivered to a Google Sheet through Google Apps Script.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Environment variables

| Name | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | browser | reCAPTCHA v3 site key (pre-filled with the live site's key) |
| `RECAPTCHA_SECRET_KEY` | server | Secret for the same key — required in production |
| `RECAPTCHA_MIN_SCORE` | server | Minimum score to accept (default `0.5`) |
| `GOOGLE_SCRIPT_URL` | server | Apps Script web app URL that stores enquiries |

To test reCAPTCHA locally, add `localhost` to the key's domains in the
[reCAPTCHA admin console](https://www.google.com/recaptcha/admin). In development,
if `RECAPTCHA_SECRET_KEY` is empty the token check is skipped; in production it fails closed.

## Google Apps Script setup

1. Create a Google Sheet → **Extensions → Apps Script**.
2. Paste `google-apps-script/Code.gs`.
3. **Deploy → New deployment → Web app** — Execute as **Me**, access **Anyone**.
4. Put the web app URL in `GOOGLE_SCRIPT_URL`.

Each enquiry is appended to an `Enquiries` sheet (created automatically with headers).

## Form flow

`EnquiryForm` (popup + contact section) → reCAPTCHA v3 token → `POST /api/enquiry`
→ server validates fields and verifies the token → forwards to Apps Script → redirect to `/thank-you`.
Only **name** and **mobile number** are required.

## Project structure

```
app/            pages, layout, /api/enquiry route, /thank-you
components/     header, footer, carousel, popups, form, sections/
data/           all site copy (site.ts, home.ts, footer.ts, forms.ts)
lib/            shared validation + reCAPTCHA loader
public/images/  logo, hero, overview, advantages, master-plan, connectivity, gallery, backgrounds
public/lottie_icons/  gear animations
google-apps-script/   Code.gs for the Sheet receiver
```

The Specifications and Investment Returns sections exist but are hidden, as on the live site.
Set `visible: true` in `data/home.ts` to show them.
