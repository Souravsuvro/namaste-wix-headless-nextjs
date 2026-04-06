"use client";

import { cn } from "@/lib/utils";

export interface MenuFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

interface FilterOption {
  label: string;
  value: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { label: "Tous", value: "all" },
  { label: "Végétarien", value: "vegetarian" },
  { label: "Végan", value: "vegan" },
  { label: "Sans Gluten", value: "gluten_free" },
  { label: "Épicé", value: "spicy" },
];

export default function MenuFilter({
  activeFilter,
  onFilterChange,
}: MenuFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      role="group"
      aria-label="Filtres alimentaires"
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = activeFilter === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            aria-pressed={isActive}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold font-body",
              "border transition-all duration-200 ease-in-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2",
              "whitespace-nowrap",
              isActive
                ? "bg-saffron text-cream border-saffron shadow-md shadow-saffron/30"
                : "bg-white text-charcoal border-sand hover:border-saffron hover:text-saffron hover:bg-saffron/5"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
