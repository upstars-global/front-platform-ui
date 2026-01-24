<script lang="ts">
import type { UiProp } from '../types'
import type { StepperModalUi } from './theme'
import type { ModalRole } from '../modal/UiModal.vue'

export interface UiStepperModalProps {
  title?: string
  description?: string
  showCloseButton?: boolean
  fullscreen?: boolean
  role?: ModalRole
  currentStep?: number
  totalSteps?: number
  hideProgress?: boolean
  hideBackButton?: boolean
  ui?: UiProp<StepperModalUi>
}

export interface UiStepperModalEmits {
  (event: 'close'): void
  (event: 'back', step: number): void
}

export interface UiStepperModalSlots {
  default(props: { close: () => void }): unknown
  footer(props: { close: () => void }): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import UiModal from '../modal/UiModal.vue'
import UiStepper from '../stepper/UiStepper.vue'
import UiButton from '../button/UiButton.vue'
import UiIcon from '../icon/UiIcon.vue'
import theme from './theme'

defineOptions({
  name: 'UiStepperModal',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiStepperModalProps>(), {
  title: '',
  description: '',
  showCloseButton: true,
  fullscreen: false,
  role: 'dialog',
  currentStep: 0,
  totalSteps: 3,
  hideProgress: false,
  hideBackButton: false,
  ui: undefined
})

const emit = defineEmits<UiStepperModalEmits>()
defineSlots<UiStepperModalSlots>()

const appConfig = useAppConfig()

const { mergeClasses } = useComponentAttributes(
  'ui-stepper-modal',
  computed(() => []),
  appConfig?.ui?.stepperModal?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  backButton: mergeClasses(theme.backButton, appConfig?.ui?.stepperModal?.backButton, props.ui?.backButton),
  backIcon: mergeClasses(theme.backIcon, appConfig?.ui?.stepperModal?.backIcon, props.ui?.backIcon),
  titleContainer: mergeClasses(
    theme.titleContainer,
    appConfig?.ui?.stepperModal?.titleContainer,
    props.ui?.titleContainer
  ),
  title: mergeClasses(theme.title, appConfig?.ui?.stepperModal?.title, props.ui?.title),
  description: mergeClasses(theme.description, appConfig?.ui?.stepperModal?.description, props.ui?.description),
  stepper: mergeClasses(theme.stepper, appConfig?.ui?.stepperModal?.stepper, props.ui?.stepper)
}))

function handleClose() {
  emit('close')
}

function handleBack() {
  if (props.currentStep > 1) {
    emit('back', props.currentStep - 1)
  } else {
    handleClose()
  }
}
</script>

<template>
  <UiModal :show-close-button="showCloseButton" :fullscreen="fullscreen" :role="role" @close="handleClose">
    <template #header>
      <UiButton
        v-if="!hideBackButton"
        variant="default"
        size="default"
        :class="uiClasses.backButton"
        aria-label="Back"
        data-test="stepper-modal-back"
        @click="handleBack"
      >
        <UiIcon class="shrink-0" name="arrowBack" :class="uiClasses.backIcon" />
      </UiButton>

      <div :class="uiClasses.titleContainer">
        <h3 v-if="title" :class="uiClasses.title" data-test="stepper-modal-title">
          {{ title }}
        </h3>
        <p v-if="description" :class="uiClasses.description" data-test="stepper-modal-description">
          {{ description }}
        </p>
        <UiStepper
          v-if="!hideProgress"
          :current-step="currentStep"
          :size="totalSteps"
          :class="uiClasses.stepper"
          data-test="stepper-modal-progress"
        />
      </div>
    </template>

    <template #default>
      <slot :close="handleClose" />
    </template>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" :close="handleClose" />
    </template>
  </UiModal>
</template>
