import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver, vueRouter } from '@src/stories/utils/decorators'
import UiBanner from '@src/components/banner/UiBanner.vue'

const meta = {
  title: 'UI Kit/Banner',
  component: UiBanner,
  tags: ['autodocs'],
  decorators: [emitsObserver, vueRouter()],
  argTypes: {
    backgroundColor: { control: 'color' },
    button: { control: 'object' },
    content: { control: 'text' },
    image: { control: 'object' },
    picture: { control: 'object' },
    ui: { control: 'object' }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiBanner },
    setup: () => ({ args }),
    template: `<UiBanner v-bind="args" />`
  })
} satisfies Meta<typeof UiBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    backgroundColor: '#4f46e5',
    content: 'This is a banner',
    button: { label: 'Click me', url: '/', ui: { base: 'font-normal' } },
    image: {
      src: 'https://picsum.photos/id/43/400/300',
      alt: 'banner image'
    }
  }
}
