"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SAMPLE_MENU_ITEMS } from "@/types/menu";
import type { MenuItem } from "@/types/menu";

const cocktails = SAMPLE_MENU_ITEMS.filter(
  (item) => item.category === "cocktails"
);

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function CocktailCard({ item }: { item: MenuItem }) {
  const isSignature = item.isSignature;

  return (
    <motion.article
      variants={cardVariants}
      className="relative rounded-2xl overflow-hidden bg-indigo border border-indigo-light/20 group"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image ?? "/images/hero-bar-interior.png"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo/80 via-transparent to-transparent" />
        {isSignature && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold/90 text-charcoal text-xs font-bold font-body tracking-wide">
            Signature
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="font-display text-lg font-semibold text-cream leading-tight">
          {item.name}
        </h3>
        <p className="font-body text-sm text-cream/60 leading-relaxed line-clamp-3">
          {item.description}
        </p>
        <div className="pt-2 flex items-center justify-between">
          <span className="font-accent text-xl font-semibold text-gold">
            {item.price.toFixed(2)} €
          </span>
          {item.isVegan && (
            <span className="text-xs font-body text-cream/40">Végan</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function BarPage() {
  return (
    <div className="min-h-screen bg-indigo-dark">
      {/* Hero section */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bar-interior.png"
          alt="Bar & Cocktails — Namaste GIEN"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-indigo-dark/70" />

        {/* Hero text */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 max-w-2xl mx-auto"
        >
          <p className="font-accent text-gold text-base md:text-lg tracking-widest uppercase mb-3">
            Namaste GIEN
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream leading-tight">
            Bar &amp; Cocktails
          </h1>
          <p className="mt-5 font-body text-cream/70 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Des cocktails signatures qui marient les épices de l&apos;Inde aux
            spiritueux français — une rencontre entre deux mondes dans votre
            verre.
          </p>

          {/* Decorative divider */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gold/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gold/40" />
          </div>
        </motion.div>
      </section>

      {/* Cocktails grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-cream">
            Nos Cocktails
          </h2>
          <p className="mt-2 font-body text-cream/50 text-sm max-w-sm mx-auto">
            Chaque création est pensée par notre barman pour sublimer les épices
            de la carte.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail._id} item={cocktail} />
          ))}
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-indigo/50 py-12 text-center px-4">
        <p className="font-accent text-gold text-lg mb-2">
          Réservez une table pour profiter de notre bar
        </p>
        <a
          href="/reservations"
          className="inline-block mt-3 px-8 py-3 rounded-xl bg-saffron text-cream font-semibold font-body text-sm hover:bg-saffron-dark transition-colors"
        >
          Réserver une table
        </a>
      </section>
    </div>
  );
}
