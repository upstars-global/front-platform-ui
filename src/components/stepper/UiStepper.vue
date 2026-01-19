<script lang="ts">
import type { StepperUi } from './theme'
import type { UiProp } from '../types'

export interface UiStepperProps {
  currentStep?: number
  size?: number
  ui?: UiProp<StepperUi>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiStepper',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiStepperProps>(), {
  currentStep: 0,
  size: 3,
  ui: undefined
})

const appConfig = useAppConfig()

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-stepper',
  computed(() => [theme.base, appConfig?.ui?.stepper?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.stepper?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  step: {
    base: mergeClasses(theme.step.base, appConfig?.ui?.stepper?.step?.base, props.ui?.step?.base),
    active: mergeClasses(theme.step.active, appConfig?.ui?.stepper?.step?.active, props.ui?.step?.active),
    inactive: mergeClasses(theme.step.inactive, appConfig?.ui?.stepper?.step?.inactive, props.ui?.step?.inactive)
  }
}))

const isStepActive = (step: number) => step <= props.currentStep
</script>

<template>
  <div v-bind="attributes" :class="className" data-test="toolbar-progress">
    <div
      v-for="step in size"
      :key="step"
      :class="[uiClasses.step.base, isStepActive(step) ? uiClasses.step.active : uiClasses.step.inactive]"
      data-test="progress-step"
    />
  </div>
</template>
