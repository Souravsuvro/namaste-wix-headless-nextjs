# Namaste GIEN — Restaurant Indien

> **Where Spice Meets the Loire** — A production-ready Wix Headless restaurant platform built with Next.js

Premium casual Indian restaurant website for Namaste GIEN, located in Gien, Loire Valley, France. Integrates with Wix Headless APIs for eCommerce, Bookings, and CMS.

## Architecture

```
┌──────────────────────────────────────────────────┐
│                   Next.js App                     │
│              (App Router / RSC)                   │
├──────────────────────────────────────────────────┤
│  Pages         │  Components      │  API Routes  │
│  ─────         │  ──────────      │  ──────────  │
│  / (Home)      │  Layout          │  /api/orders │
│  /menu         │  Home            │  /api/reserv │
│  /order        │  Menu            │  /api/webhook│
│  /reservations │  Order           │              │
│  /bar          │  Reservations    │              │
│  /gallery      │  UI Components   │              │
│  /about        │                  │              │
│  /contact      │                  │              │
├──────────────────────────────────────────────────┤
│              State Management                     │
│         Zustand (Cart + Language)                 │
├──────────────────────────────────────────────────┤
│              Wix Headless SDK                     │
│   @wix/ecom  │  @wix/bookings  │  @wix/data     │
│   Products   │  Availability   │  CMS Content   │
│   Cart       │  Bookings       │  Testimonials  │
│   Checkout   │  Services       │  Gallery       │
└──────────────────────────────────────────────────┘
```

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14+ (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Backend | Wix Headless SDK (@wix/sdk, @wix/ecom, @wix/bookings, @wix/data) |
| State | Zustand (cart, language) |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| i18n | next-intl (FR/EN) |
| Fonts | Playfair Display, DM Sans, Cormorant Garamond |

## Features

- **Interactive Menu** — Browse by category, filter by dietary needs (vegetarian, vegan, gluten-free), spice level indicators
- **Online Ordering** — Full cart system, delivery/pickup, checkout flow with Wix eCommerce
- **Table Reservations** — Date/time picker, party size, step-by-step booking with Wix Bookings
- **Bar & Cocktails** — Dedicated page with signature cocktail showcase
- **Photo Gallery** — Masonry grid with hover effects
- **Bilingual** — French (default) and English with next-intl
- **SEO Optimized** — JSON-LD schema, OpenGraph, hreflang tags, Core Web Vitals
- **Responsive** — Mobile-first design with adaptive layouts
- **Cookie Consent** — GDPR-compliant banner

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Wix Headless project (see [Wix Integration Guide](docs/WIX-INTEGRATION.md))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/namaste-wix-headless-nextjs.git
cd namaste-wix-headless-nextjs

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your Wix credentials
# See docs/SETUP.md for details

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WIX_CLIENT_ID` | Wix OAuth client ID | Yes |
| `WIX_API_KEY` | Wix API key (server-side) | Yes |
| `NEXT_PUBLIC_SITE_URL` | Site URL for OG tags | Yes |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Google Maps embed key | No |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, providers)
│   ├── page.tsx            # Homepage
│   ├── menu/               # Interactive menu
│   ├── order/              # Online ordering + confirmation
│   ├── reservations/       # Table booking + confirmation
│   ├── bar/                # Bar & cocktails
│   ├── gallery/            # Photo gallery
│   ├── about/              # Heritage story
│   ├── contact/            # Contact form
│   └── api/                # API routes (orders, reservations, webhook)
├── components/
│   ├── layout/             # Header, Footer, MobileMenu, CookieConsent
│   ├── home/               # Hero, FeaturedDishes, Testimonials, etc.
│   ├── menu/               # MenuGrid, MenuItem, CategoryTabs, MenuFilter
│   ├── order/              # Cart, OrderForm, OrderSummary, DeliveryZone
│   ├── reservations/       # DatePicker, TimeSlots, ReservationForm
│   └── ui/                 # Button, Card, Badge, Modal, Toast, SpiceLevel
├── lib/                    # Wix SDK wrappers & utilities
├── store/                  # Zustand stores (cart, language)
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
└── i18n/                   # Internationalization config
```

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | POST | Create a new order |
| `/api/reservations` | POST | Create a reservation |
| `/api/webhook` | POST | Handle Wix webhook events |

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Saffron Orange | `#E8731A` | CTAs, accents, appetite stimulation |
| Gien Indigo | `#1B3A6B` | Headers, trust, navigation |
| Loire Gold | `#D4A843` | Premium elements, borders |
| Tandoori Red | `#C23B22` | Sparing accents, alerts |
| Cream White | `#FDF6EC` | Background |
| Warm Sand | `#F5EDE0` | Secondary background |
| Charcoal | `#2D2926` | Body text |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

**Namaste GIEN** — 12 Quai de Nice, 45500 Gien, France | [contact@namastegien.fr](mailto:contact@namastegien.fr)
