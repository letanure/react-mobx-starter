# Feature Registry Pattern

## Overview

Every feature should follow this standardized pattern to ensure consistency and easy integration with the root application.

## Pattern Structure

```typescript
/**
 * Centralizes [feature] exports to provide a single entry point
 * for the root application to consume components, routes, and stores
 */

import type { FeatureRegistry } from '@/types/feature'
import { MainComponent } from './MainComponent'
import { featureRoutes } from './routes'
import { Store } from './store'

export const featureName: FeatureRegistry<InstanceType<typeof Store>, typeof MainComponent> = {
  component: MainComponent,
  routes: featureRoutes,
  Store
}

// Export types only if needed by external consumers
// export type { FeatureType } from './types'
```

## Benefits

1. **Consistent Structure**: All features follow the same 3-property pattern
2. **Easy Integration**: Root app can consume features uniformly  
3. **Type Safety**: Full TypeScript support with generics
4. **Clean API**: Only exports what external consumers need
5. **Prevents Circular Imports**: Clear separation between internal and external APIs

## Usage Examples

### Consuming a Feature Registry

```typescript
import { todoFeature } from '@/features/todo'

// Access main component
const TodoComponent = todoFeature.component

// Access routes
const routes = todoFeature.routes

// Create store instance
const store = new todoFeature.Store()
```

### Root Store Integration

```typescript
// In RootStore
import { todoFeature } from '@/features/todo'

export class RootStore {
  todoStore = new todoFeature.Store()
}
```

### Route Integration

```typescript
// In routes config
import { todoFeature } from '@/features/todo'

export const routeConfigs = [
  todoFeature.routes,
  // other routes...
]
```

## Required Files in Each Feature

```
src/features/feature-name/
├── MainComponent.tsx     # Primary component (entry point)
├── components/           # Sub-components (internal)
├── store.ts             # Feature store (exports Store class)
├── routes.ts            # Route configuration
├── types.ts             # TypeScript types
├── i18n/               # Translations (optional)
└── index.ts            # Feature registry + exports
```

## Example Implementation

See `src/features/todo/index.ts` for a complete example following this pattern.