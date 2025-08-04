<script setup lang="ts">
import { computed } from 'vue'
import { useComponentAttributes } from '../../composables/useUiClasses'

interface CircleProgressBarProps {
  progress: number
  progressWidth: number
  max?: number
  background?: string
  progressColor?: string
  trailColor?: string
  size?: number
  startAngle?: number
  animationDuration?: string
  rounded?: boolean
}

defineOptions({
  name: 'UiCircleProgressBar',
  inheritAttrs: false
})

const SPACING = 2

const props = withDefaults(defineProps<CircleProgressBarProps>(), {
  max: 100,
  background: undefined,
  progressColor: undefined,
  trailColor: undefined,
  size: 100,
  startAngle: 90,
  animationDuration: '0'
})

const { attributes, className } = useComponentAttributes(
  'ui-circle-progress',
  'relative flex justify-center items-center'
)

const currentProgress = computed(() => (props.max <= props.progress ? props.max : props.progress))

const viewBox = computed(() => `-${SPACING / 2} -${SPACING / 2} ${props.size} ${props.size}`)
const circleSize = computed(() => (props.size - SPACING) / 2)
const radius = computed(() => circleSize.value - (props.progressWidth - SPACING) / 2)

const dashArray = computed(() => radius.value * Math.PI * 2)
const dashOffset = computed(() => {
  return dashArray.value - (dashArray.value * currentProgress.value) / props.max
})
const isAnimation = computed(() => props.animationDuration && props.animationDuration !== '0')
const customProperties = computed(() => {
  const result: Record<string, string | number> = {
    '--circle-progress-dasharray': dashArray.value,
    '--circle-progress-dashoffset': dashOffset.value
  }

  if (props.progressColor) {
    result['--circle-progress-line-color'] = props.progressColor
  }

  if (props.trailColor) {
    result['--circle-progress-trail-color'] = props.trailColor
  }

  if (props.background) {
    result['--circle-progress-bg-color'] = props.background
  }

  if (typeof props.rounded !== 'undefined') {
    result['--circle-progress-stroke-linecap'] = props.rounded ? 'round' : 'butt'
  }

  if (isAnimation.value) {
    result['--circle-progress-animation-duration'] = props.animationDuration
  }

  return result
})
</script>

<template>
  <div v-bind="attributes" :class="className" :style="{ ...customProperties, width: `${size}px`, height: `${size}px` }">
    <svg class="relative w-full h-full z-10" :viewBox="viewBox">
      <circle
        class="ui-circle-progress-bar"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        :stroke-width="`${progressWidth}px`"
        stroke-dashoffset="0"
        fill="none"
      />
      <circle
        class="ui-circle-progress-line"
        :class="{ 'ui-circle-progress-animation': isAnimation }"
        :transform="`rotate(${startAngle} ${circleSize} ${circleSize})`"
        :stroke-width="`${progressWidth}px`"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      />
    </svg>

    <div class="ui-circle-progress-bg absolute inset-0 flex items-center justify-center rounded-full">
      <slot :progress="progress" :max="max" />
    </div>
  </div>
</template>
