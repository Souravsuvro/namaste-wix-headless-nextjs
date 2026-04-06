"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="relative py-20 px-4 bg-[#F5EDE0] overflow-hidden">
      {/* Decorative mandala-style CSS border pattern */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]"
        aria-hidden="true"
      >
        <div className="w-[700px] h-[700px] rounded-full border-[40px] border-[#E8731A]" />
        <div className="absolute w-[560px] h-[560px] rounded-full border-[2px] border-[#1B3A6B]" />
        <div className="absolute w-[480px] h-[480px] rounded-full border-[24px] border-[#D4A843]" />
        <div className="absolute w-[340px] h-[340px] rounded-full border-[2px] border-[#E8731A]" />
        <div className="absolute w-[260px] h-[260px] rounded-full border-[16px] border-[#1B3A6B]" />
        <div className="absolute w-[160px] h-[160px] rounded-full border-[2px] border-[#D4A843]" />
        <div className="absolute w-[80px] h-[80px] rounded-full border-[8px] border-[#E8731A]" />
      </div>

      <div className="relative max-w-xl mx-auto text-center">
        {/* Section header */}
        <p className="font-accent text-[#E8731A] italic text-lg mb-2">
          Actualités & offres exclusives
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-[#2D2926] mb-4">
          Restez Connecté
        </h2>
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#D4A843]" />
          <div className="w-2 h-2 rounded-full bg-[#D4A843]" />
          <div className="h-px w-16 bg-[#D4A843]" />
        </div>
        <p className="font-body text-[#2D2926]/70 text-base leading-relaxed mb-10">
          Inscrivez-vous à notre newsletter pour recevoir nos menus saisonniers,
          événements spéciaux et offres exclusives directement dans votre boîte
          mail.
        </p>

        {submitted ? (
          /* Success message */
          <div className="bg-[#FDF6EC] border border-[#D4A843] rounded-2xl px-8 py-10 shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-[#D4A843]/10 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#D4A843"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h3 className="font-display text-2xl text-[#2D2926] mb-2">
              Merci de votre inscription !
            </h3>
            <p className="font-body text-[#2D2926]/70 text-sm">
              Vous recevrez bientôt nos actualités et offres exclusives. À très
              vite chez Namaste GIEN !
            </p>
          </div>
        ) : (
          /* Subscribe form */
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="votre@email.com"
                autoComplete="email"
                className={cn(
                  "flex-1 px-5 py-3.5 rounded-full font-body text-[#2D2926] bg-[#FDF6EC]",
                  "border-2 placeholder:text-[#2D2926]/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#E8731A] focus:ring-offset-2 focus:ring-offset-[#F5EDE0]",
                  "transition-colors duration-200",
                  error
                    ? "border-[#C23B22]"
                    : "border-[#D4A843]/50 focus:border-[#E8731A]"
                )}
                aria-describedby={error ? "newsletter-error" : undefined}
                aria-invalid={!!error}
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#E8731A] text-[#FDF6EC] font-body font-semibold rounded-full
                           hover:bg-[#d4651a] active:bg-[#c0591a] transition-colors duration-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8731A]
                           focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5EDE0]
                           whitespace-nowrap"
              >
                S&apos;abonner
              </button>
            </div>

            {error && (
              <p
                id="newsletter-error"
                role="alert"
                className="font-body text-sm text-[#C23B22] text-left px-2"
              >
                {error}
              </p>
            )}

            <p className="font-body text-xs text-[#2D2926]/50 px-2">
              En vous inscrivant, vous acceptez notre politique de
              confidentialité. Vous pouvez vous désinscrire à tout moment.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
