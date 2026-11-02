import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { profile } from '@/content';
import { isContactConfigured, sendContactMessage } from '@/lib/contact';
import { LIMITS, validateField, validateForm, type ContactFormErrors, type ContactFormValues } from '@/lib/validation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

const EMPTY: ContactFormValues = { name: '', email: '', subject: '', message: '' };

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success'; via: 'endpoint' | 'mailto' } | { kind: 'error'; message: string };

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [honeypot, setHoneypot] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactFormValues;
    const value = e.target.value;
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) setErrors((errs) => ({ ...errs, [field]: validateField(field, value) }));
    if (status.kind === 'error' || status.kind === 'success') setStatus({ kind: 'idle' });
  };

  const onBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = e.target.name as keyof ContactFormValues;
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((errs) => ({ ...errs, [field]: validateField(field, e.target.value) }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status.kind === 'sending') return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = (Object.keys(nextErrors) as Array<keyof ContactFormValues>)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    // Bots fill hidden fields; pretend success and drop the message.
    if (honeypot) {
      setStatus({ kind: 'success', via: 'endpoint' });
      setValues(EMPTY);
      return;
    }

    setStatus({ kind: 'sending' });
    const result = await sendContactMessage(values, profile.email);
    if (result.ok) {
      setStatus({ kind: 'success', via: result.via });
      // With the mailto fallback we can't know the email was actually sent — keep the text.
      if (result.via === 'endpoint') {
        setValues(EMPTY);
        setTouched({});
        setErrors({});
      }
    } else {
      setStatus({ kind: 'error', message: result.error });
    }
  };

  const sending = status.kind === 'sending';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8" aria-describedby="contact-form-note">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={onChange} onBlur={onBlur} maxLength={LIMITS.name.max} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={onChange}
          onBlur={onBlur}
        />
        <Field
          className="sm:col-span-2"
          label="Subject"
          name="subject"
          value={values.subject}
          error={errors.subject}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={LIMITS.subject.max}
        />
        <Field
          className="sm:col-span-2"
          label="Message"
          name="message"
          multiline
          value={values.message}
          error={errors.message}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={LIMITS.message.max}
          hint={`${values.message.trim().length} / ${LIMITS.message.max} characters`}
        />
      </div>

      {/* Honeypot — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="hp_field_leave_blank" tabIndex={-1} autoComplete="new-password" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </label>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-xs text-ink-500">
          {isContactConfigured ? 'I usually reply within a day or two.' : 'Sending opens your email app with the message ready to go.'}
        </p>
        <Button type="submit" disabled={sending} className="w-full sm:w-auto">
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>

      <div aria-live="polite" role="status">
        {status.kind === 'success' && (
          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink-100">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            {status.via === 'endpoint'
              ? 'Thank you — your message is on its way. I’ll get back to you soon.'
              : <>Your email app should open with this message filled in — press send there. If nothing opened, email me directly at{' '}<a href={`mailto:${profile.email}`} className="underline underline-offset-2">{profile.email}</a>.</>}
          </p>
        )}
      </div>
      <div role="alert">
        {status.kind === 'error' && (
          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" aria-hidden="true" />
            <span>
              {status.message}{' '}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                {profile.email}
              </a>
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: keyof ContactFormValues;
  value: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
  inputMode?: 'email' | 'text';
  maxLength?: number;
  hint?: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Field({ label, name, value, error, type = 'text', multiline, hint, className, ...rest }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const shared = {
    id,
    name,
    value,
    required: true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined,
    className: cn(
      'peer w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-[15px] text-ink-50 placeholder:text-ink-500 transition-colors duration-200 focus:outline-none focus-visible:outline-none',
      'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950',
      error ? 'border-red-400/60 focus:border-red-300 focus-visible:ring-red-300/80' : 'border-white/[0.09] hover:border-white/20 focus:border-accent/70 focus-visible:ring-accent/60',
    ),
    ...rest,
  };

  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink-200">
          {label}
        </label>
        {hint && (<span id={hintId} className="font-mono text-[11px] text-ink-500">{hint}</span>)}
      </div>
      {multiline ? <textarea rows={6} {...shared} className={cn(shared.className, 'resize-y')} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
