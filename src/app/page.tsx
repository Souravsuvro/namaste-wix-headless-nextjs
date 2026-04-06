import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedDishes from "@/components/home/FeaturedDishes";
import AboutPreview from "@/components/home/AboutPreview";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "Namaste GIEN — Restaurant Indien | Gien, Loire Valley",
  description:
    "Découvrez Namaste GIEN, restaurant de cuisine indienne et fusion franco-indienne à Gien, dans la Vallée de la Loire. Saveurs authentiques, épices soigneusement sélectionnées et accueil chaleureux.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDishes />
      <AboutPreview />
      <Testimonials />
      <Newsletter />
    </>
  );
}
