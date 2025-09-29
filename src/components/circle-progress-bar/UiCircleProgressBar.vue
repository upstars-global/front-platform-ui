<script lang="ts">
import type { CircleProgressBarUi } from './theme'
import type { UiProp } from '../types'

export interface UiCircleProgressBarProps {
  progress: number
  progressWidth: number
  max?: number
  size?: number
  startAngle?: number
  isAnimation?: boolean
  rounded?: boolean
  ui?: UiProp<CircleProgressBarUi>
}

export interface UiCircleProgressBarSlots {
  default(props?: { progress: number; max?: number }): unknown
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiCircleProgressBar',
  inheritAttrs: false
})

const SPACING = 2

const props = withDefaults(defineProps<UiCircleProgressBarProps>(), {
  max: 100,
  background: undefined,
  progressColor: undefined,
  trailColor: undefined,
  size: 100,
  startAngle: 90,
  ui: undefined
})

defineSlots<UiCircleProgressBarSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-circle-progress',
  computed(() => {
    return [theme.base, appConfig.ui?.circleProgressBar?.base, props.ui?.base].filter(Boolean)
  }),
  appConfig?.ui?.circleProgressBar?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    svg: mergeClasses(theme.svg, appConfig.ui?.circleProgressBar?.svg, props.ui?.svg),
    content: mergeClasses(theme.content, appConfig.ui?.circleProgressBar?.content, props.ui?.content),
    progress: {
      trail: mergeClasses(
        theme.progress.trail,
        appConfig.ui?.circleProgressBar?.progress?.trail,
        props.ui?.progress?.trail
      ),
      line: mergeClasses(theme.progress.line, appConfig.ui?.circleProgressBar?.progress?.line, props.ui?.progress?.line)
    }
  }
})

const currentProgress = computed(() => (props.max <= props.progress ? props.max : props.progress))

const viewBox = computed(() => `-${SPACING / 2} -${SPACING / 2} ${props.size} ${props.size}`)
const circleSize = computed(() => (props.size - SPACING) / 2)
const radius = computed(() => circleSize.value - (props.progressWidth - SPACING) / 2)

const dashArray = computed(() => radius.value * Math.PI * 2)
const dashOffset = computed(() => {
  return dashArray.value - (dashArray.value * currentProgress.value) / props.max
})
const customProperties = computed(() => {
  return {
    '--circle-progress-dasharray': dashArray.value,
    '--circle-progress-dashoffset': dashOffset.value
  }
})
</script>

<template>
  <div v-bind="attributes" :class="className" :style="{ ...customProperties, width: `${size}px`, height: `${size}px` }">
    <svg :class="uiClasses.svg" :viewBox="viewBox">
      <circle
        :class="uiClasses.progress.trail"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        :stroke-width="`${progressWidth}px`"
        stroke-dashoffset="0"
        fill="none"
      />
      <circle
        :class="[{ 'ui-circle-progress-animation': isAnimation }, uiClasses.progress.line]"
        :transform="`rotate(${startAngle} ${circleSize} ${circleSize})`"
        :stroke-width="`${progressWidth}px`"
        :stroke-dashoffset="dashOffset"
        :stroke-dasharray="dashArray"
        :stroke-linecap="rounded ? 'round' : 'butt'"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      />
    </svg>

    <div :class="uiClasses.content">
      <slot :progress="progress" :max="max" />
    </div>
  </div>
</template>

<style lang="postcss">
@keyframes filling {
  from {
    stroke-dashoffset: var(--circle-progress-dasharray);
  }
  to {
    stroke-dashoffset: var(--circle-progress-dashoffset);
  }
}

.ui-circle-progress-animation {
  animation-name: filling;
  animation-duration: 500ms;
  animation-timing-function: ease-in;
}
</style>
