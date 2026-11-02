export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 4000 },
} as const;

// Pragmatic email check: something@something.tld, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: keyof ContactFormValues, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (!value) return 'Please tell me your name.';
      if (value.length < LIMITS.name.min) return 'Your name looks a little short.';
      if (value.length > LIMITS.name.max) return `Please keep it under ${LIMITS.name.max} characters.`;
      return undefined;
    case 'email':
      if (!value) return 'An email address is needed so I can reply.';
      if (!EMAIL_RE.test(value)) return 'That email address doesn’t look quite right.';
      return undefined;
    case 'subject':
      if (!value) return 'Add a short subject.';
      if (value.length < LIMITS.subject.min) return 'The subject is a little short.';
      if (value.length > LIMITS.subject.max) return `Please keep it under ${LIMITS.subject.max} characters.`;
      return undefined;
    case 'message':
      if (!value) return 'Write a message before sending.';
      if (value.length < LIMITS.message.min) return `A few more words, please (at least ${LIMITS.message.min} characters).`;
      if (value.length > LIMITS.message.max) return `Please keep it under ${LIMITS.message.max} characters.`;
      return undefined;
  }
}

export function validateForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  (Object.keys(values) as Array<keyof ContactFormValues>).forEach((key) => {
    const error = validateField(key, values[key]);
    if (error) errors[key] = error;
  });
  return errors;
}
