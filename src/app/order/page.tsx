"use client";

import { useRouter } from "next/navigation";
import Cart from "@/components/order/Cart";
import OrderForm from "@/components/order/OrderForm";
import OrderSummary from "@/components/order/OrderSummary";
import { useCartStore } from "@/store/cart-store";

export default function OrderPage() {
  const router = useRouter();
  const itemCount = useCartStore((s) => s.getItemCount());

  function handleOrderSuccess(orderId: string) {
    router.push(`/order/confirmation?orderId=${orderId}`);
  }

  return (
    <div className="min-h-screen bg-sand">
      {/* Page header */}
      <section className="bg-indigo py-12 px-4 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">
          Commander en Ligne
        </h1>
        <p className="mt-3 font-accent text-lg text-gold/80 max-w-md mx-auto">
          Livraison ou retrait sur place — fraîchement préparé pour vous.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Cart overview at top (visible on all screen sizes) */}
        <div className="mb-8">
          <Cart />
        </div>

        {itemCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <p className="font-display text-xl font-semibold text-charcoal">
              Votre panier est vide
            </p>
            <p className="font-body text-charcoal/60 max-w-xs">
              Ajoutez des plats depuis notre carte avant de passer commande.
            </p>
            <a
              href="/menu"
              className="mt-2 inline-block px-6 py-3 rounded-xl bg-saffron text-cream font-semibold font-body text-sm hover:bg-saffron-dark transition-colors"
            >
              Voir la carte
            </a>
          </div>
        ) : (
          /* Two-column layout: form (left) + summary sidebar (right) */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left — order form */}
            <div className="w-full lg:flex-1 bg-white rounded-2xl border border-sand shadow-sm p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-indigo mb-6">
                Vos informations
              </h2>
              <OrderForm onSuccess={handleOrderSuccess} />
            </div>

            {/* Right — order summary sidebar */}
            <div className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-4">
              <OrderSummary />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
