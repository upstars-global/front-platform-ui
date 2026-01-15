<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { ChipUi } from './theme'

export interface UiChipProps<T = string | number> {
  label: string
  name: T
  dataTest?: string
  isHidden?: boolean
  isSpecial?: boolean
  isActive?: boolean
  count?: number
  ui?: UiProp<ChipUi>
}

export interface UiChipEmits {
  (event: 'click', value: MouseEvent): void
}

export interface UiChipSlots {
  trailing(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import theme from './theme'

defineOptions({
  name: 'UiChip',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiChipProps>(), {
  dataTest: undefined,
  count: undefined,
  ui: undefined
})
const emit = defineEmits<UiChipEmits>()
defineSlots<UiChipSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-chip',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.chip?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<ChipUi['states']>({
      theme: theme.states,
      appConfig: appConfig.ui?.chip?.states,
      uiProp: props.ui?.states
    })

    if (props.isSpecial) {
      commonClasses.push(states.special)
    }

    if (props.isActive) {
      commonClasses.push(states.active)
    }

    return commonClasses
  }),
  appConfig.ui?.chip?.strategy || props.ui?.strategy
)
</script>

<template>
  <div :class="className" :data-test="dataTest" v-bind="attributes" @click="emit('click', $event)">
    {{ label }}
    <slot name="trailing" />
  </div>
</template>
