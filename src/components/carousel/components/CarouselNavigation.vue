<script lang="ts">
import type { UiIconName } from '../../icon/config'
import type { IconSize } from '../../icon/UiIcon.vue'
import type { UiButtonProps } from '../../button/UiButton.vue'
import type { CarouselNavigationUi } from '../theme'

export interface Navigation {
  iconPrev?: UiIconName
  iconNext?: UiIconName
  iconSize?: IconSize
  buttonVariant?: UiButtonProps['variant']
  buttonSize?: UiButtonProps['size']
}

interface CarouselNavigationProps extends Navigation {
  backward?: boolean
  forward?: boolean
  ui?: CarouselNavigationUi
}

interface CarouselNavigationEmits {
  (event: 'change', value: number): void
}
</script>

<script setup lang="ts">
import UiButton from '../../button/UiButton.vue'
import UiIcon from '../../icon/UiIcon.vue'

defineOptions({
  name: 'CarouselNavigation',
  inheritAttrs: false
})

withDefaults(defineProps<CarouselNavigationProps>(), {
  iconPrev: 'dropdownLeft',
  iconNext: 'dropdownRight',
  iconSize: '24',
  buttonVariant: 'secondary',
  buttonSize: 'default',
  ui: undefined
})
const emit = defineEmits<CarouselNavigationEmits>()

const navigate = (index: number) => emit('change', index)
</script>

<template>
  <div :class="ui?.container" data-test="carousel-navigation">
    <UiButton
      :variant="buttonVariant"
      :size="buttonSize"
      :class="[ui?.button, ui?.prev, { 'opacity-0 invisible': !backward }]"
      :tabindex="backward ? 0 : -1"
      data-test="carousel-navigation-button carousel-navigation-prev"
      @click="navigate(-1)"
    >
      <UiIcon :name="iconPrev" :size="iconSize" />
    </UiButton>
    <UiButton
      :variant="buttonVariant"
      :size="buttonSize"
      :class="[ui?.button, ui?.next, { 'opacity-0 invisible': !forward }]"
      :tabindex="forward ? 0 : -1"
      data-test="carousel-navigation-button carousel-navigation-next"
      @click="navigate(1)"
    >
      <UiIcon :name="iconNext" :size="iconSize" />
    </UiButton>
  </div>
</template>
