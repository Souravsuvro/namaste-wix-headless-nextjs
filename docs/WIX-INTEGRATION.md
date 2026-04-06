# Wix Headless Integration Guide

This guide explains how to connect your Namaste GIEN website to Wix Headless backend services.

## Overview

The site uses three Wix Headless modules:

| Module | Purpose | SDK Package |
|--------|---------|-------------|
| **eCommerce** | Menu items, cart, checkout | `@wix/ecom` |
| **Bookings** | Table reservations | `@wix/bookings` |
| **CMS (Data)** | Testimonials, gallery, FAQ | `@wix/data` |

## Step 1: Create a Wix Headless Project

1. Go to [Wix.com](https://www.wix.com/) and sign in
2. Navigate to **Headless** section or create a new project
3. Select **Headless** as the project type
4. Note your **Site ID** from the dashboard

## Step 2: Create an OAuth App

1. Go to **Settings** → **Headless Settings** → **OAuth Apps**
2. Click **Create OAuth App**
3. Name it "Namaste GIEN Website"
4. Set the redirect URL to your domain (e.g., `https://namastegien.fr`)
5. Copy the **Client ID** — this is your `NEXT_PUBLIC_WIX_CLIENT_ID`

## Step 3: Generate API Key

1. Go to **Settings** → **API Keys**
2. Click **Generate API Key**
3. Select the required permissions:
   - eCommerce: Read Products, Manage Cart, Manage Checkout, Read Orders
   - Bookings: Read Services, Manage Bookings, Read Availability
   - CMS: Read Data Collections
4. Copy the API Key — this is your `WIX_API_KEY`

## Step 4: Set Up eCommerce Products

Create products in Wix for each menu item:

### Collections (Categories)
Create these product collections:
- **Entrées** (Starters)
- **Plats Principaux** (Main Courses)
- **Tandoori & Grillades** (Tandoori & Grills)
- **Biryani & Riz** (Biryani & Rice)
- **Desserts**
- **Bar & Cocktails**

### Products
For each menu item, create a product with:
- **Name**: e.g., "Butter Chicken du Chef"
- **Description**: Full description
- **Price**: e.g., €18.00
- **Image**: High-quality food photo
- **Custom Fields**:
  - `spiceLevel` (number, 0-5)
  - `isVegetarian` (boolean)
  - `isVegan` (boolean)
  - `isGlutenFree` (boolean)
  - `isSignature` (boolean)

## Step 5: Set Up Bookings

1. Go to **Bookings** in your Wix dashboard
2. Create a service called "Table Reservation"
3. Configure:
   - **Type**: Appointment
   - **Duration**: 2 hours
   - **Staff/Resource**: Restaurant (or individual tables)
   - **Availability**:
     - Tuesday–Sunday
     - Lunch: 12:00–14:30
     - Dinner: 19:00–22:30
     - Closed: Monday

## Step 6: Set Up CMS Collections

### Testimonials Collection
Create a collection named `Testimonials` with fields:
| Field | Type |
|-------|------|
| `name` | Text |
| `quote` | Rich Text |
| `rating` | Number (1-5) |
| `date` | Date |
| `avatar` | Image |

### Gallery Collection
Create a collection named `Gallery` with fields:
| Field | Type |
|-------|------|
| `title` | Text |
| `image` | Image |
| `category` | Text (food/interior/bar/team) |
| `order` | Number |

### FAQ Collection
Create a collection named `FAQ` with fields:
| Field | Type |
|-------|------|
| `question` | Text |
| `answer` | Rich Text |
| `category` | Text |
| `order` | Number |

## Step 7: Configure Webhooks

1. Go to **Settings** → **Webhooks**
2. Add a webhook URL: `https://your-domain.com/api/webhook`
3. Subscribe to events:
   - `ecom/order-created`
   - `ecom/order-updated`
   - `bookings/booking-created`
   - `bookings/booking-updated`
4. Note the webhook secret for signature verification

## SDK Client Configuration

The Wix SDK client is initialized in `src/lib/wix-client.ts`:

```typescript
import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, cart, checkout, orders } from "@wix/ecom";
import { availabilityCalendar, bookings } from "@wix/bookings";
import { items } from "@wix/data";

const wixClient = createClient({
  modules: { products, cart, checkout, orders, availabilityCalendar, bookings, items },
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! })
});
```

## API Wrapper Files

| File | Module | Functions |
|------|--------|-----------|
| `src/lib/wix-ecom.ts` | eCommerce | getProducts, getProductBySlug, addToCart, createCheckout |
| `src/lib/wix-bookings.ts` | Bookings | getAvailability, createBooking, getBookingServices |
| `src/lib/wix-cms.ts` | CMS | getCollectionItems, getTestimonials, getGalleryImages |

## Testing the Integration

1. Set your environment variables
2. Start the dev server: `npm run dev`
3. Check the browser console for Wix API connection status
4. Navigate to `/menu` — products should load from Wix
5. Add items to cart — verify cart operations work
6. Navigate to `/reservations` — check availability loads
7. Submit a test reservation — verify it appears in Wix dashboard
