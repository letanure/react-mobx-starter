# Architecture Guidelines

## Folder Structure

```
src/
├── components/
│   └── ui/              # Design system components
├── features/            # Feature-based modules
│   └── [feature-name]/  # Self-contained features
├── services/            # External integrations
├── layouts/             # Page layouts
├── types/               # TypeScript definitions
├── utils/               # Helper functions
├── hooks/               # Custom React hooks
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