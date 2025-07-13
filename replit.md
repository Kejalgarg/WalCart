# Smart Inventory Recommender

## Overview

This is a full-stack TypeScript application for smart inventory management and forecasting. The system provides an intelligent dashboard for tracking inventory levels, predicting demand, and generating replenishment recommendations using machine learning-driven insights.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Built-in session handling with connect-pg-simple

### Development Setup
- **Monorepo Structure**: Shared schema and types between client and server
- **Development Server**: Vite dev server with HMR integration
- **Database Migrations**: Drizzle Kit for schema management

## Key Components

### Database Schema (shared/schema.ts)
The application uses five main data models:
- **Products**: SKU, name, category, stock levels, demand predictions, reorder recommendations
- **Stores**: Store locations with demand level classifications
- **Alerts**: System notifications for stockouts, overstocks, and optimal levels
- **Forecasts**: Time-series demand predictions with accuracy tracking
- **Metrics**: System-wide performance and cost savings metrics

### Frontend Components
- **Dashboard**: Main interface with key metrics and navigation
- **Navigation**: Tab-based navigation between different sections
- **Charts**: Recharts-based visualizations for forecasts and trends
- **Sections**: Modular components for Forecast, Recommendations, Simulator, and Heatmap views
- **Chatbot**: AI assistant for inventory-related queries

### API Layer
- RESTful endpoints for CRUD operations on all data models
- Storage abstraction with in-memory implementation for development
- Validation using Zod schemas derived from Drizzle schema

## Data Flow

1. **Data Input**: Product and store data is managed through the API endpoints
2. **Processing**: Mock machine learning algorithms generate demand forecasts and recommendations
3. **Storage**: All data is persisted in PostgreSQL via Drizzle ORM
4. **Presentation**: React components fetch data via TanStack Query and display insights
5. **Interaction**: Users can simulate scenarios, view forecasts, and manage inventory through the UI

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **UI Library**: Radix UI components via shadcn/ui
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with CSS variables for theming

### Development Dependencies
- **TypeScript**: Full type safety across the stack
- **ESBuild**: Fast production bundling
- **Vite**: Development server and build tool
- **Drizzle Kit**: Database schema management

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds the React app to `dist/public`
2. **Backend**: ESBuild bundles the Express server to `dist/index.js`
3. **Database**: Drizzle pushes schema changes to PostgreSQL

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment setting (development/production)
- **REPL_ID**: Replit-specific configuration for development

### Production Deployment
- Single-command deployment with `npm run build && npm start`
- Serves static files and API from the same Express server
- PostgreSQL database hosted on Neon with connection pooling

The application is designed as a hackathon-ready smart inventory system that demonstrates modern full-stack development practices while providing genuine business value through inventory optimization and demand forecasting.