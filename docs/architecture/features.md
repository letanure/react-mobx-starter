# Feature Architecture

Features are the primary organizational unit in this application. Each feature is self-contained and includes everything needed for that specific business capability.

## Feature Structure

```
features/
└── [feature-name]/
    ├── [Feature]Component.tsx    # Main UI components
    ├── [Feature]Store.ts         # MobX store (if needed)
    ├── routes.ts                 # Route definitions
    ├── types.ts                  # TypeScript interfaces
    ├── i18n/                     # Internationalization
    │   └── en.ts                 # English translations
    └── __tests__/                # Feature-specific tests
        ├── [Feature].test.tsx
        └── [Feature].spec.ts
```

## Example: Todo Feature

The todo feature demonstrates the complete feature architecture:

### Components (`todo/`)
- `TodoList.tsx` - Main todo list display
- `TodoItem.tsx` - Individual todo item
- `TodoForm.tsx` - Add/edit todo form
- `TodoStats.tsx` - Statistics display
- `TodoEmpty.tsx` - Empty state component

### State Management (`todo/TodoStore.ts`)
```typescript
export class TodoStore {
  todos: Todo[] = []
  
  constructor() {
    makeAutoObservable(this)
  }
  
  addTodo(text: string) {
    // Business logic
  }
  
  toggleTodo(id: string) {
    // Business logic
  }
}
```

### Routes (`todo/routes.ts`)
```typescript
export const todoRoutes = {
  path: "/todos",
  component: TodoList,
  layout: "sidebar"
}
```

### Types (`todo/types.ts`)
```typescript
export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}
```

### Translations (`todo/i18n/en.ts`)
```typescript
export const todoTranslations = {
  addTodo: "Add Todo",
  completedTasks: "Completed Tasks"
}
```

## Feature Guidelines

### Self-Containment
Features should be as independent as possible:
- Minimal dependencies on other features
- Own state management if needed
- Feature-specific types and interfaces
- Independent routing configuration

### Communication Between Features
When features need to communicate:
- Use global stores for shared state
- Emit events through a global event bus
- Share data through URL parameters
- Use React context for feature-wide state

### Feature Store Integration
Feature stores are automatically integrated into the root store:
```typescript
// RootStore.ts
export class RootStore {
  todoStore: TodoStore
  
  constructor() {
    this.todoStore = new TodoStore()
    // Other feature stores...
  }
}
```

### Route Integration
Feature routes are automatically processed and added to the main router:
```typescript
// Route processor finds and registers all feature routes
const allRoutes = processFeatureRoutes()
```

## Testing Strategy

### Unit Tests
Test individual components and utilities within the feature:
```typescript
describe('TodoItem', () => {
  it('should toggle completion state', () => {
    // Test component behavior
  })
})
```

### Integration Tests
Test the complete feature functionality:
```typescript
describe('Todo Feature', () => {
  it('should add and complete todos', () => {
    // Test full user workflow
  })
})
```

### E2E Tests
Test features through the complete application:
```typescript
// tests/e2e/todo-app.spec.ts
test('user can manage todos', async ({ page }) => {
  await page.goto('/todos')
  await page.fill('[data-testid="todo-input"]', 'New task')
  await page.click('[data-testid="add-button"]')
  // Test complete user interaction
})
```

### Visual Regression Tests
Ensure UI consistency across changes:
- Component screenshots in Storybook
- Full page screenshots in Playwright
- Comparison with baseline images
- Automatic failure on visual differences

### Local vs CI Testing
- **Local Development**: Fast unit tests, component testing in Storybook
- **CI Pipeline**: Full test suite including E2E and visual regression
- **Snapshot Management**: Visual baselines stored in repository, updated through CI process

## Performance Considerations

### Lazy Loading
Features are loaded on demand:
```typescript
const TodoFeature = lazy(() => import('./features/todo'))
```

### State Isolation
Feature stores don't affect other features unless explicitly shared.

### Bundle Splitting
Each feature can be built as a separate chunk for optimal loading.

## Feature Examples

### Simple Feature (Home)
Minimal feature with just a component and routes:
```
home/
├── Home.tsx
└── routes.ts
```

### Complex Feature (Demo)
Feature with multiple components and API integration:
```
demo/
├── Demo.tsx
├── ApiDemo.tsx
├── ErrorDemo.tsx
├── routes.ts
└── i18n/
    └── en.ts
```

This architecture scales from simple landing pages to complex business features while maintaining consistency and isolation.