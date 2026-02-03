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

const uiClasses = computed(() => {
  return {
    step: {
      base: mergeClasses(theme.states.base, appConfig?.ui?.stepper?.states?.base, props.ui?.states?.base),
      completed: mergeClasses(
        theme.states.completed,
        appConfig?.ui?.stepper?.states?.completed,
        props.ui?.states?.completed
      ),
      active: mergeClasses(theme.states.active, appConfig?.ui?.stepper?.states?.active, props.ui?.states?.active),
      inactive: mergeClasses(
        theme.states.inactive,
        appConfig?.ui?.stepper?.states?.inactive,
        props.ui?.states?.inactive
      )
    }
  }
})

const getStepClass = (step: number) => {
  if (step < props.currentStep) return uiClasses.value.step.completed
  if (step === props.currentStep) return uiClasses.value.step.active
  return uiClasses.value.step.inactive
}
</script>

<template>
  <div v-bind="attributes" :class="className">
    <div
      v-for="step in size"
      :key="step"
      :class="[uiClasses.step.base, getStepClass(step)]"
      data-test="progress-step"
    />
  </div>
</template>
