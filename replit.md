# OyaPrompt - AI Voice Assistant

## Overview

OyaPrompt is an experimental AI-powered voice assistant application that enables users to accomplish tasks through natural voice conversations. Built on the ElevenLabs Agents platform, the application provides an intuitive interface for voice-based interactions with AI agents that can help with various tasks like sending emails, ordering food, booking rides, and reading documents.

The application is a Next.js-based web application originally scaffolded through v0.app and deployed on Vercel. It features a modern, accessible UI with dark mode support and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14+ with App Router
- Uses React Server Components (RSC) architecture for optimal performance
- TypeScript for type safety across the application
- App router pattern with file-based routing under `/app` directory

**UI Components**: Multi-library approach
- **shadcn/ui**: Primary component library built on Radix UI primitives
  - Provides accessible, customizable base components (dialogs, dropdowns, navigation, etc.)
  - Theme-aware components using CSS variables for consistent styling
- **HeroUI (NextUI)**: Secondary component library for specific components
  - Used for navigation (Navbar) and card components
  - Provides additional pre-built components not covered by shadcn/ui
- **Custom Components**: Application-specific components in `/components`
  - SegmentedOrb: Custom animated orb visualization for voice interaction states
  - ConvAI: Main voice conversation interface component
  - Theme components for dark/light mode management

**Styling**: TailwindCSS with custom theming
- CSS-in-JS approach using Tailwind utility classes
- Custom design tokens defined via CSS variables (HSL color space)
- Dark mode support via class-based theming
- Custom font integration (Instrument Serif via Google Fonts)
- Minimal custom animations (pulse-subtle) to reduce visual noise

**State Management**: React hooks and client components
- Uses React hooks (useState, useEffect, useCallback) for local state
- Client-side state for voice interaction, theme preferences, UI toggles
- No global state management library (Redux/Zustand) currently implemented

### Voice Integration Architecture

**ElevenLabs SDK Integration**:
- `@elevenlabs/react` package provides the `useConversation` hook
- Real-time WebSocket communication for voice streaming
- Signed URL authentication pattern for secure agent connections
- Agent configuration managed through environment variables

**Voice Flow**:
1. User initiates conversation from UI
2. Frontend requests signed URL from backend API route
3. Backend generates signed URL using ElevenLabs API and agent credentials
4. Frontend establishes WebSocket connection to ElevenLabs conversation endpoint
5. Audio streams bidirectionally between user and AI agent
6. Visual feedback (animated orb) reflects conversation state

### Backend Architecture

**API Routes**: Next.js API routes pattern
- `/app/api/signed-url/route.ts`: Generates ElevenLabs signed URLs for conversation sessions
- Server-side environment variable access for API keys and agent IDs
- Error handling with fallback demo mode when credentials are missing

**Authentication Flow**:
- API key-based authentication with ElevenLabs platform
- Signed URLs provide time-limited, secure access to conversation agents
- No user authentication system currently implemented

**Deployment Configuration**:
- Optimized for Vercel deployment with edge-friendly configuration
- Build-time TypeScript and ESLint errors ignored (configured for rapid prototyping)
- Unoptimized images for faster builds during development

### Page Structure

**Routes**:
- `/` - Landing page with hero section, CTA buttons, and features
- `/chat` - Main voice conversation interface
- `/about` - Information about the application and mission
- `/docs` - Documentation and usage guides
- `/faq` - Frequently asked questions

**Layout Pattern**:
- Root layout (`app/layout.tsx`) provides global navigation and theme providers
- Navbar with desktop/mobile responsive navigation
- Theme toggle for dark/light mode switching
- Consistent max-width container pattern across pages

### Design Decisions

**Multi-component Library Rationale**:
- shadcn/ui chosen for accessibility and customization flexibility
- HeroUI added for components requiring less customization (navigation, cards)
- Trade-off: Increased bundle size vs. faster development velocity
- Alternative considered: Single component library (would require more custom component development)

**Voice-First Interaction**:
- Primary interaction model is voice-based rather than text chat
- Visual orb provides ambient feedback without distracting from conversation
- Microphone permission handling with graceful degradation
- Alternative: Text-first with voice as secondary option (rejected to maintain focus on voice UX)

**Serverless Architecture**:
- Next.js API routes leverage Vercel's serverless functions
- No dedicated backend server required
- Stateless design - no persistent sessions or database
- Pros: Simple deployment, automatic scaling, low maintenance
- Cons: Cold start latency, limited to HTTP request/response model

**Development vs. Production Configuration**:
- TypeScript and ESLint errors ignored during builds (rapid iteration priority)
- Demo/placeholder mode when environment variables missing (developer experience)
- Should be addressed before production: Enable strict type checking and linting

## External Dependencies

### Third-Party Services

**ElevenLabs Agents Platform** (Primary AI Service)
- Purpose: Voice AI agent conversations with natural language processing
- Integration: REST API for signed URL generation, WebSocket for real-time voice streaming
- Authentication: API key-based (ELEVENLABS_API_KEY environment variable)
- Configuration: Agent ID specified via AGENT_ID environment variable
- Features used: Voice synthesis, speech recognition, conversational AI
- SDK: `@elevenlabs/react` package for React integration

**Vercel** (Deployment and Hosting)
- Purpose: Application hosting, serverless function execution, automatic deployments
- Integration: Git-based continuous deployment from repository
- Configuration: Build settings in `next.config.ts`, deployment via Vercel dashboard
- Analytics: `@vercel/analytics` package for usage metrics

**v0.app** (Development Tool)
- Purpose: Initial application scaffolding and component generation
- Integration: One-way sync from v0.app to GitHub repository
- Note: Changes made in repository are not synced back to v0.app

### UI and Component Libraries

**Radix UI** (Headless Component Primitives)
- Purpose: Accessible, unstyled UI primitives for building custom components
- Components used: Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu, Label, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Tooltip
- Integration: Via shadcn/ui wrapper components
- Why chosen: Industry-standard accessibility, keyboard navigation, ARIA compliance

**HeroUI / NextUI**
- Purpose: Pre-styled React components
- Components used: Navbar, Card, Button, Accordion
- Integration: Direct import from `@heroui/react`
- Configuration: Provider wrapper in root layout

**Framer Motion**
- Purpose: Animation library for UI transitions and micro-interactions
- Usage: Page transitions, icon animations, orb visualization
- Integration: Direct component usage with motion primitives

**Lucide Icons**
- Purpose: Icon library
- Integration: Tree-shakeable imports from `lucide-react`
- Icons used: MicIcon, StopCircle, AlertCircle, ChevronRight, Moon, Sun, etc.

**Lord Icon**
- Purpose: Animated Lottie icons for landing page CTAs
- Integration: Web component via CDN script injection
- Usage: Feature showcase icons (food ordering, ride booking, reminders, email)

### Development Dependencies

**Next.js** (Framework)
- Version: Latest (using Next.js 14+ features)
- Features: App Router, Server Components, API Routes, Image Optimization
- TypeScript support with custom path aliases

**TailwindCSS** (Styling)
- Configuration: Custom theme with CSS variables for theming
- Plugins: None currently configured
- Usage: Utility-first styling across all components

**TypeScript**
- Target: ES6
- Configuration: Strict mode enabled, path aliases for cleaner imports
- Note: Build errors currently ignored for rapid development

**React Hook Form**
- Purpose: Form state management (installed but limited usage visible)
- Resolver: Zod integration via `@hookform/resolvers`

### Font and Asset Dependencies

**Google Fonts**
- Instrument Serif: Primary typeface for the application
- Integration: Next.js font optimization via `next/font/google`

**Custom Assets**
- Wave video background (`/wave-loop.mp4`): Ambient background animation
- Note: Static assets should be placed in `/public` directory (not visible in provided files)

### Environment Variables Required

```
ELEVENLABS_API_KEY - API key for ElevenLabs platform authentication
AGENT_ID - Specific ElevenLabs agent ID for conversation handling
```

**Fallback Behavior**: Application runs in demo mode with placeholder values when environment variables are missing, but voice functionality will not work.