# Deployment Guide

## Vercel (Recommended)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deploy

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Set environment variables in Vercel Dashboard:
   - `NEXT_PUBLIC_WIX_CLIENT_ID`
   - `WIX_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
   - `NEXT_PUBLIC_GOOGLE_MAPS_KEY` (optional)

4. Deploy to production:
   ```bash
   vercel --prod
   ```

### Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add `namastegien.fr`
3. Configure DNS:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

## Netlify

1. Connect your repository to Netlify
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Add environment variables in Site Settings → Environment Variables
4. Deploy

## Docker

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t namaste-gien .
docker run -p 3000:3000 --env-file .env.local namaste-gien
```

## Production Checklist

- [ ] Environment variables set for production
- [ ] Wix API Key has production permissions
- [ ] Custom domain configured with SSL
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Webhook URL updated in Wix dashboard
- [ ] Google Maps API key restricted to production domain
- [ ] Test all pages load correctly
- [ ] Test order flow end-to-end
- [ ] Test reservation flow end-to-end
- [ ] Verify SEO meta tags and JSON-LD schema
- [ ] Check Core Web Vitals scores
- [ ] Set up monitoring and error tracking
- [ ] Configure CDN caching headers
- [ ] Enable Vercel Analytics (if using Vercel)

## Performance Optimization

- **Images**: All images use Next.js `<Image>` component with automatic optimization
- **Fonts**: Google Fonts loaded via `next/font` for zero layout shift
- **Server Components**: Most pages use RSC for minimal client-side JS
- **Code Splitting**: Automatic per-route code splitting via Next.js App Router
- **Caching**: API responses cached with appropriate revalidation intervals
