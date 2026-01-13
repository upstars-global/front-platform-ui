<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { SwitchUi } from './theme'

export interface UiSwitchProps {
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  ui?: UiProp<SwitchUi>
}

export interface UiSwitchEmits {
  (event: 'update:modelValue', value: boolean): void
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import theme from './theme'

defineOptions({
  name: 'UiSwitch',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiSwitchProps>(), {
  size: 'md',
  ui: () => ({ strategy: 'merge' })
})
defineEmits<UiSwitchEmits>()

const model = defineModel<boolean>('modelValue', { default: false })
const isChecked = ref(model.value)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-switch',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.switch?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<SwitchUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.switch?.states,
      uiProp: props.ui?.states
    })

    const sizes = prepareVariants<SwitchUi['size']>({
      theme: theme.size,
      appConfig: appConfig?.ui?.switch?.size,
      uiProp: props.ui?.size
    })

    commonClasses.push(sizes[props.size])

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    return commonClasses
  }),
  appConfig.ui?.switch?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  let checkmark = mergeClasses(
    theme.checkmark.base,
    appConfig.ui?.switch?.checkmark?.base,
    props.ui?.checkmark?.base,
    theme.checkmark.size[props.size],
    appConfig.ui?.switch?.checkmark?.size?.[props.size],
    props.ui?.checkmark?.size?.[props.size]
  )
  if (model.value) {
    checkmark = mergeClasses(checkmark, theme.checked, appConfig.ui?.switch?.checked, props.ui?.checked)
  }
  return {
    input: mergeClasses(theme.input, appConfig.ui?.switch?.input, props.ui?.input),
    checkmark
  }
})

const handleUpdateModelValue = (value: boolean) => {
  isChecked.value = value
}
</script>

<template>
  <label v-bind="attributes" :class="className">
    <input
      v-model="model"
      type="checkbox"
      :class="uiClasses.input"
      :disabled="disabled"
      @update:model-value="handleUpdateModelValue"
    />
    <span :class="uiClasses.checkmark" />
  </label>
</template>
