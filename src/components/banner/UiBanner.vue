<script lang="ts">
import type { UiProp } from '../types'
import type { BannerUi } from './theme'

export interface UiBannerProps {
  ui?: UiProp<BannerUi>
}

export interface UiBannerEmits {
  (event: 'click'): void
}

export interface UiBannerSlots {
  default(): unknown
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiBanner',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiBannerProps>(), {
  ui: undefined
})
defineEmits<UiBannerEmits>()
defineSlots<UiBannerSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-banner',
  computed(() => [theme.base, appConfig?.ui?.banner?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.banner?.strategy || props.ui?.strategy
)
</script>

<template>
  <div v-bind="attributes" :class="className">
    <slot />
  </div>
</template>
