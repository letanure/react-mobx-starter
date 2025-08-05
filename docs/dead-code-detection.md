# Dead Code Detection with Knip

Knip is a tool that finds unused files, dependencies, and exports in your TypeScript/JavaScript projects.

## Usage

```bash
# Run dead code analysis (doesn't fail CI)
pnpm lint:dead-code

# Auto-fix by removing unused exports
pnpm lint:dead-code:fix
```

## What Knip Detects

- **Unused files**: Files not imported anywhere
- **Unused dependencies**: Packages in package.json not used in code
- **Unused exports**: Exported functions/variables not imported anywhere
- **Unlisted dependencies**: Dependencies used but not in package.json

## Configuration

The configuration is in `knip.config.ts`:

- Entry point: `src/main.tsx`
- Analyzes: All TypeScript/TSX files in `src/`
- Ignores: Test files, stories, type definitions

## Interpreting Results

```
Unused files (11)
src/components/ui/input.tsx      # UI component not used
src/services/api.ts              # Demo service not used

Unused dependencies (8)
@radix-ui/react-dialog          # Installed with shadcn but not used
```

## Best Practices

1. **Run regularly**: Check for dead code before major releases
2. **Review before removing**: Some code might be used dynamically
3. **Keep demos separate**: Demo/example code should be in docs
4. **Clean dependencies**: Remove unused packages to reduce bundle size

## Note

Knip is configured to not fail (exit code 0) so it can be used as an informational tool rather than a blocking check. This is because:

- Some "unused" code might be intentionally kept for examples
- Dynamic imports might not be detected
- Some dependencies are used only in config files