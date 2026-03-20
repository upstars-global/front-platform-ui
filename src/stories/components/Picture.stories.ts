import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiPicture from '@src/components/picture/UiPicture.vue'

const meta = {
  title: 'UI Kit/Picture',
  component: UiPicture,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    isLazy: { control: 'boolean' },
    provider: { control: 'select', options: ['default', 'custom'] },
    meta: { control: 'object' },
    sources: { control: 'object' },
    fetchPriority: { control: 'select', options: ['high', 'low', 'auto'] },
    ui: { control: 'object' }
  },
  args: {
    alt: 'image',
    provider: 'default',
    meta: {
      imageId: '10',
      sizes: ['400', '300'],
      queries: []
    }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiPicture },
    setup: () => ({ args }),
    template: `<div>
      <div v-if="args.provider === 'custom'" class="text-xs mb-8">
        <p>To test custom provider, use the 'meta' property:</p>
        <ul class="list-disc list-inside">
          <li>imageId — number. Represents the ID in the image URL.</li>
          <li>sizes - list of strings. width and height</li>
          <li>queries - list of strings. uses for effects, e.g. grayscale, blur</li>
        </ul>
        <p>see <a class="underline text-blue-500" href="https://picsum.photos/" target="_blank">picsum.photos</a> for more details</p>
      </div>
      <UiPicture v-bind="args" />
    </div>`
  })
} satisfies Meta<typeof UiPicture>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    src: 'https://picsum.photos/id/10/400/300',
    sources: [
      {
        srcset: 'https://picsum.photos/id/10/600/500 1x, https://picsum.photos/id/10/1200/1000 2x',
        media: '(min-width: 1024px)'
      },
      {
        srcset: 'https://picsum.photos/id/10/500/400 1x, https://picsum.photos/id/10/1000/800 2x',
        media: '(min-width: 768px)'
      },
      {
        srcset: 'https://picsum.photos/id/10/400/300 1x, https://picsum.photos/id/10/800/600 2x',
        media: '(min-width: 320px)'
      }
    ]
  }
}

export const CustomProvider: Story = {
  args: {
    src: '',
    meta: {
      imageId: '10',
      sizes: ['400', '300'],
      queries: []
    },
    provider: 'custom'
  }
}
