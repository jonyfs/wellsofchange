# Wells of Change - NGO Landing Page

## Overview

Wells of Change is a static, multilingual landing page for an NGO that brings clean water and sustainable technology to underserved communities through solar-powered wells. The project is a single-page React application optimized for GitHub Pages deployment, featuring automatic language detection, responsive design, and comprehensive information about the organization's mission, projects, and impact.

The site showcases the organization's first completed well in Campo Formoso, Bahia, Brazil, and provides a platform for community engagement, donations, and volunteer recruitment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type safety and component-based development
- **Vite** as the build tool and development server, configured to output static assets to `dist/public/`
- **Client-side routing** using Wouter (lightweight React router) with base path configuration for GitHub Pages deployment
- **Single Page Application (SPA)** architecture with all content hardcoded in components (no backend API calls)

**Styling & UI**
- **Tailwind CSS** for utility-first styling with custom design system
- **shadcn/ui** component library (Radix UI primitives) for accessible, customizable UI components
- **Custom theme system** with CSS variables for colors, spacing, and typography
- **Responsive design** with mobile-first approach using Tailwind breakpoints
- **Custom fonts**: Poppins (display), Inter (body), Space Mono (monospace/data)

**State Management & Data**
- **React Context API** for language selection and internationalization state
- **TanStack Query (React Query)** for data fetching (currently unused but configured for future API integration)
- **Local Storage** for persisting user language preferences

**Internationalization (i18n)**
- **Custom i18n implementation** supporting 4 languages: English, Portuguese (Brazil), Spanish, and French
- **Automatic browser language detection** on first visit using `navigator.language`
- **User preference persistence** in localStorage, overriding auto-detection on subsequent visits
- **Translation dictionary** embedded in `i18n.tsx` with comprehensive coverage of all UI text

**Component Structure**
- **Page-level**: Single `Home` page component orchestrating all sections
- **Section components**: Hero, MissionStatement, OurStory, WhatWeDo, OurCommitment, WhoWeAre, Partners, CodeOfEthics, TogetherForChange
- **Reusable UI components**: Navigation, Footer, FeatureCard, StatCard, CTACard, DonateFAB, LanguageFAB
- **Layout components**: Navigation bar with sticky positioning, floating action buttons (FABs) for language selection and donations

**Asset Management**
- **Static images** bundled at build time from `attached_assets/` directory
- **Image imports** using Vite's `@assets` alias for compile-time resolution
- **Optimized loading** with proper image formats and sizing

### Deployment Architecture

**GitHub Pages Configuration**
- **Static site deployment** via GitHub Actions workflow (`.github/workflows/deploy.yml`)
- **Base URL configuration**: `/wellsofchange/` for project repository hosting
- **Build process**: Vite build with `--base=/wellsofchange/` flag to prefix all asset paths
- **SPA routing support**: Custom `404.html` with redirect script to handle client-side routes
- **GitHub Pages optimization**: `.nojekyll` file to prevent Jekyll processing

**Build Artifacts**
- **Output directory**: `dist/public/` (configured in `vite.config.ts`)
- **Generated files**: 
  - `index.html` (~1.5 KB) - Main HTML with proper base paths
  - `404.html` (~728 B) - SPA fallback for routing
  - `favicon.png` - Site icon
  - `assets/` folder - Hashed JS (~338 KB), CSS (~72 KB), and images (~19 MB)
- **Total build size**: ~19.4 MB (primarily high-resolution project photos)

**Environment Configuration**
- **Development mode**: Express server with Vite middleware for hot module replacement
- **Production mode**: Pure static files served from GitHub Pages CDN
- **Base URL management**: `import.meta.env.BASE_URL` injected by Vite at build time

**Verification & Testing**
- **Build verification scripts**: `build-to-root.sh`, `build-github-pages.sh` with automatic path validation
- **Deployment verification**: GitHub Actions workflow includes path checking steps
- **Preview capability**: `preview-build.sh` for local testing of production builds

### Design System

**Typography Scale**
- Hero Headline: 5xl-7xl (responsive), font-bold
- Section Titles: 3xl-5xl (responsive), font-semibold
- Subsection Headers: xl-2xl, font-semibold
- Body Text: base-lg, leading-relaxed
- Captions/Small: sm, font-medium

**Spacing System**
- Consistent use of Tailwind units: 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 to py-32 (responsive)
- Container: max-w-7xl with responsive padding (px-6 to px-8)
- Content width: max-w-3xl for text-focused sections

**Color Scheme**
- Custom CSS variables for light/dark mode support
- Primary color for CTAs and emphasis
- Muted backgrounds for section alternation
- Semantic colors: destructive, accent, secondary

**Component Patterns**
- Card-based layouts with hover effects (`hover-elevate` transitions)
- Grid systems: responsive columns (1-2-3-4 depending on breakpoint)
- Icon + text patterns for features and stats
- Gradient overlays for hero images

## External Dependencies

**Core Framework**
- **React 18** (`react`, `react-dom`) - UI framework
- **TypeScript** - Type safety and developer experience

**Build & Development**
- **Vite** - Build tool and dev server with HMR
- **PostCSS** & **Autoprefixer** - CSS processing
- **Tailwind CSS** - Utility-first CSS framework
- **ESBuild** - JavaScript bundler (via Vite)

**Routing & State**
- **Wouter** - Lightweight client-side router (4KB alternative to React Router)
- **TanStack Query** - Server state management (configured but unused in current static implementation)

**UI Components & Icons**
- **Radix UI** - Headless accessible component primitives (@radix-ui/react-*)
- **shadcn/ui** - Pre-styled component library built on Radix
- **Lucide React** - Icon library
- **React Icons** - Additional icon sets (Font Awesome for social media)
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Utility for merging Tailwind classes

**Forms & Validation**
- **React Hook Form** - Form state management (configured but unused)
- **Zod** - Schema validation
- **@hookform/resolvers** - Integration between React Hook Form and Zod

**Backend Infrastructure (Unused in Static Deployment)**
- **Express** - Development server only (not deployed to production)
- **Drizzle ORM** - Database ORM (configured but unused in static site)
- **@neondatabase/serverless** - PostgreSQL adapter (unused)
- **connect-pg-simple** - Session storage (unused)

**Development Tools**
- **Replit plugins** - Development environment integrations (@replit/vite-plugin-*)
- **tsx** - TypeScript execution for development server
- **drizzle-kit** - Database migration tool (unused in static site)

**Fonts**
- **Google Fonts** - Poppins, Inter, Space Mono (loaded via CDN in HTML)

**Deployment**
- **GitHub Actions** - CI/CD for automated deployment
- **GitHub Pages** - Static site hosting

**Note on Database Dependencies**: While the project includes Drizzle ORM and PostgreSQL dependencies (inherited from the original full-stack template), these are **not used** in the current static site implementation. All content is hardcoded in React components, making the site fully static and suitable for GitHub Pages hosting without any backend infrastructure.