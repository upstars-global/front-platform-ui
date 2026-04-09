<script lang="ts">
import type { UiProp } from '../types'
import type { UiButtonProps } from '../button/UiButton.vue'
import type { UiImageProps } from '../image/UiImage.vue'
import type { UiPictureProps } from '../picture/UiPicture.vue'
import type { BannerUi } from './theme'

interface BannerButton extends UiButtonProps {
  label?: string
  url?: string
}

export interface UiBannerProps {
  backgroundColor?: string
  button?: BannerButton
  content?: string
  image?: UiImageProps
  picture?: UiPictureProps
  variant?: 'default'
  ui?: UiProp<BannerUi>
}

export interface UiBannerEmits {
  (event: 'click', value: MouseEvent): void
}

export interface UiBannerSlots {
  content(): unknown
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiButton from '../button/UiButton.vue'
import UiImage from '../image/UiImage.vue'
import UiLink from '../link/UiLink.vue'
import UiPicture from '../picture/UiPicture.vue'
import theme from './theme'

defineOptions({
  name: 'UiBanner',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiBannerProps>(), {
  backgroundColor: undefined,
  button: undefined,
  content: undefined,
  image: undefined,
  picture: undefined,
  variant: 'default',
  ui: undefined
})
const emit = defineEmits<UiBannerEmits>()
defineSlots<UiBannerSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-banner',
  computed(() => [theme.base, appConfig?.ui?.banner?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.banner?.strategy || props.ui?.strategy
)

const buttonVariants = computed(() =>
  prepareVariants({
    theme: theme.button.variants,
    appConfig: appConfig?.ui?.banner?.button?.variants,
    uiProp: props.ui?.button?.variants
  })
)

const buttonWrapperVariants = computed(() =>
  prepareVariants({
    theme: theme.buttonWrapper.variants,
    appConfig: appConfig?.ui?.banner?.buttonWrapper?.variants,
    uiProp: props.ui?.buttonWrapper?.variants
  })
)

const contentVariants = computed(() =>
  prepareVariants({
    theme: theme.content.variants,
    appConfig: appConfig?.ui?.banner?.content?.variants,
    uiProp: props.ui?.content?.variants
  })
)

const imageWrapperVariants = computed(() =>
  prepareVariants({
    theme: theme.imageWrapper.variants,
    appConfig: appConfig?.ui?.banner?.imageWrapper?.variants,
    uiProp: props.ui?.imageWrapper?.variants
  })
)
const imageVariants = computed(() =>
  prepareVariants({
    theme: theme.image.variants,
    appConfig: appConfig?.ui?.banner?.image?.variants,
    uiProp: props.ui?.image?.variants
  })
)
const wrapperVariants = computed(() =>
  prepareVariants({
    theme: theme.wrapper.variants,
    appConfig: appConfig?.ui?.banner?.wrapper?.variants,
    uiProp: props.ui?.wrapper?.variants
  })
)

const uiClasses = computed(() => {
  return {
    button: mergeClasses(buttonVariants.value[props.variant]),
    buttonWrapper: mergeClasses(buttonWrapperVariants.value[props.variant]),
    content: mergeClasses(contentVariants.value[props.variant]),
    imageWrapper: mergeClasses(imageWrapperVariants.value[props.variant]),
    image: mergeClasses(imageVariants.value[props.variant]),
    wrapper: mergeClasses(wrapperVariants.value[props.variant])
  }
})

const pictureProps = computed(() => {
  if (!props.picture) {
    return null
  }

  return {
    ...props.picture,
    ui: {
      ...props.picture?.ui,
      image: `${uiClasses.value.image} ${props.picture?.ui?.image ?? ''}`
    }
  }
})
</script>

<template>
  <UiLink v-bind="attributes" :class="className" :to="button?.url" @click="emit('click', $event)">
    <div :class="uiClasses.wrapper" :style="{ background: backgroundColor }">
      <div :class="uiClasses.content">
        <slot name="content">
          <div data-test="banner-description" v-html="content" />
        </slot>
        <div v-if="button?.label" :class="uiClasses.buttonWrapper">
          <UiButton
            class="rounded-none"
            :style="{ fontWeight: 'inherit' }"
            variant="default"
            size="default"
            trailing-icon-name="arrowNext"
            trailing-icon-size="16"
            data-test="banner-button"
            v-bind="button"
            :ui="{ base: uiClasses.button, strategy: 'merge' }"
          >
            <span v-html="button.label" />
          </UiButton>
        </div>
      </div>
      <div :class="uiClasses.imageWrapper">
        <UiImage v-if="image" :class="uiClasses.image" v-bind="image" />
        <UiPicture v-if="pictureProps" v-bind="pictureProps" />
      </div>
    </div>
  </UiLink>
</template>
