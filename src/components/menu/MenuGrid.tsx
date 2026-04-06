"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { MenuItem as MenuItemType } from "@/types/menu";
import MenuItem from "@/components/menu/MenuItem";

export interface MenuGridProps {
  items: MenuItemType[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

export default function MenuGrid({ items }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold font-display text-charcoal/60">
          Aucun plat trouvé
        </p>
        <p className="mt-1 text-sm text-charcoal/40 font-body">
          Essayez de modifier vos filtres.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={items.map((i) => i._id).join("-")}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item) => (
          <motion.div key={item._id} variants={itemVariants}>
            <MenuItem item={item} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
