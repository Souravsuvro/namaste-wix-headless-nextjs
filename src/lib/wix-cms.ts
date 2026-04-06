import { getWixClient } from "./wix-client";

const client = getWixClient();

export async function getCollectionItems(
  collectionId: string,
  limit: number = 50
) {
  try {
    const { items } = await client.items
      .queryDataItems({ dataCollectionId: collectionId })
      .limit(limit)
      .find();
    return items.map((item) => item.data);
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    return [];
  }
}

export async function getTestimonials() {
  return getCollectionItems("Testimonials");
}

export async function getGalleryImages() {
  return getCollectionItems("Gallery");
}

export async function getFAQs() {
  return getCollectionItems("FAQ");
}

export async function getTeamMembers() {
  return getCollectionItems("Team");
}
