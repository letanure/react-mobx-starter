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

### Project Structure

```
src/
├── assets/           # Static assets
│   ├── icons/        # SVG icons
│   ├── images/       # Photos, graphics
│   └── fonts/        # Custom fonts
├── components/       # Smart/container components
│   └── ui/          # Dumb/presentational components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── lib/             # Third-party library configurations
├── store/           # State management
├── constants/       # App constants
├── contexts/        # React contexts
├── styles/          # CSS files
└── test/           # Test utilities and setup
```

**Path Aliases & Import Rules:**
```tsx
// Cross-folder imports: Use specific aliases (no file extensions)
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { formatDate } from '@/utils/formatDate'
import type { User } from '@/types/User'
import { api } from '@/lib/api'
import { useStore } from '@/store/useStore'
import { API_URL } from '@/constants/config'
import { AuthContext } from '@/contexts/AuthContext'

// Assets and styles: Include extensions
import logo from '@/assets/icons/logo.svg'
import '@/styles/index.css'

// Colocated files: Use relative imports (no extensions)
import App from './App'
import { MyComponent } from './MyComponent'
```

**Import Rules:**
1. **Cross-folder** → Use `@/folder/file` (no extensions)
2. **Colocated files** → Use `./file` (no extensions)  
3. **Assets/CSS** → Include extensions
4. **No catch-all alias** → Forces intentional organization

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

### Architecture

See [Architecture Guidelines](./docs/architecture.md) for:
- Folder structure and organization
- Component patterns (Smart/Dumb)
- Import rules and boundaries
- Naming conventions

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
- [x] Set up path aliases and folder structure
- [x] Set up CI/CD workflow
- [x] Implement style system
  - [x] Add Tailwind CSS v4 with Vite plugin
- [ ] Define basic page layout, 2 columns, side + main
- [ ] Implement image upload component
- [ ] Image Upload
- [ ] Image View
- [ ] Folder management
- [ ] Persistence
- [ ] Docker setup for containerized development
- [ ] Security headers implementation
- [ ] Accessibility testing integration
- [ ] Performance budget monitoring

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
- Project Structure
  - **What**: Organized folder structure with specific path aliases
  - **Why**: Clean imports, better code organization, easier refactoring
  - **How**: Specific aliases for each folder (`@/components/*`, `@/hooks/*`, etc.) with fallback `@/*` for root files
- Styling Framework
  - **What**: Tailwind CSS with PostCSS
  - **Why**: Utility-first CSS framework with excellent DX, built-in dark mode, and optimal performance
  - **How**: Traditional PostCSS setup due to Vite 7 compatibility, uses @tailwind directives
