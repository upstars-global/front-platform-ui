<script setup lang="ts">
import { computed } from 'vue'
import { useComponentAttributes } from '../../composables/useUiClasses'

interface CircleProgressBarProps {
  progress: number
  max?: number
  background?: string
  progressColor?: string
  trailColor?: string
  size?: number
  progressWidth?: number
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
  background: 'transparent',
  progressColor: '#676767',
  trailColor: '#bfbfbf',
  size: 100,
  progressWidth: 1,
  startAngle: 90,
  animationDuration: '0',
  rounded: true
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
</script>

<template>
  <div v-bind="attributes" :class="className" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg class="relative w-full h-full z-10" :viewBox="viewBox">
      <circle
        class="ui-circle-progress__line--back"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        :stroke="trailColor"
        :stroke-width="`${progressWidth}px`"
        stroke-dashoffset="0"
        fill="none"
      />
      <circle
        class="ui-circle-progress__line--top"
        :class="{ 'ui-circle-progress-line-butt': !rounded, 'ui-circle-progress-line-rounded': rounded }"
        :style="{ strokeDashoffset: dashOffset, strokeDasharray: dashArray }"
        :transform="`rotate(${startAngle} ${circleSize} ${circleSize})`"
        :stroke="progressColor"
        :stroke-width="`${progressWidth}px`"
        :r="radius"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      />
    </svg>

    <div class="ui-circle-progress__content" :style="{ background }">
      <slot :progress="progress" :max="max" />
    </div>
  </div>
</template>

<style>
@keyframes filling {
  from {
    stroke-dashoffset: v-bind('dashArray');
  }
  to {
    stroke-dashoffset: v-bind('dashOffset');
  }
}

.ui-circle-progress__line--top {
  animation-name: filling;
  animation-duration: v-bind('props.animationDuration');
  animation-timing-function: ease-in;
  transition: 0.5s all;
}

.ui-circle-progress__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 100%;
}
</style>
