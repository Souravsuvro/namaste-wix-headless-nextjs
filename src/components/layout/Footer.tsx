import Link from "next/link";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
}

const QUICK_LINKS: FooterLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Notre Carte", href: "/menu" },
  { label: "Commander en ligne", href: "/order" },
  { label: "Réservations", href: "/reservations" },
  { label: "Bar & Cocktails", href: "/bar" },
  { label: "Galerie", href: "/gallery" },
  { label: "Notre Histoire", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const OPENING_HOURS = [
  { day: "Mardi – Dimanche", lunch: "12h00 – 14h30", dinner: "19h00 – 22h30" },
  { day: "Lundi", closed: true },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F1F3D] text-[#FDF6EC]">
      {/* Top Divider */}
      <div className="h-1 bg-gradient-to-r from-[#E8731A] via-[#D4A843] to-[#E8731A]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-heritage-fusion-light.png"
                alt="Namaste GIEN"
                width={160}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-[#D4A843] font-medium italic text-sm mb-4 tracking-wide">
              Where Spice Meets the Loire
            </p>
            <p className="text-[#FDF6EC]/70 text-sm leading-relaxed">
              Restaurant indien premium au coeur de Gien, proposant une cuisine
              authentique et des saveurs raffinées depuis la vallée de la Loire.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <SocialLink href="#" label="Facebook" icon={<FacebookIcon />} />
              <SocialLink href="#" label="Instagram" icon={<InstagramIcon />} />
              <SocialLink href="#" label="TripAdvisor" icon={<TripAdvisorIcon />} />
              <SocialLink href="#" label="Google" icon={<GoogleIcon />} />
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-[#D4A843] font-semibold uppercase tracking-widest text-xs mb-5">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#FDF6EC]/70 hover:text-[#E8731A] text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#E8731A] transition-all duration-200 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h3 className="text-[#D4A843] font-semibold uppercase tracking-widest text-xs mb-5">
              Horaires d&apos;ouverture
            </h3>
            <ul className="space-y-4">
              {OPENING_HOURS.map(({ day, lunch, dinner, closed }) => (
                <li key={day}>
                  <p className="text-[#FDF6EC] text-sm font-medium mb-1">{day}</p>
                  {closed ? (
                    <p className="text-[#E8731A]/80 text-sm">Fermé</p>
                  ) : (
                    <div className="space-y-0.5">
                      <p className="text-[#FDF6EC]/70 text-sm">
                        Déjeuner : {lunch}
                      </p>
                      <p className="text-[#FDF6EC]/70 text-sm">
                        Dîner : {dinner}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 p-3 rounded-lg border border-[#D4A843]/30 bg-[#D4A843]/5">
              <p className="text-[#D4A843] text-xs font-medium">
                Réservation recommandée le week-end
              </p>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-[#D4A843] font-semibold uppercase tracking-widest text-xs mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <ContactItem icon={<LocationIcon />} label="Adresse">
                  <a
                    href="https://maps.google.com/?q=12+Quai+de+Nice+45500+Gien"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FDF6EC]/70 hover:text-[#E8731A] text-sm transition-colors duration-200"
                  >
                    12 Quai de Nice
                    <br />
                    45500 Gien, France
                  </a>
                </ContactItem>
              </li>
              <li>
                <ContactItem icon={<PhoneIcon />} label="Téléphone">
                  <a
                    href="tel:+33238000000"
                    className="text-[#FDF6EC]/70 hover:text-[#E8731A] text-sm transition-colors duration-200"
                  >
                    +33 2 38 XX XX XX
                  </a>
                </ContactItem>
              </li>
              <li>
                <ContactItem icon={<EmailIcon />} label="Email">
                  <a
                    href="mailto:contact@namastegien.fr"
                    className="text-[#FDF6EC]/70 hover:text-[#E8731A] text-sm transition-colors duration-200"
                  >
                    contact@namastegien.fr
                  </a>
                </ContactItem>
              </li>
            </ul>

            {/* CTA */}
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center mt-6 w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#E8731A] text-white hover:bg-[#d4651a] transition-colors duration-200"
            >
              Réserver une table
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#FDF6EC]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#FDF6EC]/50 text-xs text-center sm:text-left">
            &copy; 2026 Namaste GIEN. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/legal"
              className="text-[#FDF6EC]/50 hover:text-[#FDF6EC]/80 text-xs transition-colors duration-200"
            >
              Mentions légales
            </Link>
            <Link
              href="/privacy"
              className="text-[#FDF6EC]/50 hover:text-[#FDF6EC]/80 text-xs transition-colors duration-200"
            >
              Confidentialité
            </Link>
            <Link
              href="/cgv"
              className="text-[#FDF6EC]/50 hover:text-[#FDF6EC]/80 text-xs transition-colors duration-200"
            >
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Sub-components ── */

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className="flex-shrink-0 mt-0.5 text-[#E8731A]"
        aria-label={label}
      >
        {icon}
      </span>
      <div>{children}</div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FDF6EC]/20 text-[#FDF6EC]/60 hover:border-[#E8731A] hover:text-[#E8731A] transition-colors duration-200"
    >
      {icon}
    </a>
  );
}

/* ── Icons ── */

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TripAdvisorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
    </svg>
  );
}
