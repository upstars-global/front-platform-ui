import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiIcon from '@src/components/icon/UiIcon.vue'
import UiCircleProgressBar from '@src/components/circle-progress-bar/UiCircleProgressBar.vue'
import { icons, type UiIconName } from '@src/components/icon/config'
import type { ComponentProps } from 'vue-component-type-helpers'

const names = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

const meta = {
  title: 'UI Kit/CircleProgressBar',
  component: UiCircleProgressBar,
  tags: ['autodocs'],
  argTypes: {
    progress: { control: 'number' },
    max: { control: 'number' },
    background: { control: 'color' },
    progressColor: { control: 'color' },
    trailColor: { control: 'color' },
    size: { control: 'number' },
    progressWidth: { control: 'number' },
    startAngle: { control: 'number' },
    isAnimation: { control: 'boolean' },
    rounded: { control: 'boolean' }
  },
  args: {
    progress: 67,
    max: 100,
    size: 80,
    progressWidth: 4,
    startAngle: 90
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCircleProgressBar },
    setup: () => ({ args }),
    template: `<UiCircleProgressBar v-bind="args" />`
  })
} satisfies Meta<typeof UiCircleProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

type SlotContent = ComponentProps<typeof UiCircleProgressBar> & { iconName?: UiIconName }
type SlotContentStory = StoryObj<Meta<SlotContent>>
export const SlotContent: SlotContentStory = {
  argTypes: {
    iconName: { control: 'select', options: names }
  },
  args: {
    background: '#e0e0e0',
    progressColor: '#676767',
    trailColor: '#bfbfbf',
    progress: 43,
    iconName: 'support'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCircleProgressBar, UiIcon },
    setup: () => ({ args }),
    template: `<div class="flex gap-4">
      <UiCircleProgressBar v-bind="args" v-slot="{ progress, max }">
        <span class="text-sm text-neutral-700">{{ Math.floor(progress / max * 100) + '%' }}</span>
      </UiCircleProgressBar>
      <UiCircleProgressBar v-bind="args">
        <UiIcon :name="args.iconName" :style="{ color: args.progressColor }" />
      </UiCircleProgressBar>
    </div>`
  })
}

export const VariousSizes: Story = {
  argTypes: {
    progress: { table: { disable: true } },
    size: { table: { disable: true } }
  },
  args: {
    max: 160,
    background: 'rgba(255, 255, 255, 0.13)',
    progressColor: '#676767',
    trailColor: '#bfbfbf'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCircleProgressBar },
    setup: () => ({ args, sizes: [48, 64, 80, 96, 112, 128] }),
    template: `<div class="flex gap-4 items-center">
      <UiCircleProgressBar v-for="size in sizes" :key="size" v-bind="args" :progress="size" :size="size">
        <span class="text-xs text-neutral-700">{{ size + 'px' }}</span>
      </UiCircleProgressBar>
    </div>`
  })
}
