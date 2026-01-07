import type { Meta, StoryObj } from '@storybook/vue3-vite'
import isChromatic from 'chromatic/isChromatic'
import UiLoader from '@src/components/loader/UiLoader.vue'

const meta = {
  title: 'UI Kit/Loader',
  component: UiLoader,
  tags: ['autodocs'],
  args: {
    duration: isChromatic() ? 0 : 1,
    size: 64,
    strokeWidth: 2
  },
  argTypes: {
    size: { control: 'number' },
    strokeWidth: { control: 'number' },
    ui: { control: 'object' }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiLoader },
    setup: () => ({ args }),
    template: `<UiLoader v-bind="args" :style="{ width: args.size + 'px' }" />`
  })
} satisfies Meta<typeof UiLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const VariousSizes: Story = {
  argTypes: {
    size: { table: { disable: true } }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiLoader },
    setup: () => ({ args, sizes: [48, 64, 80, 96, 112, 128] }),
    template: `<div class="flex gap-4">
      <template v-for="size in sizes" :key="size">
        <div class="flex flex-col gap-4 text-center">
          <span class="text-xs text-neutral-700">{{ size + 'px' }}</span>
          <UiLoader v-bind="args" :size="size" :style="{ width: size + 'px' }" />
        </div>
      </template>
    </div>`
  })
}
