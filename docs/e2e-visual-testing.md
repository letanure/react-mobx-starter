# E2E Visual Regression Testing

Visual regression testing helps catch unintended UI changes by comparing screenshots over time.

## Overview

This project uses a **dual snapshot approach** to handle cross-platform differences:

- **Local Snapshots**: `tests/e2e/.snapshots/` (gitignored) - platform-specific snapshots for development
- **CI Snapshots**: `tests/e2e/.snapshots-ci/` (tracked in git) - consistent Linux-based snapshots for CI/CD
- **Platform Names**: Local snapshots include platform suffix (e.g., `-darwin`, `-linux`, `-win32`)
- **CI Consistency**: CI snapshots use Docker to ensure identical rendering across environments

## Getting Started

### Initial Snapshot Generation

When setting up visual regression testing for the first time:

```bash
# 1. Generate local development snapshots
pnpm test:e2e --update-snapshots

# 2. Generate CI snapshots for the repository
pnpm test:e2e:update-ci

# 3. Commit the CI snapshots to version control
git add tests/e2e/.snapshots-ci/
git commit -m "test: add initial visual regression snapshots"
```

**Note**: Local snapshots (`tests/e2e/.snapshots/`) are gitignored and each developer maintains their own.

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

### Local Development Snapshots
When UI changes are intentional, update your local snapshots:

```bash
pnpm test:e2e --update-snapshots
```

### CI Snapshots (for Production)
To update CI snapshots that will be committed to the repo:

```bash
pnpm test:e2e:update-ci
```

This uses Docker to generate Linux-based snapshots identical to CI environment.

**Important**: Always commit CI snapshots after updating them:
```bash
git add e2e/.snapshots-ci/
git commit -m "test: update visual regression snapshots"
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

1. **Full Page Screenshots**: Take full page screenshots for comprehensive visual testing
   ```typescript
   await expect(page).toHaveScreenshot('todo-list.png')
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

## CI Snapshot Approval Workflow

### When Visual Tests Fail in CI

1. **Check the CI Report**: GitHub Actions will show failed visual tests
2. **Download Test Report**: CI artifacts contain HTML reports with visual diffs
3. **Review Changes**: Examine the expected vs actual screenshots
4. **Approve Changes**: If changes are intentional, update CI snapshots

### Approving Snapshots in CI

**Option 1: Local Docker Update (Recommended)**
```bash
# Generate new CI snapshots locally using Docker
pnpm test:e2e:update-ci

# Review the changes
git diff tests/e2e/.snapshots-ci/

# Commit and push the updated snapshots
git add tests/e2e/.snapshots-ci/
git commit -m "test: update visual regression snapshots"
git push
```

**Option 2: Trigger CI Snapshot Update**
```bash
# Create an empty commit to trigger CI rebuild
git commit --allow-empty -m "ci: update visual snapshots"
git push

# Then manually update snapshots in a follow-up commit
# (This approach requires manual snapshot collection from CI artifacts)
```

**Option 3: Manual Snapshot Collection**
1. Download the test report artifacts from the failed CI run
2. Extract the actual screenshots from the HTML report
3. Manually place them in `tests/e2e/.snapshots-ci/` with correct naming
4. Commit the changes

### Best Practices for CI Snapshots

1. **Always review diffs** before approving snapshot changes
2. **Use descriptive commit messages** when updating snapshots
3. **Keep snapshots minimal** - only commit necessary baseline images
4. **Coordinate with team** - communicate when updating shared snapshots
5. **Test locally first** - run `pnpm test:e2e:update-ci` before pushing

## Workflow

1. **Initial Setup**: Run tests to generate baseline snapshots (both local and CI)
2. **Development**: Use local snapshots for fast feedback during development
3. **Pull Requests**: CI validates against committed CI snapshots
4. **Failed CI Tests**: Use approval workflow above to update snapshots
5. **Review Process**: Team reviews both code changes and visual changes

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