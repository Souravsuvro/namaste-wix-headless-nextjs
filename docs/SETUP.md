# Setup Guide

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **npm** (included with Node.js) or **yarn**
- **Wix Account** — [Sign up](https://www.wix.com/)
- **Git** — [Download](https://git-scm.com/)

## Step 1: Clone & Install

```bash
git clone https://github.com/your-org/namaste-wix-headless-nextjs.git
cd namaste-wix-headless-nextjs
npm install
```

## Step 2: Configure Wix Headless

Follow the [Wix Integration Guide](WIX-INTEGRATION.md) to:

1. Create a Wix Headless project
2. Set up eCommerce products (menu items)
3. Configure Bookings (table reservations)
4. Create CMS collections (testimonials, gallery, FAQ)
5. Obtain your Client ID and API Key

## Step 3: Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_WIX_CLIENT_ID=your_wix_client_id_here
WIX_API_KEY=your_wix_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key_here  # Optional
```

### Where to find your credentials

- **Wix Client ID**: Wix Dashboard → Settings → Headless Settings → OAuth Apps
- **Wix API Key**: Wix Dashboard → Settings → API Keys
- **Google Maps Key**: [Google Cloud Console](https://console.cloud.google.com/)

## Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Step 5: Customize Content

### Menu Items
Menu items are managed through Wix eCommerce Products. The sample data in `src/types/menu.ts` provides fallback content when the Wix API is not connected.

### Translations
Edit the JSON files in `public/locales/`:
- `fr.json` — French (default)
- `en.json` — English

### Brand Colors
Modify `tailwind.config.ts` and `src/app/globals.css` to adjust the color palette.

### Images
Replace images in `public/images/` with your own. Maintain the same filenames or update references in components.

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Wix API errors
- Verify your Client ID is correct in `.env.local`
- Ensure your Wix project has the required modules enabled (eCommerce, Bookings, CMS)
- Check that CORS is configured for your domain in Wix Dashboard

### Build errors
```bash
npm run build
```
Check the output for specific TypeScript or configuration errors.
