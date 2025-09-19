# Nino Hägglund — Portfolio (React + Vite)

A fast, single‑page portfolio built with React and Vite. It features smooth in‑page navigation, responsive layout, animated project cards, references/testimonials, a styled contact form, a back‑to‑top button, and a small Pokémon finder widget for fun.

Live demo:
Repository: https://github.com/ninohaegglund/ninohaegglund-portfolio-2025

## Features

- Single‑page layout with anchor navigation (About, Projects, References, Contact)
- Sticky, translucent navbar with active‑link highlight (scrollspy)
- Responsive grid for project cards
- Subtle fade‑in on scroll animations (respects “reduced motion”)
- Back‑to‑top button with custom theme tokens
- Contact form styled with modern CSS
- Lightweight widgets (e.g., Pokémon finder)
- No client‑side router required

## Tech stack

- React 18 + Vite
- Modern CSS (custom properties, responsive grids)
- IntersectionObserver (scroll animations, scrollspy)
- ESLint (from Vite template)

## Getting started

Prerequisites:
- Node.js >= 18
- npm (or pnpm/yarn)

Install and run:

```bash
npm install
npm run dev
```

Build and preview production bundle:

```bash
npm run build
npm run preview
```


## Customization

- Site title: edit `<title>` in `index.html`.
- Branding text/logo: `src/components/Navbar.jsx`.
- Sections rendered on the home page: `src/pages/Home.jsx`.
- Projects: `src/data/projects.js` (title, description, image, tags, links).
- References: `src/data/references.js`.
- Colors, spacing, shadows: `src/App.css` (CSS variables and utilities).
- Back‑to‑top theme: `src/components/backToTop.css` (`--top-*` tokens).
- Fade‑in animation: add the `reveal` class to any element and an optional `style={{ '--i': n }}` for stagger. Styles live in `src/pages/pages.css`.

## Roadmap / ideas

- Hook the contact form to a provider (Formspree, EmailJS, a serverless function).
- Dark mode theme.
- Project filters/search (by tag).
- More sections (skills, resume download, blog).
