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