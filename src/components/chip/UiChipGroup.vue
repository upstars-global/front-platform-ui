<script setup lang="ts" generic="T extends string | number">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiChipProps } from './UiChip.vue'
import type { ChipUi } from './theme'
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import UiChip from './UiChip.vue'
import theme from './theme'

const props = defineProps<{
  items: UiChipProps<T>[]
  ui?: UiProp<ChipUi>
}>()
defineSlots<{
  count(props: { count: number }): unknown
}>()

const modelValue = defineModel<T>({
  required: true
})

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-chip-group',
  computed(() => {
    const commonClasses: ClassNameValue[] = [
      theme.group.base,
      appConfig.ui?.chip?.group?.base,
      props.ui?.group?.base
    ].filter(Boolean)

    return commonClasses
  }),
  appConfig.ui?.chip?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    item: mergeClasses(theme.group.item, appConfig.ui?.chip?.group?.item, props.ui?.group?.item)
  }
})
</script>

<template>
  <div :class="className" v-bind="attributes">
    <template v-for="chip in items" :key="chip.name">
      <UiChip
        v-if="!chip.isHidden"
        :class="uiClasses.item"
        v-bind="chip"
        :is-active="chip.name === modelValue"
        @click="modelValue = chip.name"
      >
        <template v-if="chip.count" #trailing>
          <slot name="count" :count="chip.count" />
        </template>
      </UiChip>
    </template>
  </div>
</template>
