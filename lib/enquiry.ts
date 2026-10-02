// Form validation rules — mirrored in google-apps-script/Code.gs.

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  requirement: string;
  consent: boolean;
  source: "popup" | "contact-section" | "blog";
  pageUrl: string;
  submittedAt: string;
};

export type EnquiryErrors = Partial<Record<"name" | "phone" | "email", string>>;

const PHONE_CHARS = /^[0-9+()\-\s.]+$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalisePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

/** Only name and mobile number are compulsory; email is checked only when given. */
export function validateEnquiry(input: Pick<EnquiryInput, "name" | "phone" | "email">): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = input.name.trim();
  const phone = input.phone.trim();
  const email = input.email.trim();

  if (name.length < 2 || name.length > 100) {
    errors.name = "Please enter your name.";
  }

  const digits = normalisePhone(phone);
  if (!PHONE_CHARS.test(phone) || digits.length < 10 || digits.length > 13) {
    errors.phone = "Please enter a valid contact number.";
  }

  if (email && (!EMAIL.test(email) || email.length > 200)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}
