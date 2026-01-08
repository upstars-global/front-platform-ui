import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiDropdown from '@src/components/dropdown/UiDropdown.vue'

const meta = {
  title: 'UI Kit/Dropdown',
  component: UiDropdown,
  tags: ['autodocs'],
  argTypes: {
    offset: { control: 'number' },
    placement: { control: 'select', options: ['bottom', 'bottom-end', 'bottom-start'] },
    ui: { control: 'object' }
  },
  args: {
    offset: 0,
    placement: 'bottom-start'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiDropdown },
    setup: () => ({ args }),
    template: `<UiDropdown v-bind="args">
      <template #activator>
        <span>Click here</span>
      </template>
      <div class="flex flex-col bg-slate-300 rounded-4 p-2">
        <div class="mx-2 border-b border-slate-700">Dropdown item</div>
        <div class="mx-2 border-b border-slate-700">Dropdown item</div>
        <div class="mx-2 border-b border-slate-700">Dropdown item</div>
        <div class="mx-2">Dropdown item</div>
      </div>
    </UiDropdown>`
  })
} satisfies Meta<typeof UiDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}
