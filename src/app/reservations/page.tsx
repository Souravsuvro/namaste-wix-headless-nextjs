"use client";

import ReservationForm from "@/components/reservations/ReservationForm";

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Decorative gold top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Page Header */}
      <section className="bg-indigo-dark text-white py-16 px-4 relative overflow-hidden">
        {/* Decorative gold circle accents */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-gold/10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-gold/10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Gold ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold/50" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gold"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <div className="h-px w-16 bg-gold/50" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
            Réserver une Table
          </h1>
          <p className="font-accent text-xl text-gold/90 italic">
            Vivez une expérience culinaire unique
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Form – takes 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-sand/60 overflow-hidden">
              {/* Gold top accent */}
              <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron" />
              <ReservationForm />
            </div>
          </div>

          {/* Info panel – 1/3 on desktop */}
          <aside className="space-y-6">
            {/* Restaurant Hours */}
            <div className="bg-white rounded-2xl border border-sand/60 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-saffron/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-saffron"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold text-indigo">
                  Horaires d&apos;ouverture
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-sand/60">
                  <span className="text-charcoal/70 font-medium">Lundi</span>
                  <span className="text-tandoori font-semibold">Fermé</span>
                </div>
                <div className="py-2 border-b border-sand/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-charcoal/70 font-medium">Mar — Dim</span>
                    <span className="text-charcoal font-semibold">12h — 14h30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-charcoal/70 font-medium"></span>
                    <span className="text-charcoal font-semibold">19h — 22h30</span>
                  </div>
                </div>
                <p className="text-xs text-charcoal/50 pt-1">
                  Réservations recommandées le week-end
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl border border-sand/60 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-indigo"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.953-5.322 3.953-9.827a8.25 8.25 0 00-16.5 0c0 4.505 2.01 7.748 3.953 9.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.146.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold text-indigo">Adresse</h2>
              </div>
              <address className="not-italic text-sm text-charcoal/80 space-y-0.5">
                <p className="font-medium text-charcoal">Namaste GIEN</p>
                <p>12 Quai de Nice</p>
                <p>45500 Gien, France</p>
                <p className="text-charcoal/50 text-xs pt-1">
                  En bord de Loire, face au château
                </p>
              </address>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl border border-sand/60 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-gold"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold text-indigo">Téléphone</h2>
              </div>
              <a
                href="tel:+33238XXXXXX"
                className="text-sm font-semibold text-saffron hover:text-saffron-dark transition-colors"
              >
                +33 2 38 XX XX XX
              </a>
              <p className="text-xs text-charcoal/50 mt-1">
                Disponible pendant les heures d&apos;ouverture
              </p>
            </div>

            {/* Gold accent quote */}
            <div className="bg-indigo/5 rounded-2xl border border-gold/20 p-5">
              <p className="font-accent text-lg italic text-indigo/80 leading-relaxed">
                &ldquo;Chaque repas est une célébration de la rencontre entre deux cultures culinaires.&rdquo;
              </p>
              <p className="text-sm text-charcoal/50 mt-2 font-medium">— Le Chef</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Decorative gold bottom border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
