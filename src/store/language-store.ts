"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore {
  locale: "fr" | "en";
  setLocale: (locale: "fr" | "en") => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      locale: "fr",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "namaste-language" }
  )
);
