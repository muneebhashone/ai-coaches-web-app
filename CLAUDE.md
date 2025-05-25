# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture Overview

This is a Next.js 15 AI coaching dashboard with internationalization (English/Korean) support. The app uses Next.js App Router with locale-based routing.

### Routing Structure
- All routes are prefixed with locale: `/[locale]/...`
- Supported locales: `en` (default), `ko`
- Root redirects to `/en/login`
- Dashboard routes redirect to localized versions

### Authentication Flow
- Middleware handles auth for all non-public routes
- Public routes: login, signup, forgot-password, reset-password
- Uses cookie-based authentication with `accessToken`
- Backend validation via `/auth/me` endpoint
- Unauthorized users redirect to login

### Key Directories
- `src/app/[locale]/` - App Router pages with locale support
- `src/components/` - Reusable components (includes shadcn/ui)
- `src/services/` - API service layers organized by domain
- `src/i18n/` - Internationalization configuration
- `src/lib/` - Utilities and API client setup
- `src/stores/` - Zustand state management

### Core Technologies
- Next.js 15 with App Router
- React 19 with TypeScript
- next-intl for internationalization
- Tailwind CSS v4 with CSS-first configuration
- shadcn/ui components
- Zustand for state management
- React Query for data fetching
- Zod for schema validation

### API Integration
- Backend URL configured via `BACKEND_URL` (server) / `NEXT_PUBLIC_API_URL` (client)
- API routes proxy to backend via rewrites: `/api/v2/*` → `${BACKEND_URL}/api/*`
- Axios-based API client with automatic base URL detection

## Brand Theme System

### Design Guidelines
- Follow `brand-theme-guidelines.md` for all design decisions
- Clean, minimal, trustworthy aesthetic with Noto Sans typography
- Brand colors: Teal Green (#2CB1A0), Jet Black (#1C1C1C), Coral Orange (#FF6B57)

### Tailwind CSS v4 Usage
- **CSS-first configuration** in `src/app/globals.css` using `@theme` directive
- **OKLCH color format** for better color manipulation and consistency
- **Semantic color variables**: Use `text-primary`, `bg-card`, etc. instead of arbitrary values
- **Font system**: Noto Sans with Pretendard fallback via Next.js font optimization

### Color Usage Rules
- **NEVER use arbitrary colors** (e.g., `text-red-500`, `bg-blue-600`)
- **ALWAYS use semantic theme variables**:
  - Primary: `text-primary` / `bg-primary` (Teal Green)
  - Secondary: `text-secondary` / `bg-secondary` (Jet Black)
  - Accent: `text-accent` / `bg-accent` (Coral Orange)
  - Success: `text-success` / `bg-success` (Emerald Green)
  - Warning: `text-warning` / `bg-warning` (Amber Yellow)
  - Error: `text-destructive` / `bg-destructive` (Tomato Red)

### Component Styling Patterns
- **Links**: `text-primary hover:text-primary/80 transition-colors`
- **Cards**: `bg-card text-card-foreground` with `card` utility class
- **Backgrounds**: `bg-background` for page containers
- **Focus states**: `focus-visible:ring-2 focus-visible:ring-primary/50`

## Development Guidelines

### Cursor Rules
Comprehensive development rules are available in `.cursor/rules/`:
- `brand-theme-system.mdc` - Brand color and typography guidelines
- `auth-module-patterns.mdc` - Authentication form patterns
- `tailwind-v4-usage.mdc` - Tailwind CSS v4 best practices
- `project-structure.mdc` - File organization and architecture
- `accessibility-standards.mdc` - WCAG compliance and a11y patterns
- `code-quality-standards.mdc` - TypeScript and React best practices

### Important Patterns
- All components follow shadcn/ui patterns with brand theme integration
- Forms use react-hook-form with Zod validation and translated messages
- Services are organized by domain (auth, user, etc.)
- TypeScript strict mode enabled
- Path alias `@/*` maps to `src/*`
- Accessibility-first approach with WCAG AA compliance
- Internationalization with `useTranslations` hook for all user-facing text

### Auth Module Patterns
- Consistent form structure with language switcher
- Brand-consistent link styling and error handling
- Proper loading states and form validation
- Follow patterns from `src/components/login-form.tsx`