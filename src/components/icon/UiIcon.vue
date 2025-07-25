<script setup lang="ts">
import type { IconSize, IconSizes, IconProps } from './UiIcon.types'
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'
import { icons } from './icons'

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

const props = withDefaults(defineProps<IconProps>(), {
  size: '24'
})
const attrs = useAttrs()
const iconRaw = computed(() => {
  if (!props.name) {
    return
  }
  return icons[props.name]
})
const iconSize = computed((): IconSizes => {
  return { height: props.size, width: props.size }
})
const attributes = computed(() => {
  const result = { ...attrs }
  delete result.class
  return result
})
const classes = computed(() => {
  let str = ''

  if (!attrs.class) {
    return str
  }

  if (Array.isArray(attrs.class)) {
    str = attrs.class.join(' ')
  } else if (typeof attrs.class === 'object') {
    str = Object.keys(attrs.class)
      .filter((key) => (attrs.class as Record<string, unknown>)[key])
      .join(' ')
  }

  return str || (attrs.class as string)
})
const className = computed(() => twMerge('ui-icon', SIZE_CLASSES_LIST[props.size], classes.value))
</script>

<template>
  <div v-if="iconRaw && !src" :class="className" v-bind="attributes" v-html="iconRaw" />
  <img v-else v-bind="{ ...attributes, ...iconSize }" :class="className" :src="src || undefined" alt="icon" />
</template>
