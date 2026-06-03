import type { Meta, StoryObj } from '@storybook/vue3-vite'
import UiReviewWidget, {
  UiReviewWidgetState,
  type UiReviewWidgetConfig
} from '@src/components/review-widget/UiReviewWidget.vue'
import UiFileUpload from '@src/components/file-upload/UiFileUpload.vue'
import UiFilePreviewItem from '@src/components/file-preview-item/UiFilePreviewItem.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { ref, watch } from 'vue'
import { formatBytes } from '@src/helpers/formatBytes'

const defaultConfig: UiReviewWidgetConfig = {
  headerTitle: 'Free Spins for review',
  states: {
    [UiReviewWidgetState.DEFAULT]: {
      image: '/assets/review-widget/review-bonus.svg',
      imageAlt: 'Bonus gift',
      description: 'Your 20 Free Spins await! Upload your review screenshot here'
    },
    [UiReviewWidgetState.FILE_SELECTED]: {
      image: '/assets/review-widget/review-bonus.svg',
      imageAlt: 'Bonus gift',
      description: 'Your 20 Free Spins await! Send your review screenshot here'
    },
    [UiReviewWidgetState.UNDER_REVIEW]: {
      image: '/assets/review-widget/review-bonus.svg',
      imageAlt: 'Bonus gift',
      title: 'Your screenshot is under review',
      description: 'Please give us a bit more time — we’ll notify you once it’s processed'
    },
    [UiReviewWidgetState.APPROVED]: {
      image: '/assets/review-widget/review-bonus.svg',
      imageAlt: 'Bonus gift',
      title: 'Your screenshot approved',
      description: 'The gift has been credited — enjoy!'
    },
    [UiReviewWidgetState.REJECTED]: {
      image: '/assets/review-widget/review-bonus.svg',
      imageAlt: 'Bonus gift',
      title: 'Your screenshot not approved',
      description: 'Please check your screenshot and upload it again'
    },
    [UiReviewWidgetState.ALREADY_CLAIMED]: {
      image: '/assets/review-widget/review-bonus.svg',
      imageAlt: 'Bonus gift',
      title: 'You’ve already got Free Spins',
      description: 'You can claim them once per month'
    }
  }
}

const reviewWidgetSlotsTemplate = `
  <template #contact-support-button>Contact support</template>
  <template #file-upload-button>Upload screenshot</template>
  <template #file-upload-send-button>Send screenshot</template>
  <template #file-upload-description="{ formats, maxSizeBytes }">
    {{ formats }} • Up to {{ formatBytes(maxSizeBytes) }}
  </template>
`

const meta = {
  title: 'UI Kit/ReviewWidget',
  component: UiReviewWidget,
  subcomponents: { UiFileUpload, UiFilePreviewItem },
  tags: ['autodocs'],
  decorators: [emitsObserver],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    state: {
      control: 'select',
      options: Object.values(UiReviewWidgetState)
    },
    config: { control: 'object' },
    formats: { control: 'object' },
    maxSizeBytes: { control: 'number' },
    file: { control: false },
    ui: { control: 'object' }
  },
  args: {
    state: UiReviewWidgetState.DEFAULT,
    config: defaultConfig,
    formats: ['jpg', 'jpeg', 'png', 'pdf', 'heic'],
    maxSizeBytes: 20 * 1024 * 1024
  },
  render: (args) => ({
    name: 'Story',
    components: { UiReviewWidget },
    setup: () => {
      const file = ref<File | null>(args.file ?? null)

      watch(
        () => args.file,
        (value) => {
          file.value = value ?? null
        }
      )

      return { args, file, formatBytes }
    },
    template: `
      <div class="max-w-md w-full">
        <UiReviewWidget v-bind="args" v-model:file="file">
          ${reviewWidgetSlotsTemplate}
        </UiReviewWidget>
      </div>
    `
  })
} satisfies Meta<typeof UiReviewWidget>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    state: UiReviewWidgetState.DEFAULT
  }
}

export const FileSelected: Story = {
  args: {
    file: new File([new ArrayBuffer(1024 * 1024 * 8)], 'IMG_2043_12324259694.jpg', { type: 'image/jpeg' }),
    state: UiReviewWidgetState.FILE_SELECTED
  }
}

export const UnderReview: Story = {
  args: {
    state: UiReviewWidgetState.UNDER_REVIEW
  }
}

export const Approved: Story = {
  args: {
    state: UiReviewWidgetState.APPROVED
  }
}

export const Rejected: Story = {
  args: {
    state: UiReviewWidgetState.REJECTED
  }
}

export const AlreadyClaimed: Story = {
  args: {
    state: UiReviewWidgetState.ALREADY_CLAIMED
  }
}

export const CustomLimits: Story = {
  args: {
    state: UiReviewWidgetState.DEFAULT,
    formats: ['png', 'jpg'],
    maxSizeBytes: 5 * 1024 * 1024
  }
}
