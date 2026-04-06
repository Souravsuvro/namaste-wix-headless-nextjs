"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

const phoneRegex = /^(?:\+33|0033|0)[1-9](?:\d{8})$/;

const baseSchema = z.object({
  firstName: z.string().min(1, "Le prénom est requis").max(60),
  lastName: z.string().min(1, "Le nom est requis").max(60),
  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Adresse email invalide"),
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(phoneRegex, "Format invalide (ex: 0612345678 ou +33612345678)"),
  notes: z.string().max(500).optional(),
});

const deliverySchema = baseSchema.extend({
  deliveryType: z.literal("delivery"),
  address: z.string().min(1, "L'adresse est requise").max(200),
  city: z.string().min(1, "La ville est requise").max(100),
  postalCode: z
    .string()
    .min(1, "Le code postal est requis")
    .regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
});

const pickupSchema = baseSchema.extend({
  deliveryType: z.literal("pickup"),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});

const orderSchema = z.discriminatedUnion("deliveryType", [
  deliverySchema,
  pickupSchema,
]);

type OrderFormValues = z.infer<typeof orderSchema>;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface OrderFormProps {
  onSuccess?: (orderId: string) => void;
  onError?: (error: Error) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, id, error, required = false, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-body text-sm font-medium text-charcoal"
      >
        {label}
        {required && (
          <span className="text-saffron ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase = cn(
  "w-full rounded-lg border px-4 py-2.5 font-body text-sm text-charcoal",
  "bg-white placeholder:text-charcoal/40",
  "transition-colors duration-150",
  "focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron",
  "disabled:opacity-50 disabled:cursor-not-allowed"
);

const inputError = "border-red-400 focus:ring-red-400 focus:border-red-400";
const inputNormal = "border-sand hover:border-saffron/50";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OrderForm({
  onSuccess,
  onError,
  className,
}: OrderFormProps) {
  const storeDeliveryType = useCartStore((s) => s.deliveryType);
  const setDeliveryType = useCartStore((s) => s.setDeliveryType);
  const clearCart = useCartStore((s) => s.clearCart);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      deliveryType: storeDeliveryType,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      notes: "",
    },
  });

  const deliveryType = watch("deliveryType");
  const isDelivery = deliveryType === "delivery";

  // Typed accessor for delivery-only fields (address, city, postalCode)
  // These fields exist on the form but are only required when isDelivery is true.
  type DeliveryErrors = {
    address?: { message?: string };
    city?: { message?: string };
    postalCode?: { message?: string };
  };
  const deliveryErrors = errors as typeof errors & DeliveryErrors;

  function handleToggleDeliveryType(type: "delivery" | "pickup") {
    setValue("deliveryType", type, { shouldValidate: false });
    setDeliveryType(type);
  }

  async function onSubmit(data: OrderFormValues) {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/orders", {
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

      const result = (await response.json()) as { orderId: string };
      clearCart();
      onSuccess?.(result.orderId);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setServerError(error.message);
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("space-y-6", className)}
      aria-label="Formulaire de commande"
    >
      {/* Delivery / Pickup toggle */}
      <div>
        <p className="font-body text-sm font-semibold text-charcoal mb-2">
          Mode de réception
        </p>
        <div
          className="flex rounded-xl border border-sand overflow-hidden"
          role="radiogroup"
          aria-label="Mode de réception"
        >
          <ToggleButton
            active={isDelivery}
            onClick={() => handleToggleDeliveryType("delivery")}
            aria-checked={isDelivery}
            role="radio"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            Livraison
          </ToggleButton>
          <ToggleButton
            active={!isDelivery}
            onClick={() => handleToggleDeliveryType("pickup")}
            aria-checked={!isDelivery}
            role="radio"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016 2.993 2.993 0 002.25-1.016 3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
              />
            </svg>
            À emporter
          </ToggleButton>
        </div>
        {/* Hidden input so RHF picks it up */}
        <input type="hidden" {...register("deliveryType")} />
      </div>

      {/* Contact info */}
      <fieldset className="space-y-4">
        <legend className="font-display text-base font-bold text-indigo mb-3">
          Coordonnées
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Prénom"
            id="firstName"
            error={errors.firstName?.message}
            required
          >
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder="Aarav"
              {...register("firstName")}
              className={cn(
                inputBase,
                errors.firstName ? inputError : inputNormal
              )}
              aria-invalid={!!errors.firstName}
            />
          </Field>

          <Field
            label="Nom"
            id="lastName"
            error={errors.lastName?.message}
            required
          >
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder="Sharma"
              {...register("lastName")}
              className={cn(
                inputBase,
                errors.lastName ? inputError : inputNormal
              )}
              aria-invalid={!!errors.lastName}
            />
          </Field>
        </div>

        <Field label="Email" id="email" error={errors.email?.message} required>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
            {...register("email")}
            className={cn(inputBase, errors.email ? inputError : inputNormal)}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field
          label="Téléphone"
          id="phone"
          error={errors.phone?.message}
          required
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0612345678"
            {...register("phone")}
            className={cn(inputBase, errors.phone ? inputError : inputNormal)}
            aria-invalid={!!errors.phone}
          />
        </Field>
      </fieldset>

      {/* Delivery address — shown only when delivery is selected */}
      {isDelivery && (
        <fieldset className="space-y-4 animate-fade-in">
          <legend className="font-display text-base font-bold text-indigo mb-3">
            Adresse de livraison
          </legend>

          <Field
            label="Adresse"
            id="address"
            error={deliveryErrors.address?.message}
            required
          >
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="12 Rue de la République"
              {...register("address")}
              className={cn(
                inputBase,
                deliveryErrors.address ? inputError : inputNormal
              )}
              aria-invalid={!!deliveryErrors.address}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Ville"
              id="city"
              error={deliveryErrors.city?.message}
              required
            >
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                placeholder="Gien"
                {...register("city")}
                className={cn(
                  inputBase,
                  deliveryErrors.city ? inputError : inputNormal
                )}
                aria-invalid={!!deliveryErrors.city}
              />
            </Field>

            <Field
              label="Code postal"
              id="postalCode"
              error={deliveryErrors.postalCode?.message}
              required
            >
              <input
                id="postalCode"
                type="text"
                autoComplete="postal-code"
                placeholder="45500"
                maxLength={5}
                {...register("postalCode")}
                className={cn(
                  inputBase,
                  deliveryErrors.postalCode ? inputError : inputNormal
                )}
                aria-invalid={!!deliveryErrors.postalCode}
              />
            </Field>
          </div>
        </fieldset>
      )}

      {/* Notes */}
      <Field
        label="Instructions spéciales"
        id="notes"
        error={errors.notes?.message}
      >
        <textarea
          id="notes"
          rows={3}
          placeholder="Allergies, préférences, instructions de livraison…"
          {...register("notes")}
          className={cn(
            inputBase,
            "resize-none",
            errors.notes ? inputError : inputNormal
          )}
        />
      </Field>

      {/* Server error */}
      {serverError && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          role="alert"
        >
          <p className="font-body text-sm text-red-700">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full py-3.5 px-6 rounded-xl font-semibold font-body text-base",
          "bg-saffron text-cream transition-all duration-200",
          "hover:bg-saffron-dark active:bg-saffron-dark",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
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
          </span>
        ) : (
          "Confirmer la commande"
        )}
      </button>

      <p className="font-body text-xs text-charcoal/50 text-center">
        En passant votre commande, vous acceptez nos conditions générales de
        vente.
      </p>
    </form>
  );
}

// ---------------------------------------------------------------------------
// ToggleButton
// ---------------------------------------------------------------------------

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  role?: string;
  "aria-checked"?: boolean;
}

function ToggleButton({
  active,
  onClick,
  children,
  ...rest
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2.5 px-4",
        "font-body text-sm font-semibold transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron",
        active
          ? "bg-saffron text-cream"
          : "bg-white text-charcoal/60 hover:bg-sand"
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
