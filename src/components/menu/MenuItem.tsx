"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, formatPrice } from "@/lib/utils";
import type { MenuItem as MenuItemType } from "@/types/menu";
import SpiceLevel from "@/components/ui/SpiceLevel";
import Badge from "@/components/ui/Badge";
import { useCartStore } from "@/store/cart-store";

export interface MenuItemProps {
  item: MenuItemType;
}

export default function MenuItem({ item }: MenuItemProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-white rounded-2xl overflow-hidden",
        "border border-sand shadow-sm",
        "transition-transform duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-charcoal/10"
      )}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-sand">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand to-cream">
            <span className="text-4xl opacity-30" aria-hidden="true">
              🍛
            </span>
          </div>
        )}

        {/* Signature badge overlay */}
        {item.isSignature && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-gold/90 text-white backdrop-blur-sm shadow-sm">
              ★ Signature
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Name & Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold font-display text-charcoal leading-tight line-clamp-2 flex-1">
            {item.name}
          </h3>
          <span className="flex-shrink-0 text-base font-bold text-saffron font-body">
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-charcoal/65 font-body leading-relaxed line-clamp-3">
          {item.description}
        </p>

        {/* Spice level */}
        {item.spiceLevel > 0 && (
          <SpiceLevel
            level={item.spiceLevel as 0 | 1 | 2 | 3 | 4 | 5}
            showLabel
            className="mt-auto"
          />
        )}

        {/* Dietary badges */}
        {(item.isVegetarian || item.isVegan || item.isGlutenFree) && (
          <div className="flex flex-wrap gap-1.5">
            {item.isVegan && (
              <Badge variant="success">🌱 Végan</Badge>
            )}
            {item.isVegetarian && !item.isVegan && (
              <Badge variant="success">🥦 Végétarien</Badge>
            )}
            {item.isGlutenFree && (
              <Badge variant="accent">Sans Gluten</Badge>
            )}
          </div>
        )}

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          aria-label={`Ajouter ${item.name} au panier`}
          className={cn(
            "mt-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold font-body",
            "transition-all duration-200 ease-in-out",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2",
            added
              ? "bg-green-500 text-white scale-95"
              : "bg-indigo text-cream hover:bg-indigo-light active:scale-95"
          )}
        >
          {added ? "✓ Ajouté !" : "Ajouter au panier"}
        </button>
      </div>
    </article>
  );
}
