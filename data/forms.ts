export const enquiryForm = {
  popupTitle: "Send Us a Message",
  fields: {
    name: {
      label: "Full Name",
      popupLabel: "Name",
      placeholder: "Type Your Full Name...",
    },
    phone: {
      label: "Contact No",
      popupLabel: "Contact No",
      placeholder: "Type Your Valid Contact Number...",
    },
    email: {
      label: "Email Address",
      popupLabel: "Email",
      placeholder: "Enter You Valid Email...",
    },
    requirement: {
      label: "Your Business Requirements",
      popupLabel: "Your Business Requirements",
      placeholder: "Describe Your Nature Of Business....",
    },
  },
  consent: {
    before: "By checking this box, you agree to our",
    privacy: "Privacy Policy",
    and: "and",
    terms: "Terms & Conditions",
    after: "and consent to be contacted with relevant updates.",
  },
  submit: "Submit",
  submitting: "Submitting...",
  errors: {
    name: "Please enter your name.",
    phone: "Please enter a valid contact number.",
    generic: "Something went wrong. Please try again.",
  },
};

export const legal = {
  privacy: {
    title: "Privacy Policy",
    intro: "We respect your privacy and are committed to protecting your personal information.",
    points: [
      "Information Collected: Name, phone number, email, and any details you submit through the form.",
      "Usage: Your information is used to contact you regarding this residential project, share updates, offers, and respond to your inquiries.",
      "Consent: By submitting the form, you agree to receive communication via call, SMS, email, or WhatsApp.",
      "Data Sharing: We do not sell your personal data. It may be shared with our authorized sales and marketing partners strictly for project-related communication.",
      "Data Security: We take reasonable steps to protect your information from unauthorized access or misuse.",
      "Your Rights: You may request to access, update, or delete your personal data by contacting us.",
    ],
    footer: "By using this website and submitting your details, you agree to this Privacy Policy.",
    button: "Accept & Continue",
  },
  terms: {
    title: "Terms & Conditions",
    intro: "By submitting this form, you agree to the following:",
    points: [
      "You consent to be contacted via call, SMS, email, or WhatsApp regarding this residential project.",
      "The information provided by you is accurate to the best of your knowledge.",
      "Submission of this form does not constitute a booking or any legal commitment.",
      "All project details, including pricing, plans, and specifications, are subject to change without prior notice.",
      "Images and visuals are for illustrative purposes only.",
      "Your data will be used as per our Privacy Policy.",
    ],
    footer: "",
    button: "Accept & Continue",
  },
};

export const thankYou = {
  label: "thank you",
  title: "YOUR ENQUIRY HAS",
  highlight: "BEEN RECEIVED",
  message:
    "Thank you for your interest in Neminath VLDC. Our team will get in touch with you shortly with unit options, pricing, and site visit details.",
  backLabel: "Back to Home",
};
