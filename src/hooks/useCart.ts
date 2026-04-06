"use client";

import { useCartStore } from "@/store/cart-store";

export function useCart() {
  const store = useCartStore();

  const addItem = (product: {
    productId: string;
    name: string;
    price: number;
    image?: string;
  }) => {
    store.addItem(product);
  };

  const removeItem = (productId: string) => {
    store.removeItem(productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    store.updateQuantity(productId, quantity);
  };

  const clearCart = () => {
    store.clearCart();
  };

  return {
    items: store.items,
    deliveryType: store.deliveryType,
    setDeliveryType: store.setDeliveryType,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal: store.getSubtotal(),
    deliveryFee: store.getDeliveryFee(),
    total: store.getTotal(),
    itemCount: store.getItemCount(),
  };
}
