"use client";

import { useRouter } from "next/navigation";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import CartItem from "./CartItem";

export interface CartProps {
  className?: string;
  onCheckout?: () => void;
}

export default function Cart({ className, onCheckout }: CartProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const deliveryType = useCartStore((s) => s.deliveryType);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getDeliveryFee = useCartStore((s) => s.getDeliveryFee);
  const getTotal = useCartStore((s) => s.getTotal);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const isEmpty = items.length === 0;

  function handleCheckout() {
    if (onCheckout) {
      onCheckout();
    } else {
      router.push("/order/checkout");
    }
  }

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-cream rounded-2xl border border-sand shadow-sm",
        className
      )}
      aria-label="Votre panier"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-sand">
        <h2 className="font-display text-xl font-bold text-charcoal">
          Votre panier
        </h2>
        {!isEmpty && (
          <span className="text-sm text-saffron font-semibold font-body">
            {items.reduce((acc, i) => acc + i.quantity, 0)} article
            {items.reduce((acc, i) => acc + i.quantity, 0) > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <ul className="divide-y divide-sand" role="list">
            {items.map((item) => (
              <li key={item._id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: totals + CTA */}
      {!isEmpty && (
        <div className="border-t border-sand px-5 py-4 space-y-3">
          <TotalsRow label="Sous-total" value={formatPrice(subtotal)} />
          <TotalsRow
            label={
              deliveryType === "delivery" ? "Frais de livraison" : "Retrait"
            }
            value={deliveryFee === 0 ? "Gratuit" : formatPrice(deliveryFee)}
            valueClassName={deliveryFee === 0 ? "text-green-600" : "text-charcoal"}
          />
          <div className="h-px bg-sand" />
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-charcoal">
              Total
            </span>
            <span className="font-display text-lg font-bold text-saffron">
              {formatPrice(total)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className={cn(
              "w-full mt-2 py-3 px-6 rounded-xl font-semibold font-body text-base",
              "bg-saffron text-cream transition-colors duration-200",
              "hover:bg-saffron-dark active:bg-saffron-dark",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2"
            )}
          >
            Passer la commande
          </button>
        </div>
      )}
    </aside>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center gap-4">
      <div
        className="w-16 h-16 rounded-full bg-sand flex items-center justify-center"
        aria-hidden="true"
      >
        <svg
          className="w-8 h-8 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
      <p className="font-display text-lg font-semibold text-charcoal">
        Votre panier est vide
      </p>
      <p className="font-body text-sm text-charcoal/60 max-w-xs">
        Parcourez notre menu et ajoutez des plats savoureux à votre panier.
      </p>
    </div>
  );
}

interface TotalsRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function TotalsRow({ label, value, valueClassName }: TotalsRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm text-charcoal/70">{label}</span>
      <span className={cn("font-body text-sm font-medium text-charcoal", valueClassName)}>
        {value}
      </span>
    </div>
  );
}
