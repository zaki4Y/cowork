# AURELIA — AGENTS.md

Co-working space booking platform. Laravel 13 + Inertia.js React 18. Actual local/test DB is SQLite; `PLAN.md` and older notes saying Laravel 11/MySQL are stale.

## Commands
- `php artisan serve` — backend only; `npm run dev` — Vite/HMR only; `composer run dev` — runs serve + `queue:listen --tries=1 --timeout=0` + Vite concurrently.
- `npm run build` — production Vite build.
- `php artisan migrate:fresh --seed` — full local reset with demo data (`database/database.sqlite`).
- `php artisan test` — run tests (SQLite `:memory:`). `composer run test` is currently broken: it passes `@no_additional_args` literally to `config:clear` and exits 1. Use `php artisan config:clear && php artisan test`.
- Focus one test: `php artisan test --filter=AuthenticationTest`.
- No JS lint/typecheck script exists in `package.json`; do not run `npm run lint` or `npm run typecheck` unless you add them.
- `vendor/bin/pint` is available for PHP style; `.styleci.yml` uses the Laravel preset.

## Current test state (verified 2026-11-03)
- `php artisan test`: 24/25 passing.
- Known failure: `tests/Feature/ExampleTest.php` requests `/` and gets 500 with `no such table: spaces` because `HomeController` queries the DB and the test does not use `RefreshDatabase`.

## Architecture
- Backend entry: `routes/web.php` (public + auth + admin) and `routes/auth.php` (Breeze). `Route::fallback` renders `Public/NotFound`.
- Admin group: `Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')`. `admin` alias is registered in `bootstrap/app.php` → `App\Http\Middleware\AdminMiddleware`; it 403s unless `User::isAdmin()` (`role === UserRole::Admin`).
- Inertia pages auto-discovered from `resources/js/Pages/**/*.jsx`; `resources/js/app.jsx` maps to `./Pages/${name}.jsx`. It only force-wraps `Public/*`, `Auth/*`, and `Welcome` in `GuestLayout`. `Admin/*` and `Dashboard/*` pages wrap themselves in `AdminLayout`/`AuthenticatedLayout`; do not assume app.jsx resolves those layouts.
- Shared Inertia props from `App\Http\Middleware\HandleInertiaRequests`: `auth.user` and `flash.success|error|warning|info|status`.
- Booking business logic lives in `app/Services/BookingService.php` (availability checks, price calculation).

## Database
- Local default: SQLite file at `database/database.sqlite`; `.env.example` also defaults to SQLite; tests use `:memory:` via `phpunit.xml`.
- Pivot table is `space_amenity`; models pass it explicitly to `belongsToMany`.
- Enums in `app/Enums/`: `SpaceType`, `BookingStatus`, `UserRole`.
- 11 migrations total, including Laravel default cache/jobs/users tables.
- Seeder creates: 10 users (2 named + 8 factory members), 10 amenities, 12 spaces, 20 bookings, 6 blog posts authored by user id 1, 3 pricing plans.

## Frontend
- `@/*` → `resources/js/*` via `jsconfig.json`; Vite entry is `resources/js/app.jsx`; Ziggy `route('...')` for route names.
- Tailwind dark mode is `class`; `tailwind.config.js` has duplicate `colors` keys, and the later base/ochre/clay/fintech palette overrides the earlier semantic block.
- UI exists at `@/Components/UI/*`; animation helpers at `@/Components/Animations/*`; GSAP for scroll choreography, Framer Motion for interaction/entrance motion.
- For UI direction, treat `PRODUCT.md` and `DESIGN.md` as the source of intent; do not duplicate them here.

## Demo accounts (after `migrate:fresh --seed`)
| Role   | Email             | Password |
|--------|-------------------|----------|
| Admin  | admin@cowork.com  | password |
| Member | member@cowork.com | password |

## Gotchas
- Treat `PLAN.md` as historical input, not current truth; verify against `composer.json`, `.env`, `routes/`, and `phpunit.xml`.
- `composer run dev` does **not** run a log tail or any extra service beyond serve/queue/Vite.
- Public home intentionally needs seeded DB data; tests that hit `/` need migrations/`RefreshDatabase`.
