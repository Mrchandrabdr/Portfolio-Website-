import type { ContactFormValues } from './validation';

/**
 * Contact form delivery.
 *
 * Configure ONE public form endpoint in `.env.local` (never a private API key — anything
 * prefixed with VITE_ is shipped to the browser):
 *
 *   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
 *
 * Any endpoint that accepts a JSON POST and returns 2xx works (Formspree, Getform,
 * Basin, your own serverless function…). For Web3Forms, also set VITE_WEB3FORMS_ACCESS_KEY
 * (that key is designed to be public).
 *
 * Without configuration the form falls back to opening the visitor's email app.
 */
const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim();
const web3formsKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? '').trim();

export const isContactConfigured = endpoint !== '';

export type SendResult = { ok: true; via: 'endpoint' | 'mailto' } | { ok: false; error: string };

export async function sendContactMessage(values: ContactFormValues, fallbackEmail: string): Promise<SendResult> {
  const payload = {
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    _subject: `Portfolio: ${values.subject.trim()}`,
    ...(web3formsKey ? { access_key: web3formsKey } : {}),
  };

  if (!isContactConfigured) {
    // Long mailto: URLs get truncated by some mail clients; keep the body comfortably short.
    const MAX_BODY = 1500;
    const message = payload.message.length > MAX_BODY ? `${payload.message.slice(0, MAX_BODY)}…` : payload.message;
    const body = `${message}\n\n— ${payload.name} (${payload.email})`;
    const href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    return { ok: true, via: 'mailto' };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      return { ok: false, error: `The message service responded with an error (${res.status}). Please try again or email me directly.` };
    }
    return { ok: true, via: 'endpoint' };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError';
    return {
      ok: false,
      error: aborted
        ? 'The request timed out. Please check your connection and try again.'
        : 'Couldn’t reach the message service. Please try again or email me directly.',
    };
  } finally {
    window.clearTimeout(timeout);
  }
}
