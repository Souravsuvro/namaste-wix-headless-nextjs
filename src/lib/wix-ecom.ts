import { getWixClient } from "./wix-client";

export async function getCurrentCart() {
  try {
    const client = getWixClient();
    return await client.currentCart.getCurrentCart();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function addToCart(
  productId: string,
  quantity: number = 1
) {
  try {
    const client = getWixClient();
    return await client.currentCart.addToCurrentCart({
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
    const client = getWixClient();
    return await client.currentCart.updateCurrentCartLineItemQuantity([
      { _id: lineItemId, quantity },
    ]);
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

export async function removeFromCart(lineItemId: string) {
  try {
    const client = getWixClient();
    return await client.currentCart.removeLineItemsFromCurrentCart([
      lineItemId,
    ]);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return null;
  }
}
