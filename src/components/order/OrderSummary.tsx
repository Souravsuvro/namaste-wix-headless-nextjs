"use client";

import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { CartItem } from "@/types/order";

export interface OrderSummaryProps {
  className?: string;
}

export default function OrderSummary({ className }: OrderSummaryProps) {
  const items = useCartStore((s) => s.items);
  const deliveryType = useCartStore((s) => s.deliveryType);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDeliveryFee = useCartStore((s) => s.getDeliveryFee);
  const getTotal = useCartStore((s) => s.getTotal);

  const [promoCode, setPromoCode] = useState("");
  const [promoStatus, setPromoStatus] = useState<
    "idle" | "loading" | "applied" | "error"
  >("idle");
  const [promoError, setPromoError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  function handleApplyPromo() {
    if (!promoCode.trim()) return;

    setPromoStatus("loading");
    setPromoError(null);

    // Placeholder: in production this would call an API
    setTimeout(() => {
      // Simulate rejection — replace with real API call
      setPromoStatus("error");
      setPromoError("Ce code promo est invalide ou a expiré.");
    }, 800);
  }

  function handlePromoKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyPromo();
    }
  }

  const isEmpty = items.length === 0;

  return (
    <aside
      className={cn(
        "rounded-2xl border border-sand bg-cream shadow-sm overflow-hidden",
        className
      )}
      aria-labelledby="order-summary-title"
    >
      {/* Header */}
      <div className="px-5 py-4 bg-indigo">
        <h2
          id="order-summary-title"
          className="font-display text-lg font-bold text-cream"
        >
          Récapitulatif de commande
        </h2>
        {!isEmpty && (
          <p className="font-body text-xs text-cream/60 mt-0.5">
            {deliveryType === "delivery" ? "Livraison à domicile" : "Retrait sur place"}
          </p>
        )}
      </div>

      <div className="px-5 py-4 space-y-4">
        {/* Items list */}
        {isEmpty ? (
          <p className="font-body text-sm text-charcoal/50 text-center py-4">
            Aucun article dans votre panier.
          </p>
        ) : (
          <ul className="space-y-3" role="list" aria-label="Articles commandés">
            {items.map((item) => (
              <SummaryItem key={item._id} item={item} />
            ))}
          </ul>
        )}

        {!isEmpty && (
          <>
            <div className="h-px bg-sand" />

            {/* Totals */}
            <div className="space-y-2">
              <TotalsRow
                label="Sous-total"
                value={formatPrice(subtotal)}
              />
              <TotalsRow
                label={
                  deliveryType === "delivery"
                    ? "Frais de livraison"
                    : "Retrait"
                }
                value={deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}
                valueClassName={
                  deliveryFee === 0 ? "text-green-600 font-semibold" : undefined
                }
              />
            </div>

            <div className="h-px bg-sand" />

            {/* Grand total */}
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-charcoal">
                Total TTC
              </span>
              <span className="font-display text-xl font-bold text-saffron">
                {formatPrice(total)}
              </span>
            </div>

            <div className="h-px bg-sand" />

            {/* Promo code */}
            <PromoCodeInput
              value={promoCode}
              onChange={setPromoCode}
              onApply={handleApplyPromo}
              onKeyDown={handlePromoKeyDown}
              status={promoStatus}
              errorMessage={promoError}
            />
          </>
        )}

        {/* Secure payment badge */}
        <div className="flex items-center justify-center gap-1.5 text-charcoal/40 pt-1">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="font-body text-xs">Paiement 100% sécurisé</span>
        </div>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// SummaryItem
// ---------------------------------------------------------------------------

function SummaryItem({ item }: { item: CartItem }) {
  return (
    <li className="flex items-start gap-3">
      {/* Quantity badge */}
      <span
        className="flex-shrink-0 w-6 h-6 rounded-full bg-saffron/15 text-saffron text-xs font-bold font-body flex items-center justify-center"
        aria-label={`Quantité: ${item.quantity}`}
      >
        {item.quantity}
      </span>

      {/* Name */}
      <span className="flex-1 min-w-0 font-body text-sm text-charcoal leading-tight">
        {item.name}
        {item.specialInstructions && (
          <span className="block text-xs text-charcoal/40 mt-0.5 truncate">
            {item.specialInstructions}
          </span>
        )}
      </span>

      {/* Line total */}
      <span className="flex-shrink-0 font-body text-sm font-semibold text-charcoal">
        {formatPrice(item.price * item.quantity)}
      </span>
    </li>
  );
}

// ---------------------------------------------------------------------------
// TotalsRow
// ---------------------------------------------------------------------------

interface TotalsRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function TotalsRow({ label, value, valueClassName }: TotalsRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm text-charcoal/60">{label}</span>
      <span className={cn("font-body text-sm font-medium text-charcoal", valueClassName)}>
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// PromoCodeInput
// ---------------------------------------------------------------------------

interface PromoCodeInputProps {
  value: string;
  onChange: (v: string) => void;
  onApply: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  status: "idle" | "loading" | "applied" | "error";
  errorMessage: string | null;
}

function PromoCodeInput({
  value,
  onChange,
  onApply,
  onKeyDown,
  status,
  errorMessage,
}: PromoCodeInputProps) {
  const isApplied = status === "applied";
  const isLoading = status === "loading";

  return (
    <div className="space-y-2">
      <label
        htmlFor="promo-code"
        className="font-body text-sm font-medium text-charcoal"
      >
        Code promo
      </label>

      <div className="flex gap-2">
        <input
          id="promo-code"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onKeyDown={onKeyDown}
          disabled={isApplied || isLoading}
          placeholder="Ex: NAMASTE10"
          maxLength={20}
          autoComplete="off"
          className={cn(
            "flex-1 rounded-lg border px-3 py-2 font-body text-sm text-charcoal",
            "bg-white placeholder:text-charcoal/30 uppercase tracking-widest",
            "transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-saffron focus:border-saffron",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isApplied
              ? "border-green-400"
              : status === "error"
              ? "border-red-300"
              : "border-sand hover:border-saffron/50"
          )}
          aria-describedby={
            status === "error" ? "promo-error" : undefined
          }
          aria-invalid={status === "error"}
        />

        <button
          type="button"
          onClick={onApply}
          disabled={!value.trim() || isApplied || isLoading}
          className={cn(
            "flex-shrink-0 px-4 py-2 rounded-lg font-body text-sm font-semibold",
            "transition-colors duration-150",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-1",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            isApplied
              ? "bg-green-100 text-green-700"
              : "bg-gold/20 text-charcoal hover:bg-gold/30 active:bg-gold/40"
          )}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-label="Vérification..."
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
          ) : isApplied ? (
            "Appliqué ✓"
          ) : (
            "Appliquer"
          )}
        </button>
      </div>

      {status === "error" && errorMessage && (
        <p
          id="promo-error"
          className="font-body text-xs text-red-600"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {isApplied && (
        <p className="font-body text-xs text-green-600" role="status">
          Code promo appliqué avec succès.
        </p>
      )}
    </div>
  );
}
