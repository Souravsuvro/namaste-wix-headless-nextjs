"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type ConsentChoice = "accepted" | "declined";

const STORAGE_KEY = "namaste-cookie-consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Slight delay so the page renders first
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may be unavailable (e.g. private browsing on some browsers)
    }
  }, []);

  const persistChoice = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Silently fail if localStorage is unavailable
    }
    setIsVisible(false);
  };

  const handleAccept = () => persistChoice("accepted");
  const handleDecline = () => persistChoice("declined");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cookie-consent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 220, duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="dialog"
          aria-modal="false"
          aria-label="Consentement aux cookies"
          aria-live="polite"
        >
          <div className="max-w-4xl mx-auto bg-[#0F1F3D] text-[#FDF6EC] rounded-2xl shadow-2xl border border-[#D4A843]/20 overflow-hidden">
            {/* Accent line */}
            <div className="h-1 bg-gradient-to-r from-[#E8731A] via-[#D4A843] to-[#E8731A]" />

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Cookie Icon */}
              <div className="flex-shrink-0 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-[#E8731A]/15 text-[#E8731A]">
                <CookieIcon />
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold text-[#D4A843] mb-1.5 flex items-center gap-2">
                  <span className="sm:hidden text-[#E8731A]">
                    <CookieIcon />
                  </span>
                  Nous utilisons des cookies
                </h2>
                <p className="text-[#FDF6EC]/75 text-sm leading-relaxed">
                  Namaste GIEN utilise des cookies pour améliorer votre expérience,
                  analyser notre trafic et personnaliser nos contenus. En cliquant sur
                  «&nbsp;Accepter&nbsp;», vous consentez à notre utilisation des cookies.{" "}
                  <Link
                    href="/privacy"
                    className="text-[#D4A843] hover:text-[#E8731A] underline underline-offset-2 transition-colors duration-200"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-lg border border-[#FDF6EC]/20 text-[#FDF6EC]/70 hover:border-[#FDF6EC]/40 hover:text-[#FDF6EC] transition-colors duration-200"
                >
                  Refuser
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-5 py-2 text-sm font-semibold rounded-lg bg-[#E8731A] text-white hover:bg-[#d4651a] active:bg-[#c0591a] transition-colors duration-200 shadow-sm"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CookieIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10c0-.34-.017-.676-.051-1.007A3 3 0 0117 8a3 3 0 01-2.993-2.949A3 3 0 0111 2.051 10.02 10.02 0 0012 2z"
      />
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="14.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="9.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}
