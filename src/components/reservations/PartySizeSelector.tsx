"use client";

import { cn } from "@/lib/utils";

export interface PartySizeSelectorProps {
  selectedSize: number;
  onSizeSelect: (size: number) => void;
}

// 1–9 are individual buttons; 10 represents "10+"
const SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

const PEOPLE_LABELS: Record<number, string> = {
  1: "1 pers.",
  2: "2 pers.",
  3: "3 pers.",
  4: "4 pers.",
  5: "5 pers.",
  6: "6 pers.",
  7: "7 pers.",
  8: "8 pers.",
  9: "9 pers.",
  10: "10+",
};

export default function PartySizeSelector({
  selectedSize,
  onSizeSelect,
}: PartySizeSelectorProps) {
  const isLargeGroup = selectedSize >= 10;

  return (
    <div className="bg-cream border border-sand rounded-2xl p-5 shadow-sm">
      <h3 className="font-display text-base font-semibold text-indigo mb-4">
        Nombre de convives
      </h3>

      <div className="grid grid-cols-5 gap-2">
        {SIZES.map((size) => {
          const selected = size === 10 ? isLargeGroup : selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSizeSelect(size)}
              aria-pressed={selected}
              aria-label={
                size === 10
                  ? "10 personnes ou plus"
                  : `${size} ${size === 1 ? "personne" : "personnes"}`
              }
              className={cn(
                "flex flex-col items-center justify-center rounded-xl py-3 px-2 border transition-all duration-150",
                "text-sm font-medium",
                // Default
                !selected &&
                  "border-sand bg-white text-charcoal hover:border-saffron hover:text-saffron active:bg-saffron/10",
                // Selected
                selected &&
                  "border-saffron bg-saffron text-white shadow-md"
              )}
            >
              <span className="text-lg leading-none mb-1" aria-hidden="true">
                {size === 1
                  ? "🧑"
                  : size === 2
                  ? "👫"
                  : size <= 4
                  ? "👨‍👩‍👧"
                  : size <= 6
                  ? "👨‍👩‍👧‍👦"
                  : "🎉"}
              </span>
              <span>{PEOPLE_LABELS[size]}</span>
            </button>
          );
        })}
      </div>

      {/* Large group notice */}
      {isLargeGroup && (
        <div
          role="note"
          className="mt-4 flex items-start gap-3 bg-gold/10 border border-gold/30 rounded-xl p-4 text-sm text-charcoal animate-fade-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-semibold text-indigo mb-0.5">
              Contactez-nous pour les groupes
            </p>
            <p className="text-charcoal/70">
              Pour les réservations de 10 personnes ou plus, veuillez nous
              appeler ou nous envoyer un e-mail afin que nous puissions organiser
              votre événement au mieux.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
