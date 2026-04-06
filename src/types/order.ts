export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  specialInstructions?: string;
}

export interface OrderFormData {
  deliveryType: "delivery" | "pickup";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  notes?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: CartItem[];
  deliveryType: "delivery" | "pickup";
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryAddress?: {
    address: string;
    city: string;
    postalCode: string;
  };
  createdAt: string;
  estimatedDelivery?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivering"
  | "completed"
  | "cancelled";
