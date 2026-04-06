import { NextRequest, NextResponse } from "next/server";
// In production, import from "@/lib/wix-ecom" to create orders via Wix eCommerce API

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderRequestBody {
  items: OrderItem[];
  contactInfo: ContactInfo;
  deliveryType: "delivery" | "pickup";
  deliveryAddress?: DeliveryAddress;
}

function generateOrderNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "NG-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function validateOrderBody(
  body: Partial<OrderRequestBody>
): string | null {
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return "items array is required and must not be empty";
  }

  const contact = body.contactInfo;
  if (!contact) {
    return "contactInfo is required";
  }
  if (!contact.firstName) return "contactInfo.firstName is required";
  if (!contact.lastName) return "contactInfo.lastName is required";
  if (!contact.email) return "contactInfo.email is required";
  if (!contact.phone) return "contactInfo.phone is required";

  if (!body.deliveryType) {
    return "deliveryType is required";
  }

  if (body.deliveryType === "delivery") {
    const addr = body.deliveryAddress;
    if (!addr) {
      return "deliveryAddress is required when deliveryType is 'delivery'";
    }
    if (!addr.street) return "deliveryAddress.street is required";
    if (!addr.city) return "deliveryAddress.city is required";
    if (!addr.state) return "deliveryAddress.state is required";
    if (!addr.zipCode) return "deliveryAddress.zipCode is required";
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: Partial<OrderRequestBody> = await request.json();

    const validationError = validateOrderBody(body);
    if (validationError) {
      return NextResponse.json(
        { success: false, error: validationError },
        { status: 400 }
      );
    }

    // In production: use Wix eCommerce API to create the order
    // const wixOrder = await createOrder(body);

    const orderId = crypto.randomUUID();
    const orderNumber = generateOrderNumber();

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      message: `Order ${orderNumber} has been placed successfully`,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
