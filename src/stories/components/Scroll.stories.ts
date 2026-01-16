import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiScroll from '@src/components/scroll/UiScroll.vue'

const meta = {
  title: 'UI Kit/Scroll',
  component: UiScroll,
  decorators: [emitsObserver],
  tags: ['autodocs'],
  argTypes: {
    autoHide: {
      control: 'select',
      options: ['never', 'scroll', 'move', 'leave']
    },
    autoHideDelay: { control: 'number' },
    autoHideSuspend: { control: 'boolean' },
    visibility: {
      control: 'select',
      options: ['visible', 'hidden', 'auto']
    },
    theme: { control: 'text' },
    dragScroll: { control: 'boolean' },
    clickScroll: { control: 'boolean' },
    overflowX: {
      control: 'select',
      options: ['hidden', 'visible', 'scroll', 'visible-hidden', 'visible-scroll']
    },
    overflowY: {
      control: 'select',
      options: ['hidden', 'visible', 'scroll', 'visible-hidden', 'visible-scroll']
    },
    showNativeOverlaidScrollbars: { control: 'boolean' },
    defer: { control: 'boolean' },
    infiniteScroll: { control: 'boolean' },
    infiniteScrollMargin: { control: 'number' },
    ui: { control: 'object' }
  },
  args: {
    autoHide: 'leave'
  },
  render: (args) => ({
    components: { UiScroll },
    setup: () => ({ args }),
    template: `
      <UiScroll v-bind="args" class="h-52 w-80 border border-dashed border-gray-500">
        <div class="p-4">
          <p v-for="i in 20" :key="i" class="my-2">Scrollable content line {{ i }}</p>
        </div>
      </UiScroll>
    `
  })
} satisfies Meta<typeof UiScroll>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const InfiniteScroll: Story = {
  args: {
    infiniteScroll: true,
    infiniteScrollMargin: 50
  }
}

export const AutoHideNever: Story = {
  args: {
    autoHide: 'never'
  }
}

export const AutoHideScroll: Story = {
  args: {
    autoHide: 'scroll'
  }
}

export const AutoHideMove: Story = {
  args: {
    autoHide: 'move'
  }
}

export const HorizontalScroll: Story = {
  render: (args) => ({
    components: { UiScroll },
    setup: () => ({ args }),
    template: `
      <UiScroll v-bind="args" class="w-96 border border-dashed border-gray-500">
        <div class="flex gap-4 p-4 w-max">
          <div v-for="i in 10" :key="i" class="w-36 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
            Item {{ i }}
          </div>
        </div>
      </UiScroll>
    `
  })
}
