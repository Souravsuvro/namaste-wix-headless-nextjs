import { createClient, OAuthStrategy } from "@wix/sdk";
import { currentCart } from "@wix/ecom";
import { availabilityCalendar, bookings } from "@wix/bookings";
import { items } from "@wix/data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let wixClientInstance: any = null;

export function getWixClient() {
  if (wixClientInstance) return wixClientInstance;

  wixClientInstance = createClient({
    modules: {
      currentCart,
      availabilityCalendar,
      bookings,
      items,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || "",
    }),
  });

  return wixClientInstance;
}

export type WixClient = ReturnType<typeof getWixClient>;
