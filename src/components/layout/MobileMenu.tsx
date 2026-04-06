"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguageStore } from "@/store/language-store";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Notre Carte", href: "/menu" },
  { label: "Commander", href: "/order" },
  { label: "Réservations", href: "/reservations" },
  { label: "Bar & Cocktails", href: "/bar" },
  { label: "Galerie", href: "/gallery" },
  { label: "Notre Histoire", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguageStore();

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Slide-in Panel */}
          <motion.div
            key="mobile-menu-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#FDF6EC] shadow-2xl lg:hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4A843]/30">
              <span className="text-lg font-display font-semibold text-[#1B3A6B]">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-[#2D2926] hover:text-[#E8731A] hover:bg-[#E8731A]/10 transition-colors duration-200"
                aria-label="Fermer le menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={[
                        "flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200",
                        isActiveLink(link.href)
                          ? "bg-[#E8731A] text-white shadow-sm"
                          : "text-[#2D2926] hover:bg-[#E8731A]/10 hover:text-[#E8731A]",
                      ].join(" ")}
                    >
                      {isActiveLink(link.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                      )}
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Footer: Language Switcher */}
            <div className="px-6 py-5 border-t border-[#D4A843]/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#2D2926]/60 font-medium">
                  Langue / Language
                </span>
                <div className="flex rounded-full overflow-hidden border border-[#1B3A6B]">
                  <button
                    onClick={() => setLocale("fr")}
                    className={[
                      "px-4 py-1.5 text-sm font-semibold transition-colors duration-200",
                      locale === "fr"
                        ? "bg-[#1B3A6B] text-white"
                        : "text-[#1B3A6B] hover:bg-[#1B3A6B]/10",
                    ].join(" ")}
                    aria-pressed={locale === "fr"}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLocale("en")}
                    className={[
                      "px-4 py-1.5 text-sm font-semibold transition-colors duration-200",
                      locale === "en"
                        ? "bg-[#1B3A6B] text-white"
                        : "text-[#1B3A6B] hover:bg-[#1B3A6B]/10",
                    ].join(" ")}
                    aria-pressed={locale === "en"}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Decorative tagline */}
              <p className="mt-4 text-xs text-center text-[#D4A843] font-medium tracking-widest uppercase">
                Where Spice Meets the Loire
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
