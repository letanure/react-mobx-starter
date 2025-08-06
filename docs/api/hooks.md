# Custom Hooks API

This document describes the custom React hooks available in the application.

## Store Hooks

### `useStore()`
Access the application's root store containing all feature stores.

```typescript
const { todoStore } = useStore()
```

**Returns:** `RootStore` - The root store instance

**Throws:** Error if used outside of `StoreProvider`

**Example:**
```typescript
import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStores'

const TodoCounter = observer(() => {
  const { todoStore } = useStore()
  
  return (
    <div>
      Active todos: {todoStore.activeTodos.length}
    </div>
  )
})
```

## UI Hooks

### `useIsMobile()`
Detect if the current viewport is mobile-sized.

```typescript
const isMobile = useIsMobile()
```

**Returns:** `boolean` - True if viewport width is less than 768px

**Features:**
- Responsive to window resize events
- Uses `matchMedia` for performance
- Returns `false` during server-side rendering

**Example:**
```typescript
import { useIsMobile } from '@/hooks/useMobile'

const ResponsiveComponent = () => {
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </div>
  )
}
```

## API Hooks

Custom hooks for API integration follow consistent patterns for loading states, error handling, and request cancellation.

## FormBuilder Hooks

### `useFormBuilder(schema, options)`
Initialize form builder with validation schema.

```typescript
const form = useFormBuilder(schema, { onSubmit })
```

**Parameters:**
- `schema: ZodSchema` - Zod validation schema
- `options: FormBuilderOptions` - Configuration options

**Returns:** React Hook Form methods and FormBuilder-specific utilities

**Example:**
```typescript
import { z } from 'zod'
import { useFormBuilder } from '@/components/custom-ui/FormBuilder'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

const ContactForm = () => {
  const form = useFormBuilder(schema, {
    onSubmit: async (data) => {
      console.log(data)
    }
  })
  
  return (
    <FormBuilder
      form={form}
      fields={[
        { name: 'name', type: 'text', label: 'Name' },
        { name: 'email', type: 'email', label: 'Email' }
      ]}
    />
  )
}
```

### `useFieldArray(name, options)`
Manage dynamic field arrays in forms.

```typescript
const fieldArray = useFieldArray({ name: 'items' })
```

**Parameters:**
- `name: string` - Field name in form
- `options: UseFieldArrayOptions` - Configuration options

**Returns:** Field array methods (append, remove, etc.)

**Example:**
```typescript
import { useFieldArray } from '@/components/custom-ui/FormBuilder/hooks'

const DynamicForm = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'items'
  })
  
  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.name`)} />
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => append({ name: '' })}>Add Item</button>
    </div>
  )
}
```

### `useFieldArrayValidation(options)`
Handle validation for field arrays with min/max constraints.

```typescript
const validation = useFieldArrayValidation({
  name: 'items',
  fieldConfig: { minItems: 1, maxItems: 5 },
  getNonEmptyRowIndices: () => [0, 1]
})
```

**Parameters:**
- `name: string` - Field array name
- `fieldConfig: FieldArrayConfig` - Field configuration
- `getNonEmptyRowIndices: () => number[]` - Function to get non-empty indices

**Features:**
- Validates min/max item constraints
- Handles empty row detection
- Integrates with React Hook Form validation

## Hook Patterns

### Error Handling
```typescript
const useApiData = (url: string) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(setData)
      .catch(err => setError(err.message))
  }, [url])
  
  return { data, error }
}
```

### Request Cancellation
```typescript
const useAbortableEffect = (asyncFn: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    const controller = new AbortController()
    
    asyncFn()
    
    return () => controller.abort()
  }, deps)
}
```

### Type Safety
```typescript
interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const useApi = <T>(url: string): UseApiResult<T> => {
  // Implementation with proper typing
}
```

## Testing Hooks

### Unit Testing
```typescript
import { renderHook } from '@testing-library/react'
import { useIsMobile } from '@/hooks/useMobile'

test('useIsMobile returns false for desktop', () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024
  })
  
  const { result } = renderHook(() => useIsMobile())
  expect(result.current).toBe(false)
})
```

### Integration Testing
```typescript
import { render, screen } from '@testing-library/react'
import { StoreProvider } from '@/providers/StoreProvider'

const TestComponent = () => {
  const { todoStore } = useStore()
  return <div>{todoStore.todos.length}</div>
}

test('hook works with provider', () => {
  render(
    <StoreProvider>
      <TestComponent />
    </StoreProvider>
  )
  
  expect(screen.getByText('0')).toBeInTheDocument()
})
```