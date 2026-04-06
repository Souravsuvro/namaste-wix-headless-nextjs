import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AboutPreview() {
  return (
    <section className={cn("py-20 px-4 bg-[#FDF6EC]")}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column: text */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-accent text-[#E8731A] italic text-lg mb-2">
                Notre identité
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-[#2D2926] leading-snug mb-4">
                Notre Histoire
              </h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D4A843]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                <div className="h-px w-12 bg-[#D4A843]" />
              </div>
            </div>

            <p className="font-body text-[#2D2926]/80 text-base leading-relaxed">
              Au cœur de Gien, sur les rives paisibles de la Loire, Namaste GIEN
              est né d&apos;une rencontre inattendue entre deux grandes traditions
              culinaires : la richesse des épices indiennes et l&apos;élégance
              des produits de la vallée de la Loire.
            </p>
            <p className="font-body text-[#2D2926]/80 text-base leading-relaxed">
              Notre chef, passionné par ces deux univers, compose chaque assiette
              comme un dialogue entre les continents — du canard confit en samosa
              à la crème brûlée à la cardamome. Une cuisine de fusion authentique,
              respectueuse des saisons et des terroirs.
            </p>
            <p className="font-body text-[#2D2926]/80 text-base leading-relaxed">
              Chaque soir, notre salle vous accueille dans un cadre chaleureux
              mêlant artisanat indien et sobriété française, pour un voyage
              sensoriel unique à deux heures de Paris.
            </p>

            <div className="mt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1B3A6B] text-[#FDF6EC]
                           font-body font-semibold rounded-full hover:bg-[#152e56] active:bg-[#0f2240]
                           transition-colors duration-200 focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-[#1B3A6B] focus-visible:ring-offset-2"
              >
                En savoir plus
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

          {/* Right column: decorative quote element */}
          <div className="relative flex items-center justify-center">
            {/* Outer gold border frame */}
            <div className="relative w-full max-w-sm border-2 border-[#D4A843] rounded-2xl p-8 bg-[#FDF6EC] shadow-lg">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4A843] rounded-tl-sm" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4A843] rounded-tr-sm" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4A843] rounded-bl-sm" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4A843] rounded-br-sm" />

              {/* Decorative top ornament */}
              <div className="flex justify-center mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-[#D4A843]" />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A843"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <div className="w-8 h-px bg-[#D4A843]" />
                </div>
              </div>

              {/* Opening quote mark */}
              <p className="font-accent text-[#D4A843] text-6xl leading-none mb-2 select-none" aria-hidden="true">
                &ldquo;
              </p>

              {/* Quote text */}
              <blockquote className="font-accent italic text-xl text-[#2D2926] leading-relaxed text-center px-2">
                La cuisine est un art qui unit les peuples et enchante les sens —
                une symphonie d&apos;épices au bord de la Loire.
              </blockquote>

              {/* Closing quote mark */}
              <p className="font-accent text-[#D4A843] text-6xl leading-none text-right mt-2 select-none" aria-hidden="true">
                &rdquo;
              </p>

              {/* Attribution */}
              <div className="text-center mt-4">
                <div className="h-px w-12 bg-[#D4A843]/50 mx-auto mb-3" />
                <p className="font-body text-sm text-[#2D2926]/60 tracking-widest uppercase">
                  Le Chef, Namaste GIEN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
