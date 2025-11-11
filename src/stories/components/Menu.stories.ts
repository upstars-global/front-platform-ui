import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { vueRouter } from '@src/stories/utils/decorators'
import UiMenu from '@src/components/menu/UiMenu.vue'

const meta = {
  title: 'UI Kit/Menu',
  component: UiMenu,
  tags: ['autodocs'],
  decorators: [vueRouter()],
  argTypes: {
    items: { control: 'object' },
    ui: { control: 'object' }
  }
} satisfies Meta<typeof UiMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    items: [
      { name: 'Item 1', to: '/item-1' },
      { name: 'Item active', to: '/' },
      { name: 'Item 3', to: '/item-3' },
      { name: 'Item 4', to: '/item-4' }
    ]
  }
}
