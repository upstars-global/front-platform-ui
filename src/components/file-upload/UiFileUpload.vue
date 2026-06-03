<script lang="ts">
import type { UiProp } from '../types'
import type { FileUploadUi } from './theme'

export interface UiFileUploadProps {
  formats?: string[]
  maxSizeBytes?: number

  disabled?: boolean
  dataTest?: string
  ui?: UiProp<FileUploadUi>
}

export enum UiFileUploadErrorType {
  FORMAT = 'format',
  SIZE = 'size'
}

export interface UiFileUploadEmits {
  error: [type: UiFileUploadErrorType, meta: { formats?: string[]; maxSizeBytes?: number }]
  upload: [file: File]
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ClassNameValue } from 'tailwind-merge'
import UiButton from '@src/components/button/UiButton.vue'
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
  dataTest: 'file-upload',
  ui: undefined
})

const fileModel = defineModel<File | null>('file', { default: null })

const emit = defineEmits<UiFileUploadEmits>()

const fileInput = ref<HTMLInputElement | null>(null)

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

const openFilePicker = () => {
  if (props.disabled) return

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
  const fileName = file.name
  const fileSize = file.size

  const isFileFormatValid = isFormatValid(fileName)

  if (!isFileFormatValid) {
    emit('error', UiFileUploadErrorType.FORMAT, { formats: props.formats })
    target.value = ''
    return
  }

  if (fileSize > props.maxSizeBytes) {
    emit('error', UiFileUploadErrorType.SIZE, { maxSizeBytes: props.maxSizeBytes })
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
  <div :class="className" v-bind="attributes" :data-test="dataTest">
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
        @click="openFilePicker"
      >
        <slot name="button" />
      </UiButton>

      <p :class="uiClasses.description">
        <slot name="description" :formats="displayFileFormats" :max-size-bytes />
      </p>
    </div>
  </div>
</template>
