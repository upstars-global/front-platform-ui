import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiAccordion from '@src/components/accordion/UiAccordion.vue'
import { icons, type UiIconName } from '@src/components/icon/config'
import { ICON_SIZE_LIST } from '../config/icons'

const iconNames = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

const meta = {
  title: 'UI Kit/Accordion',
  component: UiAccordion,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    isCustomToggle: { control: 'boolean' },
    trailingIconName: { control: 'select', options: iconNames },
    trailingIconSize: { control: 'select', options: ICON_SIZE_LIST },
    ui: { control: 'object' }
  },
  args: {
    isOpen: false,
    isCustomToggle: false,
    trailingIconName: 'dropdownDown',
    trailingIconSize: '24'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiAccordion },
    setup: () => ({ args }),
    template: `<UiAccordion v-bind="args" class="max-w-96">
      <template #activator>
        <span>Accordion header</span>
      </template>
      <div class="p-2 mt-2 bg-slate-300 border-slate-300 rounded-4">Accordion content</div>
    </UiAccordion>
    `
  })
} satisfies Meta<typeof UiAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Opened: Story = {
  args: {
    isOpen: true
  }
}
