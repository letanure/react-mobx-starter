# State Management

This application uses MobX for state management, providing reactive and predictable state updates with minimal boilerplate.

## MobX Architecture

### Store Composition
The application uses a single root store that composes all feature stores:

```typescript
// stores/RootStore.ts
export class RootStore {
  todoStore: TodoStore
  
  constructor() {
    this.todoStore = new TodoStore()
    makeAutoObservable(this)
    this.setupPersistence()
  }
}
```

### Store Access
Stores are accessed through a React hook:
```typescript
// hooks/useStores.ts
export function useStores() {
  const stores = useContext(StoreContext)
  if (!stores) {
    throw new Error('useStores must be used within StoreProvider')
  }
  return stores
}

// In components
const { todoStore } = useStores()
```

## Store Patterns

### Observable State
All store properties that should trigger re-renders are made observable:

```typescript
class TodoStore {
  todos: Todo[] = []
  filter: TodoFilter = 'all'
  
  constructor() {
    makeAutoObservable(this)
  }
}
```

### Actions
State modifications are encapsulated in action methods:

```typescript
class TodoStore {
  addTodo(text: string) {
    const todo: Todo = {
      id: nanoid(),
      text,
      completed: false,
      createdAt: new Date()
    }
    this.todos.push(todo)
  }
  
  toggleTodo(id: string) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
}
```

### Computed Values
Derived state is computed automatically and cached:

```typescript
class TodoStore {
  get completedTodos() {
    return this.todos.filter(todo => todo.completed)
  }
  
  get activeTodos() {
    return this.todos.filter(todo => !todo.completed)
  }
  
  get filteredTodos() {
    switch (this.filter) {
      case 'completed':
        return this.completedTodos
      case 'active':
        return this.activeTodos
      default:
        return this.todos
    }
  }
}
```

## Store Persistence

### Automatic Persistence
Stores can be automatically persisted to localStorage:

```typescript
class TodoStore {
  static persistenceConfig = {
    key: 'todoStore',
    version: 1,
    migrate: (data: any, version: number) => {
      // Handle version migrations
      return data
    }
  }
}
```

### Manual Persistence
For more control, implement custom persistence:

```typescript
class TodoStore {
  saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  
  loadFromStorage() {
    const data = localStorage.getItem('todos')
    if (data) {
      this.todos = JSON.parse(data)
    }
  }
}
```

## Component Integration

### Observer Components
Components that use store data must be wrapped with `observer`:

```typescript
export const TodoList = observer(() => {
  const { todoStore } = useStores()
  
  return (
    <div>
      {todoStore.filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
})
```

### Local State vs Store State
Use local state for UI-only concerns, store state for business logic:

```typescript
const TodoForm = observer(() => {
  const [inputValue, setInputValue] = useState('') // UI state
  const { todoStore } = useStores()
  
  const handleSubmit = () => {
    todoStore.addTodo(inputValue) // Business logic
    setInputValue('') // Reset UI state
  }
})
```

## Testing Stores

### Unit Testing
Test store logic in isolation:

```typescript
describe('TodoStore', () => {
  let store: TodoStore
  
  beforeEach(() => {
    store = new TodoStore()
  })
  
  it('should add a todo', () => {
    store.addTodo('Test todo')
    expect(store.todos).toHaveLength(1)
    expect(store.todos[0].text).toBe('Test todo')
  })
  
  it('should compute filtered todos correctly', () => {
    store.addTodo('Todo 1')
    store.addTodo('Todo 2')
    store.toggleTodo(store.todos[0].id)
    
    store.filter = 'completed'
    expect(store.filteredTodos).toHaveLength(1)
  })
})
```

### Component Testing with Stores
Test components with mock stores:

```typescript
const mockStore = {
  todos: [
    { id: '1', text: 'Test todo', completed: false }
  ],
  addTodo: vi.fn(),
  toggleTodo: vi.fn()
}

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreContext.Provider value={{ todoStore: mockStore }}>
    {children}
  </StoreContext.Provider>
)

test('TodoList renders todos', () => {
  render(<TodoList />, { wrapper: TestWrapper })
  expect(screen.getByText('Test todo')).toBeInTheDocument()
})
```

## Performance Optimization

### Fine-grained Reactivity
MobX only re-renders components when observed data actually changes:

```typescript
// Only re-renders when specific todo changes
const TodoItem = observer(({ todo }: { todo: Todo }) => {
  return <div>{todo.text}</div>
})
```

### Computed Values Caching
Computed values are cached and only recalculated when dependencies change:

```typescript
get expensiveComputation() {
  console.log('Computing...') // Only logs when todos change
  return this.todos.reduce((sum, todo) => sum + todo.priority, 0)
}
```

### Action Batching
Multiple state changes in a single action are batched:

```typescript
batchUpdateTodos(updates: TodoUpdate[]) {
  // All updates happen in one reaction
  updates.forEach(update => {
    const todo = this.todos.find(t => t.id === update.id)
    if (todo) {
      Object.assign(todo, update.changes)
    }
  })
}
```

## Best Practices

### Store Organization
- One store per feature/domain
- Compose stores in RootStore
- Keep stores focused on specific concerns

### State Structure
- Use normalized state for complex data
- Avoid deep nesting
- Use Maps for key-value lookups

### Actions
- Keep actions pure and focused
- Handle async operations properly
- Use descriptive action names

### Performance
- Use `observer` on all components that read store data
- Avoid creating observables in render methods
- Use computed values for derived data

### Testing
- Test business logic in stores
- Mock stores for component tests
- Use real stores for integration tests