"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

import DatePicker from "./DatePicker";
import TimeSlots from "./TimeSlots";
import PartySizeSelector from "./PartySizeSelector";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const reservationSchema = z.object({
  date: z.string().min(1, "Veuillez sélectionner une date"),
  time: z.string().min(1, "Veuillez sélectionner un horaire"),
  partySize: z
    .number({ error: "Veuillez indiquer le nombre de convives" })
    .int()
    .min(1, "Au moins 1 convive requis")
    .max(10, "Pour les groupes de plus de 10, veuillez nous contacter"),
  firstName: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50),
  lastName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z
    .string()
    .regex(
      /^(\+?\d[\s\-.]?){8,15}$/,
      "Numéro de téléphone invalide"
    ),
  specialRequests: z.string().max(500).optional(),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

// ---------------------------------------------------------------------------
// Step configuration
// ---------------------------------------------------------------------------

type Step = 1 | 2 | 3;

const STEPS: { id: Step; label: string; description: string }[] = [
  { id: 1, label: "Date & Heure", description: "Choisissez votre créneau" },
  { id: 2, label: "Convives", description: "Taille du groupe" },
  { id: 3, label: "Vos coordonnées", description: "Informations de contact" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProgressIndicator({
  currentStep,
}: {
  currentStep: Step;
}) {
  return (
    <nav aria-label="Étapes de réservation" className="mb-8">
      <ol className="flex items-center gap-0">
        {STEPS.map((step, index) => {
          const isComplete = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isLast = index === STEPS.length - 1;

          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center w-full">
                  {/* Connector line (left) */}
                  {index > 0 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 transition-colors duration-300",
                        isComplete || isActive ? "bg-saffron" : "bg-sand"
                      )}
                    />
                  )}

                  {/* Step circle */}
                  <div
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0 border-2",
                      isComplete &&
                        "bg-saffron border-saffron text-white",
                      isActive &&
                        "bg-white border-saffron text-saffron shadow-md",
                      !isActive &&
                        !isComplete &&
                        "bg-white border-sand text-charcoal/40"
                    )}
                  >
                    {isComplete ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>

                  {/* Connector line (right) */}
                  {!isLast && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 transition-colors duration-300",
                        isComplete ? "bg-saffron" : "bg-sand"
                      )}
                    />
                  )}
                </div>

                {/* Label below circle */}
                <div className="mt-2 text-center px-1">
                  <p
                    className={cn(
                      "text-xs font-semibold leading-tight transition-colors duration-200",
                      isActive ? "text-saffron" : isComplete ? "text-charcoal" : "text-charcoal/40"
                    )}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm text-tandoori mt-1 flex items-center gap-1">
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

function InputField({
  label,
  id,
  error,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-1.5">
        {label}
        {required && <span className="text-saffron ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full px-4 py-3 rounded-xl border bg-white text-charcoal text-sm",
          "placeholder:text-charcoal/30 transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron",
          error ? "border-tandoori/60" : "border-sand hover:border-saffron/40"
        )}
        {...props}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ReservationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      date: "",
      time: "",
      partySize: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");
  const watchedPartySize = watch("partySize");

  // Step navigation
  async function handleNextStep() {
    let fieldsToValidate: (keyof ReservationFormValues)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["date", "time"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["partySize"];
    }

    const valid = await trigger(fieldsToValidate);
    if (valid) {
      setCurrentStep((prev) => (Math.min(prev + 1, 3) as Step));
    }
  }

  function handlePrevStep() {
    setCurrentStep((prev) => (Math.max(prev - 1, 1) as Step));
  }

  // Form submission
  async function onSubmit(data: ReservationFormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/reservations", {
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

      router.push("/reservations/confirmation");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Une erreur inattendue est survenue."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <ProgressIndicator currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ------------------------------------------------------------------ */}
        {/* Step 1 – Date & Time                                               */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold text-indigo mb-1">
                Date de réservation
              </h2>
              <p className="text-sm text-charcoal/60">
                Le restaurant est fermé le lundi.
              </p>
            </div>

            <div>
              <DatePicker
                selectedDate={watchedDate}
                onDateSelect={(date) => {
                  setValue("date", date, { shouldValidate: true });
                  // Reset time when date changes
                  setValue("time", "");
                }}
              />
              <FieldError message={errors.date?.message} />
            </div>

            {watchedDate && (
              <div className="animate-slide-up">
                <h3 className="font-display text-lg font-semibold text-indigo mb-3">
                  Horaire
                </h3>
                <TimeSlots
                  selectedTime={watchedTime}
                  onTimeSelect={(time) =>
                    setValue("time", time, { shouldValidate: true })
                  }
                />
                <FieldError message={errors.time?.message} />
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Step 2 – Party Size                                                */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold text-indigo mb-1">
                Nombre de convives
              </h2>
              <p className="text-sm text-charcoal/60">
                Combien de personnes seront présentes ?
              </p>
            </div>

            <PartySizeSelector
              selectedSize={watchedPartySize}
              onSizeSelect={(size) =>
                setValue("partySize", size, { shouldValidate: true })
              }
            />
            <FieldError message={errors.partySize?.message} />

            {/* Reservation summary */}
            <div className="bg-indigo/5 border border-indigo/10 rounded-xl p-4 text-sm text-charcoal">
              <p className="font-semibold text-indigo mb-1">Récapitulatif</p>
              <ul className="space-y-0.5 text-charcoal/70">
                <li>
                  📅 {watchedDate
                    ? new Intl.DateTimeFormat("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(watchedDate + "T00:00:00"))
                    : "—"}
                </li>
                <li>🕐 {watchedTime || "—"}</li>
              </ul>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Step 3 – Contact Info                                              */}
        {/* ------------------------------------------------------------------ */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="font-display text-2xl font-bold text-indigo mb-1">
                Vos coordonnées
              </h2>
              <p className="text-sm text-charcoal/60">
                Nous vous enverrons une confirmation par e-mail.
              </p>
            </div>

            {/* Reservation summary */}
            <div className="bg-indigo/5 border border-indigo/10 rounded-xl p-4 text-sm text-charcoal">
              <p className="font-semibold text-indigo mb-1">Récapitulatif</p>
              <ul className="space-y-0.5 text-charcoal/70">
                <li>
                  📅 {watchedDate
                    ? new Intl.DateTimeFormat("fr-FR", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(watchedDate + "T00:00:00"))
                    : "—"}
                </li>
                <li>🕐 {watchedTime || "—"}</li>
                <li>
                  👥{" "}
                  {watchedPartySize >= 10
                    ? "10+ convives"
                    : watchedPartySize === 1
                    ? "1 convive"
                    : `${watchedPartySize} convives`}
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                id="firstName"
                label="Prénom"
                required
                autoComplete="given-name"
                placeholder="Marie"
                error={errors.firstName?.message}
                {...register("firstName")}
              />
              <InputField
                id="lastName"
                label="Nom"
                required
                autoComplete="family-name"
                placeholder="Dupont"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <InputField
              id="email"
              label="Adresse e-mail"
              type="email"
              required
              autoComplete="email"
              placeholder="marie.dupont@exemple.fr"
              error={errors.email?.message}
              {...register("email")}
            />

            <InputField
              id="phone"
              label="Numéro de téléphone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+33 6 12 34 56 78"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <div>
              <label
                htmlFor="specialRequests"
                className="block text-sm font-medium text-charcoal mb-1.5"
              >
                Demandes spéciales{" "}
                <span className="text-charcoal/40 font-normal">(optionnel)</span>
              </label>
              <textarea
                id="specialRequests"
                rows={3}
                placeholder="Allergies, anniversaire, chaise haute pour enfant…"
                aria-invalid={!!errors.specialRequests}
                className={cn(
                  "w-full px-4 py-3 rounded-xl border bg-white text-charcoal text-sm resize-none",
                  "placeholder:text-charcoal/30 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:border-saffron",
                  errors.specialRequests
                    ? "border-tandoori/60"
                    : "border-sand hover:border-saffron/40"
                )}
                {...register("specialRequests")}
              />
              <FieldError message={errors.specialRequests?.message} />
            </div>

            {/* Submit error */}
            {submitError && (
              <div
                role="alert"
                className="flex items-start gap-3 bg-tandoori/5 border border-tandoori/20 rounded-xl p-4 text-sm text-tandoori"
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
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Navigation buttons                                                 */}
        {/* ------------------------------------------------------------------ */}
        <div
          className={cn(
            "mt-8 flex gap-3",
            currentStep > 1 ? "justify-between" : "justify-end"
          )}
        >
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className={cn(
                "px-5 py-3 rounded-xl border-2 border-sand bg-white text-charcoal",
                "text-sm font-semibold transition-colors duration-200",
                "hover:border-indigo hover:text-indigo active:bg-sand/30"
              )}
            >
              ← Retour
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className={cn(
                "px-7 py-3 rounded-xl bg-saffron text-white",
                "text-sm font-semibold transition-all duration-200 shadow",
                "hover:bg-saffron-dark active:bg-saffron-dark",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2"
              )}
            >
              Continuer →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={cn(
                "px-7 py-3 rounded-xl bg-saffron text-white",
                "text-sm font-semibold transition-all duration-200 shadow",
                "hover:bg-saffron-dark active:bg-saffron-dark",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2",
                "disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none",
                "flex items-center gap-2"
              )}
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
                  Réservation en cours…
                </>
              ) : (
                "Confirmer la réservation"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
