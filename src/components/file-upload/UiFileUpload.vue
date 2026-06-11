<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { FileUploadUi } from './theme'

export interface UiFileUploadProps {
  formats?: string[]
  maxSizeBytes?: number
  allowUpload?: boolean

  disabled?: boolean
  ui?: UiProp<FileUploadUi>
}

export const UI_FILE_UPLOAD_ERROR_TYPE = {
  FORMAT: 'format',
  SIZE: 'size'
} as const

export type UiFileUploadErrorType = (typeof UI_FILE_UPLOAD_ERROR_TYPE)[keyof typeof UI_FILE_UPLOAD_ERROR_TYPE]

export type UiFileUploadError =
  | { type: 'format'; meta: { formats: string[] } }
  | { type: 'size'; meta: { maxSizeBytes: number } }

export interface UiFileUploadEmits {
  error: [UiFileUploadError]
  'upload-click': []
  upload: [file: File]
}
</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import UiButton from '../button/UiButton.vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiFileUpload',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiFileUploadProps>(), {
  formats: () => ['jpg', 'jpeg', 'png', 'pdf', 'heic'],
  maxSizeBytes: 20 * 1024 * 1024,
  disabled: false,
  allowUpload: true,
  ui: undefined
})

const fileModel = defineModel<File | null>('file', { default: null })

const emit = defineEmits<UiFileUploadEmits>()

const fileInput = useTemplateRef('fileInput')

const appConfig = useAppConfig()

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-file-upload',
  computed(() => {
    return [theme.base, appConfig.ui?.fileUpload?.base, props.ui?.base].filter(Boolean) as ClassNameValue[]
  }),
  props.ui?.strategy || appConfig?.ui?.fileUpload?.strategy
)

const uiClasses = computed(() => {
  return {
    container: mergeClasses(theme.container, appConfig.ui?.fileUpload?.container, props.ui?.container),
    description: mergeClasses(theme.description, appConfig.ui?.fileUpload?.description, props.ui?.description),
    sendButton: mergeClasses(theme.sendButton, appConfig.ui?.fileUpload?.sendButton, props.ui?.sendButton),
    button: mergeClasses(theme.button, appConfig.ui?.fileUpload?.button, props.ui?.button)
  }
})

const normalizedFormats = computed(() => props.formats.map((format) => format.trim().toLowerCase()))

const acceptedFileTypes = computed(() => {
  return normalizedFormats.value.map((extension) => `.${extension}`).join(',')
})

const displayFileFormats = computed(() => props.formats?.map((format) => format.trim().toUpperCase()).join(', ') ?? '')

const handleButtonClick = () => {
  if (props.disabled) return

  emit('upload-click')

  if (!props.allowUpload) return

  openFilePicker()
}

const openFilePicker = () => {
  fileInput.value?.click()
}

const getFileExtension = (fileName: string): string => {
  const dotIndex = fileName.lastIndexOf('.')
  return dotIndex !== -1 ? fileName.slice(dotIndex + 1).toLowerCase() : ''
}

const isFormatValid = (fileName: string) => {
  const fileExt = getFileExtension(fileName)
  return normalizedFormats.value.includes(fileExt)
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files

  if (!files || !files.length) {
    return
  }

  const [file] = files

  const isFileFormatValid = isFormatValid(file.name)

  if (!isFileFormatValid) {
    emit('error', { type: UI_FILE_UPLOAD_ERROR_TYPE.FORMAT, meta: { formats: props.formats } })
    target.value = ''
    return
  }

  if (file.size > props.maxSizeBytes) {
    emit('error', {
      type: UI_FILE_UPLOAD_ERROR_TYPE.SIZE,
      meta: { maxSizeBytes: props.maxSizeBytes }
    })
    target.value = ''
    return
  }

  fileModel.value = file
  target.value = ''
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
      <input
        ref="fileInput"
        aria-label="Upload file"
        type="file"
        class="hidden"
        :accept="acceptedFileTypes"
        :disabled
        @change="handleFileChange"
      />

      <UiButton
        v-show="fileModel"
        :class="uiClasses.sendButton"
        type="button"
        variant="primary"
        :disabled
        @click="handleUpload"
      >
        <slot name="send-button" />
      </UiButton>
      <UiButton
        v-show="!fileModel"
        :class="uiClasses.button"
        type="button"
        variant="primary"
        :disabled
        @click="handleButtonClick"
      >
        <slot name="button" />
      </UiButton>

      <span :class="uiClasses.description">
        <slot name="description" :formats="displayFileFormats" :max-size-bytes />
      </span>
    </div>
  </div>
</template>
