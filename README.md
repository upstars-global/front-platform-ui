# Front Platform UI

A modern Vue 3 UI component library built with TypeScript, Tailwind CSS, and Vite. This library provides a collection of customizable and well-documented components for building web applications.

[![Node Version](https://img.shields.io/badge/node-%3E%3D22.19.0-brightgreen)](https://nodejs.org/)

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
- [Component Development](#component-development)
- [Theming & Customization](#theming--customization)
- [Code Quality](#code-quality)

## 📦 Requirements

- **Node.js**: >= 22.19.0
- **pnpm**: 10.17.0 (recommended package manager)

## 🚀 Installation

### Using pnpm (recommended)

```bash
pnpm install front-platform-ui
```

### Using npm

```bash
npm install front-platform-ui
```

### Using yarn

```bash
yarn add front-platform-ui
```

## 💻 Development

### Clone the repository

```bash
git clone https://github.com/upstars-global/front-platform-ui.git
cd front-platform-ui
```

### Install dependencies

```bash
pnpm install
```

### Start Storybook development server

```bash
pnpm run dev:storybook
```

This will start Storybook on `http://localhost:6006` where you can view and interact with all components.

### Build type definitions

```bash
pnpm run build:types
```

### Watch mode for type definitions

```bash
pnpm run dev:types
```

## 🎨 Component Development

### Component Structure

Each component follows a consistent structure:

```
component-name/
├── UiComponentName.vue    # Component implementation
└── theme.ts               # Theme configuration
```

### Component File Structure

Components use a two-script approach for better organization:

```vue
<script lang="ts">
// Types and interfaces
import type { ... } from '...'

export interface UiComponentProps {
  // Props definition
}

export interface UiComponentEmits {
  // Events definition
}

export interface UiComponentSlots {
  // Slots definition
}
</script>

<script setup lang="ts">
// Component logic
import { computed, ref } from 'vue'

defineOptions({
  name: 'UiComponent',
  inheritAttrs: false
})

const props = defineProps<UiComponentProps>()
const emit = defineEmits<UiComponentEmits>()
const slots = defineSlots<UiComponentSlots>()

// Computed properties
// Refs
// Composables
// Event handlers
// Lifecycle hooks
</script>

<template>
  <!-- Component template -->
</template>
```

### Creating a New Component

1. **Create component directory**:

   ```bash
   mkdir src/components/your-component
   ```

2. **Create component files**:
   - `UiYourComponent.vue` - Component implementation
   - `theme.ts` - Theme configuration

3. **Export component**:
   Add exports to `src/components/index.ts`:

   ```typescript
   export { default as UiYourComponent } from './your-component/UiYourComponent.vue'
   export type { UiYourComponentProps } from './your-component/UiYourComponent.vue'
   ```

4. **Create Storybook story**:
   Create `src/stories/components/YourComponent.stories.ts`

5. **Build types**:
   ```bash
   pnpm run build:types
   ```

## 🎨 Theming & Customization

### Using the Theme System

Components can be customized using the `ui` prop:

```vue
<template>
  <UiButton :ui="customTheme"> Custom Button </UiButton>
</template>

<script setup lang="ts">
const customTheme = {
  base: 'custom-base-classes',
  variants: {
    primary: 'custom-primary-classes'
  }
}
</script>
```

### Global Configuration

Configure all components globally:

```typescript
// main.ts
import { createApp } from 'vue'
import FrontPlatformUi from 'front-platform-ui'
import type { UiKitConfig } from 'front-platform-ui'

const uiConfig: UiKitConfig = {
  ui: {
    button: {
      base: 'custom-button-base',
      variants: {
        primary: 'bg-blue-500 hover:bg-blue-600'
      }
    }
  }
}

app.use(FrontPlatformUi, uiConfig)
```

### Merge Strategies

Control how classes are merged:

- `merge` (default): Merges with default classes
- `override`: Replaces default classes
- `replace`: Completely replaces the theme

```vue
<UiButton :ui="{ strategy: 'override', base: 'my-classes' }">
  Button
</UiButton>
```

## 🔍 Code Quality

### Linting

The project uses ESLint with Vue and TypeScript support:

```bash
# Check for linting errors
pnpm run lint:eslint

# Auto-fix linting errors
pnpm run lintfix
```

### Formatting

Prettier is used for code formatting:

```bash
# Check formatting
pnpm run lint:prettier

# Fix formatting
pnpm run lintfix
```

### Commit Convention

This project uses [Semantic Release](https://semantic-release.gitbook.io/) with [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning and changelog generation.

#### Commit Message Format

```
<type>(FP-XXXX): <subject>

<body>

<footer>
```

Where `FP-XXXX` is your task/ticket number (e.g., FP-3980).

#### Breaking Changes

To trigger a major version release, include `BREAKING CHANGE:` in the commit footer:

```
feat: redesign button API

BREAKING CHANGE: The `variant` prop has been renamed to `type`
```

Or use `!` after the type:

```
feat!: redesign button API
```

#### Examples

**Feature (Minor Release)**

```
feat(FP-3980): add loading state to button

Add loading prop to display spinner in button
```

**Bug Fix (Patch Release)**

```
fix(FP-4521): prevent double validation on blur in input

Resolves issue where validation was triggered twice
```

**Breaking Change (Major Release)**

```
feat(FP-5123)!: simplify select options API

BREAKING CHANGE: Options now accept { label, value } instead of { text, id }

Migration guide:
- Rename `text` to `label`
- Rename `id` to `value`
```

**Refactoring (Patch Release)**

```
refactor(FP-3980): reorganize input component structure

Split script blocks for better code organization
```

**No Release**

```
docs(FP-4200): add theming examples to README
```

**Chore (Patch Release)**

```
chore(FP-4100): update dependencies to latest versions
```
