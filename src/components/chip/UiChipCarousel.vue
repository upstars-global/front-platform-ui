<script setup lang="ts" generic="T extends string | number">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiChipProps } from './UiChip.vue'
import type { ChipUi } from './theme'
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import UiCarousel from '../carousel/UiCarousel.vue'
import UiChip from './UiChip.vue'
import theme from './theme'

const props = defineProps<{
  items: UiChipProps<T>[]
  isMobile?: boolean
  ui?: UiProp<ChipUi>
}>()

const modelValue = defineModel<T>({
  required: true
})

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-chip-carousel',
  computed(() => {
    const commonClasses: ClassNameValue[] = [
      theme.carousel.base,
      appConfig.ui?.chip?.carousel?.base,
      props.ui?.carousel?.base
    ].filter(Boolean)

    return commonClasses
  }),
  appConfig.ui?.chip?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    item: mergeClasses(theme.carousel.item, appConfig.ui?.chip?.carousel?.item, props.ui?.carousel?.item)
  }
})
</script>

<template>
  <UiCarousel :class="className" v-bind="attributes" :is-mobile="isMobile">
    <UiChip
      v-for="chip in items"
      :key="chip.name"
      :class="uiClasses.item"
      :active="chip.name === modelValue"
      v-bind="chip"
      @click="modelValue = chip.name"
    />
  </UiCarousel>
</template>
