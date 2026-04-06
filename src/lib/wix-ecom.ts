import { getWixClient } from "./wix-client";

const client = getWixClient();

export async function getProducts(collectionId?: string) {
  try {
    let query = client.products.queryProducts();
    if (collectionId) {
      query = query.eq("collectionIds", collectionId);
    }
    const { items } = await query.find();
    return items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { items } = await client.products
      .queryProducts()
      .eq("slug", slug)
      .find();
    return items[0] || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getCollections() {
  try {
    const { items } = await client.products.queryProductCollections().find();
    return items;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export async function getCurrentCart() {
  try {
    return await client.cart.getCurrentCart();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function addToCart(productId: string, quantity: number = 1) {
  try {
    return await client.cart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            catalogItemId: productId,
            appId: "1380b703-ce81-ff05-f115-39571d94dfcd",
          },
          quantity,
        },
      ],
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}

export async function updateCartItemQuantity(
  lineItemId: string,
  quantity: number
) {
  try {
    return await client.cart.updateCurrentCartLineItemQuantity([
      { _id: lineItemId, quantity },
    ]);
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

export async function removeFromCart(lineItemId: string) {
  try {
    return await client.cart.removeLineItemsFromCurrentCart([lineItemId]);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return null;
  }
}

export async function createCheckout(cartId: string) {
  try {
    return await client.checkout.createCheckout({
      lineItems: [],
      channelType: checkout.ChannelType.WEB,
    });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return null;
  }
}
