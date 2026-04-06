"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useLanguageStore } from "@/store/language-store";
import MobileMenu from "./MobileMenu";

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

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { locale, setLocale } = useLanguageStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLocale(locale === "fr" ? "en" : "fr");
  };

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo-heritage-fusion-main.png"
                alt="Namaste GIEN"
                width={160}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={[
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-200 group whitespace-nowrap",
                    isScrolled || !isActiveLink(link.href)
                      ? "text-[#2D2926] hover:text-[#E8731A]"
                      : "text-[#2D2926] hover:text-[#E8731A]",
                    isActiveLink(link.href) ? "text-[#E8731A]" : "",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    className={[
                      "absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8731A] transition-transform duration-200 origin-left",
                      isActiveLink(link.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-full border border-[#1B3A6B] text-[#1B3A6B] hover:bg-[#1B3A6B] hover:text-white transition-colors duration-200"
                aria-label={`Switch to ${locale === "fr" ? "English" : "French"}`}
              >
                {locale === "fr" ? "EN" : "FR"}
              </button>

              {/* Cart Icon */}
              <Link
                href="/order"
                className="relative p-2 rounded-full text-[#2D2926] hover:text-[#E8731A] hover:bg-[#FDF6EC] transition-colors duration-200"
                aria-label={`Panier (${itemCount} articles)`}
              >
                <CartIcon />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#E8731A] rounded-full">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger */}
              <button
                className="lg:hidden p-2 rounded-md text-[#2D2926] hover:text-[#E8731A] hover:bg-[#FDF6EC] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Ouvrir le menu"
                aria-expanded={isMobileMenuOpen}
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function HamburgerIcon() {
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}
