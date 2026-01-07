<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { LoaderUi } from './theme'

export interface UiLoaderProps {
  duration?: number
  size?: number
  strokeWidth?: number
  rounded?: boolean
  ui?: UiProp<LoaderUi>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiLoader',
  inheritAttrs: false
})

const SPACING = 2

const props = withDefaults(defineProps<UiLoaderProps>(), {
  duration: 1,
  size: 64,
  strokeWidth: 2,
  ui: () => ({ strategy: 'merge' })
})

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-loader',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.loader?.base, props.ui?.base].filter(Boolean)

    return commonClasses
  }),
  appConfig.ui?.loader?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    svg: mergeClasses(theme.svg, appConfig.ui?.loader?.svg, props.ui?.svg),
    circle: mergeClasses(theme.circle, appConfig.ui?.loader?.circle, props.ui?.circle)
  }
})

const viewBox = computed(() => `-${SPACING / 2} -${SPACING / 2} ${props.size} ${props.size}`)
const circleSize = computed(() => (props.size - SPACING) / 2)

const radiusOut = computed(() => circleSize.value - (props.strokeWidth - SPACING) / 2)
const radiusMiddle = computed(() => radiusOut.value - props.strokeWidth * 3)
const radiusIn = computed(() => radiusOut.value - props.strokeWidth * 6)

const dashArrayOut = computed(() => radiusOut.value * Math.PI * 2)
const dashArrayMiddle = computed(() => radiusMiddle.value * Math.PI * 2)
const dashArrayIn = computed(() => radiusIn.value * Math.PI * 2)

const animateTransformAttrs = computed(() => ({
  from: `0 ${circleSize.value} ${circleSize.value}`,
  to: `360 ${circleSize.value} ${circleSize.value}`,
  attributeType: 'xml',
  attributeName: 'transform',
  type: 'rotate',
  repeatCount: 'indefinite'
}))
</script>

<template>
  <div :class="className" v-bind="attributes">
    <svg :class="uiClasses.svg" :viewBox="viewBox">
      <circle
        :class="uiClasses.circle"
        :transform="`rotate(120 ${circleSize} ${circleSize})`"
        :stroke-width="`${strokeWidth}px`"
        :stroke-dashoffset="dashArrayOut / 2"
        :stroke-dasharray="dashArrayOut"
        :stroke-linecap="rounded ? 'round' : 'butt'"
        :r="radiusOut"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      >
        <animateTransform v-bind="animateTransformAttrs" :dur="`${duration * 2}s`" />
      </circle>
      <circle
        :class="uiClasses.circle"
        :transform="`rotate(120 ${circleSize} ${circleSize})`"
        :stroke-width="`${strokeWidth}px`"
        :stroke-dashoffset="dashArrayMiddle / 2"
        :stroke-dasharray="dashArrayMiddle"
        :stroke-linecap="rounded ? 'round' : 'butt'"
        :r="radiusMiddle"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      >
        <animateTransform v-bind="animateTransformAttrs" :dur="`${duration * 1.5}s`" />
      </circle>
      <circle
        :class="uiClasses.circle"
        :transform="`rotate(120 ${circleSize} ${circleSize})`"
        :stroke-width="`${strokeWidth}px`"
        :stroke-dashoffset="dashArrayIn / 2"
        :stroke-dasharray="dashArrayIn"
        :stroke-linecap="rounded ? 'round' : 'butt'"
        :r="radiusIn"
        :cx="circleSize"
        :cy="circleSize"
        fill="none"
      >
        <animateTransform v-bind="animateTransformAttrs" :dur="`${duration}s`" />
      </circle>
    </svg>
  </div>
</template>
