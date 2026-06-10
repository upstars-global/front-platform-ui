<script lang="ts">
import type { UiProp } from '../types'
import type { ReviewWidgetUi } from './theme'
import type { UiFileUploadEmits, UiFileUploadError, UiFileUploadProps } from '../file-upload/UiFileUpload.vue'

export const UI_REVIEW_WIDGET_STATE = {
  DEFAULT: 'DEFAULT',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  ALREADY_CLAIMED: 'ALREADY_CLAIMED'
} as const

export type UiReviewWidgetState = (typeof UI_REVIEW_WIDGET_STATE)[keyof typeof UI_REVIEW_WIDGET_STATE]

export interface UiReviewStateContent {
  image: string
  imageRetina: string
  imageAlt: string
  title?: string
  description?: string
}

export interface UiReviewWidgetConfig {
  headerTitle: string
  states: Partial<Record<UiReviewWidgetState, UiReviewStateContent>>
}

export type UiReviewWidgetProps = Pick<UiFileUploadProps, 'formats' | 'maxSizeBytes' | 'allowUpload' | 'disabled'> & {
  state: UiReviewWidgetState
  config: UiReviewWidgetConfig
  ui?: UiProp<ReviewWidgetUi>
}

export interface UiReviewWidgetEmits {
  error: UiFileUploadEmits['error']
  'contact-support': []
  'upload-click': []
  upload: [file: File]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ClassNameValue } from 'tailwind-merge'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import UiImage from '../image/UiImage.vue'
import UiButton from '../button/UiButton.vue'
import UiFileUpload from '../file-upload/UiFileUpload.vue'
import UiFilePreviewItem from '../file-preview-item/UiFilePreviewItem.vue'
import theme from './theme'

defineOptions({
  name: 'UiReviewWidget',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiReviewWidgetProps>(), {
  ui: undefined,
  allowUpload: true
})

const emit = defineEmits<UiReviewWidgetEmits>()

const appConfig = useAppConfig()

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-review-widget',
  computed(() => {
    return [theme.base, appConfig.ui?.reviewWidget?.base, props.ui?.base].filter(Boolean) as ClassNameValue[]
  }),
  props.ui?.strategy || appConfig?.ui?.reviewWidget?.strategy
)

const uiClasses = computed(() => {
  return {
    container: mergeClasses(theme.container, appConfig.ui?.reviewWidget?.container, props.ui?.container),
    headerTitle: mergeClasses(theme.headerTitle, appConfig.ui?.reviewWidget?.headerTitle, props.ui?.headerTitle),
    imageContainer: mergeClasses(
      theme.imageContainer,
      appConfig.ui?.reviewWidget?.imageContainer,
      props.ui?.imageContainer
    ),
    image: mergeClasses(theme.image, appConfig.ui?.reviewWidget?.image, props.ui?.image),
    contentContainer: mergeClasses(
      theme.contentContainer,
      appConfig.ui?.reviewWidget?.contentContainer,
      props.ui?.contentContainer
    ),
    content: mergeClasses(theme.content, appConfig.ui?.reviewWidget?.content, props.ui?.content),
    title: mergeClasses(theme.title, appConfig.ui?.reviewWidget?.title, props.ui?.title),
    description: mergeClasses(theme.description, appConfig.ui?.reviewWidget?.description, props.ui?.description),
    actionArea: mergeClasses(theme.actionArea, appConfig.ui?.reviewWidget?.actionArea, props.ui?.actionArea)
  }
})

const fileModel = defineModel<File | null>('file', { default: null })

const currentContent = computed<UiReviewStateContent | undefined>(() => {
  return props.config.states[props.state]
})

const uploaderStates: UiReviewWidgetState[] = [UI_REVIEW_WIDGET_STATE.DEFAULT]

const contactSupportStates: UiReviewWidgetState[] = [
  UI_REVIEW_WIDGET_STATE.UNDER_REVIEW,
  UI_REVIEW_WIDGET_STATE.ALREADY_CLAIMED
]

const shouldShowUploader = computed(() => uploaderStates.includes(props.state))

const shouldShowContactSupport = computed(() => contactSupportStates.includes(props.state))

const handleContactSupport = () => {
  emit('contact-support')
}

const handleUploadClick = () => {
  emit('upload-click')
}

const handleError = (error: UiFileUploadError) => {
  emit('error', error)
}

const handleUpload = () => {
  if (fileModel.value) {
    emit('upload', fileModel.value)
  }
}
</script>

<template>
  <div :class="className" v-bind="attributes">
    <div :class="uiClasses.container">
      <h2 v-if="config.headerTitle" :class="uiClasses.headerTitle" v-html="config.headerTitle" />

      <div v-if="currentContent" :class="uiClasses.contentContainer">
        <div :class="uiClasses.imageContainer">
          <slot name="image" :content="currentContent">
            <UiImage
              :src="currentContent.image"
              :src-retina="currentContent.imageRetina"
              :alt="currentContent.imageAlt"
              :class="uiClasses.image"
            />
          </slot>
        </div>

        <div :class="uiClasses.content">
          <h3 v-if="currentContent.title" :class="uiClasses.title" v-html="currentContent.title" />
          <p v-if="currentContent.description" :class="uiClasses.description" v-html="currentContent.description" />

          <UiFilePreviewItem v-if="fileModel && shouldShowUploader" :file="fileModel" @remove="fileModel = null">
            <template #file-size="{ fileSize }">
              <slot name="file-preview-item-file-size" :file-size />
            </template>
          </UiFilePreviewItem>
        </div>
      </div>

      <div v-if="shouldShowUploader || shouldShowContactSupport" :class="uiClasses.actionArea">
        <UiButton
          v-if="shouldShowContactSupport"
          full-width
          type="button"
          variant="primary"
          @click="handleContactSupport"
        >
          <slot name="contact-support-button" />
        </UiButton>
        <UiFileUpload
          v-else-if="shouldShowUploader"
          v-model:file="fileModel"
          :disabled
          :formats
          :max-size-bytes
          :allow-upload
          @upload-click="handleUploadClick"
          @error="handleError"
          @upload="handleUpload"
        >
          <template #button>
            <slot name="file-upload-button" />
          </template>
          <template #send-button>
            <slot name="file-upload-send-button" />
          </template>
          <template #description="{ formats, maxSizeBytes }">
            <slot name="file-upload-description" :formats :max-size-bytes />
          </template>
        </UiFileUpload>
      </div>
    </div>
  </div>
</template>
