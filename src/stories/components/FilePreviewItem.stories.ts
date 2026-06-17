import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiFilePreviewItem from '@src/components/file-preview-item/UiFilePreviewItem.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { action } from 'storybook/actions'
import { formatBytes } from '@src/helpers/formatBytes'

const meta = {
  title: 'UI Kit/FilePreviewItem',
  component: UiFilePreviewItem,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    file: { control: false },
    ui: { control: 'object' }
  },
  args: {
    file: new File([new ArrayBuffer(1024 * 1024 * 8)], 'IMG_2043_12324259694.jpg', { type: 'image/jpeg' })
  },
  render: (args) => ({
    name: 'Story',
    components: { UiFilePreviewItem },
    setup: () => ({
      args,
      formatBytes,
      onRemove: action('remove')
    }),
    template: `
      <div class="max-w-md w-full rounded-4 bg-dark p-4 text-light">
        <UiFilePreviewItem v-bind="args" @remove="onRemove">
          <template #file-size="{ fileSize }">
            {{ formatBytes(fileSize) }}
          </template>
        </UiFilePreviewItem>
      </div>
    `
  })
} satisfies Meta<typeof UiFilePreviewItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongFileName: Story = {
  args: {
    file: new File(
      [new ArrayBuffer(512)],
      'very-long-screenshot-file-name-that-should-truncate-in-the-ui_2024_final_v2.jpg',
      { type: 'image/jpeg' }
    )
  }
}
