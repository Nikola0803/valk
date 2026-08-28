# CLAUDE.md — Warrior Distributions Peptides Storefront

Project memory for this repo. Read this first every session. It reconciles two sources:
(1) a read-through of this codebase, and (2) the previous developer's WordPress plugin
documentation (`valk.pdf`). Where they disagree, the discrepancy is flagged explicitly —
**trust the running code over the docs, and verify against the live server when in doubt.**

---

## Where things live

- **Code:** this is one worktree of the repo, living under `/var/www/valk/react/branches/`. The
  repo moved from `github.com/Nikola0803/valkiryie` (previous developer, no longer with the
  company) to a fork at **`github.com/conorcook7/valkyrie-react`**, which is now `origin`. See
  "Git workflow" below for the full folder layout and how sessions branch/commit/PR — read that
  section before doing any git operations in this project.
- **Ops docs (not in this repo, deliberately kept out of git/GitHub):** `/var/www/valk/react/docs/`
  - `Valkyrie_Task_Tracker.md` — the standing task/workflow tracker (WordPress Admin, Domains, CRO, Images, Affiliates/GoAffPro, Finance, Marketing, Operations, Compliance, Legal, etc.), status/priority/owner/due date per task.
  - `Valkyrie_Knowledge_Base.md` — company/site overview, domains & hosting, WP admin + the three custom plugins, standing priorities, security/cleanup punch list, handover gaps, and a codebase architecture section (§11) covering the same key routes documented below (`useCanonical.ts`, `affiliate.ts`, `woocommerce.ts`, etc.) — kept in sync with this file.
  - `Domain_Migration_Runbook.md` — the phased plan for cutting over from valkyriepeptides.com to valkyriepeps.com (301 strategy, GoAffPro affiliate-link handling, CORS allowlist fix, cutover sequence, and why the GoDaddy→Hover registrar transfer is intentionally decoupled from it). Also covers the hosting migration to Cloudways (with Cloudflare in front) that now precedes the domain cutover.
  - `CircoFlows_Payment_Integration_Scope.md` — technical scope for real card payments via CircoFlows's Hosted Payment API, integrated into the custom React checkout (not the native WooCommerce checkout). Explains why the already-installed CircoFlows plugin (Direct API) shouldn't be used as-is.
  - `Session_Summary.md` — narrative handoff summary of the work done in the 2026-07-16 session, meant to brief a fresh session quickly. Update or replace as major work sessions wrap up.
  - Both are plain files (not Claude.ai Project Knowledge) — read/write every session, update them directly as tasks move or facts get confirmed rather than treating them as static.

---

## What this is

A **headless WooCommerce store** for Valkyrie Peptides (research peptides e-commerce).

- **Backend:** WordPress + WooCommerce (products, orders, customers, coupons, form handling).
- **Frontend:** this repo — a **React 19 + Vite + TypeScript** single-page app that is the entire public storefront. Styled with **Tailwind CSS**, routed with **react-router-dom v7**.
- **Glue:** three custom WordPress plugins (PHP, **NOT in this repo** — they live on the host under `wp-content/plugins/`).

The React app is served *by* WordPress: the Router plugin replaces the WP theme and serves the built app for every public URL.

---

## The three custom WordPress plugins (server-side, not in this repo)

Get copies of all three from `wp-content/plugins/` on the host. Documented in `valk.pdf`.

1. **valkyrie-router** (`valkyrie-router.php`, v1.1.0) — the core plugin.
   - Hooks `parse_request` early and serves the React build's `index.html` for every public URL.
   - Passes through untouched: `/wp-admin`, `/wp-login`, `/wp-json` (REST API), `wp-cron`/`xmlrpc`/`wp-*.php`, WooCommerce AJAX (`wc-ajax`), and any static file that exists on disk.
   - **React build lives at `valkyrie-router/app/`.** Fallback: `wp-content/uploads/valkyrie-app/`. Overridable via `VROUTER_APP_DIR` / `VROUTER_APP_URL` constants in `wp-config.php`.
   - 301-redirects old `/product/slug` → `/products/slug` (preserves query strings).
   - Injects GA4 + GTM into `<head>` server-side. **See discrepancy #3.**
   - Auth endpoints under `/wp-json/valkyrie/v1`: `/register`, `/login`, `/validate`. Tokens are HMAC-signed with the site `AUTH_KEY`, expire after 30 days.
   - Admin page "Valkyrie Frontend" shows deploy status (app found?, location, asset count, build age) and setup tools: **Product Tabs CSV Import** (writes COA + additional-info meta) and one-time product-seeding buttons (GHRP/IGF, SS-31/CJC sets).
   - Housekeeping: `valkyrie-router.php.bak` is a stale backup — safe to delete.

2. **valkyrie-forms-plugin** (`valkyrie-forms.php`, v1.3.0) — handles all form posts under `/wp-json/valkyrie/v1`: `/contact`, `/newsletter`, `/veterans`, `/waitlist`.
   - Every submission emails `support@valkyriepeptides.com` via `wp_mail`. **SMTP constants (host/port/user/password) are hardcoded at the top of the file**; `VALKYRIE_USE_SMTP` is `false` by default.
   - Newsletter signups also stored in a `{prefix}valkyrie_newsletter` DB table (email, timestamp, IP). Admin page lists/exports signups.
   - Sets CORS headers — REST calls to these endpoints are **only accepted from `https://valkyriepeptides.com` and `https://www.valkyriepeptides.com`** (so local dev can't hit them directly).

3. **valkyrie-product-order** (`valkyrie-product-order.php`, v1.0.0, requires WooCommerce 7.0+) — controls shop product ordering.
   - Drag-and-drop admin list writes each product's position to `menu_order` (mirrored to `_vpo_sort_order` meta). AJAX action `vpo_save_order`, nonce-protected.
   - React shop page requests products sorted by `menu_order`.
   - **BAC Water (`bac-water-10ml`) is force-pinned to `menu_order 9999`** (last), set via `VPO_LAST_SLUG` constant.

⚠️ **`valkyrie-forms-plugin-1` is a byte-for-byte duplicate of the forms plugin.** Only one may be active — activating both = fatal error (duplicate function names). Keep the active one, delete the other folder.

---

## Frontend architecture (this repo)

- Entry: `index.html` → `src/main.tsx` → `src/App.tsx`. `AppRoutes` in `src/router/config.tsx` defines routes.
- `BrowserRouter` uses `basename={__BASE_PATH__}` (build-time `BASE_PATH` env) so the app can mount under a subpath.
- **Data layer** (`src/lib/`, `src/hooks/`):
  - `woocommerce.ts` — WooCommerce REST client (`/wp-json/wc/v3`): products, reviews, orders, coupons. `normalizeProduct()` maps WC → the app's product shape and reads the `_valkyrie_*` COA meta.
  - `useProducts.ts` — fetches products; **falls back to `src/mocks/products.ts` when WC env vars are unset** (lets the app run locally with no WP).
  - `wcAuth.ts` — customer login/register/orders. **See discrepancy #1.**
  - `mailchimp.ts` — direct Mailchimp signup. **See discrepancy #2.**
  - `affiliate.ts` — GoAffPro `?ref=` capture (loader script in `index.html`).
  - `AccessGate.tsx` — the age/login wall; calls `/wp-json/valkyrie/v1`.
- **Routes:** `/`, `/shop`, `/products/:slug`, `/coa`, `/faq`, `/contact`, `/veterans`, `/about`, `/blog`, `/blog/:slug`, `/order` (checkout), `/my-account`, legal pages, `*` NotFound.
- **Payments are manual:** checkout creates a WooCommerce order as unpaid; customer pays via Zelle/Venmo/CashApp; admin confirms and marks paid. No card processing. (Doc says order status `on-hold`; the payload type in `woocommerce.ts` says `pending` — **verify actual behavior**.)

---

## Build & deploy

```
npm install
# create .env (gitignored) with:
#   VITE_WC_URL=https://<wp-site>
#   VITE_WC_KEY=ck_...
#   VITE_WC_SECRET=cs_...
#   BASE_PATH=/            (only if served from a subfolder)
npm run dev      # local, port 3000; uses mock products if WC env unset
npm run build    # -> dist/
npm run lint
npm run type-check
```

**Deploy a new frontend build (from `valk.pdf`):**
1. `npm run build` → fresh `dist/`.
2. Replace contents of `wp-content/plugins/valkyrie-router/app/` with the new `dist/` files.
3. Open the "Valkyrie Frontend" wp-admin page; confirm asset count + build age updated.
4. Hard refresh. Vite fingerprints asset filenames, so only `index.html` has cache concerns.

Repo also contains `push-to-github.bat` (commits + pushes to `github.com/Nikola0803/valkiryie`). No CI/tests currently.

---

## Code ↔ doc discrepancies (drift — resolve these)

1. **Two login systems.** Doc documents `valkyrie/v1/login` (AccessGate, HMAC token, localStorage). Code also has an **undocumented** `vk/v1/login` in `wcAuth.ts` (session storage, different flow). Likely one is dead/legacy — reconcile so only one auth path is maintained. **Update (confirmed live 2026-07-16):** these are two entirely separate WordPress plugins, not two code paths in one plugin — `valkyrie/v1/login` lives in `valkyrie-router`, `vk/v1/login` lives in a separate, previously-undocumented plugin called **Valkyrie Customer Auth** (`user-logins/vk-auth.php`). Also live but undocumented in either `CLAUDE.md` or `valk.pdf`: **Valkyrie CMS** (`valkyrie-cms/valkyrie-cms.php` — homepage/FAQ/blog/COA content + a Zelle order management panel), **Valkyrie Buyers Export**, and **Valkyrie Elementor Kit**. Full list in the Knowledge Base §3.
2. **Newsletter wired two ways.** Doc: `/newsletter` → DB table + email. Code: also a direct **Mailchimp** path in `mailchimp.ts`. Doc never mentions Mailchimp → likely leftover. `LIST_ID` there is still the placeholder `YOUR_LIST_ID_HERE`.
3. **Possible double analytics.** Doc says the Router injects GA4 + GTM server-side "so it doesn't need to be baked into the build" — but `index.html` in this repo **already hardcodes GTM**. Check for double-firing once live.
4. Order status: doc says `on-hold`; code payload type says `pending`. Verify.

---

## Security / cleanup punch list

- **Rotate the hardcoded Mailchimp API key** — committed in `vite.config.ts` AND `src/lib/mailchimp.ts` (public repo). Treat as compromised.
- **WooCommerce admin key/secret ship to the browser** via `VITE_` vars (in the JS bundle). Anyone can extract them and read/write orders, customers, products. **Move to server-side proxying.** `wcAuth.ts` register/order-history calls use these admin keys client-side too.
- **SMTP creds hardcoded** in `valkyrie-forms.php` (server) — secure/rotate when handling the plugin.
- Delete the duplicate `valkyrie-forms-plugin-1` folder and the `valkyrie-router.php.bak`.
- Remove unused deps: `firebase`, `@supabase/supabase-js`, `@stripe/react-stripe-js` (no imports found).
- `project_plan.md` in the repo is **stale** (describes a single-page mock-data site) — ignore it; this file is the source of truth.

---

## Outstanding for handover

Still needed from the previous developer / host (docs describe these but the actual code/values are not in this repo):

- The **three plugin folders** from `wp-content/plugins/` (+ delete the duplicate).
- The **`.env` values**: WooCommerce URL + consumer key/secret.
- WordPress admin + hosting/SFTP access; a **database export**.
- Confirmation of the live order status flow and which login/newsletter path is authoritative.

---

## Working conventions

- Work on a branch; build + `type-check` + `lint` before proposing a ship. Deploys to the live host are approved/run by Conor, not automated.
- TypeScript strict; path alias `@` → `src`. Some React/router/i18n imports are auto-imported (`unplugin-auto-import`) — check `auto-imports.d.ts` before adding manual imports.
- Product "content" (e.g. `100mg`, `10ml`) is parsed from slug/name by `extractContent()` in `woocommerce.ts` — no WC attribute setup needed. Keep product slugs ending in the amount+unit.

---

## Git workflow — shared repo, multiple concurrent Cowork sessions

**Why this exists:** every Cowork session working on this project mounts the same physical parent
folder. A git branch is just a ref — only one can be checked out in a plain working directory at
a time, so if two sessions both worked directly in one checkout, "different branches" wouldn't
protect them; the second `git checkout` would swap the first session's files out from under it,
mid-edit. **Git worktrees** fix this: each checkout is a real, separate directory, on its own
branch, all sharing one underlying repo.

**Folder layout (the wrapper Cowork sessions are actually granted access to):**

```
/var/www/valk/react/            <- wrapper root, this is what gets connected in Cowork
  .bare/                        <- the real git data (bare repo). Nobody works here directly.
  branches/
    main/                       <- worktree on `main`. Always clean, mirrors origin/main.
                                    Nobody commits here directly.
    cowork/<slug>/              <- one worktree per active task/session, on branch cowork/<slug>
  scripts/                      <- start-session.sh / finish-session.sh / cleanup-session.sh
                                    (plain utility scripts, NOT part of the git repo — same
                                    treatment as docs/, see below)
  docs/                         <- Valkyrie_Task_Tracker.md, Valkyrie_Knowledge_Base.md,
                                    Domain_Migration_Runbook.md,
                                    CircoFlows_Payment_Integration_Scope.md, Session_Summary.md.
                                    Deliberately kept out of git/GitHub — business/ops content,
                                    not code. Update in place as work happens.
```

`main` is intentionally just another worktree — nothing structurally special about it, it's just
the one nobody is supposed to commit to directly. All real work happens in a `cowork/<slug>`
worktree, gets pushed, and comes back into `main` via a normal GitHub PR + merge.

**Convention:**

1. **Starting a session's work:** from the wrapper root, run `scripts/start-session.sh <slug>`
   (e.g. `circoflows-webhook-verify`). It fetches latest `origin/main` and creates
   `branches/cowork/<slug>/` on a new `cowork/<slug>` branch. Do all of that session's file
   edits inside that worktree directory — not in `branches/main/`.
2. **Finishing:** from inside the worktree, run `scripts/finish-session.sh "commit message"`. It
   commits, runs build/type-check/lint, pushes the branch, and prints a PR compare link. Open
   that PR in the browser (no `gh` CLI configured in this environment).
3. **After merge:** from anywhere, run `scripts/cleanup-session.sh <slug> --delete-branch` to
   remove the worktree and delete the branch. Then update `branches/main` locally:
   `cd branches/main && git pull`.
4. `push-to-github.bat` (the previous developer's old one-shot "commit everything on main and
   push straight to GitHub" script) is retired — it's exactly the pattern that caused collisions.

