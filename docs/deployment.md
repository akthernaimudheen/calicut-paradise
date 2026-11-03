# Deployment instructions

The site is a standard Next.js App Router app with **no database, no API routes and no
server state**. Anything with Node 20+ and a build step can host it. Nothing here should be
run against a Calicut Paradise-owned domain without written approval from the owner.

---

## 0. Before you deploy anything

1. `npm run typecheck && npm run lint && npm run test && npm run build` — all four must pass.
2. Set `NEXT_PUBLIC_SITE_URL` to the exact origin you are deploying to. It drives
   canonical tags, Open Graph URLs, `sitemap.xml` and `robots.txt`.
3. Confirm the demo disclaimer is still in the footer ("Independent website concept…").
   Remove it only after the restaurant approves the build.

```bash
# .env.local (never committed)
NEXT_PUBLIC_SITE_URL=https://preview.example.com
```

---

## 1. Quick preview (no accounts needed)

```bash
npm install
npm run build
npm start            # http://localhost:3000
```

For a temporary public preview from your own machine:

```bash
npx vercel --prod=false    # or: npx netlify deploy  /  cloudflared tunnel --url http://localhost:3000
```

A tunnel URL is the fastest way to show the site on the owner's phone in the restaurant.
It is a preview, not a deployment: it dies with the process.

---

## 2. Vercel (simplest permanent host)

1. Push the project to a Git repository you control.
2. Import it at vercel.com → Framework preset **Next.js** (auto-detected).
3. Environment variable: `NEXT_PUBLIC_SITE_URL = https://<project>.vercel.app`.
4. Deploy. Every later push redeploys.
5. Custom domain: Project → Settings → Domains → add `calicutparadise.in` (or whatever the
   owner registers) and point the DNS records Vercel shows.

## 3. Any Node host (Railway, Render, Fly, a VPS)

```bash
npm ci
npm run build
NEXT_PUBLIC_SITE_URL=https://your-domain npm start   # binds 0.0.0.0:3000
```

Put a reverse proxy (Caddy/Nginx) in front for TLS. Set `PORT` if the platform requires it —
`next start -p $PORT` works too.

## 4. Static export (not recommended)

`output: "export"` would work for `/`, `/menu`, `/reserve` and `/robots.txt`, but
`/opengraph-image` is rendered by a route handler and would need to be replaced with a
static PNG. Canonical/OG tags stay correct as long as `NEXT_PUBLIC_SITE_URL` is set at build
time. Only worth it if the host cannot run Node.

---

## 5. Domain + DNS

| Record | Name | Value |
| ------ | ---- | ----- |
| A / ALIAS | `@` | host's apex target |
| CNAME | `www` | host's target |
| TXT | `@` | any verification record the host asks for |

Then update `NEXT_PUBLIC_SITE_URL` and redeploy so canonicals point at the real domain.
Decide with the owner whether `www` or apex is canonical; the site uses whichever you set.

---

## 6. Post-deploy checks (5 minutes)

```bash
BASE=https://your-domain

curl -sI $BASE | head -1                       # 200
curl -s  $BASE | grep -o '<link rel="canonical"[^>]*>'   # correct origin
curl -s  $BASE/robots.txt                      # Sitemap: line present
curl -s  $BASE/sitemap.xml | grep -c '<url>'   # 3 + one per menu section
curl -sI $BASE/opengraph-image | head -1       # 200 image/png
```

Then on a phone:

- [ ] Menu → add 2 dishes → cart → send → WhatsApp opens **from the owner's phone** with the
      itemised message and the counter receives it
- [ ] Reservation form → message arrives with date/time/guests/seating
- [ ] Sticky bottom bar: Call dials, Directions opens Maps, Menu navigates
- [ ] Every image loads (no grey boxes); check on 4G, not just Wi-Fi
- [ ] Rotate the phone: no horizontal scroll
- [ ] iOS Safari + Android Chrome both checked

## 7. Search Console / analytics

1. Add the property in Google Search Console, verify by DNS TXT or the HTML tag in
   `app/layout.tsx`, submit `https://your-domain/sitemap.xml`.
2. **Update the Google Business Profile** to point at the new site — this is what actually
   drives local traffic for "biryani restaurant Thrissur".
3. Analytics are deliberately not included (no cookie banner needed). If the owner wants
   them, add a privacy-friendly option such as Plausible or Vercel Analytics.

## 8. Rollback

Every host above keeps immutable deployments. Roll back from the dashboard; no data
migration is involved because the app stores nothing server-side. The visitor's cart lives in
`localStorage` under the key `calicut-paradise.enquiry.v1`.
