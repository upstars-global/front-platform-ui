import type { Meta, StoryObj } from '@storybook/vue3-vite'
import isChromatic from 'chromatic/isChromatic'
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
    groupType: { control: 'text' },
    query: { control: 'object' },
    fetchPriority: { control: 'select', options: ['high', 'low', 'auto'] },
    ui: { control: 'object' }
  },
  args: {
    alt: 'image',
    provider: 'default',
    groupType: '10',
    query: {
      custom: ['400', '300']
    }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiPicture },
    setup: () => ({ args, isChromatic: isChromatic() }),
    template: `<div>
      <div v-if="args.provider === 'custom' && !isChromatic" class="text-xs mb-8">
        <p>To test custom provider, use the 'groupType' and 'query' properties:</p>
        <ul class="list-disc list-inside">
          <li>groupType — specify as a number. Represents the ID in the image URL.</li>
          <li>query - set as an object with provider name(custom) as key and array of width and height as value</li>
        </ul>
      </div>
      <UiPicture v-bind="args" />
    </div>`
  })
} as Meta<typeof UiPicture>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    src: 'https://picsum.photos/id/10/400/300'
  }
}

export const CustomProvider: Story = {
  args: {
    src: 'https://picsum.photos/id/11/400/300',
    groupType: '11',
    provider: 'custom'
  }
}
