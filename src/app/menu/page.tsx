"use client";

import { useMenu } from "@/hooks/useMenu";
import CategoryTabs from "@/components/menu/CategoryTabs";
import MenuFilter from "@/components/menu/MenuFilter";
import MenuGrid from "@/components/menu/MenuGrid";

export default function MenuPage() {
  const {
    items,
    loading,
    activeCategory,
    setActiveCategory,
    activeFilter,
    setActiveFilter,
  } = useMenu();

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <section className="bg-indigo-dark py-16 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">
          Notre Carte
        </h1>
        <p className="mt-4 font-accent text-lg md:text-xl text-gold max-w-xl mx-auto">
          Une cuisine franco-indienne aux épices soigneusement sélectionnées,
          entre tradition et raffinement.
        </p>
      </section>

      {/* Sticky nav area */}
      <div className="sticky top-0 z-10 bg-cream shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Filters + grid */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <MenuFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div
              className="w-10 h-10 rounded-full border-4 border-sand border-t-saffron animate-spin"
              role="status"
              aria-label="Chargement du menu"
            />
            <p className="font-body text-charcoal/50 text-sm">
              Chargement du menu…
            </p>
          </div>
        ) : (
          <MenuGrid items={items} />
        )}
      </main>
    </div>
  );
}
