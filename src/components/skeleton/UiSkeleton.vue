<script lang="ts">
import type { UiProp } from '../types'
import type { SkeletonUi } from './theme'

export interface UiSkeletonProps {
  as?: string
  ui?: UiProp<SkeletonUi>
}

export interface UiSkeletonSlots {
  default(): unknown
}
</script>

<script setup lang="ts">
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'
import { computed } from 'vue'

defineOptions({
  name: 'UiSkeleton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiSkeletonProps>(), {
  as: 'div',
  ui: () => ({ strategy: 'merge' })
})
defineSlots<UiSkeletonSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-skeleton',
  computed(() => {
    const commonClasses = [theme.base, appConfig.ui?.skeleton?.base, props.ui?.base]
    commonClasses.push(theme.gradient, appConfig?.ui?.skeleton?.gradient, props.ui?.gradient)
    return commonClasses.filter(Boolean)
  }),
  appConfig.ui?.skeleton?.strategy || props.ui?.strategy
)
</script>

<template>
  <component :is="as" :class="className" v-bind="attributes">
    <slot />
  </component>
</template>

<style lang="postcss">
.ui-skeleton {
  background-size: 200% auto;
  background-position-x: 200%;
}
</style>
