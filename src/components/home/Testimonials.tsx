"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sophie Marchand",
    location: "Orléans, France",
    quote:
      "Une expérience gastronomique exceptionnelle. Le Butter Chicken du Chef fond littéralement en bouche, et l'alliance des épices indiennes avec les produits ligériens est tout simplement magique. Nous reviendrons sans hésiter.",
    rating: 5,
  },
  {
    id: 2,
    name: "Pierre & Isabelle Dupont",
    location: "Paris, France",
    quote:
      "Nous avons découvert Namaste GIEN lors d'un week-end en Loire Valley et ce fut une véritable révélation. Le Biryani Royal à l'Agneau et le cocktail Loire Sunset sont à ne pas manquer. Un endroit hors du commun.",
    rating: 5,
  },
  {
    id: 3,
    name: "Thomas Kellner",
    location: "Francfort, Allemagne",
    quote:
      "Travelling through the Loire Valley, we stumbled upon this gem. The fusion concept is executed flawlessly — refined Indian spices meeting French terroir in every dish. The Gulab Jamun with Cognac was a perfect finale.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={i < rating ? "#D4A843" : "none"}
          stroke="#D4A843"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-[#1B3A6B] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-accent text-[#D4A843] italic text-lg mb-2">
            Témoignages
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#FDF6EC] mb-4">
            Ce que disent nos hôtes
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#D4A843]" />
            <div className="w-2 h-2 rounded-full bg-[#D4A843]" />
            <div className="h-px w-16 bg-[#D4A843]" />
          </div>
        </div>

        {/* Testimonial card */}
        <div className="relative min-h-[280px] flex items-center justify-center">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={cn(
                "absolute inset-0 flex flex-col items-center text-center transition-all duration-700",
                i === activeIndex
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-4 pointer-events-none"
              )}
              aria-hidden={i !== activeIndex}
            >
              {/* Large quote mark */}
              <p
                className="font-accent text-[#D4A843]/40 text-8xl leading-none mb-2 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </p>

              {/* Quote */}
              <blockquote className="font-accent italic text-xl md:text-2xl text-[#FDF6EC] leading-relaxed max-w-2xl px-4 mb-8">
                {t.quote}
              </blockquote>

              {/* Rating */}
              <StarRating rating={t.rating} />

              {/* Author */}
              <div className="mt-3 flex flex-col items-center gap-0.5">
                <p className="font-body font-semibold text-[#FDF6EC] text-base">
                  {t.name}
                </p>
                <p className="font-body text-sm text-[#FDF6EC]/50">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3A6B]",
                i === activeIndex
                  ? "w-8 h-2.5 bg-[#D4A843]"
                  : "w-2.5 h-2.5 bg-[#FDF6EC]/30 hover:bg-[#FDF6EC]/60"
              )}
              aria-label={`Témoignage ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
