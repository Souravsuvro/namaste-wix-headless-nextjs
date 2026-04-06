import { cn } from "@/lib/utils";

export interface DeliveryZoneProps {
  className?: string;
}

const RESTAURANT_ADDRESS = "12 Quai de Nice, 45500 Gien";
const FREE_RADIUS_KM = 5;
const EXTRA_FEE_EUR = 3;

interface ZoneTier {
  label: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

const ZONE_TIERS: ZoneTier[] = [
  {
    label: `Jusqu'à ${FREE_RADIUS_KM} km`,
    description: "Livraison offerte",
    highlight: true,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: `Au-delà de ${FREE_RADIUS_KM} km`,
    description: `+${EXTRA_FEE_EUR} € de frais`,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function DeliveryZone({ className }: DeliveryZoneProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-sand bg-cream overflow-hidden shadow-sm",
        className
      )}
      aria-labelledby="delivery-zone-title"
    >
      {/* Map placeholder */}
      <div className="relative h-40 bg-indigo overflow-hidden" aria-hidden="true">
        {/* Decorative map grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="map-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>

        {/* Road lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          viewBox="0 0 320 160"
          preserveAspectRatio="xMidYMid slice"
        >
          <line x1="0" y1="80" x2="320" y2="80" stroke="white" strokeWidth="2" />
          <line x1="160" y1="0" x2="160" y2="160" stroke="white" strokeWidth="2" />
          <line x1="0" y1="40" x2="320" y2="60" stroke="white" strokeWidth="1" />
          <line x1="0" y1="120" x2="320" y2="100" stroke="white" strokeWidth="1" />
          <line x1="80" y1="0" x2="60" y2="160" stroke="white" strokeWidth="1" />
          <line x1="240" y1="0" x2="260" y2="160" stroke="white" strokeWidth="1" />
        </svg>

        {/* Delivery radius circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 320 160"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Outer zone */}
          <circle
            cx="160"
            cy="80"
            r="60"
            fill="none"
            stroke="#D4A843"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.5"
          />
          {/* Free zone */}
          <circle cx="160" cy="80" r="36" fill="#E8731A" opacity="0.2" />
          <circle
            cx="160"
            cy="80"
            r="36"
            fill="none"
            stroke="#E8731A"
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Restaurant pin */}
          <circle cx="160" cy="80" r="6" fill="#E8731A" />
          <circle cx="160" cy="80" r="3" fill="white" />
        </svg>

        {/* Label overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-indigo-dark/80 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
          <svg
            className="w-3.5 h-3.5 text-gold flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-body text-xs text-cream/90 truncate max-w-[200px]">
            {RESTAURANT_ADDRESS}
          </span>
        </div>
      </div>

      {/* Info content */}
      <div className="px-5 py-4">
        <h3
          id="delivery-zone-title"
          className="font-display text-lg font-bold text-charcoal mb-1"
        >
          Zone de livraison
        </h3>
        <p className="font-body text-sm text-charcoal/60 mb-4">
          Nous livrons autour de{" "}
          <span className="font-medium text-charcoal">Gien (45500)</span> et ses
          environs.
        </p>

        {/* Zone tiers */}
        <ul className="space-y-3" role="list">
          {ZONE_TIERS.map((tier) => (
            <li
              key={tier.label}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3",
                tier.highlight
                  ? "bg-saffron/10 border border-saffron/20"
                  : "bg-sand border border-transparent"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0",
                  tier.highlight ? "text-saffron" : "text-charcoal/50"
                )}
              >
                {tier.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "font-body text-sm font-semibold",
                    tier.highlight ? "text-saffron-dark" : "text-charcoal"
                  )}
                >
                  {tier.label}
                </p>
                <p
                  className={cn(
                    "font-body text-xs",
                    tier.highlight ? "text-saffron" : "text-charcoal/60"
                  )}
                >
                  {tier.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Hours note */}
        <div className="mt-4 flex items-start gap-2 text-charcoal/50">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-body text-xs leading-relaxed">
            Livraison disponible du mardi au dimanche,{" "}
            <span className="font-medium">12h – 14h30</span> et{" "}
            <span className="font-medium">19h – 22h</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
