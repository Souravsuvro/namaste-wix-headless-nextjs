"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { SAMPLE_MENU_ITEMS } from "@/types/menu";
import { formatPrice, cn } from "@/lib/utils";
import Card from "@/components/ui/Card";

const FEATURED_DISHES = SAMPLE_MENU_ITEMS.filter((item) => item.isSignature).slice(0, 4);

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function SpiceLevelIndicator({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Niveau d'épice : ${level} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "text-xs transition-colors",
            i < level ? "text-[#C23B22]" : "text-[#F5EDE0]"
          )}
          aria-hidden="true"
        >
          🌶
        </span>
      ))}
    </div>
  );
}

export default function FeaturedDishes() {
  return (
    <section className="py-20 px-4 bg-[#FDF6EC]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="font-accent text-[#E8731A] italic text-lg mb-2">
            Sélection du Chef
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-[#2D2926] mb-4">
            Nos Plats Signatures
          </h2>
          {/* Decorative gold line */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#D4A843]" />
            <div className="w-2 h-2 rounded-full bg-[#D4A843]" />
            <div className="h-px w-16 bg-[#D4A843]" />
          </div>
        </div>

        {/* Dishes grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {FEATURED_DISHES.map((dish) => (
            <motion.div key={dish._id} variants={cardVariants}>
              <Card
                imageSrc={dish.image}
                imageAlt={dish.name}
                imageHeight={200}
                padding="md"
                hover
                className="h-full flex flex-col"
              >
                <div className="flex flex-col gap-2 flex-1">
                  {/* Name & price */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-[#2D2926] text-lg leading-snug flex-1">
                      {dish.name}
                    </h3>
                    <span className="font-body font-semibold text-[#E8731A] whitespace-nowrap text-base">
                      {formatPrice(dish.price)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm text-[#2D2926]/70 leading-relaxed flex-1">
                    {dish.description}
                  </p>

                  {/* Spice level */}
                  {dish.spiceLevel > 0 && (
                    <SpiceLevelIndicator level={dish.spiceLevel} />
                  )}

                  {/* Dietary badges */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dish.isVegetarian && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-body bg-green-100 text-green-700">
                        Végétarien
                      </span>
                    )}
                    {dish.isVegan && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-body bg-green-200 text-green-800">
                        Vegan
                      </span>
                    )}
                    {dish.isGlutenFree && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-body bg-amber-100 text-amber-700">
                        Sans gluten
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Link to full menu */}
        <div className="text-center mt-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 font-body font-semibold text-[#1B3A6B]
                       border-b-2 border-[#D4A843] pb-0.5 hover:text-[#E8731A] hover:border-[#E8731A]
                       transition-colors duration-200 text-base"
          >
            Voir la carte complète
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
