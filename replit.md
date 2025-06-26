# CatMatch Application

## Overview

CatMatch is a Tinder-style cat discovery application built with a full-stack TypeScript architecture. Users can swipe through cat photos to like or dislike them, with preferences being tracked and stored. The application features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API endpoints
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL storage

### Development Environment
- **Platform**: Replit-optimized with custom workflows
- **Hot Reload**: Vite dev server with HMR
- **Database**: PostgreSQL 16 module integration

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **Users Table**: User authentication with username/password
- **Cat Preferences Table**: Tracks user likes/dislikes with timestamps
- **Type Safety**: Drizzle-Zod integration for schema validation

### API Endpoints
- `GET /api/cats/:count` - Fetch random cat images from CATAAS service
- `POST /api/preferences` - Save user cat preferences
- `GET /api/preferences/:userId` - Retrieve user preference history

### Core Features
- **Swipe Interface**: Touch/mouse gesture support for cat selection
- **Progress Tracking**: Visual progress bar during swiping session
- **Results Summary**: Post-session analysis of liked cats
- **Responsive Design**: Mobile-first approach with desktop support

### UI Components
- **CatCard**: Draggable card component with swipe animations
- **SwipeScreen**: Main interaction interface with gesture handling
- **SummaryScreen**: Results display with sharing capabilities
- **Custom Hooks**: useGesture for touch/mouse interaction handling

## Data Flow

1. **Cat Fetching**: Frontend requests cats from backend proxy endpoint
2. **User Interaction**: Swipe gestures trigger like/dislike actions
3. **Preference Storage**: User choices stored via API to PostgreSQL
4. **Session Management**: Progress tracked in React state
5. **Results Display**: Summary screen shows aggregated preferences

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### External Services
- **CATAAS API**: Cat image service (cataas.com)
- **Web Share API**: Native sharing functionality

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: 5000 (proxied to port 80)
- **Hot Reload**: Enabled via Vite middleware

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild compilation to `dist/index.js`
- **Deployment**: Replit autoscale deployment target

### Database Management
- **Migrations**: Drizzle Kit for schema management
- **Environment**: DATABASE_URL required for connection
- **Push Command**: `npm run db:push` for schema updates

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup