<script lang="ts">
import type { UiProp } from '../types'
import type { ImageUi } from './theme'

export interface UiImageProps {
  src: string
  alt: string
  srcRetina?: string
  isLazy?: boolean
  ui?: UiProp<ImageUi>
}

type Loading = 'eager' | 'lazy'
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiImage',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiImageProps>(), {
  isLazy: true,
  srcRetina: '',
  ui: () => ({ strategy: 'merge' })
})

const appConfig = useAppConfig()

const { attributes, className } = useComponentAttributes(
  'ui-image',
  computed(() => [theme.base, appConfig?.ui?.image?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.image?.strategy || props.ui?.strategy
)

const isMockerMode = computed(() => appConfig?.store?.env?.isMockerMode)

const srcset = computed(() => {
  if (props.srcRetina) {
    return `${props.src} 1x, ${props.srcRetina} 2x`
  }
  return undefined
})

const loading = computed<Loading>(() => {
  if (isMockerMode.value) {
    return 'eager'
  }

  return !props.isLazy ? 'eager' : 'lazy'
})
</script>

<template>
  <img v-bind="attributes" :class="className" :src="src" :srcset="srcset" :alt="alt" :loading="loading" />
</template>

<style lang="postcss"></style>
