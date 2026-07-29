import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Notre Histoire — Namaste GIEN",
  description:
    "Découvrez l'histoire de Namaste GIEN, restaurant de cuisine fusion franco-indienne fondé en 2023 à Gien, dans la Vallée de la Loire. Notre philosophie, notre équipe et notre héritage culinaire.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Decorative gold top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* ================================================================== */}
      {/* Hero Banner                                                          */}
      {/* ================================================================== */}
      <section className="relative bg-indigo-dark text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-restaurant-interior.png"
            alt="Intérieur du restaurant Namaste GIEN"
            fill
            priority
            className="object-cover opacity-20"
          />
        </div>

        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-gold/10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full border border-gold/10 -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
          {/* Gold ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gold/50" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="h-px w-16 bg-gold/50" />
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-white">
            Notre Histoire
          </h1>
          <p className="font-accent text-2xl italic text-gold/90 max-w-2xl mx-auto">
            Un voyage culinaire entre l&apos;Inde et la Loire
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 1 – Un Héritage Fusion                                     */}
      {/* ================================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <p className="font-accent text-saffron text-lg italic mb-3">Depuis 2023</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-indigo mb-6">
              Un Héritage Fusion
            </h2>

            {/* Gold divider */}
            <div className="w-16 h-0.5 bg-gold mb-6" />

            <div className="space-y-4 text-charcoal/80 leading-relaxed">
              <p>
                Namaste GIEN est né d&apos;une vision audacieuse : marier la richesse aromatique
                de la cuisine indienne avec la finesse et la tradition culinaire française,
                au cœur de la Vallée de la Loire.
              </p>
              <p>
                Fondé en 2023, notre restaurant s&apos;est installé au bord de la Loire, dans la
                belle ville de Gien, connue pour son château Renaissance et ses vins réputés.
                Nous avons voulu créer un lieu où deux cultures se rencontrent dans une harmonie
                naturelle — à table comme en salle.
              </p>
              <p>
                Notre concept de fusion franco-indienne n&apos;est pas un simple mélange : c&apos;est
                un dialogue entre deux traditions gastronomiques millénaires, respecté avec
                soin et réinterprété avec créativité.
              </p>
            </div>

            {/* Accent quote */}
            <blockquote className="mt-8 pl-4 border-l-2 border-gold">
              <p className="font-accent text-xl italic text-indigo/70 leading-relaxed">
                &ldquo;Gien nous a accueillis comme une famille. Nous rendons cet accueil
                à travers chaque plat que nous servons.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-charcoal/50 font-medium">
                — Le fondateur de Namaste GIEN
              </footer>
            </blockquote>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/hero-restaurant-interior.png"
                alt="La salle principale de Namaste GIEN, ambiance chaleureuse et décor fusion"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative gold frame offset */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-gold/30 -z-10" />
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="divider-gold" />
      </div>

      {/* ================================================================== */}
      {/* Section 2 – Notre Philosophie                                       */}
      {/* ================================================================== */}
      <section className="bg-sand/40 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-accent text-saffron text-lg italic mb-3">Notre Engagement</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-indigo mb-4">
              Notre Philosophie
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand/60">
              <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-saffron"
                  aria-hidden="true"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-indigo mb-3">
                Produits Locaux
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Nous travaillons avec les producteurs de la Vallée de la Loire pour sourcer
                nos légumes, viandes et produits laitiers. La fraîcheur et la qualité locale
                sont au cœur de notre cuisine.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand/60">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-gold"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-indigo mb-3">
                Épices Authentiques
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Nos épices sont sélectionnées directement en Inde — cumin, cardamome, safran,
                garam masala. Chaque mélange est préparé artisanalement dans notre cuisine
                selon des recettes transmises de génération en génération.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-sand/60">
              <div className="w-12 h-12 rounded-full bg-indigo/10 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-indigo"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg font-bold text-indigo mb-3">
                De la Ferme à la Table
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                Notre démarche farm-to-table s&apos;inscrit dans une vision durable et respectueuse
                de l&apos;environnement. Nous privilégions les circuits courts, réduisons les
                emballages et compostons nos déchets organiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="divider-gold" />
      </div>

      {/* ================================================================== */}
      {/* Section 3 – Notre Équipe                                            */}
      {/* ================================================================== */}
      <section className="max-w-7xl mx-auto px-4 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/food-tandoori-grill.png"
                alt="Le chef en train de préparer des grillades tandoori dans les cuisines de Namaste GIEN"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative gold frame offset */}
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl border-2 border-gold/30 -z-10" />
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="font-accent text-saffron text-lg italic mb-3">L&apos;Âme de Namaste</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-indigo mb-6">
              Notre Équipe
            </h2>
            <div className="w-16 h-0.5 bg-gold mb-6" />

            <div className="space-y-4 text-charcoal/80 leading-relaxed">
              <p>
                Notre chef, formé dans les grandes cuisines de Mumbai puis de Lyon, a passé
                plus de quinze ans à parfaire son art des deux côtés des Alpes. Son parcours
                l&apos;a conduit de la cuisine du palace Taj Mahal à Mumbai jusqu&apos;aux étoilés
                de la région lyonnaise, avant de poser ses valises à Gien.
              </p>
              <p>
                Sa passion est simple : démontrer que la cuisine indienne et la gastronomie
                française partagent bien plus qu&apos;elles ne s&apos;opposent — le respect du
                produit, la maîtrise des sauces et le soin apporté à chaque détail.
              </p>
              <p>
                Toute notre équipe de salle partage cette même philosophie d&apos;hospitalité.
                Chez nous, chaque convive est traité avec le même soin qu&apos;un hôte de marque.
                &ldquo;Namaste&rdquo; signifie &ldquo;je te salue&rdquo; — et c&apos;est exactement ce que nous
                faisons à chaque table.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Section 4 – Timeline / Milestones                                   */}
      {/* ================================================================== */}
      <section className="bg-indigo-dark text-white py-16 md:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gold" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gold" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <p className="font-accent text-gold text-lg italic mb-3">Notre Parcours</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Jalons & Milestones
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </div>

          {/* Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2 hidden md:block" />

            <div className="space-y-10 md:space-y-0">
              {/* Milestone 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                <div className="md:text-right md:pr-8 mb-4 md:mb-0">
                  <span className="inline-block bg-gold text-indigo-dark text-sm font-bold px-3 py-1 rounded-full mb-2">
                    Février 2023
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Ouverture des Portes
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Namaste GIEN ouvre ses portes au 12 Quai de Nice, à Gien. Les premiers
                    convives découvrent notre menu de lancement : 8 entrées, 12 plats et
                    4 desserts fusion.
                  </p>
                </div>
                {/* Center dot */}
                <div className="hidden md:flex md:justify-start md:pl-8">
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-8 h-px bg-gold/30" />
                    <div className="w-4 h-4 rounded-full bg-gold border-2 border-indigo-dark" />
                  </div>
                </div>
              </div>

              {/* Milestone 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:mt-10">
                <div className="hidden md:flex md:justify-end md:pr-8">
                  <div className="relative">
                    <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-8 h-px bg-gold/30" />
                    <div className="w-4 h-4 rounded-full bg-saffron border-2 border-indigo-dark" />
                  </div>
                </div>
                <div className="md:pl-8">
                  <span className="inline-block bg-saffron text-white text-sm font-bold px-3 py-1 rounded-full mb-2">
                    Été 2023
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Première Saison Estivale
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    La terrasse en bord de Loire ouvre pour la saison estivale. Le restaurant
                    affiche complet tous les week-ends. Nous lançons notre carte des vins de Loire
                    en accord avec nos plats indiens.
                  </p>
                </div>
              </div>

              {/* Milestone 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:mt-10">
                <div className="md:text-right md:pr-8 mb-4 md:mb-0">
                  <span className="inline-block bg-gold text-indigo-dark text-sm font-bold px-3 py-1 rounded-full mb-2">
                    Décembre 2023
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Un An de Succès
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Après un an d&apos;activité, plus de 3 000 convives ont partagé notre table.
                    Nous lançons notre menu dégustation 6 services et proposons des cours de
                    cuisine fusion mensuels.
                  </p>
                </div>
                <div className="hidden md:flex md:justify-start md:pl-8">
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-8 h-px bg-gold/30" />
                    <div className="w-4 h-4 rounded-full bg-gold border-2 border-indigo-dark" />
                  </div>
                </div>
              </div>

              {/* Milestone 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center md:mt-10">
                <div className="hidden md:flex md:justify-end md:pr-8">
                  <div className="relative">
                    <div className="absolute right-0 top-1/2 translate-x-full -translate-y-1/2 w-8 h-px bg-gold/30" />
                    <div className="w-4 h-4 rounded-full bg-saffron border-2 border-indigo-dark" />
                  </div>
                </div>
                <div className="md:pl-8">
                  <span className="inline-block bg-saffron text-white text-sm font-bold px-3 py-1 rounded-full mb-2">
                    2024 & au-delà
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    L&apos;Aventure Continue
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Nous continuons d&apos;affiner notre menu, de nouer des partenariats avec des
                    producteurs locaux, et d&apos;accueillir des chefs invités de toute l&apos;Inde.
                    L&apos;histoire de Namaste GIEN s&apos;écrit encore.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* Image showcase                                                       */}
      {/* ================================================================== */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { src: "/images/food-butter-chicken.png", alt: "Butter Chicken" },
            { src: "/images/food-biryani-royal.png", alt: "Biryani Royal" },
            { src: "/images/food-samosa-starter.png", alt: "Samosas Maison" },
            { src: "/images/food-gulab-jamun.png", alt: "Gulab Jamun" },
          ].map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-indigo/0 group-hover:bg-indigo/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-semibold">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand/40 border-t border-sand py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="divider-gold mb-8" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-indigo mb-4">
            Rejoignez Notre Histoire
          </h2>
          <p className="font-body text-charcoal/70 mb-8">
            Chaque repas partagé à Namaste GIEN devient une page de notre histoire commune.
            Réservez votre table et venez écrire la suite avec nous.
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
