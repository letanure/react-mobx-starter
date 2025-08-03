# Architecture Guidelines

## Folder Structure

```
src/
├── components/
│   └── ui/              # Design system components
├── features/            # Feature-based modules
│   └── [feature-name]/  # Self-contained features
├── stores/              # MobX stores
├── providers/           # React context providers
├── hooks/               # Custom React hooks
├── services/            # External integrations
├── layouts/             # Page layouts
├── types/               # TypeScript definitions
├── utils/               # Helper functions
├── constants/           # App constants
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

## Component Organization

### UI Components (`/components/ui/`)
- **Purpose**: Reusable design system components
- **Characteristics**:
  - Pure presentational (dumb) components
  - No business logic
  - Props-driven
  - No direct API calls
  - No internal state management (only UI state)
- **Examples**: Button, Card, Input, Modal, Grid

### Feature Components (`/features/`)
- **Purpose**: Business logic and orchestration
- **Characteristics**:
  - Smart/Container components
  - Manage state and side effects
  - Compose UI components
  - Handle API calls
  - Feature-specific logic
- **Structure**:
  ```
  features/
  └── [feature-name]/
      ├── FeatureName.tsx    # Main smart component
      ├── hooks/             # Feature-specific hooks
      ├── utils/             # Feature-specific utils
      └── types.ts           # Feature-specific types
  ```

## Import Rules

1. **UI components** should only import:
   - Other UI components
   - Types
   - Constants
   - Utils

2. **Feature components** can import:
   - UI components from `/components/ui/`
   - Services
   - Hooks
   - Types
   - Utils

3. **Never**:
   - UI components importing from features
   - Cross-feature imports (features should be independent)

## File Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `parseResponse.ts`)
- **Types**: PascalCase for interfaces/types (e.g., `User.ts`, `ApiResponse.ts`)
- **Constants**: UPPER_SNAKE_CASE in files (e.g., `API_ENDPOINTS.ts`)

## Component Guidelines

### UI Components
```tsx
// Good: Props-driven, no business logic
interface ButtonProps {
  onClick: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

### Feature Components
```tsx
// Good: Orchestrates UI components, handles logic
export function FeatureName() {
  const [data, setData] = useState()
  const { fetchData } = useApi()
  
  return (
    <Card>
      <Button onClick={fetchData}>Action</Button>
    </Card>
  )
}
```

## Adding New Features

When adding a new feature:
1. Create folder in `/features/[feature-name]/`
2. Create the main smart component
3. Use existing UI components from `/components/ui/`
4. If new UI component needed, add to design system first
5. Keep feature self-contained

## Design System Growth

Before creating a new UI component, ask:
1. Is this truly reusable across features?
2. Is it purely presentational?
3. Can it be composed from existing components?

If yes to all, add to `/components/ui/`. Otherwise, keep it in the feature folder.

## UI Library Choice: Custom vs Third-Party

This project uses **custom UI components** instead of libraries like Radix UI or shadcn/ui for the following reasons:

### Why Custom Components
1. **Architectural demonstration** - Shows component design and API thinking
2. **Full control** - No external dependencies or constraints
3. **Simplicity** - Our needs are basic (Grid, ImageCard, FileUpload)
4. **Learning focus** - Interview project emphasizes custom implementation skills

### Alternative Considerations
- **Radix UI**: Excellent for production apps needing complex accessibility
- **shadcn/ui**: Great for rapid development with modern React patterns
- **Trade-off**: Custom components require more maintenance but offer full ownership

**Decision**: Custom components align with the project's goal of demonstrating architectural and implementation skills rather than library integration knowledge.

## State Management

### MobX Store Pattern

This project uses **React Context + MobX** pattern instead of direct store imports for demonstration purposes. While direct imports (`import { imageStore } from '@/stores'`) would be simpler for this small app, the provider pattern showcases:

1. **Dependency injection** - Easy to swap store implementations
2. **Testing** - Can inject mock stores for unit tests  
3. **Single instance** - Guarantees one store instance across the app
4. **React integration** - Follows React patterns for state provision

**Trade-off**: More boilerplate for educational/showcase value over simplicity.

### Store Architecture

```
stores/
├── RootStore.ts       # Container for all stores
├── ImageStore.ts      # Image management logic
└── index.ts           # Store exports

providers/
└── StoreProvider.tsx  # React context provider

hooks/
└── useStores.ts       # Store access hooks
```

**Usage in components:**
```tsx
const imageStore = useImageStore() // via React context
// Alternative: import { imageStore } from '@/stores' (simpler)
```