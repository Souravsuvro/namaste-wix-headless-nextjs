import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Réservation Confirmée — Namaste GIEN",
  description:
    "Votre réservation au restaurant Namaste GIEN a été confirmée. Nous vous attendons avec impatience.",
};

export default function ReservationConfirmationPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Decorative gold top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          {/* Card with decorative gold border */}
          <div className="bg-white rounded-2xl shadow-lg border border-gold/30 overflow-hidden">
            {/* Gold accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-saffron via-gold to-saffron" />

            <div className="p-8 md:p-10">
              {/* Success icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 text-green-500"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h1 className="font-display text-3xl font-bold text-indigo text-center mb-3">
                Réservation Confirmée !
              </h1>

              {/* Gold ornament */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <div className="h-px w-12 bg-gold/40" />
              </div>

              {/* Confirmation message */}
              <p className="text-charcoal/70 text-center text-sm leading-relaxed mb-8">
                Merci pour votre réservation chez <strong className="text-indigo">Namaste GIEN</strong>.
                Un e-mail de confirmation vous a été envoyé avec tous les détails de votre réservation.
                Nous avons hâte de vous accueillir !
              </p>

              {/* Reservation details card */}
              <div className="bg-sand/50 rounded-xl border border-gold/20 p-5 mb-8">
                <h2 className="font-display text-base font-semibold text-indigo mb-4 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gold"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Détails de votre réservation
                </h2>

                <dl className="space-y-3 text-sm">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-charcoal/60 font-medium flex-shrink-0">Restaurant</dt>
                    <dd className="text-charcoal font-semibold text-right">Namaste GIEN</dd>
                  </div>
                  <div className="h-px bg-sand" />
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-charcoal/60 font-medium flex-shrink-0">Adresse</dt>
                    <dd className="text-charcoal text-right">12 Quai de Nice, 45500 Gien</dd>
                  </div>
                  <div className="h-px bg-sand" />
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-charcoal/60 font-medium flex-shrink-0">Date</dt>
                    <dd className="text-charcoal font-semibold text-right">
                      <span className="text-charcoal/40 italic text-xs">Voir e-mail de confirmation</span>
                    </dd>
                  </div>
                  <div className="h-px bg-sand" />
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-charcoal/60 font-medium flex-shrink-0">Heure</dt>
                    <dd className="text-charcoal font-semibold text-right">
                      <span className="text-charcoal/40 italic text-xs">Voir e-mail de confirmation</span>
                    </dd>
                  </div>
                  <div className="h-px bg-sand" />
                  <div className="flex items-start justify-between gap-4">
                    <dt className="text-charcoal/60 font-medium flex-shrink-0">Téléphone</dt>
                    <dd className="text-charcoal text-right">+33 2 38 XX XX XX</dd>
                  </div>
                </dl>
              </div>

              {/* Important note */}
              <div className="bg-indigo/5 border border-indigo/10 rounded-xl p-4 mb-8 text-sm text-charcoal/70">
                <p>
                  <strong className="text-indigo">Important :</strong> Si vous devez annuler ou modifier votre réservation,
                  veuillez nous contacter au moins 24h à l&apos;avance par téléphone ou par e-mail.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-saffron text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-saffron-dark transition-colors duration-200 shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-charcoal/40 mt-6">
            Des questions ? Contactez-nous au{" "}
            <a
              href="tel:+33238XXXXXX"
              className="text-saffron hover:text-saffron-dark underline underline-offset-2"
            >
              +33 2 38 XX XX XX
            </a>{" "}
            ou à{" "}
            <a
              href="mailto:contact@namastegien.fr"
              className="text-saffron hover:text-saffron-dark underline underline-offset-2"
            >
              contact@namastegien.fr
            </a>
          </p>
        </div>
      </div>

      {/* Decorative gold bottom border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
