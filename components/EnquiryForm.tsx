"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { usePopup } from "./popups/PopupProvider";
import { enquiryForm } from "@/data/forms";
import { getRecaptchaToken, loadRecaptcha } from "@/lib/recaptcha";
import { validateEnquiry, type EnquiryErrors, type EnquiryInput } from "@/lib/enquiry";

// PHP endpoint on Hostinger (public/api/enquiry.php); override for other hosts.
const ENQUIRY_ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "/api/enquiry.php";

type EnquiryFormProps = {
  /** popup = enquiry popup, section = home contact section, blog = blog sidebar (single column). */
  variant: "popup" | "section" | "blog";
  className?: string;
};

const labelClass =
  "inline-block pb-2.5 font-poppins text-[15px] leading-none font-medium text-muted max-md:text-[14px]";
const requiredMark = "after:ps-[0.2em] after:text-red-600 after:content-['_*']";
const inputClass =
  "min-h-10 w-full rounded-[5px] border border-[#C4C4C4] bg-white px-3.5 py-[5px] font-jost text-[15px] leading-[1.4] font-medium text-[#272727] outline-none focus:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] max-md:text-[13px]";
const groupClass = "mb-[25px] flex w-full flex-wrap items-center px-[5px]";
const errorClass = "mt-1 w-full font-jost text-xs text-red-600";

export default function EnquiryForm({ variant, className = "" }: EnquiryFormProps) {
  const router = useRouter();
  const { openPopup, closePopup } = usePopup();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  const { fields, consent } = enquiryForm;
  const isPopup = variant === "popup";
  const idPrefix = variant === "section" ? "contact" : variant;
  const halfWidth = variant === "blog" ? "" : "md:w-1/2";

  // Load reCAPTCHA early so its badge shows and the first submit is fast.
  useEffect(() => {
    loadRecaptcha().catch(() => {});
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const data = new FormData(event.currentTarget);
    const input: EnquiryInput = {
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      requirement: String(data.get("requirement") ?? "").trim(),
      consent: data.get("consent") === "on",
      source: variant === "section" ? "contact-section" : variant,
      pageUrl: window.location.href,
      submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    const validation = validateEnquiry(input);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    setMessage("");
    try {
      const token = await getRecaptchaToken();
      const response = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, token }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || enquiryForm.errors.generic);

      closePopup("enquiry");
      router.push("/thank-you/");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : enquiryForm.errors.generic);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={className} aria-label="Enquiry form">
      <div className="-mx-[5px] -mb-[25px] flex flex-wrap">
        <div className={`${groupClass} ${halfWidth}`}>
          <label htmlFor={`${idPrefix}-name`} className={`${labelClass} ${requiredMark}`}>
            {isPopup ? fields.name.popupLabel : fields.name.label}
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            placeholder={fields.name.placeholder}
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div className={`${groupClass} ${halfWidth}`}>
          <label htmlFor={`${idPrefix}-phone`} className={`${labelClass} ${requiredMark}`}>
            {isPopup ? fields.phone.popupLabel : fields.phone.label}
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={20}
            placeholder={fields.phone.placeholder}
            aria-invalid={Boolean(errors.phone)}
            className={inputClass}
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        <div className={groupClass}>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            {isPopup ? fields.email.popupLabel : fields.email.label}
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            placeholder={fields.email.placeholder}
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div className={groupClass}>
          <label htmlFor={`${idPrefix}-requirement`} className={labelClass}>
            {isPopup ? fields.requirement.popupLabel : fields.requirement.label}
          </label>
          <input
            id={`${idPrefix}-requirement`}
            name="requirement"
            type="text"
            maxLength={500}
            placeholder={fields.requirement.placeholder}
            className={inputClass}
          />
        </div>

        <div className={groupClass}>
          <div className="flex items-start gap-[5px] pt-1">
            <input
              id={`${idPrefix}-consent`}
              name="consent"
              type="checkbox"
              defaultChecked
              className="mt-0.5 shrink-0"
            />
            <label
              htmlFor={`${idPrefix}-consent`}
              className="inline-block font-jost text-[15px] leading-none font-medium text-muted max-md:text-[13px]"
            >
              <span className="text-[12px]">
                {consent.before}{" "}
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    openPopup("privacy");
                  }}
                  className="text-link hover:text-[#336]"
                >
                  {consent.privacy}
                </a>{" "}
                {consent.and}{" "}
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    openPopup("terms");
                  }}
                  className="text-link hover:text-[#336]"
                >
                  {consent.terms}
                </a>{" "}
                {consent.after}
              </span>
            </label>
          </div>
        </div>

        <div className={groupClass}>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex min-h-10 w-full cursor-pointer items-center justify-center gap-[5px] rounded-[3px] bg-maroon px-6 font-roboto text-[15px] leading-none font-medium text-white transition-colors hover:bg-gold-light disabled:cursor-wait disabled:opacity-80"
          >
            <Icon name="arrow-right" className="size-[1em]" />
            <span>{status === "submitting" ? enquiryForm.submitting : enquiryForm.submit}</span>
          </button>
          {status === "error" && (
            <p role="alert" className="mt-2.5 w-full font-roboto text-sm text-[#d9534f]">
              {message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
