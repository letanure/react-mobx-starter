# Bundle Size Budgets

This project uses [size-limit](https://github.com/ai/size-limit) to enforce bundle size budgets and prevent performance regressions.

## Current Budgets

| Bundle | Limit | Current | Status |
|--------|--------|---------|--------|
| App Bundle (JS) | 400 kB gzipped | ~117 kB | ✅ Well under limit |
| CSS Bundle | 25 kB gzipped | ~5 kB | ✅ Well under limit |

## How It Works

### Automated Checks

Bundle size limits are enforced automatically:

1. **Pre-push hook**: Runs `pnpm size:check` before each push
2. **CI Pipeline**: Fails builds that exceed size limits
3. **Local development**: Run `pnpm size:check` anytime

### Commands

```bash
# Check current bundle sizes against limits
pnpm size:check

# Analyze why bundles are large (detailed breakdown)
pnpm size:why

# Build and analyze bundle composition (interactive)
pnpm build:analyze
```

## Performance Impact

### Loading Performance
- **Slow 3G loading time**: App Bundle takes ~2.3s to load
- **Mobile performance**: ~1.7s execution time on Snapdragon 410
- **Total user experience**: ~4s from request to interactive

### Current Bundle Composition

Based on recent builds:
- **React + React DOM**: ~45 kB gzipped
- **MobX + MobX React**: ~15 kB gzipped  
- **Router**: ~20 kB gzipped
- **UI Components**: ~15 kB gzipped
- **Application code**: ~20 kB gzipped

## When Budgets Fail

If you exceed the bundle size limits:

### 1. Analyze the cause
```bash
# See detailed breakdown
pnpm size:why

# Visual analysis  
pnpm build:analyze
```

### 2. Common solutions
- **Remove unused dependencies**: Run `pnpm lint:dead-code`
- **Code splitting**: Split large components into separate chunks
- **Lazy loading**: Load non-critical features on-demand
- **Tree shaking**: Ensure proper ES modules usage

### 3. Update budgets (if justified)
Edit `.size-limit.json` if the size increase is necessary:

```json
[
  {
    "name": "App Bundle",
    "path": "dist/assets/index-*.js", 
    "limit": "450 kB",  // Increased from 400 kB
    "gzip": true
  }
]
```

## Best Practices

### Keep Bundles Small
1. **Import only what you use**: Prefer named imports
   ```typescript
   // Good
   import { useState } from 'react'
   
   // Bad  
   import * as React from 'react'
   ```

2. **Lazy load routes**: Use React.lazy for route components
   ```typescript
   const TodoPage = lazy(() => import('@/features/todo/pages/TodoPage'))
   ```

3. **Monitor dependencies**: Check impact before adding new packages
   ```bash
   # Check package size before installing
   npx bundle-phobia [package-name]
   ```

### Bundle Splitting Strategy

Current strategy optimizes for:
- **Critical path**: Core React + routing + essential UI
- **Feature isolation**: Todo feature can be code-split later
- **Vendor chunking**: Framework code separate from app code

## Monitoring & Alerts

### CI Integration
- ❌ **Build fails** if bundles exceed limits
- 📊 **Size report** shows current vs limit in CI logs
- 🔄 **Automatic checks** on every push and PR

### Development Workflow
1. Make changes to code
2. Run `pnpm build` (includes size check in pre-push)
3. If size check fails, analyze and optimize
4. Push only when within budget

## Budget Rationale

### 400 kB JS Limit
- **3G Performance**: ~2-3s load time on slow connections
- **Mobile-first**: Works well on older devices
- **Growth headroom**: Room for features without performance degradation

### 25 kB CSS Limit  
- **Critical CSS**: Styles needed for initial render
- **Fast painting**: Minimal FOUC (Flash of Unstyled Content)
- **Tailwind optimized**: Purged unused styles

## Future Optimizations

As the app grows, consider:

1. **Route-based code splitting**
2. **Component lazy loading** 
3. **Bundle analyzer in CI** for size trend tracking
4. **Performance budgets** for Core Web Vitals
5. **Preloading strategies** for critical chunks

## Tools Used

- **[size-limit](https://github.com/ai/size-limit)**: Bundle size enforcement
- **[rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)**: Bundle composition analysis
- **[Vite](https://vitejs.dev)**: Modern bundling with tree-shaking
- **Pre-push hooks**: Automated enforcement