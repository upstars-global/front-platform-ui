<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { ProgressBarUi } from './theme'

export interface UiProgressBarProps {
  progress: number
  max?: number
  min?: number
  size?: 'sm' | 'md'
  ui?: UiProp<ProgressBarUi>
}

export type UiProgressBarSlots = {
  default?: () => void
  inside?: () => void
  top?: () => void
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
// import { prepareVariants } from '../../helpers/prepareClassNames'
import theme from './theme'

defineOptions({
  name: 'UiProgressBar',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiProgressBarProps>(), {
  max: 100,
  min: 0,
  size: 'sm',
  ui: () => ({ strategy: 'merge' })
})
defineSlots<UiProgressBarSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-progress-bar',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.progressBar?.base, props.ui?.base].filter(
      Boolean
    )

    // const sizes = prepareVariants<ProgressBarUi['size']>({
    //   theme: theme.size,
    //   appConfig: appConfig.ui?.progressBar?.size,
    //   uiProp: props.ui.size
    // })

    // commonClasses.push(sizes[props.size])

    return commonClasses
  }),
  appConfig.ui?.progressBar?.strategy || props.ui.strategy
)

const uiClasses = computed(() => {
  return {
    progress: {
      content: mergeClasses(
        theme.progress.content,
        appConfig.ui?.progressBar?.progress?.content,
        props.ui?.progress?.content
      ),
      trail: mergeClasses(
        theme.progress.trail,
        appConfig.ui?.progressBar?.progress?.trail,
        props.ui?.progress?.trail,
        theme.size[props.size],
        appConfig.ui?.progressBar?.size?.[props.size],
        props.ui.size?.[props.size]
      ),
      line: mergeClasses(theme.progress.line, appConfig.ui?.progressBar?.progress?.line, props.ui?.progress?.line)
    }
  }
})

function inPercentRange(value: number) {
  return Math.min(Math.max(0, value), 100)
}

function calcPercent(value: number, max: number) {
  if (value === max) {
    return 100
  }

  const num = parseFloat(((value / max) * 100).toFixed(2))

  return Number.isNaN(num) ? 0 : num
}

const range = computed(() => props.max - props.min)
const currentRange = computed(() => {
  const currentProgress = props.progress - props.min

  return currentProgress <= range.value ? currentProgress : range.value
})

const progressPercentage = computed(() => {
  const percentage = inPercentRange(calcPercent(currentRange.value, range.value))

  return `${percentage}%`
})
</script>

<template>
  <div v-bind="attributes" :class="className">
    <slot name="top" />
    <div :class="uiClasses.progress.trail" data-test="progressbar-main">
      <div :class="uiClasses.progress.content">
        <slot name="inside" />
      </div>
      <div :class="uiClasses.progress.line" :style="{ width: progressPercentage }" />
    </div>
    <slot />
  </div>
</template>
