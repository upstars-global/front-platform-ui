<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { BadgeUi } from './theme'

type BadgeVariant = 'default' | 'cropped' | 'counter'
type BadgeSize = 'sm' | 'md' | 'default'

export interface UiBadgeProps {
  size?: BadgeSize
  variant?: BadgeVariant
  ui?: UiProp<BadgeUi>
}

export interface UiBadgeSlots {
  default: () => unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import theme from './theme'

const props = withDefaults(defineProps<UiBadgeProps>(), {
  size: 'default',
  variant: 'default',
  ui: undefined
})

defineSlots<UiBadgeSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-badge',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.badge?.base, props.ui?.base].filter(Boolean)

    const sizes = prepareVariants<BadgeUi['size']>({
      theme: theme.size,
      appConfig: appConfig?.ui?.badge?.size,
      uiProp: props.ui?.size
    })
    const variants = prepareVariants<BadgeUi['variants']>({
      theme: theme.variants,
      appConfig: appConfig?.ui?.badge?.variants,
      uiProp: props.ui?.variants
    })

    commonClasses.push(sizes[props.size])
    commonClasses.push(variants[props.variant])

    return commonClasses
  }),
  appConfig?.ui?.badge?.strategy || props.ui?.strategy
)
</script>

<template>
  <div
    v-bind="attributes"
    :class="className"
    :data-test="attributes['data-test'] || attributes.dataTest || 'custom-badge'"
  >
    <slot />
  </div>
</template>
