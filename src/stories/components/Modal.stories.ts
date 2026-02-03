import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiModal from '@src/components/modal/UiModal.vue'
import UiButton from '@src/components/button/UiButton.vue'
import { emitsObserver, fullScreenOverlay } from '@src/stories/utils/decorators'

const meta = {
  title: 'UI Kit/Modal',
  component: UiModal,
  tags: ['autodocs'],
  decorators: [emitsObserver, fullScreenOverlay],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
    isLoaded: { control: 'boolean' },
    isCustomScroll: { control: 'boolean' },
    infiniteScroll: { control: 'boolean' },
    infiniteScrollMargin: { control: 'number' },
    role: { control: 'select', options: ['dialog', 'alertdialog'] },
    ui: { control: 'object' }
  },
  args: {
    title: 'Modal Title',
    description: '',
    role: 'dialog'
  }
} satisfies Meta<typeof UiModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <p class="text-slate-700">This is the modal content. You can put any content here.</p>
      </UiModal>
    `
  })
}

export const WithDescription: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <p class="text-slate-700">Modal with both title and description in the header.</p>
      </UiModal>
    `
  }),
  args: {
    title: 'Please note',
    description: 'This action requires your attention'
  }
}

export const WithFooter: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <div class="flex flex-col items-center text-center">
          <!-- Placeholder icon -->
          <div class="size-20 rounded-2 border-2 border-dashed border-slate-600 flex items-center justify-center mb-4">
            <span class="text-slate-600 text-2xl">✳</span>
          </div>

          <!-- Main Message -->
          <h3 class="text-xl md:text-2xl font-bold text-slate-900 mb-4">Main Message</h3>

          <!-- Detailed description -->
          <p class="text-base text-slate-600">Detailed description of the message and instructions for actions</p>
        </div>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Primary button</UiButton>
          <UiButton variant="secondary" @click="close">Secondary button</UiButton>
        </template>
      </UiModal>
    `
  }),
  args: {
    title: 'Name of process'
  }
}

export const WithoutCloseButton: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <p class="text-slate-700">This modal has no close button. Use the button below to close.</p>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Close Modal</UiButton>
        </template>
      </UiModal>
    `
  }),
  args: {
    title: 'No Close Button',
    showCloseButton: false
  }
}

export const LongContent: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <div class="space-y-4">
          <p v-for="i in 20" :key="i" class="text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Close</UiButton>
        </template>
      </UiModal>
    `
  }),
  args: {
    title: 'Scrollable Content'
  }
}

export const CustomHeader: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <template #header>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🎉</span>
            <div>
              <h2 class="text-lg font-bold text-slate-900">Congratulations!</h2>
              <p class="text-sm text-slate-600">You've completed the task</p>
            </div>
          </div>
        </template>

        <p class="text-slate-700">Your progress has been saved successfully.</p>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Continue</UiButton>
        </template>
      </UiModal>
    `
  })
}

export const Fullscreen: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <div class="flex flex-col items-center text-center">
          <div class="size-20 rounded-2 border-2 border-dashed border-slate-600 flex items-center justify-center mb-4">
            <span class="text-slate-600 text-2xl">✳</span>
          </div>

          <h3 class="text-xl md:text-2xl font-bold text-slate-900 mb-4">Fullscreen Modal</h3>

          <p class="text-base text-slate-600">This modal takes full height on mobile with a colored top border.</p>
        </div>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Primary button</UiButton>
          <UiButton variant="secondary" @click="close">Secondary button</UiButton>
        </template>
      </UiModal>
    `
  }),
  args: {
    title: 'Fullscreen Mode',
    fullscreen: true
  }
}

export const Loading: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <p class="text-slate-700">This content will not be visible while loading.</p>
      </UiModal>
    `
  }),
  args: {
    title: 'Loading...',
    isLoaded: false
  }
}

export const NativeScroll: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <div class="space-y-4">
          <p v-for="i in 20" :key="i" class="text-slate-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Close</UiButton>
        </template>
      </UiModal>
    `
  }),
  args: {
    title: 'Native Scroll (No UiScroll)',
    isCustomScroll: false
  }
}

export const InfiniteScroll: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiModal, UiButton },
    setup: () => ({ args }),
    template: `
      <UiModal v-bind="args">
        <div class="space-y-4">
          <p v-for="i in 30" :key="i" class="text-slate-700">
            Item {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <template #footer="{ close }">
          <UiButton variant="primary" @click="close">Close</UiButton>
        </template>
      </UiModal>
    `
  }),
  args: {
    title: 'Infinite Scroll Demo',
    infiniteScroll: true,
    infiniteScrollMargin: 100
  }
}
