/**
 * Namaste Gien — Wix SDK Client Initialization
 * Uses OAuthStrategy for public/headless access.
 * WIX_CLIENT_ID must be set in .env.local
 */
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { bookings } from "@wix/bookings";
import { orders } from "@wix/ecom";
import { members } from "@wix/members";

if (!process.env.WIX_CLIENT_ID) {
  throw new Error(
    "WIX_CLIENT_ID is not set. Please add it to your .env.local file."
  );
}

export const wixClient = createClient({
  modules: {
    products,
    collections,
    bookings,
    orders,
    members,
  },
  auth: OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID,
  }),
});

export type WixClient = typeof wixClient;
