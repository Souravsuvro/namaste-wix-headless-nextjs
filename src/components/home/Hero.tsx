"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants, type Easing } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const EASE_IN_OUT: Easing = "easeInOut";

const chevronVariants = {
  animate: {
    y: [0, 8, 0],
    transition: { duration: 1.5, repeat: Infinity, ease: EASE_IN_OUT },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-restaurant-interior.png"
        alt="Namaste GIEN restaurant interior"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2D2926]/70 via-[#1B3A6B]/50 to-[#2D2926]/80" />

      {/* Centered content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Decorative top line */}
        <motion.div
          className="w-16 h-px bg-[#D4A843] mb-6"
          variants={itemVariants}
        />

        {/* Restaurant name */}
        <motion.h1
          className="font-display text-6xl md:text-8xl text-[#FDF6EC] leading-tight tracking-wide mb-4"
          variants={itemVariants}
        >
          Namaste GIEN
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-accent text-xl text-[#D4A843] italic mb-10"
          variants={itemVariants}
        >
          Where Spice Meets the Loire
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          variants={itemVariants}
        >
          <Link
            href="/menu"
            className="px-8 py-3.5 bg-[#E8731A] text-[#FDF6EC] font-body font-semibold rounded-full
                       hover:bg-[#d4651a] active:bg-[#c0591a] transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8731A] focus-visible:ring-offset-2"
          >
            Découvrir la Carte
          </Link>
          <Link
            href="/reservations"
            className="px-8 py-3.5 border-2 border-[#D4A843] text-[#D4A843] font-body font-semibold rounded-full
                       hover:bg-[#D4A843] hover:text-[#2D2926] active:bg-[#c49b3c] transition-colors duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] focus-visible:ring-offset-2"
          >
            Réserver une Table
          </Link>
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div
          className="w-16 h-px bg-[#D4A843] mt-10"
          variants={itemVariants}
        />
      </motion.div>

      {/* Scroll-down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="font-body text-xs text-[#FDF6EC]/60 tracking-widest uppercase">
          Défiler
        </span>
        <motion.div
          variants={chevronVariants}
          animate="animate"
          className="text-[#D4A843]"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
