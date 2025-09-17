<script lang="ts">
import type { UiIconName } from './config'

type IconSize = '16' | '20' | '24' | '32' | '40' | '48' | 'full'

type IconSizes = {
  height: IconSize
  width: IconSize
}

export interface UiIconProps {
  name?: UiIconName
  src?: string
  size?: IconSize
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { useAppConfig } from '../../composables/useAppConfig'

const SIZE_CLASSES_LIST: Record<IconSize, string> = {
  '16': 'w-4 h-4',
  '20': 'w-5 h-5',
  '24': 'w-6 h-6',
  '32': 'w-8 h-8',
  '40': 'w-10 h-10',
  '48': 'w-12 h-12',
  full: 'w-full h-full'
}

defineOptions({
  name: 'UiIcon',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiIconProps>(), {
  name: undefined,
  src: undefined,
  size: '24'
})

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-icon',
  computed(() => SIZE_CLASSES_LIST[props.size])
)
const iconRaw = computed(() => {
  if (!props.name) {
    return
  }
  return appConfig.icons?.[props.name]
})
const iconSize = computed((): IconSizes => {
  return { height: props.size, width: props.size }
})
</script>

<template>
  <div v-if="iconRaw && !src" :class="className" v-bind="attributes" v-html="iconRaw" />
  <img v-else v-bind="{ ...attributes, ...iconSize }" :class="className" :src="src || undefined" alt="icon" />
</template>
