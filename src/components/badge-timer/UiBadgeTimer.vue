<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { BadgeTimerUi } from './theme'
import type { UiTimerProps } from '../timer/UiTimer.vue'

type BadgeTimerIndicatorType = 'success' | 'error' | 'warning' | 'info'
type BadgeTimerVariant = 'default' | 'outline' | 'soft'
type BadgeTimerSize = 'sm' | 'md'

export interface UiBadgeTimerProps {
  size?: BadgeTimerSize
  variant?: BadgeTimerVariant
  isCropped?: boolean
  indicatorType?: BadgeTimerIndicatorType
  showIndicator?: boolean
  label?: string
  timer: UiTimerProps & { dataTest?: string }
  ui?: UiProp<BadgeTimerUi>
}

export interface UiBadgeTimerEmits {
  (event: 'finish'): void
}

export interface UiBadgeTimerSlots {
  leading(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiTimer from '../timer/UiTimer.vue'
import theme from './theme'

defineOptions({
  name: 'UiBadgeTimer',
  inheritAttrs: false
})

defineSlots<UiBadgeTimerSlots>()
const props = withDefaults(defineProps<UiBadgeTimerProps>(), {
  size: 'md',
  variant: 'default',
  indicatorType: 'info',
  label: undefined,
  ui: undefined
})
const emit = defineEmits<UiBadgeTimerEmits>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-badge-timer',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.badgeTimer?.base, props.ui?.base].filter(
      Boolean
    )

    const states = prepareVariants<BadgeTimerUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.badgeTimer?.states,
      uiProp: props.ui?.states
    })

    const sizes = prepareVariants<BadgeTimerUi['size']>({
      theme: theme.size,
      appConfig: appConfig?.ui?.badgeTimer?.size,
      uiProp: props.ui?.size
    })

    const variants = prepareVariants<BadgeTimerUi['variants']>({
      theme: theme.variants,
      appConfig: appConfig?.ui?.badgeTimer?.variants,
      uiProp: props.ui?.variants
    })

    commonClasses.push(sizes[props.size])
    commonClasses.push(variants[props.variant])

    if (props.isCropped) {
      commonClasses.push(states.cropped)
    } else {
      commonClasses.push(states.default)
    }

    return commonClasses
  }),
  appConfig?.ui?.badgeTimer?.strategy || props.ui?.strategy
)
const uiClasses = computed(() => {
  const indicator: ClassNameValue = [
    theme.indicator.base,
    appConfig?.ui?.badgeTimer?.indicator?.base,
    props.ui?.indicator?.base
  ].filter(Boolean)

  const variants = prepareVariants({
    theme: theme.indicator.variants,
    appConfig: appConfig?.ui?.badgeTimer?.indicator?.variants,
    uiProp: props.ui?.indicator?.variants
  })
  indicator.push(variants[props.indicatorType])

  return {
    label: mergeClasses(theme.label, appConfig?.ui?.badgeTimer?.label, props.ui?.label),
    indicator: mergeClasses(indicator),
    timer: {
      base: mergeClasses(theme.timer.base, appConfig?.ui?.badgeTimer?.timer?.base, props.ui?.timer?.base),
      item: mergeClasses(theme.timer.item, appConfig?.ui?.badgeTimer?.timer?.item, props.ui?.timer?.item),
      day: mergeClasses(theme.timer.day, appConfig?.ui?.badgeTimer?.timer?.day, props.ui?.timer?.day),
      hour: mergeClasses(theme.timer.hour, appConfig?.ui?.badgeTimer?.timer?.hour, props.ui?.timer?.hour),
      minute: mergeClasses(theme.timer.minute, appConfig?.ui?.badgeTimer?.timer?.minute, props.ui?.timer?.minute),
      second: mergeClasses(theme.timer.second, appConfig?.ui?.badgeTimer?.timer?.second, props.ui?.timer?.second),
      dots: mergeClasses(theme.timer.dots, appConfig?.ui?.badgeTimer?.timer?.dots, props.ui?.timer?.dots)
    }
  }
})
</script>

<template>
  <div v-bind="attributes" :class="className">
    <UiTimer v-bind="timer" :ui="uiClasses.timer" @finish="emit('finish')">
      <template #leading>
        <slot name="leading">
          <div v-if="showIndicator" :class="uiClasses.indicator" />
          <div v-if="label" :class="uiClasses.label" data-test="badge-timer-text">{{ label }}</div>
        </slot>
      </template>
    </UiTimer>
  </div>
</template>
