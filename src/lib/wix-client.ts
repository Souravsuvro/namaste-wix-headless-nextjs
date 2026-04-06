import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, cart, checkout, orders } from "@wix/ecom";
import { availabilityCalendar, bookings } from "@wix/bookings";
import { items } from "@wix/data";

export function getWixClient() {
  return createClient({
    modules: {
      products,
      cart,
      checkout,
      orders,
      availabilityCalendar,
      bookings,
      items,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
    }),
  });
}

export type WixClient = ReturnType<typeof getWixClient>;
