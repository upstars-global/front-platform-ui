<script setup lang="ts">
import { computed } from 'vue'
import type { FormElementProps, UiProp } from '../types'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { useAppConfig } from '../../composables/useAppConfig'
import { prepareVariants } from '../../helpers/prepareClassNames'
import type { ClassNameValue } from 'tailwind-merge'
import theme from './theme'
import type { SelectUi } from './theme'
import UiIcon from '../icon/UiIcon.vue'
import UiTooltip, { type UiTooltipProps } from '../tooltip/UiTooltip.vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface UiSelectProps extends FormElementProps, Partial<Pick<UiTooltipProps, 'offsetValue'>> {
  dataTest?: string
  modelValue?: string | number
  error?: string
  description?: string
  subLabel?: string
  ui?: UiProp<SelectUi>
  selectTextAlign?: 'left' | 'center' | 'right'

  // Select-specific props
  options?: SelectOption[]
  placeholder?: string
  id?: string
  size?: 'small' | 'medium'
  fullWidth?: boolean
}

interface UiSelectEmits {
  (event: 'update:modelValue', value: string | number): void
  (event: 'change', value: string | number): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
}

interface UiSelectSlots {
  left?: () => unknown
  label?: () => unknown
  'error-message'?: () => unknown
  description?: () => unknown
  option?: (props: { option: SelectOption; index: number }) => unknown
}

const props = withDefaults(defineProps<UiSelectProps>(), {
  modelValue: '',
  dataTest: 'select-field',
  error: '',
  description: '',
  subLabel: '',
  ui: undefined,
  selectTextAlign: 'left',
  offsetValue: 8,
  options: () => [],
  placeholder: undefined,
  id: undefined,
  size: 'small',
  fullWidth: false
})

defineOptions({
  name: 'UiSelect',
  inheritAttrs: false
})

const emit = defineEmits<UiSelectEmits>()

const slots = defineSlots<UiSelectSlots>()

const elementId = computed(() => `label-${props.name}`)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-select',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.select?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<SelectUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.select?.states,
      uiProp: props.ui?.states
    })

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    if (props.fullWidth) {
      commonClasses.push(states.full)
    }

    if (!props.fullWidth) {
      commonClasses.push(states.max)
    }

    return commonClasses
  }),
  appConfig?.ui?.select?.strategy || props.ui?.strategy
)

const isError = computed(() => props.error || slots['error-message'])

const uiClasses = computed(() => {
  const selectClasses = [theme.select?.base, appConfig.ui?.select?.select?.base, props.ui?.select?.base]

  const additionalSelectClasses = [
    ...(props.size === 'small'
      ? [theme.select.sizeSmall, appConfig.ui?.select?.select?.sizeSmall, props.ui?.select?.sizeSmall]
      : []),

    ...(props.size === 'medium'
      ? [theme.select.sizeMedium, appConfig.ui?.select?.select?.sizeMedium, props.ui?.select?.sizeMedium]
      : []),

    ...(props.selectTextAlign === 'right'
      ? [theme.select.textAlignRight, appConfig.ui?.select?.select?.textAlignRight, props.ui?.select?.textAlignRight]
      : []),

    ...(props.selectTextAlign === 'center'
      ? [theme.select.textAlignCenter, appConfig.ui?.select?.select?.textAlignCenter, props.ui?.select?.textAlignCenter]
      : []),

    ...(slots.left ? [theme.select.leftSlot, appConfig.ui?.select?.select?.leftSlot, props.ui?.select?.leftSlot] : []),

    ...(isError.value ? [theme.select.invalid, appConfig.ui?.select?.select?.invalid, props.ui?.select?.invalid] : [])
  ]

  return {
    label: mergeClasses(theme.label, appConfig.ui?.select?.label, props.ui?.label),
    select: mergeClasses([...selectClasses, ...additionalSelectClasses]),
    container: mergeClasses(theme.container, appConfig.ui?.select?.container, props.ui?.container),
    slotLeft: mergeClasses(theme.leftSlot, appConfig.ui?.select?.leftSlot, props.ui?.leftSlot),
    dropdownIcon: mergeClasses(theme.dropdownIcon, appConfig.ui?.select?.dropdownIcon, props.ui?.dropdownIcon),
    error: {
      content: mergeClasses(theme.error.content, appConfig.ui?.select?.error?.content, props.ui?.error?.content),
      text: mergeClasses(theme.error.text, appConfig.ui?.select?.error?.text, props.ui?.error?.text)
    },
    description: mergeClasses(theme.description, appConfig.ui?.select?.description, props.ui?.description)
  }
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <div :class="className" v-bind="attributes">
    <label v-if="label" :for="elementId" :class="uiClasses.label">
      <slot name="label">{{ label }}</slot>
      <span v-if="required" class="text-red-500">*</span>
      <span v-if="subLabel">{{ subLabel }}</span>
    </label>
    <UiTooltip :disabled="!isError" placement="bottom" trigger="always" :offset-value>
      <template #activator>
        <div :class="uiClasses.container">
          <div v-if="slots.left" :class="uiClasses.slotLeft">
            <slot name="left" />
          </div>
          <select
            v-bind="$attrs"
            :id="elementId"
            :value="modelValue"
            :disabled="disabled"
            :class="uiClasses.select"
            :data-test="dataTest"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
          >
            <option v-if="placeholder" disabled hidden selected value="">
              {{ placeholder }}
            </option>
            <template v-for="(option, index) in options" :key="option.value">
              <slot name="option" :option="option" :index="index">
                <option :value="option.value" :disabled="option.disabled">
                  {{ option.label }}
                </option>
              </slot>
            </template>
          </select>
          <UiIcon size="20" name="dropdownDown" :class="uiClasses.dropdownIcon" />
        </div>
      </template>
      <div v-if="isError" :class="uiClasses.error.content">
        <small :class="uiClasses.error.text">
          <slot name="error-message">
            <span :data-test="`${dataTest}-error-msg`">{{ error }}</span>
          </slot>
        </small>
      </div>
    </UiTooltip>

    <div v-if="description && !isError" :class="uiClasses.description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
  </div>
</template>
