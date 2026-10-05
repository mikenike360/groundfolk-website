# Hollowmere — Independent Animated Series Starter

A production-ready Next.js starter for an independent animated cartoon series: watch episodes, explore characters, and sell merch through Shopify — with a mock storefront when credentials are missing.

## Stack

- **Next.js** (App Router) + **React** + **TypeScript**
- **Tailwind CSS** design tokens via CSS variables
- **ESLint** + **Prettier**
- **Shopify Storefront API** (optional; mock merch fallback)
- **YouTube / Vimeo** embeds for episode playback

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port you pass to `next dev -p`).

Useful scripts:

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # run production build
npm run lint         # ESLint
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Environment / Shopify

Copy the example env file:

```bash
cp .env.example .env.local
```

| Variable | Purpose |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | Your shop domain, e.g. `your-store.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token from a Shopify custom app |

Without these variables, the site serves placeholder products from `data/mock-products.ts` and keeps cart state in the browser. Checkout is disabled until Shopify is connected (then cart mutations use the Storefront API and redirect to the Shopify checkout URL).

### Connecting Shopify

1. In Shopify Admin → **Settings → Apps and sales channels → Develop apps**.
2. Create an app and enable **Storefront API** scopes for products and carts.
3. Install the app and copy the **Storefront API access token**.
4. Set `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` in `.env.local`.
5. Restart the dev server.

Never commit real tokens. `.env*` is gitignored; `.env.example` is safe to commit.

## Project structure

```
app/           # Routes (App Router)
components/    # Reusable UI
data/          # Local editorial content (episodes, characters, site copy, mock products)
lib/           # Shopify client, cart context, helpers
types/         # Shared TypeScript types
public/        # Static assets (placeholder artwork lives in public/placeholders/)
```

## Adding episodes & characters

Edit local data files — no CMS required:

- Episodes: `data/episodes.ts`
- Characters: `data/characters.ts`
- Site name / tagline / social / creator: `data/site.ts`

Episode fields: `id`, `slug`, `title`, `season`, `episodeNumber`, `description`, `thumbnail`, `videoProvider` (`youtube` | `vimeo`), `videoId`, `duration`, `releaseDate`, `featured`.

Character fields: `id`, `slug`, `name`, `description`, `bio`, `image`, `personality`, `featured`, `episodeSlugs`, `relatedCharacterSlugs`.

## Replacing placeholder artwork

SVG placeholders live in `public/placeholders/`. Replace them with your own images (PNG/WebP/JPG recommended for production) and update the paths in `data/episodes.ts`, `data/characters.ts`, and `data/mock-products.ts`.

For Shopify products, images come from Shopify CDN once credentials are configured.

## Design system

CSS variables in `app/globals.css`:

`--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--muted`, `--border` (plus related foreground tokens).

Tune these to invent a brand later without rewriting components. Motion respects `prefers-reduced-motion`.

## Deploy on Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` in project env settings (optional).
4. Deploy.

## Notes

- No user accounts, custom video hosting, or custom payments.
- Editorial content stays in `data/`; commerce goes through Shopify (or mocks).
- Newsletter form is a UI placeholder — connect your email provider when ready.
