"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom est trop long"),
  email: z.string().email("Adresse e-mail invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne doit pas dépasser 1000 caractères"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-red-500 mt-1 flex items-center gap-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-3.5 h-3.5 flex-shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 108 1a7 7 0 000 14zm0-9.75a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 5.25zm0 7.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  );
}

const inputClasses =
  "w-full px-4 py-3 rounded-xl border bg-white text-charcoal text-sm " +
  "placeholder:text-charcoal/30 transition-colors duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron " +
  "border-sand hover:border-saffron/40";

const inputErrorClasses =
  "w-full px-4 py-3 rounded-xl border bg-white text-charcoal text-sm " +
  "placeholder:text-charcoal/30 transition-colors duration-200 " +
  "focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 " +
  "border-red-300";

// ---------------------------------------------------------------------------
// Contact Form Component
// ---------------------------------------------------------------------------

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormValues) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          (body as { message?: string }).message ||
            "Une erreur est survenue. Veuillez réessayer."
        );
      }

      setSubmitted(true);
      reset();
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-green-500"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-indigo mb-2">
          Message Envoyé !
        </h3>
        <p className="text-charcoal/70 text-sm max-w-sm">
          Merci pour votre message. Nous vous répondrons dans les meilleurs délais,
          généralement sous 24 heures.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-saffron hover:text-saffron-dark underline underline-offset-2 transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
          Nom complet <span className="text-saffron" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Marie Dupont"
          aria-invalid={!!errors.name}
          className={errors.name ? inputErrorClasses : inputClasses}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
          Adresse e-mail <span className="text-saffron" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="marie.dupont@exemple.fr"
          aria-invalid={!!errors.email}
          className={errors.email ? inputErrorClasses : inputClasses}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
          Message <span className="text-saffron" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Votre message, question ou demande de renseignements…"
          aria-invalid={!!errors.message}
          className={
            (errors.message ? inputErrorClasses : inputClasses) +
            " resize-none"
          }
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {/* Submit error */}
      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clipRule="evenodd"
            />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full bg-saffron text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-saffron-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Envoi en cours…
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
            Envoyer le message
          </>
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Decorative gold top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Page Header */}
      <section className="bg-indigo-dark text-white py-16 px-4 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-gold/10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-gold/10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold/50" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gold"
              aria-hidden="true"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            <div className="h-px w-16 bg-gold/50" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
            Nous Contacter
          </h1>
          <p className="font-accent text-xl text-gold/90 italic">
            Une question ? Un événement privé ? Nous sommes à votre écoute.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact Form – 3/5 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md border border-sand/60 overflow-hidden">
              {/* Gold accent bar */}
              <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron" />
              <div className="p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-indigo mb-2">
                  Envoyez-nous un message
                </h2>
                <p className="text-sm text-charcoal/60 mb-6">
                  Réponse garantie sous 24h. Pour une réservation urgente, appelez-nous directement.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Info panel – 2/5 */}
          <aside className="lg:col-span-2 space-y-5">
            {/* Address */}
            <div className="bg-indigo rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gold"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.953-5.322 3.953-9.827a8.25 8.25 0 00-16.5 0c0 4.505 2.01 7.748 3.953 9.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.146.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-white">Adresse</h3>
              </div>
              <address className="not-italic text-sm text-white/80 space-y-0.5">
                <p className="font-semibold text-white">Namaste GIEN</p>
                <p>12 Quai de Nice</p>
                <p>45500 Gien, France</p>
              </address>
            </div>

            {/* Phone */}
            <div className="bg-indigo rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-saffron"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-white">Téléphone</h3>
              </div>
              <a
                href="tel:+33238XXXXXX"
                className="text-sm font-semibold text-saffron hover:text-saffron-light transition-colors"
              >
                +33 2 38 XX XX XX
              </a>
              <p className="text-xs text-white/50 mt-1">Pendant les heures d&apos;ouverture</p>
            </div>

            {/* Email */}
            <div className="bg-indigo rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gold"
                    aria-hidden="true"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-white">E-mail</h3>
              </div>
              <a
                href="mailto:contact@namastegien.fr"
                className="text-sm font-semibold text-saffron hover:text-saffron-light transition-colors break-all"
              >
                contact@namastegien.fr
              </a>
              <p className="text-xs text-white/50 mt-1">Réponse sous 24h</p>
            </div>

            {/* Hours */}
            <div className="bg-indigo rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-saffron"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold text-white">Horaires</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Lundi</span>
                  <span className="text-red-300 font-semibold">Fermé</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Mar — Dim</span>
                  <span className="text-white font-semibold">12h — 14h30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60"></span>
                  <span className="text-white font-semibold">19h — 22h30</span>
                </div>
              </div>
            </div>

            {/* Google Maps placeholder */}
            <div className="bg-sand/60 border border-gold/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-indigo"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="font-display text-sm font-bold text-indigo">Plan d&apos;accès</h3>
              </div>
              <div className="aspect-video bg-indigo/5 rounded-xl flex flex-col items-center justify-center border border-sand text-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-indigo/30 mb-2"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.953-5.322 3.953-9.827a8.25 8.25 0 00-16.5 0c0 4.505 2.01 7.748 3.953 9.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.146.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs text-charcoal/50 leading-relaxed">
                  La carte Google Maps sera intégrée ici.
                  <br />
                  <span className="font-medium text-charcoal/60">12 Quai de Nice, 45500 Gien</span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Decorative gold bottom border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
