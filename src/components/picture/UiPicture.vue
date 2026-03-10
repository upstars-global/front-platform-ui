<script lang="ts">
import type { ImgLoading, UiProp } from '../types'
import type { PictureUi } from './theme'

export interface UiPictureProps {
  src: string
  alt: string
  provider: string
  isLazy?: boolean
  groupType?: string
  query?: Record<string, string | string[]>
  fetchPriority?: 'high' | 'low' | 'auto'
  ui?: UiProp<PictureUi>
}

export interface UiPictureEmits {
  (event: 'onLoad', value: boolean): void
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiPicture',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiPictureProps>(), {
  isLazy: true,
  query: undefined,
  groupType: undefined,
  fetchPriority: undefined,
  ui: undefined
})
const emit = defineEmits<UiPictureEmits>()

const appConfig = useAppConfig()

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-picture',
  computed(() => [theme.base, appConfig?.ui?.picture?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.picture?.strategy || props.ui?.strategy
)

const isMockerMode = computed(() => appConfig?.store?.env?.isMockerMode)
const loading = computed<ImgLoading>(() => {
  if (isMockerMode.value) {
    return 'eager'
  }

  return !props.isLazy ? 'eager' : 'lazy'
})

const uiClasses = computed(() => ({
  image: mergeClasses(theme.image, appConfig.ui?.picture?.image, props.ui?.image)
}))

function getProvider(name: string) {
  const provider = appConfig?.providers?.picture?.[name]

  if (!provider) {
    throw new Error('Unknown provider: ' + name)
  }

  return provider()
}

const picture = computed(() => {
  const provider = getProvider(props.provider)
  const { url, sources } = provider.getImage(props)
  return { url, sources: sources ?? [] }
})
</script>

<template>
  <picture v-bind="attributes" :class="className">
    <source v-for="source in picture.sources" :key="source.media" :srcset="source.srcset" :media="source.media" />
    <img
      :class="uiClasses.image"
      :src="src"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchPriority"
      @load="emit('onLoad', true)"
    />
  </picture>
</template>
