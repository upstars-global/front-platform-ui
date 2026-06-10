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
import { prepareVariants } from '../../helpers/prepareClassNames'
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
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.fileUpload?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<FileUploadUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.fileUpload?.states,
      uiProp: props.ui?.states
    })

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    return commonClasses
  }),
  props.ui?.strategy || appConfig?.ui?.fileUpload?.strategy
)

const uiClasses = computed(() => {
  return {
    container: mergeClasses(theme.container, appConfig.ui?.fileUpload?.container, props.ui?.container),
    description: mergeClasses(theme.description, appConfig.ui?.fileUpload?.description, props.ui?.description)
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
        :disabled="disabled"
        @change="handleFileChange"
      />

      <UiButton
        v-show="fileModel"
        type="button"
        full-width
        variant="primary"
        :disabled="disabled"
        @click="handleUpload"
      >
        <slot name="send-button" />
      </UiButton>
      <UiButton
        v-show="!fileModel"
        type="button"
        full-width
        variant="primary"
        :disabled="disabled"
        @click="handleButtonClick"
      >
        <slot name="button" />
      </UiButton>

      <p :class="uiClasses.description">
        <slot name="description" :formats="displayFileFormats" :max-size-bytes />
      </p>
    </div>
  </div>
</template>
