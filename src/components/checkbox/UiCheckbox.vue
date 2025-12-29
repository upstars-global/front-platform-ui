<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { FormElementProps, UiProp } from '../types'
import type { UiIconName } from '../icon/config'
import type { CheckboxUi } from './theme'

type CheckboxSize = '16' | '20' | '24' | '32' | '40' | '48'

export interface UiCheckboxProps extends FormElementProps {
  icon?: UiIconName
  checkboxSize?: CheckboxSize
  error?: string
  errorIcon?: UiIconName
  ui?: UiProp<CheckboxUi>
}

export interface UiCheckboxEmits {
  (event: 'update:modelValue', value: boolean): void
}

export interface UiCheckboxSlots {
  checkmark(): unknown
  default(): unknown
  'error-message'(): unknown
}
</script>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiIcon from '../icon/UiIcon.vue'
import theme from './theme'

const SIZE_CLASSES_LIST: Record<CheckboxSize, string> = {
  '16': 'w-4 h-4',
  '20': 'w-5 h-5',
  '24': 'w-6 h-6',
  '32': 'w-8 h-8',
  '40': 'w-10 h-10',
  '48': 'w-12 h-12'
}

defineOptions({
  name: 'UiCheckbox',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiCheckboxProps>(), {
  icon: 'check',
  checkboxSize: '24',
  error: undefined,
  errorIcon: undefined,
  ui: undefined
})
defineEmits<UiCheckboxEmits>()
const slots = defineSlots<UiCheckboxSlots>()

const model = defineModel<boolean>('modelValue', { default: undefined })

const isChecked = ref(model.value)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-checkbox',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.checkbox?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<CheckboxUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.checkbox?.states,
      uiProp: props.ui?.states
    })

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    return commonClasses
  }),
  appConfig?.ui?.checkbox?.strategy || props.ui?.strategy
)

const isError = computed(() => props.error || slots['error-message'])

const uiClasses = computed(() => {
  const checkboxInner = [theme.checkmark.inner, appConfig.ui?.checkbox?.checkmark?.inner, props.ui?.checkmark?.inner]
  if (isChecked.value) {
    checkboxInner.push(
      theme.checkmark.checked,
      appConfig.ui?.checkbox?.checkmark?.checked,
      props.ui?.checkmark?.checked
    )
  }

  if (isError.value && !isChecked.value) {
    checkboxInner.push(
      theme.checkmark.invalid,
      appConfig.ui?.checkbox?.checkmark?.invalid,
      props.ui?.checkmark?.invalid
    )
  }

  return {
    input: mergeClasses(theme.input, appConfig.ui?.checkbox?.input, props.ui?.input),
    container: mergeClasses(theme.container, appConfig.ui?.checkbox?.container, props.ui?.container),
    checkmark: {
      container: mergeClasses(
        theme.checkmark.container,
        appConfig.ui?.checkbox?.checkmark?.container,
        props.ui?.checkmark?.container,
        SIZE_CLASSES_LIST[props.checkboxSize]
      ),
      inner: mergeClasses(checkboxInner.filter(Boolean))
    },
    error: mergeClasses(theme.error, appConfig.ui?.checkbox?.error, props.ui?.error)
  }
})

watch(
  () => model.value,
  (value) => {
    isChecked.value = value
  }
)

const handleChange = (event: Event) => {
  isChecked.value = (event.target as HTMLInputElement).checked
}
</script>

<template>
  <label :class="className" v-bind="attributes">
    <input
      v-model="model"
      :class="uiClasses.input"
      type="checkbox"
      :data-test="model ? 'checkbox-checked' : 'checkbox-unchecked'"
      :name="name"
      :form="form"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
    />
    <span :class="uiClasses.container">
      <slot name="checkmark">
        <div :class="uiClasses.checkmark.container">
          <div :class="uiClasses.checkmark.inner">
            <UiIcon v-show="isChecked" :name="icon" size="full" />
          </div>
        </div>
      </slot>
      <slot>
        <span>{{ label }}</span>
      </slot>
    </span>
    <span v-if="!isChecked && isError" :class="uiClasses.error">
      <slot name="error-message">
        <UiIcon v-if="errorIcon" :name="errorIcon" size="16" />
        {{ error }}
      </slot>
    </span>
  </label>
</template>
