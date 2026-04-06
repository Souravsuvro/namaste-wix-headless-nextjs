import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Cormorant_Garamond } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Namaste GIEN — Restaurant Indien | Gien, Loire Valley",
  description:
    "Découvrez Namaste GIEN, restaurant de cuisine indienne et fusion franco-indienne à Gien, dans la Vallée de la Loire. Saveurs authentiques, épices soigneusement sélectionnées et accueil chaleureux.",
  openGraph: {
    title: "Namaste GIEN — Restaurant Indien | Gien, Loire Valley",
    description:
      "Découvrez Namaste GIEN, restaurant de cuisine indienne et fusion franco-indienne à Gien, dans la Vallée de la Loire.",
    locale: "fr_FR",
    siteName: "Namaste GIEN",
    url: "https://www.namaste-gien.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Namaste GIEN — Restaurant Indien | Gien, Loire Valley",
    description:
      "Découvrez Namaste GIEN, restaurant de cuisine indienne et fusion franco-indienne à Gien, dans la Vallée de la Loire.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    languages: {
      fr: "https://www.namaste-gien.fr/fr",
      en: "https://www.namaste-gien.fr/en",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Namaste GIEN",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12 Quai de Nice",
    addressLocality: "Gien",
    postalCode: "45500",
    addressCountry: "FR",
    addressRegion: "Centre-Val de Loire",
  },
  description:
    "Restaurant indien et fusion franco-indienne à Gien, Loire Valley. Saveurs authentiques et épices soigneusement sélectionnées.",
  telephone: "+33 2 38 XX XX XX",
  servesCuisine: ["Indian", "French Fusion"],
  priceRange: "€€",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.6838,
    longitude: 2.6286,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "19:00",
      closes: "22:30",
    },
  ],
  url: "https://www.namaste-gien.fr",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="fr"
      className={`${playfairDisplay.variable} ${dmSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
