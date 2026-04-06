import { NextRequest, NextResponse } from "next/server";

type WixEventType =
  | "order.created"
  | "order.updated"
  | "booking.created"
  | "booking.updated";

interface WixWebhookBody {
  eventType: WixEventType;
  data: Record<string, unknown>;
  [key: string]: unknown;
}

function verifySignature(
  signature: string | null,
  apiKey: string | undefined
): boolean {
  if (!signature || !apiKey) return false;
  // Simple comparison — in production, use HMAC verification against the raw request body
  return signature === apiKey;
}

function handleWebhookEvent(eventType: WixEventType, data: Record<string, unknown>): void {
  switch (eventType) {
    case "order.created":
      console.log("[Webhook] order.created:", JSON.stringify(data));
      break;
    case "order.updated":
      console.log("[Webhook] order.updated:", JSON.stringify(data));
      break;
    case "booking.created":
      console.log("[Webhook] booking.created:", JSON.stringify(data));
      break;
    case "booking.updated":
      console.log("[Webhook] booking.updated:", JSON.stringify(data));
      break;
    default:
      console.log("[Webhook] Unhandled event type:", eventType, JSON.stringify(data));
  }
}

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("X-Wix-Signature");
    const apiKey = process.env.WIX_API_KEY;

    if (!verifySignature(signature, apiKey)) {
      console.warn("[Webhook] Invalid or missing signature");
      return NextResponse.json(
        { success: false, error: "Unauthorized: invalid webhook signature" },
        { status: 401 }
      );
    }

    const body: WixWebhookBody = await request.json();
    const { eventType, data } = body;

    if (!eventType) {
      return NextResponse.json(
        { success: false, error: "Missing eventType in webhook payload" },
        { status: 400 }
      );
    }

    handleWebhookEvent(eventType, data ?? {});

    return NextResponse.json({ success: true, received: true }, { status: 200 });
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
