# Feature Flags

Feature flags allow you to enable/disable functionality without code changes. This is useful for:

- **A/B testing** - Show different features to different users
- **Gradual rollouts** - Enable features for a subset of users
- **Quick toggles** - Disable problematic features instantly
- **Development** - Hide incomplete features in production

## Usage

### 1. Adding a Feature Flag

Add new flags to `src/config/index.ts`:

```typescript
features: {
  enableThemeSwitch: true, // Shows theme toggle in sidebar
  enableLanguageSwitch: true, // Shows language selector in sidebar
  enableNewFeature: false, // Your new feature
},
```

### 2. Using Feature Flags in Components

```typescript
import { useFeatureFlags } from "@/contexts/FeatureFlagsContext"

function MyComponent() {
  const { isFeatureEnabled } = useFeatureFlags()
  
  return (
    <div>
      {isFeatureEnabled("enableNewFeature") && (
        <NewFeatureComponent />
      )}
    </div>
  )
}
```

### 3. Testing with Feature Flags

Override flags in tests:

```typescript
<FeatureFlagsProvider overrides={{ enableNewFeature: true }}>
  <MyComponent />
</FeatureFlagsProvider>
```

## Available Flags

| Flag | Description | Default |
|------|-------------|---------|
| `enableThemeSwitch` | Shows theme toggle (light/dark/system) in sidebar | `true` |
| `enableLanguageSwitch` | Shows language selector in sidebar | `true` |

## Architecture

- **Provider**: `FeatureFlagsProvider` wraps the app in `AppProviders.tsx`
- **Hook**: `useFeatureFlags()` provides `isFeatureEnabled()` function
- **Config**: Flags defined in `src/config/index.ts`
- **Types**: TypeScript ensures flag names are valid

## Future Enhancements

- **Remote flags** - Fetch from API/service
- **User-based flags** - Different flags per user
- **Analytics** - Track flag usage and conversions