import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Commande Confirmée — Namaste GIEN",
  description:
    "Votre commande a bien été reçue. Merci de votre confiance — nous préparons vos plats avec soin.",
};

interface ConfirmationPageProps {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderConfirmationPage({
  searchParams,
}: ConfirmationPageProps) {
  const { orderId } = await searchParams;

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-sand shadow-sm p-8 md:p-12 text-center space-y-6">
        {/* Success icon */}
        <div className="flex items-center justify-center mx-auto w-20 h-20 rounded-full bg-saffron/10">
          <svg
            className="w-10 h-10 text-saffron"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-indigo-dark">
            Commande Confirmée !
          </h1>
          <p className="font-accent text-lg text-gold">Namaste — Merci !</p>
        </div>

        {/* Order number */}
        {orderId && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand border border-sand/80">
            <span className="font-body text-sm text-charcoal/60">
              Numéro de commande :
            </span>
            <span className="font-body text-sm font-bold text-saffron tracking-wide uppercase">
              {orderId}
            </span>
          </div>
        )}

        {/* Message */}
        <div className="space-y-3 font-body text-charcoal/70 text-sm leading-relaxed">
          <p>
            Votre commande a bien été reçue et est en cours de préparation.
            Vous recevrez une confirmation par e-mail dans quelques instants.
          </p>
          <p>
            Notre équipe met tout son cœur pour vous offrir une expérience
            culinaire exceptionnelle. À très bientôt !
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-sand" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-sand bg-white text-charcoal font-semibold font-body text-sm hover:bg-sand transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/menu"
            className="px-6 py-3 rounded-xl bg-saffron text-cream font-semibold font-body text-sm hover:bg-saffron-dark transition-colors"
          >
            Voir la carte
          </Link>
        </div>
      </div>
    </div>
  );
}
