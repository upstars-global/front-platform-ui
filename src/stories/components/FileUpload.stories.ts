import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { action } from 'storybook/actions'
import { ref, watch } from 'vue'
import UiFileUpload, { type UiFileUploadErrorType } from '@src/components/file-upload/UiFileUpload.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { formatBytes } from '@src/helpers/formatBytes'

const meta = {
  title: 'UI Kit/FileUpload',
  component: UiFileUpload,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    formats: { control: 'object' },
    maxSizeBytes: { control: 'number' },
    disabled: { control: 'boolean' },
    file: { control: false },
    ui: { control: 'object' }
  },
  args: {
    formats: ['jpg', 'jpeg', 'png', 'pdf', 'heic'],
    maxSizeBytes: 20 * 1024 * 1024,
    disabled: false
  },
  render: (args) => ({
    name: 'Story',
    components: { UiFileUpload },
    setup: () => {
      const file = ref<File | null>(args.file ?? null)

      watch(
        () => args.file,
        (value) => {
          file.value = value ?? null
        }
      )

      const onError = (type: UiFileUploadErrorType, meta: { formats?: string[]; maxSizeBytes?: number }) => {
        action('error')(type, meta)
      }

      return { args, file, formatBytes, onError }
    },
    template: `
      <div class="max-w-md w-full">
        <UiFileUpload v-bind="args" v-model:file="file" @error="onError">
          <template #button>Upload screenshot</template>
          <template #send-button>Send screenshot</template>
          <template #description="{ formats, maxSizeBytes }">
            {{ formats }} • Up to {{ formatBytes(maxSizeBytes) }}
          </template>
        </UiFileUpload>
      </div>
    `
  })
} satisfies Meta<typeof UiFileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFileSelected: Story = {
  args: {
    file: new File([new ArrayBuffer(1024 * 512)], 'screenshot.png', { type: 'image/png' })
  }
}

export const CustomButtonText: Story = {
  render: (args) => ({
    name: 'Story',
    components: { UiFileUpload },
    setup: () => {
      const file = ref<File | null>(null)
      return { args, file, formatBytes }
    },
    template: `
      <div class="max-w-md w-full">
        <UiFileUpload v-bind="args" v-model:file="file">
          <template #button>Choose file</template>
          <template #send-button>Submit</template>
          <template #description="{ formats, maxSizeBytes }">
            {{ formats }} • Up to {{ formatBytes(maxSizeBytes) }}
          </template>
        </UiFileUpload>
      </div>
    `
  })
}

export const CustomFormatsAndLimits: Story = {
  args: {
    formats: ['png', 'jpg'],
    maxSizeBytes: 5 * 1024 * 1024
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
