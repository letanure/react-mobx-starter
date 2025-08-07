# React Starter Kit

A modern React + TypeScript starter with batteries included. Pre-configured tooling, component library, and example implementations to help you start building immediately.

## Preview

![Todo App Demo](./docs/assets/todo-app-demo-desktop.gif)

*Interactive demo showing the complete user flow: adding todos, marking as complete, and viewing statistics. Features form validation, state management, smooth animations, and responsive design.*

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) - you're ready to code.

## What's Inside?

This starter includes everything you need for a modern React application:

- **Vite** for lightning-fast builds
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **MobX** for state management
- **Vitest + Playwright** for testing
- **Storybook** for component development
- **TypeScript** with strict mode
- **GitHub Actions** CI/CD pipeline

## Project Structure

```
src/
├── features/           # Feature modules - your main code goes here
│   └── todo/          # Example: Todo app with MobX store
│       ├── components/     # Feature sub-components
│       ├── schemas.ts      # Zod schemas for validation
│       ├── types.ts        # TypeScript types (inferred from schemas)
│       ├── store.ts        # MobX store (exports Store class)
│       ├── routes.ts       # Route configuration
│       ├── i18n/          # Translations
│       └── index.ts       # Feature registry (public API)
│
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components (Button, Card, etc.)
│   ├── custom-ui/     # Custom components
│   │   └── FormBuilder/   # Dynamic form generator with Zod
│   └── layout/        # Layout components (Sidebar, Fullscreen)
│
├── stores/            # Global MobX stores
│   └── RootStore.ts   # Store composition root
│
├── providers/         # React providers & app configuration
│   └── AppProviders.tsx  # All providers in one place
│
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
├── services/          # API clients & external services
└── test/              # Test utilities & mocks

tests/                 # E2E tests
└── e2e/              # Playwright tests
```

## Where to Find Things

### Starting a New Feature?
Create a new folder in `src/features/` following the registry pattern:
- Main component (entry point)
- `components/` folder for sub-components
- `schemas.ts` for Zod validation schemas
- `types.ts` for TypeScript types (inferred from schemas)
- `store.ts` (if state is needed)
- `routes.ts` for route configuration  
- `index.ts` for feature registry
- See `docs/FEATURE_REGISTRY_PATTERN.md` for details

### Need a UI Component?
- Check `src/components/ui/` for shadcn components
- Check `src/components/custom-ui/` for custom components
- Use `npx shadcn@latest add [component]` to add more

### Working with Forms?
Check out the FormBuilder in `src/components/custom-ui/FormBuilder/`:
- Dynamic field generation
- Zod validation
- All field types included
- See examples in Storybook

### Managing State?
- Feature-specific: Create a store in your feature folder
- Global state: Add to `src/stores/RootStore.ts`
- Access via `useStores()` hook

### Writing Tests?
- Unit tests: Next to your code as `*.test.tsx`
- E2E tests: In `tests/` folder
- Test utilities: `src/test/utils.tsx`
- **After UI changes:** Run `npm run test:e2e:update:demo` to refresh both snapshots and demo GIF

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests in watch mode |
| `npm run test:ui` | Run unit tests with UI |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run test:e2e:ui` | Run E2E tests with Playwright UI |
| `npm run test:e2e:update:local` | Update E2E snapshots locally |
| `npm run test:e2e:update:ci` | Update E2E snapshots in CI environment |
| `npm run test:e2e:update:demo` | Update snapshots AND regenerate demo GIF |
| `npm run lint` | Run linter |
| `npm run type:check` | Check TypeScript types |
| `npm run storybook` | Start Storybook |
| `npm run demo:gif` | Generate animated demo GIF from E2E snapshots |

## Docker Development

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start development environment |
| `docker-compose down` | Stop containers |
| `docker-compose build` | Rebuild containers |
| See [Docker documentation](./docs/docker.md) | Complete Docker setup guide |

## Development Workflow

1. **Feature Development**: Work in `src/features/[your-feature]/`
2. **Component Development**: Use Storybook for isolated development
3. **Testing**: Tests run automatically on save
4. **Linting**: Pre-commit hooks ensure code quality
5. **CI/CD**: GitHub Actions run on every push

## Architecture Overview

### Feature Workflow
```mermaid
graph TB
    F[📁 features/my-feature/]
    
    subgraph "You Create"
        FC[📱 Components.tsx]
        FS[🗃️ Store.ts]
        FR[🗂️ routes.ts]
        FI[🌐 i18n/en.ts]
    end
    
    subgraph "App Automatically Wires"
        RR[Root Router]
        RS[Root Store]
        SB[Sidebar Nav]
    end
    
    subgraph "You Consume"
        UI[🎨 UI Components]
        UT[⚙️ Utils]
        SV[📡 Services]
        HK[🪝 Hooks]
    end
    
    F --> FC
    F --> FS
    F --> FR
    F --> FI
    
    FR --> RR
    FS --> RS
    FR --> SB
    
    FC --> UI
    FC --> HK
    FS --> SV
    FS --> UT
```

### What You Get
```mermaid
graph LR
    subgraph "What You Build"
        Feature[🆕 Feature]
        Components[📱 Components]
        Logic[🧠 Business Logic]
    end
    
    subgraph "What You Get For Free"
        Routing[🗂️ Routing]
        State[🗃️ State Management]
        UI[🎨 UI Library]
        Tests[🧪 Testing]
        Types[🔒 Type Safety]
        Tools[🛠️ Dev Tools]
    end
    
    Feature --> Components
    Feature --> Logic
    
    Components -.-> UI
    Logic -.-> State
    Feature -.-> Routing
    Feature -.-> Tests
    Feature -.-> Types
    Feature -.-> Tools
```

## Key Patterns

### Feature-Based Architecture
Each feature is self-contained with its own components, state, and routes:

```typescript
features/
└── my-feature/
    ├── MyComponent.tsx     # UI components
    ├── schemas.ts         # Zod validation schemas
    ├── types.ts           # TypeScript types (inferred from schemas)
    ├── MyStore.ts         # MobX store (if needed)
    └── routes.ts          # Route configuration
```

### Provider Composition
All providers are composed in one place for cleaner setup:

```typescript
// src/providers/AppProviders.tsx
<ErrorBoundary>
  <StoreProvider>
    <Router>
      {children}
    </Router>
  </StoreProvider>
</ErrorBoundary>
```

### Route Configuration
Routes are defined per feature and automatically processed:

```typescript
// features/my-feature/routes.ts
export const myRoutes = {
  path: "/my-feature",
  component: MyComponent,
  layout: "sidebar", // or "fullscreen"
}
```

### Schema-First Validation
The codebase follows a schema-first approach using Zod for data validation:

```typescript
// schemas.ts - Define validation schemas
export const TodoSchema = z.object({
  id: z.string().min(1, "ID is required"),
  text: z.string().min(1, "Todo text cannot be empty").trim(),
  completed: z.boolean(),
  createdAt: z.date(),
})

// types.ts - Infer types from schemas
export type Todo = z.infer<typeof TodoSchema>

// store.ts - Validate at boundaries
addTodo(text: string) {
  const validatedText = TodoTextSchema.parse(text)
  // ... rest of implementation
}
```

Benefits:
- **Single source of truth**: Types derived from validation schemas
- **Runtime safety**: Validation at all data boundaries
- **Consistency**: Same validation rules everywhere
- **Better errors**: Descriptive validation messages

## Core Principles

- **Isolation**: Features are independent modules
- **Composition**: Build complex UIs from simple components
- **Type Safety**: Leverage TypeScript for confidence
- **Schema-First**: Types derived from Zod validation schemas
- **Testing**: Test behavior, not implementation
- **Performance**: Lazy load features, memoize expensive operations

## Examples Included

The starter includes working examples to learn from:

- **Todo App** (`/features/todo/`): MobX state management, CRUD operations
- **API Demo** (`/features/demo/`): External API integration, error handling
- **Home Page** (`/features/home/`): Simple landing page example

## Need More Details?

Check the `/docs` folder for:
- [Architecture decisions](./docs/architecture/README.md)
- [Testing strategy](./docs/development/testing.md)
- [API documentation](./docs/api/hooks.md)
- [Development guidelines](./docs/README.md)

---

Happy coding!