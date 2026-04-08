import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver, vueRouter } from '@src/stories/utils/decorators'
import UiBanner from '@src/components/banner/UiBanner.vue'

const gradients = [
  'linear-gradient(90deg, #115e59 0%, #2dd4bf 100%)',
  'linear-gradient(90deg, #5b21b6 0%, #a78bfa 100%)',
  'linear-gradient(90deg, #fbbf24 0%, #92400e 100%)'
]

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
    variant: { control: 'select', options: ['default'] },
    ui: { control: 'object' }
  },
  args: {
    variant: 'default'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiBanner },
    setup: () => ({ args }),
    template: `<UiBanner v-bind="args" :background-color="args.gradient || args.backgroundColor" />`
  })
} satisfies Meta<typeof UiBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    backgroundColor: '#14b8a6',
    button: { label: 'Click me', url: '/' },
    content: 'Banner content',
    image: {
      src: '/assets/banner/banner-1.png',
      alt: 'banner image'
    }
  }
}

export const GradientBackground: Story = {
  argTypes: {
    backgroundColor: { control: 'select', options: gradients }
  },
  args: {
    backgroundColor: gradients[0],
    button: { label: 'Click me', url: '/' },
    content: 'Banner content',
    image: {
      src: '/assets/banner/banner-2.png',
      alt: 'banner image'
    }
  }
}

export const WithoutContent: Story = {
  argTypes: {
    backgroundColor: { control: 'select', options: gradients }
  },
  args: {
    backgroundColor: gradients[0],
    button: { label: 'Click me', url: '/' },
    image: {
      src: '/assets/banner/banner-1.png',
      alt: 'banner image'
    }
  }
}

export const WithoutContentAndButton: Story = {
  argTypes: {
    backgroundColor: { control: 'select', options: gradients }
  },
  args: {
    backgroundColor: gradients[0],
    image: {
      src: '/assets/banner/banner-2.png',
      alt: 'banner image'
    }
  }
}
