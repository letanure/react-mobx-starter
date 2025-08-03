# Photoroom Test Project

A technical test project built with Vite, React, and TypeScript.

## Getting Started

### Prerequisites

- Node.js v22 or higher
- npm v10.0.0 or higher

### Installation

```bash
# Using nvm
nvm use

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Code Quality

```bash
# Lint (TypeScript + Biome)
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check only
pnpm type:check

# Run all checks
pnpm check:all
```

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests once (CI mode)
pnpm test:run

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

**Test Structure:**

- Tests are colocated with their components (e.g., `App.tsx` and `App.test.tsx`)
- Global test setup in `src/test/setup.ts`
- Pre-commit hook runs related tests for changed files

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Commit messages must follow the format:

```
<type>(<scope>): <subject>
```

Allowed types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:

```bash
git commit -m "feat: add image upload component"
git commit -m "fix: resolve memory leak in image viewer"
git commit -m "docs: update API documentation"
```

### Release Process

Releases are automated using semantic-release. Based on your commit messages:

- `fix:` commits trigger a patch release (0.0.X)
- `feat:` commits trigger a minor release (0.X.0)
- `BREAKING CHANGE:` in commit body triggers a major release (X.0.0)

**Manual Release:**

```bash
# Dry run to see what would happen
pnpm release:dry-run

# Perform actual release
pnpm release
```

**Automatic Release (CI/CD):**
When commits are pushed to `main`, semantic-release will:

1. Analyze commits since last release
2. Determine version bump type
3. Update package.json version
4. Generate/update CHANGELOG.md
5. Create git tag
6. Push changes back to repository

### Roadmap

- [x] Initialize Vite + React + SWC project
- [x] Configure Node version (v22)
- [x] Set up code quality tools
  - [x] Add Biome for formatting and linting
  - [x] Remove ESLint in favor of Biome
  - [x] Add TypeScript type checking to lint command
  - [x] Add Git hooks with lint-staged
- [x] Set up Git hooks
  - [x] Pre-commit hook with lint-staged
  - [x] Commit-msg hook with commitlint
- [x] Set up automated releases
  - [x] Semantic-release for version management
  - [x] Auto-generated CHANGELOG.md
  - [x] Git tags on releases
- [x] Add testing framework (Vitest + React Testing Library)
- [x] Add error boundary for graceful error handling
- [x] Set up CI/CD workflow
- [ ] Implement style system
  - [ ] add tailwind
- [ ] Define basic page layout, 2 columns, side + main
- [ ] Implement image upload component
- [ ] Image Upload
- [ ] Image View
- [ ] Folder management
- [ ] Persistence

## Technical Decisions

- Node Version Management
  - **What**: Use Node v22 (LTS)
  - **Why**: Latest LTS version
  - **How**: Multiple version files to support different version managers
- Build Tool
  - **What**: Vite with SWC
  - **Why**: Its the best way in 2025
- Framework
  - **What**: React 19 with TypeScript
  - **Why**: Project requirement
- Code Quality
  - **What**: Biome for linting/formatting + TypeScript for type checking
  - **Why**: Single fast tool instead of ESLint + Prettier, better performance
  - **How**: Biome handles style/formatting, TypeScript handles type safety
- Git Hooks
  - **What**: Husky + lint-staged + commitlint
  - **Why**: Enforce code quality and commit message standards automatically
  - **How**: Pre-commit runs linting/formatting on staged files and related tests, commit-msg validates commit format
- Automated Releases
  - **What**: Semantic-release with conventional commits
  - **Why**: Automated versioning, changelogs, and releases based on commit messages
  - **How**: Analyzes commits, bumps version, updates CHANGELOG, creates git tags
- Testing Framework
  - **What**: Vitest + React Testing Library
  - **Why**: Fast, Vite-native testing with excellent DX and React integration
  - **How**: Colocated tests, runs in watch mode during development, automated in pre-commit
- Error Handling
  - **What**: React Error Boundary component
  - **Why**: Prevents app crashes, provides graceful error handling and recovery
  - **How**: Global ErrorBoundary wraps the app, catches JavaScript errors in components
