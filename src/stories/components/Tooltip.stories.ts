import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiTooltip from '@src/components/tooltip/UiTooltip.vue'
import UiButton from '@src/components/button/UiButton.vue'

const meta = {
  title: 'UI Kit/Tooltip',
  component: UiTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right']
    },
    offsetValue: { control: 'number' },
    disabled: { control: 'boolean' },
    trigger: {
      control: 'select',
      options: ['hover', 'click']
    },
    ui: { control: 'object' }
  },
  args: {
    text: 'This is a tooltip',
    placement: 'top',
    offsetValue: 8,
    disabled: false,
    trigger: 'hover'
  }
} satisfies Meta<typeof UiTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center h-64">
        <UiTooltip v-bind="args">
          <template #activator>
            <UiButton>Hover me</UiButton>
          </template>
          <div class="py-1 px-2 rounded-2 bg-slate-800">{{ args.text }}</div>
        </UiTooltip>
      </div>
    `
  })
}

export const WithCustomContent: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center h-64">
        <UiTooltip v-bind="args">
          <template #activator>
            <UiButton>Hover me</UiButton>
          </template>
          <div class="py-1 px-2 rounded-2 bg-slate-800 text-left">
            <div class="font-bold">Custom Tooltip</div>
            <div class="text-xs">With multiple lines</div>
          </div>
        </UiTooltip>
      </div>
    `
  }),
  args: {
    text: ''
  }
}

export const ClickTrigger: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center h-64">
        <UiTooltip v-bind="args">
          <template #activator>
            <UiButton>Click me</UiButton>
          </template>
          <div class="py-1 px-2 rounded-2 bg-slate-800">{{ args.text }}</div>
        </UiTooltip>
      </div>
    `
  }),
  args: {
    trigger: 'click',
    text: 'Click again to hide tooltip'
  }
}

export const Disabled: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center h-64">
        <UiTooltip v-bind="args">
          <template #activator>
            <UiButton>Tooltip disabled</UiButton>
          </template>
          <div class="py-1 px-2 rounded-2 bg-slate-800">{{ args.text }}</div>
        </UiTooltip>
      </div>
    `
  }),
  args: {
    disabled: true,
    text: 'This tooltip is disabled'
  }
}

export const MultiplePlacements: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiTooltip, UiButton },
    setup: () => ({ args }),
    template: `
      <div class="flex flex-col items-center justify-center gap-16 h-96">
        <UiTooltip placement="top">
          <template #activator>
            <UiButton>Top</UiButton>
          </template>
          <div class="py-1 px-2 rounded-2 bg-slate-800">Top tooltip</div>
        </UiTooltip>
        
        <div class="flex gap-16">
          <UiTooltip placement="left">
            <template #activator>
              <UiButton>Left</UiButton>
            </template>
            <div class="py-1 px-2 rounded-2 bg-slate-800">Left tooltip</div>
          </UiTooltip>
          
          <UiTooltip placement="right">
            <template #activator>
              <UiButton>Right</UiButton>
            </template>
            <div class="py-1 px-2 rounded-2 bg-slate-800">Right tooltip</div>
          </UiTooltip>
        </div>
        
        <UiTooltip placement="bottom">
          <template #activator>
            <UiButton>Bottom</UiButton>
          </template>
          <div class="py-1 px-2 rounded-2 bg-slate-800">Bottom tooltip</div>
        </UiTooltip>
      </div>
    `
  })
}
