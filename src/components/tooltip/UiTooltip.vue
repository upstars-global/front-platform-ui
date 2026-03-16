<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { arrow, useFloating, offset, flip, autoUpdate } from '@floating-ui/vue'
import type { AlignedPlacement, Placement, Side, Strategy } from '@floating-ui/vue'
import type { UiProp } from '../types'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { useAppConfig } from '../../composables/useAppConfig'
import type { ClassNameValue } from 'tailwind-merge'
import theme from './theme'
import type { TooltipUi } from './theme'

export interface UiTooltipProps {
  text?: string
  placement?: AlignedPlacement | Side
  strategy?: Strategy
  fallbackPlacements?: Placement[]
  offsetValue?: number
  disabled?: boolean
  trigger?: 'hover' | 'click' | 'always'
  ui?: UiProp<TooltipUi>
}

export interface UiTooltipSlots {
  activator?: () => unknown
  default?: () => unknown
}

const props = withDefaults(defineProps<UiTooltipProps>(), {
  text: '',
  placement: 'top',
  strategy: 'absolute',
  fallbackPlacements: () => ['top', 'bottom'],
  offsetValue: 8,
  disabled: false,
  trigger: 'hover',
  ui: undefined
})

defineOptions({
  name: 'UiTooltip',
  inheritAttrs: false
})

defineSlots<UiTooltipSlots>()

const isOpen = ref(false)
const reference = ref<HTMLElement | null>(null)
const floating = ref<HTMLElement | null>(null)
const arrowRef = ref<HTMLElement | null>(null)

const placement = computed(() => props.placement)
const offsetValue = computed(() => props.offsetValue)

const middleware = computed(() => [
  flip({
    fallbackPlacements: props.fallbackPlacements
  }),
  offset(offsetValue.value),
  arrow({ element: arrowRef.value, padding: 4 })
])

const { floatingStyles, middlewareData } = useFloating(reference, floating, {
  open: isOpen.value,
  strategy: props.strategy,
  whileElementsMounted: autoUpdate,
  placement,
  middleware
})

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-tooltip',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.tooltip?.base, props.ui?.base].filter(Boolean)
    return commonClasses
  }),
  appConfig?.ui?.tooltip?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  activator: mergeClasses(theme.activator, appConfig.ui?.tooltip?.activator, props.ui?.activator),
  body: mergeClasses(
    theme.body,
    appConfig.ui?.tooltip?.body,
    props.ui?.body,
    isOpen.value && !props.disabled
      ? [theme.bodyVisible, appConfig.ui?.tooltip?.bodyVisible, props.ui?.bodyVisible]
      : []
  ),
  arrow: mergeClasses(theme.arrow, appConfig.ui?.tooltip?.arrow, props.ui?.arrow)
}))

const isTriggerHover = computed(() => props.trigger === 'hover')
const isTriggerClick = computed(() => props.trigger === 'click')
const isTriggerAlways = computed(() => props.trigger === 'always')

const arrowStyles = computed(() => {
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right'
  }[placement.value.split('-')[0] as Side]

  const { x: arrowX, y: arrowY } = middlewareData.value.arrow ?? {}

  return {
    left: arrowX ? `${arrowX}px` : '',
    top: arrowY ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    [staticSide]: `-4px`
  }
})

const handleMouseEnter = () => {
  if (isTriggerHover.value && !props.disabled) {
    isOpen.value = true
  }
}

const handleMouseLeave = () => {
  if (isTriggerHover.value) {
    isOpen.value = false
  }
}

const handleClick = () => {
  if (isTriggerClick.value && !props.disabled) {
    isOpen.value = !isOpen.value
  }
}

onMounted(() => {
  if (isTriggerAlways.value) {
    isOpen.value = true
  }
})
</script>

<template>
  <div v-click-outside="handleClick" :class="className" v-bind="attributes">
    <div
      ref="reference"
      :class="uiClasses.activator"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="handleClick"
    >
      <slot name="activator" />
    </div>
    <div ref="floating" :class="uiClasses.body" :style="floatingStyles">
      <slot>{{ text }}</slot>
      <div ref="arrowRef" :class="uiClasses.arrow" :style="arrowStyles" />
    </div>
  </div>
</template>

<style scoped></style>
