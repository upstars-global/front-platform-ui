<script lang="ts">
import type { UiProp } from '@src/components/types'
import type { ReviewWidgetUi } from './theme'

export enum UiReviewWidgetState {
  DEFAULT = 'DEFAULT',
  FILE_SELECTED = 'FILE_SELECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ALREADY_CLAIMED = 'ALREADY_CLAIMED'
}

export interface UiReviewStateContent {
  image: string
  imageAlt: string
  title?: string
  description?: string
}

export interface UiReviewWidgetConfig {
  headerTitle: string
  states: Partial<Record<UiReviewWidgetState, UiReviewStateContent>>
}

export type UiReviewWidgetProps = Pick<UiFileUploadProps, 'formats' | 'maxSizeBytes'> & {
  state: UiReviewWidgetState
  config: UiReviewWidgetConfig
  ui?: UiProp<ReviewWidgetUi>
  dataTest?: string
}

export interface UiReviewWidgetEmits {
  'contact-support': []
  upload: [file: File]
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ClassNameValue } from 'tailwind-merge'
import { useAppConfig } from '@src/composables/useAppConfig'
import { useComponentAttributes } from '@src/composables/useUiClasses'
import UiImage from '@src/components/image/UiImage.vue'
import UiButton from '@src/components/button/UiButton.vue'
import UiFileUpload, { type UiFileUploadProps } from '@src/components/file-upload/UiFileUpload.vue'
import UiFilePreviewItem from '@src/components/file-preview-item/UiFilePreviewItem.vue'
import theme from './theme'

defineOptions({
  name: 'UiReviewWidget',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiReviewWidgetProps>(), {
  dataTest: 'review-widget',
  ui: undefined
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

const shouldShowUploader = computed(() => {
  return [UiReviewWidgetState.DEFAULT, UiReviewWidgetState.FILE_SELECTED, UiReviewWidgetState.REJECTED].includes(
    props.state
  )
})

const shouldShowContactSupport = computed(() => {
  return [UiReviewWidgetState.UNDER_REVIEW, UiReviewWidgetState.ALREADY_CLAIMED].includes(props.state)
})

const handleContactSupport = () => {
  emit('contact-support')
}

const handleUpload = () => {
  if (fileModel.value) {
    emit('upload', fileModel.value)
  }
}
</script>

<template>
  <div :class="className" v-bind="attributes" :data-test="dataTest">
    <div :class="uiClasses.container">
      <h2 v-if="config.headerTitle" :class="uiClasses.headerTitle">
        {{ config.headerTitle }}
      </h2>

      <div v-if="currentContent" :class="uiClasses.contentContainer">
        <div :class="uiClasses.imageContainer">
          <slot name="image" :content="currentContent">
            <UiImage :src="currentContent.image" :alt="currentContent.imageAlt" :class="uiClasses.image" />
          </slot>
        </div>

        <div :class="uiClasses.content">
          <h3 v-if="currentContent.title" :class="uiClasses.title">
            {{ currentContent.title }}
          </h3>

          <p v-if="currentContent.description" :class="uiClasses.description">
            {{ currentContent.description }}
          </p>

          <UiFilePreviewItem v-if="fileModel" :file="fileModel" @remove="fileModel = null" />
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
        <template v-else-if="shouldShowUploader">
          <UiFileUpload v-model:file="fileModel" :formats :max-size-bytes @upload="handleUpload">
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
        </template>
      </div>
    </div>
  </div>
</template>
