"use client";

import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/types/menu";

export interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

interface CategoryTab {
  label: string;
  slug: MenuCategory;
}

const CATEGORY_TABS: CategoryTab[] = [
  { label: "Entrées", slug: "entrees" },
  { label: "Plats Principaux", slug: "plats" },
  { label: "Tandoori & Grillades", slug: "tandoori" },
  { label: "Biryani & Riz", slug: "biryani" },
  { label: "Desserts", slug: "desserts" },
  { label: "Bar & Cocktails", slug: "cocktails" },
];

export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <nav
      className="flex gap-0 overflow-x-auto scrollbar-hide border-b border-sand"
      role="tablist"
      aria-label="Catégories du menu"
    >
      {CATEGORY_TABS.map((tab) => {
        const isActive = activeCategory === tab.slug;
        return (
          <button
            key={tab.slug}
            role="tab"
            aria-selected={isActive}
            onClick={() => onCategoryChange(tab.slug)}
            className={cn(
              "relative flex-shrink-0 px-5 py-3.5 text-sm font-semibold font-body",
              "whitespace-nowrap transition-colors duration-200 ease-in-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-inset",
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5",
              "after:transition-all after:duration-200 after:ease-in-out",
              isActive
                ? "text-saffron after:bg-saffron"
                : "text-charcoal/60 hover:text-charcoal after:bg-transparent hover:after:bg-sand"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
