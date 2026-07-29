import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galerie — Namaste GIEN",
  description:
    "Découvrez notre galerie de photos : plats signature, intérieur du restaurant et bar. Une immersion visuelle dans l'univers franco-indien de Namaste GIEN à Gien, Loire Valley.",
};

const galleryItems = [
  {
    src: "/images/hero-restaurant-interior.png",
    alt: "Salle principale du restaurant Namaste GIEN, décorée avec des touches indiennes et françaises",
    caption: "Notre salle de restaurant",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    height: 600,
    width: 900,
  },
  {
    src: "/images/food-butter-chicken.png",
    alt: "Butter chicken servi avec du riz basmati et du pain naan, sauce tomate crémeuse aux épices",
    caption: "Butter Chicken",
    colSpan: "",
    rowSpan: "",
    height: 400,
    width: 600,
  },
  {
    src: "/images/food-biryani-royal.png",
    alt: "Biryani royal aux épices dorées, servi en cassolette avec garnitures",
    caption: "Biryani Royal",
    colSpan: "",
    rowSpan: "",
    height: 400,
    width: 600,
  },
  {
    src: "/images/food-tandoori-grill.png",
    alt: "Assortiment de grillades tandoori : poulet, agneau et légumes marinés aux épices",
    caption: "Grill Tandoori",
    colSpan: "lg:col-span-2",
    rowSpan: "",
    height: 400,
    width: 800,
  },
  {
    src: "/images/food-samosa-starter.png",
    alt: "Samosas croustillants dorés servis avec chutney à la menthe et à la mangue",
    caption: "Samosas Maison",
    colSpan: "",
    rowSpan: "",
    height: 400,
    width: 600,
  },
  {
    src: "/images/food-gulab-jamun.png",
    alt: "Gulab jamun, beignets moelleux au sirop de rose et de cardamome, garnis de pistaches",
    caption: "Gulab Jamun",
    colSpan: "",
    rowSpan: "",
    height: 400,
    width: 600,
  },
  {
    src: "/images/hero-bar-interior.png",
    alt: "Bar du restaurant Namaste GIEN avec sa sélection de vins de Loire et cocktails inspirés de l'Inde",
    caption: "Notre Bar & Sélection de Vins",
    colSpan: "lg:col-span-3",
    rowSpan: "",
    height: 450,
    width: 1200,
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-sand">
      {/* Decorative gold top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Page Header */}
      <section className="bg-cream border-b border-sand py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
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
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
            <div className="h-px w-16 bg-gold/50" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-indigo mb-4">
            Galerie
          </h1>
          <p className="font-accent text-xl italic text-charcoal/60 max-w-xl mx-auto">
            Une immersion visuelle dans l&apos;univers culinaire de Namaste GIEN
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
          {galleryItems.map((item, index) => (
            <figure
              key={index}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-sand/60 hover:shadow-md transition-shadow duration-300 ${item.colSpan} ${item.rowSpan}`}
            >
              {/* Image wrapper with overflow hidden for zoom effect */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-indigo/0 group-hover:bg-indigo/20 transition-colors duration-300" />
              </div>

              {/* Caption */}
              <figcaption className="px-4 py-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                <span className="font-body text-sm font-medium text-charcoal/80">
                  {item.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-cream border-t border-sand py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="divider-gold mb-8" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
            Venez Vivre l&apos;Expérience
          </h2>
          <p className="font-body text-charcoal/70 mb-8">
            Ces images ne sont qu&apos;un avant-goût. Réservez votre table et découvrez
            en personne toute la richesse de notre cuisine fusion franco-indienne.
          </p>
          <a
            href="/reservations"
            className="inline-flex items-center gap-2 bg-saffron text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-saffron-dark transition-colors duration-200 shadow-sm"
          >
            Réserver une Table
          </a>
        </div>
      </section>

      {/* Decorative gold bottom border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  );
}
