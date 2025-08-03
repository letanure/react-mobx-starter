# Photoroom Test Project

Image processing app with background removal. Clean architecture, MobX state management, and code organization.

## TLDR

**Tech Stack**: React + TypeScript + MobX + Tailwind + Photoroom API  
**Features**: Upload images → Auto background removal → Organize in folders → Persist locally  
**Architecture**: Feature-based folders, flat MobX stores, service layer pattern  

## Quick Start

```bash
# Install & run
npm install
npm run dev

# Add Photoroom API key to .env.local
echo "VITE_PHOTOROOM_API_KEY=your_key_here" > .env.local
```

**Development Commands:**
```bash
npm run dev          # Start dev server
npm run build        # Production build
pnpm lint           # Check code quality
pnpm test           # Run tests
```

## Architecture Overview

**Feature-Based Structure:**
```
features/design-manager/    # Image upload, processing, display
features/folder-manager/    # Folder creation, organization (tag-like)
components/ui/             # Reusable UI components
stores/                    # Flat MobX stores (minimal dependencies)
services/                  # External integrations (Photoroom API, persistence)
```

**Development Approach:**

**Preparation:**
- Studied Photoroom web app for naming conventions (designs vs images) and UX patterns
- Set up blank React project with linting, testing, and path aliases

**Planning & Execution:**
- Defined feature order: Upload → Processing → Gallery → Folders → Link folders to images → Persistence
- Focused on data flow with MobX stores and clean code organization
- Built UI components from scratch (instead of shadcn/ui) to demonstrate component architecture, but shadcdn will be fine too
- Prioritized user experience - see results immediately after upload


## Development Process

**Phase 1: Foundation**
- Vite + React + TypeScript setup
- Component architecture with Tailwind
- MobX store pattern establishment

**Phase 2: Core Features**
- Image upload with validation
- Photoroom API integration
- Auto-processing pipeline with status tracking

**Phase 3: Organization**
- Folder system (tag-like for future evolution)  
- Multi-selection with bulk operations
- Persistence layer with IndexedDB

**Phase 4: Resilience**
- Auto-retry for interrupted API calls (user reloads during processing)
- Graceful error handling and recovery
- Professional code organization standards


**MobX Store Design:**
- **Flat architecture** - Stores don't depend on each other
- **Clear boundaries** - ImageStore, FolderStore, SelectionStore

**Why This Architecture:**
- **Folders as tags** - Simple model that can evolve to full tagging system
- **Feature flow** - Upload → Process → Organize (clear user journey)
- **Maintainable** - Each store has single responsibility
- **Testable** - Isolated concerns, dependency injection ready

## Additional Details

**Code Organization:**
Components follow consistent patterns - Types, Store access, State, Event handlers. See existing components for examples.

**Persistence Strategy:**
IndexedDB with Dexie handles image blobs and metadata. Auto-saves on state changes, recovers interrupted API calls on reload.

**Quality Setup:**
Biome (linting + formatting), TypeScript (type checking), Vitest (testing), pre-commit hooks with lint-staged.
