<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { BadgeUi } from './theme'
import type { UiIconName } from '../icon/config'
import type { IconSize } from '../icon/UiIcon.vue'

type BadgeVariant = 'default' | 'cropped' | 'counter'
type BadgeSize = 'sm' | 'md' | 'default'

export interface UiBadgeProps {
  size?: BadgeSize
  variant?: BadgeVariant
  leadingIconName?: UiIconName
  leadingIconSize?: IconSize
  trailingIconName?: UiIconName
  trailingIconSize?: IconSize
  ui?: UiProp<BadgeUi>
}

export interface UiBadgeSlots {
  leading(): unknown
  default(): unknown
  trailing(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiIcon from '../icon/UiIcon.vue'
import theme from './theme'

const props = withDefaults(defineProps<UiBadgeProps>(), {
  size: 'default',
  variant: 'default',
  leadingIconName: undefined,
  leadingIconSize: '16',
  trailingIconName: undefined,
  trailingIconSize: '16',
  ui: undefined
})

defineSlots<UiBadgeSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
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

const leadingIconClasses = computed(() => {
  return mergeClasses(theme.leadingIcon, appConfig?.ui?.badge?.leadingIcon, props.ui?.leadingIcon)
})
const trailingIconClasses = computed(() => {
  return mergeClasses(theme.trailingIcon, appConfig?.ui?.badge?.trailingIcon, props.ui?.trailingIcon)
})
</script>

<template>
  <div
    v-bind="attributes"
    :class="className"
    :data-test="attributes['data-test'] || attributes.dataTest || 'custom-badge'"
  >
    <slot name="leading">
      <UiIcon v-if="leadingIconName" :name="leadingIconName" :size="leadingIconSize" :class="leadingIconClasses" />
    </slot>
    <slot />
    <slot name="trailing">
      <UiIcon v-if="trailingIconName" :name="trailingIconName" :size="trailingIconSize" :class="trailingIconClasses" />
    </slot>
  </div>
</template>
