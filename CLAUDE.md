# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server with turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Code Style Guidelines

- **Imports**: Group imports (React, external libs, internal) with blank line between groups
- **Formatting**: Use TypeScript/Next.js auto-formatting, indentation 2 spaces
- **Types**: Use explicit types for props, functions, and state. Use React.FC for functional components
- **Components**: Use named exports, client components with "use client" directive when needed
- **File Structure**: Feature-based organization, UI components in /ui directory
- **Styling**: Use Tailwind CSS with cn utility for class merging
- **Naming**: PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch blocks with appropriate error messaging
- **State Management**: React hooks for local state, consider context for shared state

### PROJECT PROGRESS

## Admin Dashboard Implementation

### Overview

We developed a comprehensive admin dashboard layer for the AI Coaches platform that provides system-wide management capabilities.

### Key Components

- Admin layout and sidebar navigation structure
- Coach overview and management tables
- User reassignment tools
- Program management interface
- Message template system
- Advanced analytics dashboards
- Audit logs and monitoring tools

### Features

- Full bilingual support (English/Korean)
- Rich data visualizations
- CRUD operations for programs and templates
- Comprehensive filtering and search capabilities

### Technical Notes

- Ensured proper value assignment for all SelectItem components to prevent UI issues
- Maintained consistent design language while implementing admin-specific functionality

### Platform Architecture

The platform now consists of two complete layers:

- Coach dashboard for day-to-day operations
- Admin dashboard for system-wide oversight and management
