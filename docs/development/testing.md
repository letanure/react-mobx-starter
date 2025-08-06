# Testing Strategy

Comprehensive testing approach covering unit tests, integration tests, end-to-end tests, and visual regression testing.

## Testing Pyramid

```
        E2E Tests
      ┌─────────────┐
     │   Playwright  │
    └─────────────────┘
    
    Integration Tests
   ┌───────────────────┐
  │   React Testing   │
  │     Library       │
 └─────────────────────┘
 
 Unit Tests
┌─────────────────────────┐
│        Vitest          │
│   Jest Environment     │
└─────────────────────────┘
```

## Unit Testing

### Framework: Vitest
Fast unit testing with Jest compatibility and native TypeScript support.

### What to Test
- **Pure Functions**: Utilities, helpers, data transformations
- **Components**: Props handling, event callbacks, conditional rendering
- **Hooks**: Custom hook logic and state management
- **Stores**: Business logic and state mutations

### Example: Component Testing
```typescript
// TodoItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from './TodoItem'

test('toggles todo completion when clicked', () => {
  const mockToggle = vi.fn()
  const todo = { id: '1', text: 'Test todo', completed: false }
  
  render(<TodoItem todo={todo} onToggle={mockToggle} />)
  
  const checkbox = screen.getByRole('checkbox')
  fireEvent.click(checkbox)
  
  expect(mockToggle).toHaveBeenCalledWith('1')
})
```

### Example: Store Testing
```typescript
// TodoStore.test.ts
import { TodoStore } from './TodoStore'

describe('TodoStore', () => {
  let store: TodoStore
  
  beforeEach(() => {
    store = new TodoStore()
  })
  
  test('adds new todo', () => {
    store.addTodo('New task')
    
    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].text).toBe('New task')
    expect(store.todos[0].completed).toBe(false)
  })
  
  test('computes active todos correctly', () => {
    store.addTodo('Task 1')
    store.addTodo('Task 2')
    store.toggleTodo(store.todos[0].id)
    
    expect(store.activeTodos).toHaveLength(1)
    expect(store.completedTodos).toHaveLength(1)
  })
})
```

### Example: Hook Testing
```typescript
// useCharacter.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { useCharacter } from './useCharacter'

// Mock the service
vi.mock('@/services/rickMortyService', () => ({
  getCharacter: vi.fn()
}))

test('fetches character data', async () => {
  const mockCharacter = { id: 1, name: 'Rick' }
  vi.mocked(getCharacter).mockResolvedValue({
    error: false,
    data: mockCharacter
  })
  
  const { result } = renderHook(() => useCharacter(1))
  
  expect(result.current.loading).toBe(true)
  
  await waitFor(() => {
    expect(result.current.character).toEqual(mockCharacter)
    expect(result.current.loading).toBe(false)
  })
})
```

## Integration Testing

### Framework: React Testing Library
Testing components as users would interact with them.

### What to Test
- **Feature Workflows**: Complete user interactions
- **Component Integration**: Multiple components working together
- **Store Integration**: Components with real stores
- **Form Submission**: End-to-end form workflows

### Example: Feature Integration
```typescript
// TodoFeature.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { StoreProvider } from '@/providers/StoreProvider'
import { TodoFeature } from './TodoFeature'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>
    {children}
  </StoreProvider>
)

test('complete todo workflow', () => {
  render(<TodoFeature />, { wrapper: TestWrapper })
  
  // Add todo
  const input = screen.getByPlaceholderText('Add new todo')
  const addButton = screen.getByText('Add')
  
  fireEvent.change(input, { target: { value: 'Test task' } })
  fireEvent.click(addButton)
  
  // Verify todo appears
  expect(screen.getByText('Test task')).toBeInTheDocument()
  
  // Toggle completion
  const checkbox = screen.getByRole('checkbox')
  fireEvent.click(checkbox)
  
  // Verify completion state
  expect(screen.getByText('1 completed')).toBeInTheDocument()
})
```

## End-to-End Testing

### Framework: Playwright
Full browser automation testing real user workflows.

### Test Organization
```
tests/
└── e2e/
    ├── helpers.ts          # Test utilities
    ├── todo-app.spec.ts    # Todo feature tests
    └── navigation.spec.ts  # Navigation tests
```

### Example: E2E Test
```typescript
// tests/e2e/todo-app.spec.ts
import { test, expect } from '@playwright/test'

test('user can manage todos', async ({ page }) => {
  await page.goto('/todos')
  
  // Add a todo
  await page.fill('[data-testid="todo-input"]', 'Buy groceries')
  await page.click('[data-testid="add-button"]')
  
  // Verify todo appears
  await expect(page.locator('text=Buy groceries')).toBeVisible()
  
  // Mark as complete
  await page.click('[data-testid="todo-checkbox"]')
  
  // Verify completion
  await expect(page.locator('[data-testid="completed-count"]')).toContainText('1')
  
  // Filter completed todos
  await page.click('[data-testid="filter-completed"]')
  await expect(page.locator('text=Buy groceries')).toBeVisible()
  
  // Delete todo
  await page.click('[data-testid="delete-button"]')
  await expect(page.locator('text=Buy groceries')).not.toBeVisible()
})

test('persists todos across page refreshes', async ({ page }) => {
  await page.goto('/todos')
  
  // Add todo
  await page.fill('[data-testid="todo-input"]', 'Persistent task')
  await page.click('[data-testid="add-button"]')
  
  // Refresh page
  await page.reload()
  
  // Verify todo is still there
  await expect(page.locator('text=Persistent task')).toBeVisible()
})
```

### Helper Functions
```typescript
// tests/e2e/helpers.ts
import { Page } from '@playwright/test'

export async function addTodo(page: Page, text: string) {
  await page.fill('[data-testid="todo-input"]', text)
  await page.click('[data-testid="add-button"]')
}

export async function toggleTodo(page: Page, index: number = 0) {
  await page.click(`[data-testid="todo-checkbox"]:nth-of-type(${index + 1})`)
}

export async function expectTodoCount(page: Page, count: number) {
  const todos = page.locator('[data-testid="todo-item"]')
  await expect(todos).toHaveCount(count)
}
```

## Visual Regression Testing

### Local Development
- **Storybook**: Component visual testing with play functions
- **Chromatic**: Cloud-based visual testing (if configured)
- **Playwright Screenshots**: Page-level visual comparisons

### CI Pipeline
- **Automated Screenshots**: Generate baseline images on main branch
- **Visual Comparison**: Compare feature branch with baseline
- **Approval Workflow**: Review and approve visual changes

### Playwright Visual Testing
```typescript
test('todo page visual test', async ({ page }) => {
  await page.goto('/todos')
  
  // Add some sample data
  await addTodo(page, 'Sample task 1')
  await addTodo(page, 'Sample task 2')
  await toggleTodo(page, 0)
  
  // Take screenshot
  await expect(page).toHaveScreenshot('todo-page.png')
})

test('responsive design', async ({ page }) => {
  await page.goto('/todos')
  
  // Desktop view
  await page.setViewportSize({ width: 1200, height: 800 })
  await expect(page).toHaveScreenshot('todo-desktop.png')
  
  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page).toHaveScreenshot('todo-mobile.png')
})
```

### Storybook Visual Testing
```typescript
// TodoItem.stories.tsx
export const VisualTest: Story = {
  args: {
    todo: { id: '1', text: 'Sample todo', completed: false }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test different states
    await userEvent.click(canvas.getByRole('checkbox'))
    await expect(canvas.getByText('Sample todo')).toHaveClass('completed')
  }
}
```

## Test Execution

### Local Development
```bash
# Unit tests (watch mode)
npm test

# Unit tests (single run)
npm run test:run

# E2E tests
npx playwright test

# E2E tests with UI
npx playwright test --ui

# Visual tests
npx playwright test --update-snapshots
```

### CI Pipeline
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:run

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

## Testing Best Practices

### Test Organization
- **Co-location**: Place tests near the code they test
- **Descriptive Names**: Use clear, descriptive test names
- **Single Responsibility**: Each test should verify one behavior
- **AAA Pattern**: Arrange, Act, Assert

### Mock Strategy
- **Mock External Dependencies**: APIs, services, third-party libraries
- **Keep Real Business Logic**: Don't mock your own stores/components
- **Mock UI Dependencies**: Window, localStorage, timers when needed

### Data Management
- **Fresh State**: Reset state between tests
- **Test Data Builders**: Use factories for test data creation
- **Deterministic Tests**: Avoid random data that can cause flaky tests

### Performance
- **Parallel Execution**: Run tests in parallel when possible
- **Smart Watching**: Watch only relevant files during development
- **Efficient Mocks**: Use lightweight mocks for external dependencies

### Maintenance
- **Regular Review**: Remove obsolete tests
- **Update Snapshots**: Keep visual baselines current
- **Test Coverage**: Monitor coverage but focus on critical paths