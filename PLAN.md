# Co-Working Space Platform — Architecture Plan

## Tech Stack
| Layer | Technology |
|-------|------------|
| Backend | Laravel 11 |
| Frontend | Inertia.js + React |
| Styling | Tailwind CSS |
| Animation | Framer Motion + GSAP (ScrollTrigger) |
| Database | MySQL |
| Auth | Laravel Breeze (Inertia React stack) |

## Project Structure
```
booking/
+-- app/
¦   +-- Http/Controllers/       (Space, Booking, Admin*, Blog, Contact)
¦   +-- Http/Requests/          (validation)
¦   +-- Models/                 (User, Space, Booking, Amenity, BlogPost, etc.)
¦   +-- Enums/                  (SpaceType, BookingStatus, UserRole)
¦   +-- Services/               (BookingService, AvailabilityService)
+-- resources/js/
¦   +-- Components/
¦   ¦   +-- Animations/         (PageTransition, ScrollReveal, Counter, etc.)
¦   ¦   +-- UI/                 (Button, Card, Modal, Badge, Input, etc.)
¦   ¦   +-- Layouts/            (GuestLayout, AuthenticatedLayout, AdminLayout)
¦   +-- Pages/
¦   ¦   +-- Auth/               (Login, Register, etc.)
¦   ¦   +-- Public/             (Home, Spaces, SpaceDetail, Pricing, Blog, Contact, About)
¦   ¦   +-- Dashboard/          (MyBookings, Profile)
¦   ¦   +-- Admin/              (Dashboard, Spaces, Bookings, Users, Blog, Contacts)
¦   +-- app.jsx
+-- database/
¦   +-- migrations/
¦   +-- seeders/
+-- routes/
    +-- web.php
    +-- auth.php
    +-- admin.php
```

## Database Schema
- **User** — name, email, password, phone, avatar, role (enum: admin/member)
- **Space** — name, slug, description, type (enum), capacity, price_per_hour/day/month, images (JSON), is_available
- **Amenity** — name, icon, pivot with spaces
- **Booking** — user_id, space_id, start_date, end_date, total_price, status (enum), notes
- **BlogPost** — title, slug, content, excerpt, featured_image, is_published, published_at, author_id
- **ContactInquiry** — name, email, phone, message, is_read
- **PricingPlan** — name, slug, description, price, features (JSON), is_popular, billing_cycle

## Pages
- **Home** — Hero (GSAP parallax + text reveal), Stats Counter (GSAP), Featured Spaces (Framer Motion stagger), Testimonials (GSAP carousel)
- **Spaces** — Filter bar, grid with Framer Motion layout animations
- **Space Detail** — Gallery, amenities, booking widget
- **Pricing** — Plan cards with FM stagger
- **Blog** — Post grid with categories
- **Contact** — Form with GSAP entrance
- **About** — Story, team, timeline (GSAP scroll)
- **Dashboard** — My Bookings, Profile
- **Admin** — Dashboard, CRUD for Spaces/Bookings/Users/Blog/Contacts
