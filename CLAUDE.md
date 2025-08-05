# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Challenge Rules

### CRITICAL: Always Validate Before Coding

1. **Understand Requirements First**
   - Read the challenge description completely
   - Identify all functional requirements
   - List edge cases and constraints
   - Ask for clarification if anything is unclear

2. **Plan and Validate Approach**
   - Break down the problem into smaller tasks
   - Write pseudocode or high-level approach
   - Consider time and space complexity
   - Validate the approach with test cases BEFORE implementation

3. **Test-Driven Development**
   - Write test cases first
   - Include edge cases in tests
   - Ensure tests fail before implementation
   - Make tests pass with minimal code

## Essential Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # TypeScript check + production build
npm run preview      # Preview production build
```

### Code Quality
```bash
pnpm lint:fix        # Auto-fix linting issues
pnpm format          # Format code with Biome
pnpm type:check      # TypeScript type checking
pnpm check:all       # Run all checks (type + lint + format + test)
```

### Testing
```bash
npm run test         # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage
```

## Architecture Overview

This is a React + TypeScript starter kit for coding challenges using MobX for state management, built with Vite.

### Key Architectural Patterns

1. **MobX with React Context Pattern**: All stores are accessed via React Context, not direct imports.

2. **Feature-Based Organization**: Challenge solutions should be implemented in `src/features/`.

3. **Clean Code Structure**:
   - Components in `src/components/ui/` for reusable UI
   - Features in `src/features/` for challenge implementations
   - Stores in `src/stores/` for state management
   - Services in `src/services/` for external integrations

### Implementation Guidelines

1. **Start Simple**: Always begin with the simplest working solution
2. **Refactor Incrementally**: Improve code quality after getting it working
3. **Type Everything**: Use proper TypeScript types, avoid `any`
4. **Test Coverage**: Aim for high test coverage, especially for edge cases
5. **Performance**: Consider performance implications for large datasets

### Common Patterns for Challenges

```typescript
// 1. Create a feature-specific store
class ChallengeStore {
  data: SomeType[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  // Actions modify state
  addItem(item: SomeType) {
    this.data.push(item);
  }
}

// 2. Use store in components
const ChallengeComponent = observer(() => {
  const { challengeStore } = useStore();
  return <div>{/* Implementation */}</div>;
});

// 3. Test with mocked stores
test('challenge behavior', () => {
  const mockStore = new ChallengeStore();
  renderWithProviders(<ChallengeComponent />, { challengeStore: mockStore });
  // Assertions
});
```

### Before Submitting

1. Run `npm run test:run` - All tests must pass
2. Run `pnpm check:all` - No linting or type errors
3. Review code for clarity and completeness
4. Ensure proper error handling
5. Check performance with large inputs

### Important Considerations

1. **Validation First**: Always validate your approach before coding
2. **Edge Cases**: Consider empty inputs, null values, large datasets
3. **Error Handling**: Gracefully handle errors and invalid inputs
4. **State Management**: Use MobX actions for all state mutations
5. **Testing**: Write comprehensive tests including edge cases