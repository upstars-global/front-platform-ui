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
  isAnimation?: boolean
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
  startAngle: 90
})
// TODO: add uiConfig support
const { attributes, className } = useComponentAttributes(
  'ui-circle-progress',
  computed(() => 'relative flex justify-center items-center')
)

const currentProgress = computed(() => (props.max <= props.progress ? props.max : props.progress))

const viewBox = computed(() => `-${SPACING / 2} -${SPACING / 2} ${props.size} ${props.size}`)
const circleSize = computed(() => (props.size - SPACING) / 2)
const radius = computed(() => circleSize.value - (props.progressWidth - SPACING) / 2)

const dashArray = computed(() => radius.value * Math.PI * 2)
const dashOffset = computed(() => {
  return dashArray.value - (dashArray.value * currentProgress.value) / props.max
})
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
        :class="{ 'ui-circle-progress-animation transition-all duration-500': isAnimation }"
        :transform="`rotate(${startAngle} ${circleSize} ${circleSize})`"
        :stroke-width="`${progressWidth}px`"
        :stroke-dashoffset="dashOffset"
        :stroke-dasharray="dashArray"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      />
    </svg>

    <div class="ui-circle-progress__content absolute inset-0 flex items-center justify-center rounded-full">
      <slot :progress="progress" :max="max" />
    </div>
  </div>
</template>

<style lang="postcss">
@keyframes filling {
  from {
    stroke-dashoffset: v-bind('dashArray');
  }
  to {
    stroke-dashoffset: v-bind('dashOffset');
  }
}

.ui-circle-progress-bar {
  stroke: var(--circle-progress-trail-color, currentColor);
}

.ui-circle-progress-line {
  stroke: var(--circle-progress-line-color, currentColor);
  stroke-linecap: var(--circle-progress-stroke-linecap, butt);
}

.ui-circle-progress-animation {
  animation-name: filling;
  animation-duration: 500ms;
  animation-timing-function: ease-in;
}
.ui-circle-progress__content {
  background-color: var(--circle-progress-bg-color, transparent);
}
</style>
