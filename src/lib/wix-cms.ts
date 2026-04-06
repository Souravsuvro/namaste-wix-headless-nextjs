import { getWixClient } from "./wix-client";

export async function getCollectionItems(
  collectionId: string,
  limit: number = 50
) {
  try {
    const client = getWixClient();
    const { items: dataItems } = await client.items
      .queryDataItems({ dataCollectionId: collectionId })
      .limit(limit)
      .find();
    return dataItems.map((item: { data: Record<string, unknown> }) => item.data);
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
