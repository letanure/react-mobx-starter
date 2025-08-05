# Performance Monitoring

This project includes comprehensive performance monitoring using Core Web Vitals and bundle analysis tools.

## Core Web Vitals Tracking

Automatically tracks these key metrics:
- **LCP** (Largest Contentful Paint) - Loading performance
- **INP** (Interaction to Next Paint) - Interactivity (replaced FID in 2024)
- **CLS** (Cumulative Layout Shift) - Visual stability
- **FCP** (First Contentful Paint) - Initial paint
- **TTFB** (Time to First Byte) - Server response

### Configuration

```bash
# Enable in development (disabled by default)
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

### Usage

```typescript
import { performanceMonitor, measurePerformance } from '@/lib/performance'

// Initialize once in main.tsx (already configured)
performanceMonitor.init()

// Custom performance measurement
measurePerformance.start('custom-operation')
// ... your code
const duration = measurePerformance.end('custom-operation')

// React hook for component performance
const { startTrace, endTrace } = usePerformanceTrace('MyComponent')
```

## Bundle Analysis

Analyze your bundle size and composition:

```bash
# Build and analyze bundle
pnpm build:analyze

# Opens interactive bundle visualization in browser
# Shows: treemap, file sizes, gzip/brotli compression
```

### Bundle Size Monitoring

The project uses `rollup-plugin-visualizer` to generate detailed bundle reports:

- **Treemap view**: Visual representation of bundle composition
- **Gzip/Brotli sizes**: Compressed sizes (what users actually download)
- **Source maps**: For better debugging and analysis

## Performance Thresholds (2025)

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| INP | ≤ 200ms | 200ms - 500ms | > 500ms |
| CLS | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

## Development Tools

### Performance Monitor Component (Dev Only)

Shows real-time performance metrics in development:

```typescript
import { PerformanceMonitor } from '@/components/PerformanceMonitor'

// Only renders in development mode
<PerformanceMonitor />
```

### Browser DevTools

1. **Chrome DevTools Performance tab**
   - Record performance profiles
   - Analyze render performance
   - Identify bottlenecks

2. **Lighthouse (built into Chrome)**
   - Run performance audits
   - Get actionable recommendations
   - Track Core Web Vitals

## Integration with Analytics

To send metrics to your analytics service:

```typescript
import { performanceMonitor } from '@/lib/performance'

// Set custom analytics provider
performanceMonitor.setAnalytics({
  sendToAnalytics: (metric) => {
    // Send to Google Analytics, Sentry, etc.
    gtag('event', 'web_vitals', {
      event_category: 'Performance',
      event_label: metric.name,
      value: Math.round(metric.value),
    })
  }
})
```

## Common Analytics Integrations

### Google Analytics 4
```typescript
gtag('event', 'web_vitals', {
  event_category: 'Performance',
  event_label: metric.name,
  value: Math.round(metric.value),
  custom_map: { metric_rating: metric.rating }
})
```

### Sentry
```typescript
import * as Sentry from '@sentry/react'

Sentry.addBreadcrumb({
  category: 'performance',
  message: `${metric.name}: ${metric.value}ms`,
  level: 'info',
})
```

## Best Practices

1. **Monitor in production** - Performance varies significantly between dev and prod
2. **Track trends** - Single measurements are less valuable than trends over time
3. **Set budgets** - Use Lighthouse CI or similar tools to enforce performance budgets
4. **Focus on user impact** - Prioritize metrics that affect user experience

## Files Structure

```
src/
├── lib/
│   └── performance.ts          # Core performance monitoring
├── components/
│   └── PerformanceMonitor.tsx  # Dev-only performance display
└── vite-env.d.ts              # Environment variables types

vite-bundle-analyzer.config.ts  # Bundle analysis configuration
docs/
└── performance-monitoring.md   # This documentation
```