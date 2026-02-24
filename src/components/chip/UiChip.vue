<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { ChipUi } from './theme'
import type { UiIconName } from '../icon/config'
import type { IconSize } from '../icon/UiIcon.vue'

export interface UiChipProps<T = string | number> {
  label: string
  name: T
  dataTest?: string
  isHidden?: boolean
  isSpecial?: boolean
  isActive?: boolean
  count?: number
  leadingIconName?: UiIconName
  leadingIconSize?: IconSize
  trailingIconName?: UiIconName
  trailingIconSize?: IconSize
  ui?: UiProp<ChipUi>
}

export interface UiChipEmits {
  (event: 'click', value: MouseEvent): void
  (event: 'click-leading', value: MouseEvent): void
  (event: 'click-trailing', value: MouseEvent): void
}

export interface UiChipSlots {
  leading(): unknown
  trailing(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiIcon from '../icon/UiIcon.vue'
import theme from './theme'

defineOptions({
  name: 'UiChip',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiChipProps>(), {
  dataTest: undefined,
  count: undefined,
  leadingIconName: undefined,
  leadingIconSize: '16',
  trailingIconName: undefined,
  trailingIconSize: '16',
  ui: undefined
})
const emit = defineEmits<UiChipEmits>()
defineSlots<UiChipSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
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

const uiClasses = computed(() => {
  return {
    leadingIcon: mergeClasses(theme.leadingIcon, appConfig.ui?.chip?.leadingIcon, props.ui?.leadingIcon),
    trailingIcon: mergeClasses(theme.trailingIcon, appConfig.ui?.chip?.trailingIcon, props.ui?.trailingIcon)
  }
})
</script>

<template>
  <div :class="className" :data-test="dataTest" v-bind="attributes" @click="emit('click', $event)">
    <slot name="leading">
      <UiIcon
        v-if="leadingIconName"
        :name="leadingIconName"
        :size="leadingIconSize"
        :class="uiClasses.leadingIcon"
        @click.stop="emit('click-leading', $event)"
      />
    </slot>
    {{ label }}
    <slot name="trailing">
      <UiIcon
        v-if="trailingIconName"
        :name="trailingIconName"
        :size="trailingIconSize"
        :class="uiClasses.trailingIcon"
        @click.stop="emit('click-trailing', $event)"
      />
    </slot>
  </div>
</template>
