import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Eyebrow } from '../components/ui';
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  ShieldIcon,
} from '../components/Icons';
import { Seo } from '../components/Seo';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import {
  ISSUE_CATEGORIES,
  ISSUE_LABELS,
  TIME_SLOTS,
  VEHICLE_OPTIONS,
  servicesForCategory,
} from '../data/bookingCatalog';
import { createGuestBooking, guestEmail, notifyStaffOfBooking, VEHICLE_LABELS } from '../lib/bookings';
import type { VehicleCategory } from '../types/backend';

const STEPS = ['Your details', 'Your vehicle', 'What it needs', 'Date & time', 'Review'];

interface FormState {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleCategory: VehicleCategory | '';
  vehicleModel: string;
  serviceId: string;
  selectedIssues: string[];
  notes: string;
  preferredDate: string;
  preferredTimeSlot: string;
}

const EMPTY: FormState = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  vehicleCategory: '',
  vehicleModel: '',
  serviceId: '',
  selectedIssues: [],
  notes: '',
  preferredDate: '',
  preferredTimeSlot: '',
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

const inputClass =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40';
const labelClass = 'mb-2 block text-sm font-medium text-slate-300';

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedId, setConfirmedId] = useState<string | null>(null);

  const services = useMemo(
    () => (form.vehicleCategory ? servicesForCategory(form.vehicleCategory) : []),
    [form.vehicleCategory]
  );
  const selectedService = services.find((s) => s.id === form.serviceId) ?? null;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleIssue = (id: string) =>
    setForm((prev) => ({
      ...prev,
      selectedIssues: prev.selectedIssues.includes(id)
        ? prev.selectedIssues.filter((i) => i !== id)
        : [...prev.selectedIssues, id],
    }));

  function validate(current: number): string | null {
    if (current === 0) {
      if (!form.customerName.trim()) return 'Please tell us your name.';
      if (!/^[0-9+()\s-]{7,}$/.test(form.customerPhone.trim()))
        return 'Please add a phone number we can reach you on.';
      if (form.customerEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail.trim()))
        return 'That email address does not look right.';
    }
    if (current === 1) {
      if (!form.vehicleCategory) return 'Please choose your vehicle type.';
      if (!form.vehicleModel.trim()) return 'Please tell us the make and model.';
    }
    if (current === 2 && !form.serviceId && form.selectedIssues.length === 0)
      return 'Pick a service, or tick the issues you are seeing.';
    if (current === 3) {
      if (!form.preferredDate) return 'Please choose a preferred date.';
      if (!form.preferredTimeSlot) return 'Please choose a time slot.';
    }
    return null;
  }

  const goNext = () => {
    const problem = validate(step);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  async function submit() {
    const problem = validate(3);
    if (problem) {
      setError(problem);
      setStep(3);
      return;
    }
    setSubmitting(true);
    setError(null);

    const serviceTitle = selectedService
      ? selectedService.title
      : `Issue report (${form.selectedIssues.length} symptom${form.selectedIssues.length === 1 ? '' : 's'})`;

    const issuesBlock = form.selectedIssues
      .map((id) => `• ${ISSUE_LABELS[id] ?? id}`)
      .join('\n');

    const notes = [
      issuesBlock ? `Reported symptoms:\n${issuesBlock}` : '',
      form.notes.trim() ? `Customer notes: ${form.notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const input = {
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim(),
      customerEmail:
        form.customerEmail.trim() || guestEmail(form.customerName, form.customerPhone),
      vehicleCategory: form.vehicleCategory as VehicleCategory,
      vehicleModel: form.vehicleModel.trim(),
      serviceId: form.serviceId || 'issue-report',
      serviceTitle,
      servicePrice: selectedService?.price ?? 0,
      preferredDate: form.preferredDate,
      preferredTimeSlot: form.preferredTimeSlot,
      notes,
      selectedIssues: form.selectedIssues,
    };

    try {
      const { id } = await createGuestBooking(input);
      setConfirmedId(id);
      notifyStaffOfBooking(id, input);
    } catch (err) {
      setError(
        err instanceof Error
          ? `We could not save your booking: ${err.message}. Please call us instead.`
          : 'We could not save your booking. Please call us instead.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmedId) {
    return (
      <section className="py-20">
        <Container className="max-w-2xl">
          <div className="rounded-3xl border border-brand-500/30 bg-brand-500/10 p-7 text-center sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-ink-950">
              <CheckIcon className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Booking request received</h1>
            <p className="mt-3 text-slate-300">
              Thanks {form.customerName.split(' ')[0]} — your request is with the workshop.
              We&rsquo;ll confirm your slot and your quote by text or phone.
            </p>
            <p className="mt-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm text-brand-300">
              Reference {confirmedId}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={TEL_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-semibold text-ink-950 hover:bg-brand-400"
              >
                <PhoneIcon className="h-4 w-4" /> Call {SHOP.phoneDisplay}
              </a>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 font-medium text-white hover:bg-white/10"
              >
                Back to home
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <Seo
        title="Book a repair"
        description="Book a mobile bike or e-scooter repair in Salford. No account needed — tell us your details and we'll call you back."
      />
      <section className="border-b border-white/10 bg-ink-900/40 py-10 sm:py-14">
        <Container>
          <Eyebrow>Book a call-out</Eyebrow>
          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Book your repair in five quick steps
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
            No account, no login. Give us your details and the symptoms, and we&rsquo;ll
            come to you across Salford.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="max-w-3xl">
          {/* Progress */}
          <ol className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 text-xs sm:mx-0 sm:flex-wrap sm:px-0">
            {STEPS.map((label, index) => (
              <li
                key={label}
                className={`flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-1.5 font-medium ${
                  index === step
                    ? 'border-brand-400 bg-brand-500/15 text-brand-300'
                    : index < step
                      ? 'border-brand-500/40 text-brand-400/80'
                      : 'border-white/10 text-slate-500'
                }`}
              >
                <span className="font-mono">{index + 1}</span>
                {label}
              </li>
            ))}
          </ol>

          <div className="surface rounded-3xl p-5 sm:p-8">
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">How can we reach you?</h2>
                <div>
                  <label className={labelClass} htmlFor="name">
                    Your name *
                  </label>
                  <input
                    id="name"
                    className={inputClass}
                    value={form.customerName}
                    onChange={(e) => update('customerName', e.target.value)}
                    placeholder="e.g. Sam Patel"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="phone">
                    Phone number *
                  </label>
                  <input
                    id="phone"
                    className={inputClass}
                    value={form.customerPhone}
                    onChange={(e) => update('customerPhone', e.target.value)}
                    placeholder="07…"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    We&rsquo;ll text or call this number to confirm.
                  </p>
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email <span className="text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="email"
                    className={inputClass}
                    value={form.customerEmail}
                    onChange={(e) => update('customerEmail', e.target.value)}
                    placeholder="you@example.com"
                    inputMode="email"
                    autoComplete="email"
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">What are we fixing?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {VEHICLE_OPTIONS.map((option) => {
                    const active = form.vehicleCategory === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          update('vehicleCategory', option.id);
                          update('serviceId', '');
                        }}
                        className={`rounded-2xl border p-4 text-left transition ${
                          active
                            ? 'border-brand-400 bg-brand-500/15'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                        }`}
                      >
                        <span className="block font-semibold text-white">{option.label}</span>
                        <span className="mt-1 block text-xs text-slate-400">{option.blurb}</span>
                      </button>
                    );
                  })}
                </div>
                <div>
                  <label className={labelClass} htmlFor="model">
                    Make and model *
                  </label>
                  <input
                    id="model"
                    className={inputClass}
                    value={form.vehicleModel}
                    onChange={(e) => update('vehicleModel', e.target.value)}
                    placeholder="e.g. Carrera Titan, Xiaomi Mi Pro 2"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">What does it need?</h2>
                <div>
                  <p className={labelClass}>Choose a service</p>
                  <div className="grid gap-3">
                    {services.map((service) => {
                      const active = form.serviceId === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => update('serviceId', active ? '' : service.id)}
                          className={`flex items-start justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                            active
                              ? 'border-brand-400 bg-brand-500/15'
                              : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                          }`}
                        >
                          <span>
                            <span className="block font-semibold text-white">{service.title}</span>
                            <span className="mt-1 block text-xs text-slate-400">{service.blurb}</span>
                          </span>
                          <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-300">
                            Ask for a quote
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className={labelClass}>
                    Or tick the symptoms you&rsquo;ve noticed{' '}
                    <span className="text-slate-500">(optional)</span>
                  </p>
                  <div className="space-y-4">
                    {ISSUE_CATEGORIES.map((category) => (
                      <div key={category.id}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {category.title}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {category.items.map((item) => {
                            const active = form.selectedIssues.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleIssue(item.id)}
                                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                                  active
                                    ? 'border-brand-400 bg-brand-500/20 text-brand-200'
                                    : 'border-white/12 text-slate-300 hover:border-white/30'
                                }`}
                              >
                                {item.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="notes">
                    Anything else? <span className="text-slate-500">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className={inputClass}
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    placeholder="Describe the problem in your own words…"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">When suits you?</h2>
                <div>
                  <label className={labelClass} htmlFor="date">
                    Preferred date *
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={todayIso()}
                    className={inputClass}
                    value={form.preferredDate}
                    onChange={(e) => update('preferredDate', e.target.value)}
                  />
                </div>
                <div>
                  <p className={labelClass}>Preferred time *</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TIME_SLOTS.map((slot) => {
                      const active = form.preferredTimeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => update('preferredTimeSlot', slot)}
                          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm transition ${
                            active
                              ? 'border-brand-400 bg-brand-500/15 text-brand-200'
                              : 'border-white/10 text-slate-300 hover:border-white/25'
                          }`}
                        >
                          <ClockIcon className="h-4 w-4 shrink-0" />
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">Check and send</h2>
                <dl className="divide-y divide-white/10 rounded-2xl border border-white/10">
                  {[
                    ['Name', form.customerName],
                    ['Phone', form.customerPhone],
                    ['Email', form.customerEmail || 'Not given — we will use your phone'],
                    ['Vehicle', `${VEHICLE_LABELS[form.vehicleCategory as VehicleCategory]} · ${form.vehicleModel}`],
                    ['Service', selectedService?.title ?? 'Issue report'],
                    [
                      'Symptoms',
                      form.selectedIssues.map((id) => ISSUE_LABELS[id] ?? id).join(', ') || 'None ticked',
                    ],
                    ['Preferred date', form.preferredDate],
                    ['Preferred time', form.preferredTimeSlot],
                  ].map(([term, value]) => (
                    <div key={term} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4">
                      <dt className="w-36 shrink-0 text-sm text-slate-500">{term}</dt>
                      <dd className="text-sm text-slate-200">{value || '—'}</dd>
                    </div>
                  ))}
                </dl>
                <p className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-slate-400">
                  <ShieldIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  No account needed. We only use these details to arrange and track your
                  repair. Your quote is confirmed before any work begins.
                </p>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}

            <div className="mt-8 flex items-stretch gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-400"
                >
                  Continue <ArrowRightIcon className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-400 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : 'Send booking request'}
                  {!submitting && <CheckIcon className="h-4 w-4" />}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <a href={TEL_HREF} className="inline-flex items-center gap-2 hover:text-white">
              <PhoneIcon className="h-4 w-4 text-brand-400" /> {SHOP.phoneDisplay}
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <MailIcon className="h-4 w-4 text-brand-400" /> Message on WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
