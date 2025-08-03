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

### Lint

```bash
npm run lint
```

### Roadmap

- [x] Initialize Vite + React + SWC project
- [x] Configure Node version (v22)
- [ ] Set up code quality tools
  - [ ] Add Biome for formatting and additional linting
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
