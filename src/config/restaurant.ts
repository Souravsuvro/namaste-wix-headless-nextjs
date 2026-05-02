/**
 * Namaste Gien — Canonical Restaurant Configuration
 * Single source of truth for all business data across the app.
 * All sensitive values come from environment variables.
 */

export const RESTAURANT_CONFIG = {
  name: "Namaste Gien",
  tagline: {
    fr: "Cuisine Indienne Authentique — Bar & Restaurant",
    en: "Authentic Indian Cuisine — Bar & Restaurant",
  },
  address: {
    street: "2 Pl. du Maréchal Foch",
    city: "Gien",
    postcode: "45500",
    department: "Loiret",
    region: "Centre-Val de Loire",
    country: "France",
    countryCode: "FR",
    full: "2 Pl. du Maréchal Foch, 45500 Gien, France",
    googleMapsUrl:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      "https://maps.google.com/?q=2+Pl.+du+Mar%C3%A9chal+Foch,+45500+Gien,+France",
  },
  contact: {
    phone: process.env.NEXT_PUBLIC_RESTAURANT_PHONE || "+33751517109",
    phoneDisplay: "+33 7 51 51 71 09",
    email:
      process.env.NEXT_PUBLIC_RESTAURANT_EMAIL || "contact@namastegien.fr",
    website: "https://www.namastegien.fr",
  },
  hours: {
    fr: {
      lundi: "Fermé",
      mardi: "12h00–14h30 | 18h30–22h30",
      mercredi: "12h00–14h30 | 18h30–22h30",
      jeudi: "12h00–14h30 | 18h30–22h30",
      vendredi: "12h00–14h30 | 18h30–22h30",
      samedi: "12h00–15h00 | 18h30–23h00",
      dimanche: "12h00–15h00 | 18h30–22h00",
    },
    en: {
      monday: "Closed",
      tuesday: "12:00–14:30 | 18:30–22:30",
      wednesday: "12:00–14:30 | 18:30–22:30",
      thursday: "12:00–14:30 | 18:30–22:30",
      friday: "12:00–14:30 | 18:30–22:30",
      saturday: "12:00–15:00 | 18:30–23:00",
      sunday: "12:00–15:00 | 18:30–22:00",
    },
  },
  social: {
    facebook: "https://www.facebook.com/NamasteGien",
    instagram: "https://www.instagram.com/NamasteGien",
  },
  brand: {
    colors: {
      primary: "#1B3A6B", // Gien Indigo Blue
      accent: "#E8731A", // Saffron Orange
      gold: "#D4A843", // Loire Gold
    },
    cuisine: "Indian",
    priceRange: "€€",
    seatingCapacity: 60,
    languages: ["fr", "en"] as const,
    defaultLanguage: "fr" as const,
    currency: "EUR",
    currencySymbol: "€",
    timezone: "Europe/Paris",
  },
  seo: {
    fr: {
      title: "Namaste Gien — Restaurant Indien & Bar | Gien, Loire",
      description:
        "Découvrez la cuisine indienne authentique au cœur de Gien. Plats Tandoori, Biryani, currys savoureux. Réservation en ligne. 2 Pl. du Maréchal Foch, 45500 Gien, Loiret.",
      keywords:
        "restaurant indien Gien, Namaste Gien, cuisine indienne Loiret, tandoori, biryani, réservation restaurant Gien",
    },
    en: {
      title: "Namaste Gien — Indian Restaurant & Bar | Gien, Loire Valley",
      description:
        "Experience authentic Indian cuisine in Gien, Loire Valley. Tandoori, Biryani, rich curries. Book your table online. 2 Pl. du Maréchal Foch, 45500 Gien, France.",
      keywords:
        "Indian restaurant Gien, Namaste Gien, Indian food Loire Valley, tandoori, biryani, book table Gien France",
    },
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Namaste Gien",
    description: "Cuisine Indienne Authentique | Bar & Restaurant",
    url: "https://www.namastegien.fr",
    telephone: "+33751517109",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2 Pl. du Maréchal Foch",
      addressLocality: "Gien",
      postalCode: "45500",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.6947,
      longitude: 2.6315,
    },
    servesCuisine: "Indian",
    priceRange: "€€",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "12:00",
        closes: "14:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "18:30",
        closes: "22:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "12:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "18:30",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday"],
        opens: "18:30",
        closes: "22:00",
      },
    ],
  },
} as const;

export type RestaurantConfig = typeof RESTAURANT_CONFIG;
