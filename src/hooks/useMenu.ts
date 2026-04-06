"use client";

import { useState, useEffect, useMemo } from "react";
import { SAMPLE_MENU_ITEMS, type MenuItem, type MenuCategory, type DietaryFilter } from "@/types/menu";

export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    // In production, fetch from Wix eCommerce API
    // For now, use sample data
    setItems(SAMPLE_MENU_ITEMS);
    setLoading(false);
  }, []);

  const filteredItems = useMemo(() => {
    let filtered = items;

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category === activeCategory
      );
    }

    if (activeFilter !== "all") {
      switch (activeFilter as DietaryFilter) {
        case "vegetarian":
          filtered = filtered.filter((item) => item.isVegetarian);
          break;
        case "vegan":
          filtered = filtered.filter((item) => item.isVegan);
          break;
        case "gluten_free":
          filtered = filtered.filter((item) => item.isGlutenFree);
          break;
        case "spicy":
          filtered = filtered.filter((item) => item.spiceLevel >= 3);
          break;
      }
    }

    return filtered;
  }, [items, activeCategory, activeFilter]);

  const categories: { slug: string; name: string }[] = [
    { slug: "all", name: "Tous" },
    { slug: "entrees", name: "Entrées" },
    { slug: "plats", name: "Plats Principaux" },
    { slug: "tandoori", name: "Tandoori & Grillades" },
    { slug: "biryani", name: "Biryani & Riz" },
    { slug: "desserts", name: "Desserts" },
    { slug: "cocktails", name: "Bar & Cocktails" },
  ];

  return {
    items: filteredItems,
    allItems: items,
    loading,
    activeCategory,
    setActiveCategory,
    activeFilter,
    setActiveFilter,
    categories,
  };
}
