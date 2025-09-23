<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiIconName } from '../icon/config'
import type { IconSize } from '../icon/UiIcon.vue'
import type { ButtonUi } from './theme'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'default'
type ButtonSize = 'sm' | 'md' | 'lg' | 'default'

export interface UiButtonProps {
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  fullWidth?: boolean
  leadingIconName?: UiIconName
  leadingIconSize?: IconSize
  trailingIconName?: UiIconName
  trailingIconSize?: IconSize
  ui?: UiProp<ButtonUi>
}

export interface UiButtonEmits {
  (event: 'click', value: MouseEvent): void
}

export interface UiButtonSlots {
  leading(): unknown
  default(): unknown
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
  name: 'UiButton',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiButtonProps>(), {
  size: 'md',
  variant: 'primary',
  leadingIconName: undefined,
  leadingIconSize: undefined,
  trailingIconName: undefined,
  trailingIconSize: undefined,
  ui: undefined
})
defineEmits<UiButtonEmits>()
defineSlots<UiButtonSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-button',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.button?.base, props.ui?.base].filter(Boolean)

    const sizes = prepareVariants<ButtonUi['size']>({
      theme: theme.size,
      appConfig: appConfig?.ui?.button?.size,
      uiProp: props.ui?.size
    })
    const variants = prepareVariants<ButtonUi['variants']>({
      theme: theme.variants,
      appConfig: appConfig?.ui?.button?.variants,
      uiProp: props.ui?.variants
    })
    const states = prepareVariants<ButtonUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.button?.states,
      uiProp: props.ui?.states
    })

    commonClasses.push(sizes[props.size])
    commonClasses.push(variants[props.variant])

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    if (props.fullWidth) {
      commonClasses.push(states.full)
    }

    return commonClasses
  }),
  appConfig?.ui?.button?.strategy || props.ui?.strategy
)
</script>

<template>
  <button :class="className" v-bind="attributes" :disabled="disabled" @click="$emit('click', $event)">
    <slot name="leading">
      <UiIcon v-if="leadingIconName" :name="leadingIconName" :size="leadingIconSize" />
    </slot>
    <slot />
    <slot name="trailing">
      <UiIcon v-if="trailingIconName" :name="trailingIconName" :size="trailingIconSize" />
    </slot>
  </button>
</template>
