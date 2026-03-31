import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { UiIcon, UiPopover } from '@src/components'

const meta = {
  title: 'UI Kit/Popover',
  component: UiPopover,
  tags: ['autodocs'],
  argTypes: {
    offset: { control: 'number' },
    placement: { control: 'select', options: ['bottom', 'bottom-end', 'bottom-start'] },
    ui: { control: 'object' }
  },
  args: {
    offset: 0,
    placement: 'bottom'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiIcon, UiPopover },
    setup: () => ({ args }),
    template: `<UiPopover v-bind="args" class="m-auto w-6">
      <template #anchor>
        <UiIcon name="support" />
      </template>
      <template #content>
        <div class="border border-slate-400 rounded-b-2 p-2 whitespace-nowrap">Popover content</div>
      </template>
    </UiPopover>`
  })
} satisfies Meta<typeof UiPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}
