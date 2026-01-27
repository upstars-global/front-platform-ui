# Front Platform UI

A modern Vue 3 UI component library built with TypeScript, Tailwind CSS, and Vite. This library provides a collection of customizable and well-documented components for building web applications.

[![Node Version](https://img.shields.io/badge/node-%3E%3D22.19.0-brightgreen)](https://nodejs.org/)

## 📋 Table of Contents

- [Requirements](#-requirements)
- [Installation](#-installation)
- [Development](#-development)
- [Component Development](#-component-development)
  - [Component Structure](#component-structure)
  - [Component File Structure](#component-file-structure)
  - [Creating a New Component](#creating-a-new-component)
  - [Component Architecture](#component-architecture)
    - [Core Composables](#core-composables)
    - [Class Merging Pattern](#class-merging-pattern)
    - [uiClasses Pattern](#uiclasses-pattern)
    - [Complete Component Example](#complete-component-example)
    - [Helper Functions](#helper-functions)
- [Theming & Customization](#-theming--customization)
  - [Using the Theme System](#using-the-theme-system)
  - [Global Configuration](#global-configuration)
  - [Merge Strategies](#merge-strategies)
- [Storybook Utilities](#-storybook-utilities)
  - [Decorators](#decorators)
- [Code Quality](#-code-quality)
  - [Linting](#linting)
  - [Formatting](#formatting)
  - [Commit Convention](#commit-convention)

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

### Component Architecture

#### Core Composables

**`useComponentAttributes`**

This composable handles class merging and attribute management for components.

```typescript
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-component-name', // Root class name
  computed(() => [...classes]), // Base classes
  'merge' // Strategy: 'merge' | 'join'
)
```

**Returns:**

- `attributes` - All HTML attributes except `class`
- `className` - Merged root classes for the component
- `mergeClasses()` - Function to merge additional classes

**`useAppConfig`**

Provides access to global UI configuration.

```typescript
const appConfig = useAppConfig()
// Access: appConfig.ui?.componentName?....
```

#### Class Merging Pattern

Components follow a three-tier class merging system:

1. **Theme** (default) - From `theme.ts`
2. **Global Config** - From app configuration
3. **Component Prop** - From `ui` prop

```typescript
// Example: Merging button classes
const classes = [
  theme.base, // 1. Theme default
  appConfig.ui?.button?.base, // 2. Global config
  props.ui?.base // 3. Component prop
].filter(Boolean)
```

#### uiClasses Pattern

The `uiClasses` computed property organizes all component element classes:

```typescript
const uiClasses = computed(() => ({
  // Root element
  root: mergeClasses(theme.root, appConfig.ui?.input?.root, props.ui?.root),

  // Child elements
  label: mergeClasses(theme.label, appConfig.ui?.input?.label, props.ui?.label),
  input: mergeClasses(theme.input, appConfig.ui?.input?.input, props.ui?.input),

  // Conditional classes
  error: isError.value ? mergeClasses(theme.error, appConfig.ui?.input?.error, props.ui?.error) : ''
}))
```

#### Complete Component Example

```vue
<script lang="ts">
import type { FormElementProps, UiProp } from '../types'
import type { ComponentUi } from './theme'

export interface UiComponentProps extends FormElementProps {
  ui?: UiProp<ComponentUi>
  // ... other props
}

export interface UiComponentEmits {
  (event: 'update:modelValue', value: string): void
}

export interface UiComponentSlots {
  default(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import theme from './theme'

defineOptions({
  name: 'UiComponent',
  inheritAttrs: false
})

const props = defineProps<UiComponentProps>()
const emit = defineEmits<UiComponentEmits>()
const slots = defineSlots<UiComponentSlots>()

// 1. Get global config
const appConfig = useAppConfig()

// 2. Setup component attributes and base classes
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-component',
  computed(() => {
    const commonClasses = [theme.base, appConfig.ui?.component?.base, props.ui?.base].filter(Boolean)

    // Handle state variants
    const states = prepareVariants({
      theme: theme.states,
      appConfig: appConfig?.ui?.component?.states,
      uiProp: props.ui?.states
    })

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    return commonClasses
  }),
  appConfig?.ui?.component?.strategy || props.ui?.strategy
)

// 3. Define element-specific classes
const uiClasses = computed(() => ({
  label: mergeClasses(theme.label, appConfig.ui?.component?.label, props.ui?.label),
  input: mergeClasses(theme.input, appConfig.ui?.component?.input, props.ui?.input),
  icon: mergeClasses(theme.icon, appConfig.ui?.component?.icon, props.ui?.icon)
}))
</script>

<template>
  <div :class="className" v-bind="attributes">
    <label :class="uiClasses.label">
      <slot name="label">{{ label }}</slot>
    </label>
    <input :class="uiClasses.input" />
  </div>
</template>
```

#### Helper Functions

**`prepareVariants`**

Merges variant classes from theme, config, and props:

```typescript
const states = prepareVariants<ComponentUi['states']>({
  theme: theme.states,
  appConfig: appConfig?.ui?.component?.states,
  uiProp: props.ui?.states
})

// Usage
if (props.disabled) {
  commonClasses.push(states.disabled)
}
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

## 📖 Storybook Utilities

### Decorators

The library provides utility decorators for Storybook stories located in `src/stories/utils/decorators/`.

#### emitsObserver

Automatically tracks component emits and displays them in the Storybook Actions panel.

**Basic usage:**

```ts
import { emitsObserver } from '@src/stories/utils/decorators'

const meta = {
  title: 'UI Kit/Button',
  component: UiButton,
  decorators: [emitsObserver]
} satisfies Meta<typeof UiButton>
```

**Important: Decorator Order**

When using `emitsObserver` with other decorators, the order matters. Storybook applies decorators in the order they are defined.

**Problem example:**

In the `Modal.stories.ts` we had an issue with an `emitsObserver`. The story looked like this:

```ts
template: `
  <div class="fixed inset-0 flex items-end md:items-center justify-center bg-black/50">
    <UiModal v-bind="args">
      <p class="text-slate-700">Modal with both title and description in the header.</p>
    </UiModal>
  </div>
`
```

In this case, the close and infiniteScroll events didn't work because of a div that wraps UiModal.

**Solution (from `Modal.stories.ts`):**

In `Modal.stories.ts` story, we needed a backdrop wrapper for proper modal display, but we also need `emitsObserver` works properly.
So, we created a wrapper decorator that wraps the `UiModal` component and the correct order places `emitsObserver` first:

```ts
decorators: [
  emitsObserver,
  () => ({
    template: "<div class='fixed inset-0 flex items-end md:items-center justify-center bg-black/50'><story/></div>"
  })
]
```

With this order, `emitsObserver` wraps everything and properly tracks `UiModal` events like `close` in Storybook Actions, then the wrapper decorator is applied to create the backdrop.

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
