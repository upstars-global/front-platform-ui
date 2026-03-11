<script lang="ts">
import type { ImgLoading, UiProp } from '../types'
import type { PictureProvider } from '../../utils/pictureProvider'
import type { PictureUi } from './theme'

type Provider = (() => PictureProvider<Record<string, unknown>>) | undefined

export interface UiPictureProps<Metadata = Record<string, unknown>, Provider = string> {
  src: string
  alt: string
  provider?: Provider
  meta?: Metadata
  sources?: Array<{ srcset: string; media: string }>
  isLazy?: boolean
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
  provider: 'default',
  sources: () => [],
  meta: undefined,
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

function getProvider() {
  const provider = appConfig?.providers?.picture?.[props.provider] as Provider

  if (!provider) {
    console.error('Picture: unknown provider -', props.provider)
    return
  }

  return provider
}

const pictureProvider = getProvider()

const picture = computed(() => {
  if (!pictureProvider) {
    return { url: props.src, sources: props.sources }
  }
  const { getPicture } = pictureProvider()
  const { url, sourceList } = getPicture(props)

  return { url, sources: sourceList ?? props.sources }
})
</script>

<template>
  <picture v-bind="attributes" :class="className">
    <source v-for="source in picture.sources" :key="source.media" :srcset="source.srcset" :media="source.media" />
    <img
      :class="uiClasses.image"
      :src="picture.url"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchPriority"
      @load="emit('onLoad', true)"
    />
  </picture>
</template>
