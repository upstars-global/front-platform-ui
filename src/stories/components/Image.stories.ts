import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiImage from '@src/components/image/UiImage.vue'

const meta = {
  title: 'UI Kit/Image',
  component: UiImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    srcRetina: { control: 'text' },
    isLazy: { control: 'boolean' },
    ui: { control: 'object' }
  },
  args: {
    src: 'https://picsum.photos/id/10/400/300',
    alt: 'Sample image',
    isLazy: true
  }
} satisfies Meta<typeof UiImage>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    src: 'https://picsum.photos/id/10/400/300',
    alt: 'Common image'
  }
}

export const Retina: Story = {
  args: {
    src: 'https://picsum.photos/id/10/400/300',
    srcRetina: 'https://picsum.photos/id/10/800/600',
    alt: 'Retina image'
  }
}

export const Lazy: Story = {
  args: {
    src: 'https://picsum.photos/id/10/400/300',
    isLazy: true,
    alt: 'Lazy loaded image'
  }
}
