<script lang="ts">
import type { UiProp } from '@src/components/types'
import type { FilePreviewItemUi } from './theme'
import type { UiIconName } from '../icon/config'

export interface UiFilePreviewItemProps {
  file: File
  ui?: UiProp<FilePreviewItemUi>
  dataTest?: string
  removeIconName?: UiIconName
}

export interface UiFilePreviewItemEmits {
  remove: []
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ClassNameValue } from 'tailwind-merge'
import { useAppConfig } from '@src/composables/useAppConfig'
import { useComponentAttributes } from '@src/composables/useUiClasses'
import UiIcon from '@src/components/icon/UiIcon.vue'
import UiButton from '@src/components/button/UiButton.vue'
import theme from './theme'

defineOptions({
  name: 'UiFilePreviewItem',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiFilePreviewItemProps>(), {
  dataTest: 'file-preview-item',
  ui: undefined,
  removeIconName: 'trashBin'
})

const emit = defineEmits<UiFilePreviewItemEmits>()

const appConfig = useAppConfig()

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-file-preview-item',
  computed(() => {
    return [theme.base, appConfig.ui?.filePreviewItem?.base, props.ui?.base].filter(Boolean) as ClassNameValue[]
  }),
  props.ui?.strategy || appConfig?.ui?.filePreviewItem?.strategy
)

const uiClasses = computed(() => {
  return {
    container: mergeClasses(theme.container, appConfig.ui?.filePreviewItem?.container, props.ui?.container),
    infoContainer: mergeClasses(
      theme.infoContainer,
      appConfig.ui?.filePreviewItem?.infoContainer,
      props.ui?.infoContainer
    ),
    contentContainer: mergeClasses(
      theme.contentContainer,
      appConfig.ui?.filePreviewItem?.contentContainer,
      props.ui?.contentContainer
    ),
    fileName: mergeClasses(theme.fileName, appConfig.ui?.filePreviewItem?.fileName, props.ui?.fileName),
    fileSize: mergeClasses(theme.fileSize, appConfig.ui?.filePreviewItem?.fileSize, props.ui?.fileSize),
    removeButton: mergeClasses(theme.removeButton, appConfig.ui?.filePreviewItem?.removeButton, props.ui?.removeButton),
    removeIcon: mergeClasses(theme.removeIcon, appConfig.ui?.filePreviewItem?.removeIcon, props.ui?.removeIcon)
  }
})
</script>

<template>
  <div :class="className" v-bind="attributes" :data-test="dataTest">
    <div :class="uiClasses.container">
      <div :class="uiClasses.infoContainer">
        <div :class="uiClasses.contentContainer">
          <span :class="uiClasses.fileName" :title="file.name">
            {{ file.name }}
          </span>
          <span :class="uiClasses.fileSize">
            <slot name="file-size" :file-size="file.size" />
          </span>
        </div>
      </div>

      <UiButton
        aria-label="Remove file"
        type="button"
        variant="ghost"
        :class="uiClasses.removeButton"
        @click="emit('remove')"
      >
        <slot name="remove-icon">
          <UiIcon :name="removeIconName" size="20" :class="uiClasses.removeIcon" />
        </slot>
      </UiButton>
    </div>
  </div>
</template>
