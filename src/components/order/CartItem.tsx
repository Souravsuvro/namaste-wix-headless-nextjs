"use client";

import Image from "next/image";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { CartItem as CartItemType } from "@/types/order";

export interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  function handleDecrement() {
    updateQuantity(item.productId, item.quantity - 1);
  }

  function handleIncrement() {
    updateQuantity(item.productId, item.quantity + 1);
  }

  function handleRemove() {
    removeItem(item.productId);
  }

  return (
    <div className="flex items-start gap-3 px-5 py-4">
      {/* Optional thumbnail */}
      {item.image ? (
        <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-sand">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
      ) : (
        <div
          className="w-14 h-14 flex-shrink-0 rounded-lg bg-sand flex items-center justify-center"
          aria-hidden="true"
        >
          <svg
            className="w-6 h-6 text-gold/60"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5M6 10.608v3.88a48.15 48.15 0 016 0v-3.88m-6 0a48.03 48.03 0 016 0"
            />
          </svg>
        </div>
      )}

      {/* Name + instructions */}
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-charcoal text-sm leading-tight truncate">
          {item.name}
        </p>
        {item.specialInstructions && (
          <p className="font-body text-xs text-charcoal/50 mt-0.5 line-clamp-1">
            {item.specialInstructions}
          </p>
        )}
        <p className="font-body text-sm font-medium text-saffron mt-1">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Right column: quantity + remove */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        {/* Remove button */}
        <button
          onClick={handleRemove}
          aria-label={`Supprimer ${item.name} du panier`}
          className={cn(
            "p-1 rounded-md text-charcoal/40 transition-colors duration-150",
            "hover:text-tandoori hover:bg-red-50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-1"
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>

        {/* Quantity stepper */}
        <div
          className="flex items-center rounded-lg border border-sand overflow-hidden"
          role="group"
          aria-label={`Quantité pour ${item.name}`}
        >
          <button
            onClick={handleDecrement}
            aria-label="Diminuer la quantité"
            className={cn(
              "w-7 h-7 flex items-center justify-center",
              "text-charcoal/70 bg-sand transition-colors duration-150",
              "hover:bg-saffron hover:text-cream",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>

          <span
            className="w-8 text-center font-body text-sm font-semibold text-charcoal select-none"
            aria-live="polite"
            aria-atomic="true"
          >
            {item.quantity}
          </span>

          <button
            onClick={handleIncrement}
            aria-label="Augmenter la quantité"
            className={cn(
              "w-7 h-7 flex items-center justify-center",
              "text-charcoal/70 bg-sand transition-colors duration-150",
              "hover:bg-saffron hover:text-cream",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron"
            )}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
