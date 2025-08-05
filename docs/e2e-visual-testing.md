# E2E Visual Regression Testing

Visual regression testing helps catch unintended UI changes by comparing screenshots over time.

## Overview

- **Snapshots Location**: All visual snapshots are stored in `e2e/.snapshots/`
- **Gitignore**: This folder is ignored by git to keep the repo clean
- **Local First**: Snapshots are maintained locally by each developer

## Running Visual Tests

```bash
# Run all E2E tests including visual
pnpm test:e2e

# Run only visual regression tests
pnpm test:e2e -g "Visual: screenshot"

# Run with UI mode to see comparisons
pnpm test:e2e:ui
```

## Updating Snapshots

When UI changes are intentional, you need to update the baseline snapshots:

### Update All Snapshots
```bash
pnpm test:e2e --update-snapshots
```

### Update Specific Test Snapshots
```bash
pnpm test:e2e --update-snapshots -g "Visual: screenshot"
```

### Review Changes in UI Mode
```bash
# Run tests in UI mode to see visual differences
pnpm test:e2e:ui

# Click on failed tests to see:
# - Expected (baseline)
# - Actual (current)
# - Diff (highlighted changes)
```

## Best Practices

1. **Component Screenshots**: Screenshot specific components, not full pages
   ```typescript
   await expect(page.locator('.todo-container')).toHaveScreenshot('todo-list.png')
   ```

2. **Consistent Viewport**: Set viewport size for consistency
   ```typescript
   await page.setViewportSize({ width: 1280, height: 720 })
   ```

3. **Disable Animations**: Configured globally in playwright.config.ts
   ```typescript
   toHaveScreenshot: { animations: 'disabled' }
   ```

4. **Meaningful Names**: Use descriptive snapshot names
   ```typescript
   .toHaveScreenshot('empty-state.png')     // ✅ Good
   .toHaveScreenshot('screenshot1.png')     // ❌ Bad
   ```

## Workflow

1. **First Run**: Creates baseline snapshots automatically
2. **Subsequent Runs**: Compares against baselines
3. **Failed Tests**: Review differences in HTML report
4. **Approve Changes**: Update snapshots if changes are intentional

## Troubleshooting

### Cross-Platform Differences
- Snapshots include platform in filename (e.g., `darwin`, `linux`, `win32`)
- Each developer maintains their own baselines
- CI should use consistent OS/browser

### Font Rendering Differences
- Use web fonts instead of system fonts
- Set explicit font-smoothing in CSS
- Consider higher threshold (0.2 configured)

### Dynamic Content
- Mock dates/times for consistency
- Hide or mock user-specific content
- Use data-testid for dynamic elements