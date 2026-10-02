type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
export const RECAPTCHA_ACTION = "enquiry";

let loader: Promise<Grecaptcha> | null = null;

/** Injects the reCAPTCHA v3 script once and resolves when it is ready. */
export function loadRecaptcha(): Promise<Grecaptcha> {
  if (!RECAPTCHA_SITE_KEY) {
    return Promise.reject(new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set"));
  }
  if (loader) return loader;

  loader = new Promise<Grecaptcha>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => window.grecaptcha?.ready(() => resolve(window.grecaptcha!));
    script.onerror = () => {
      loader = null;
      reject(new Error("Failed to load reCAPTCHA"));
    };
    document.head.appendChild(script);
  });

  return loader;
}

export async function getRecaptchaToken(): Promise<string> {
  const grecaptcha = await loadRecaptcha();
  return grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION });
}
