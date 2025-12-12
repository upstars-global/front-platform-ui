<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { CardUi } from './theme'

export interface UiCardProps {
  as?: string
  isRounded?: boolean
  orientation?: 'vertical' | 'horizontal'
  variant?: 'default' | 'outline' | 'soft' | 'subtle'
  ui?: UiProp<CardUi>
}
export interface UiCardSlots {
  default(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'
import { prepareVariants } from '../../helpers/prepareClassNames'

const props = withDefaults(defineProps<UiCardProps>(), {
  as: 'div',
  isRounded: true,
  orientation: 'vertical',
  variant: 'default',
  ui: () => ({ strategy: 'merge' })
})

defineSlots<UiCardSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-card',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.card?.base, props.ui?.base].filter(Boolean)

    const orientation = prepareVariants<CardUi['orientation']>({
      theme: theme.orientation,
      appConfig: appConfig?.ui?.card?.orientation,
      uiProp: props.ui?.orientation
    })
    const variants = prepareVariants<CardUi['variants']>({
      theme: theme.variants,
      appConfig: appConfig?.ui?.card?.variants,
      uiProp: props.ui?.variants
    })

    commonClasses.push(orientation[props.orientation])
    commonClasses.push(variants[props.variant])

    const roundedClasses = [theme.rounded, appConfig?.ui?.card?.rounded, props.ui.rounded].filter(Boolean)

    if (props.isRounded) {
      commonClasses.push(roundedClasses)
    }

    return commonClasses
  }),
  appConfig?.ui?.card?.strategy || props.ui?.strategy
)
</script>

<template>
  <component :is="as" v-bind="attributes" :class="className">
    <slot />
  </component>
</template>
