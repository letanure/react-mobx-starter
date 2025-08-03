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

### Roadmap

- [x] Initialize Vite + React + SWC project
- [x] Configure Node version (v22)
- [x] Set up code quality tools
  - [x] Add Biome for formatting and linting
  - [x] Remove ESLint in favor of Biome
  - [x] Add TypeScript type checking to lint command
  - [ ] Add Git hooks with lint-staged
- [ ] Set up Git hooks (pre-commit)
- [ ] Add testing framework (Vitest + React Testing Library)
- [-] Set up CI/CD workflow
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
