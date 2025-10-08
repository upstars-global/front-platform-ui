import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiSkeleton from '@src/components/skeleton/UiSkeleton.vue'

const meta = {
  title: 'UI Kit/Skeleton',
  component: UiSkeleton,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    ui: { control: 'object' }
  },
  args: {
    as: 'div'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiSkeleton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center gap-4">
        <UiSkeleton class="w-16 h-16 rounded-full" v-bind="args" />
        <div class="grid gap-2">
          <UiSkeleton class="w-60 h-7 rounded-3" v-bind="args" />
          <UiSkeleton class="w-60 h-7 rounded-3" v-bind="args" />
        </div>
      </div>
    `
  })
} satisfies Meta<typeof UiSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}
