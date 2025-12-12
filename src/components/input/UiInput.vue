<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { FormElementProps, UiProp } from '../types'
import type { UiTooltipProps } from '../tooltip/UiTooltip.vue'
import type { InputUi } from './theme'

export interface UiInputProps extends FormElementProps, Partial<Pick<UiTooltipProps, 'offsetValue'>> {
  dataTest?: string
  modelValue?: string | undefined
  error?: string
  description?: string
  subLabel?: string
  recommendations?: string[] | null
  ui?: UiProp<InputUi>
  mask?: string | Record<string, unknown>
  inputTextAlign?: 'left' | 'center' | 'right'

  // Input-specific props
  placeholder?: string
  autocomplete?: string
  autofocus?: boolean
  min?: number | string
  max?: number | string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date'
  id?: string
  pattern?: string
  step?: number | string
  maxlength?: number
}

export interface UiInputEmits {
  (event: 'update:modelValue', value: string): void
  (event: 'change', value: string): void
  (event: 'focus', value: FocusEvent): void
  (event: 'blur', value: FocusEvent): void
  (event: 'keydown', value: KeyboardEvent): void
}

export interface UiInputSlots {
  left?: () => unknown
  right?: () => unknown
  label?: () => unknown
  'error-message'?: () => unknown
  description?: () => unknown
}
</script>
<script setup lang="ts">
import { computed, ref, useTemplateRef, onMounted } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiTooltip from '../tooltip/UiTooltip.vue'
import theme from './theme'

defineOptions({
  name: 'UiInput',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiInputProps>(), {
  modelValue: '',
  type: 'text',
  dataTest: 'text-field',
  error: '',
  description: '',
  subLabel: '',
  recommendations: () => [],
  ui: undefined,
  mask: '',
  inputTextAlign: 'left',
  offsetValue: 8,

  // Input-specific props
  value: '',
  placeholder: undefined,
  autocomplete: undefined,
  min: undefined,
  max: undefined,
  id: undefined,
  pattern: undefined,
  step: undefined,
  maxlength: undefined
})

const emit = defineEmits<UiInputEmits>()
const slots = defineSlots<UiInputSlots>()

const elementId = computed(() => `label-${props.name}`)

const fieldRef = useTemplateRef('input')
const isRecommendationsVisible = ref(false)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-input',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.input?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<InputUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.input?.states,
      uiProp: props.ui?.states
    })

    if (props.disabled) {
      commonClasses.push(states.disabled)
    }

    return commonClasses
  }),
  appConfig?.ui?.input?.strategy || props.ui?.strategy
)

const isError = computed(() => props.error || slots['error-message'])

const uiClasses = computed(() => {
  const inputClasses = [theme.input?.base, appConfig.ui?.input?.input?.base, props.ui?.input?.base]

  const additionalInputClasses = [
    ...(props.inputTextAlign === 'right'
      ? [theme.input.textAlignRight, appConfig.ui?.input?.input?.textAlignRight, props.ui?.input?.textAlignRight]
      : []),

    ...(props.inputTextAlign === 'center'
      ? [theme.input.textAlignCenter, appConfig.ui?.input?.input?.textAlignCenter, props.ui?.input?.textAlignCenter]
      : []),

    ...(slots.left ? [theme.input.leftSlot, appConfig.ui?.input?.input?.leftSlot, props.ui?.input?.leftSlot] : []),

    ...(slots.right ? [theme.input.rightSlot, appConfig.ui?.input?.input?.rightSlot, props.ui?.input?.rightSlot] : []),

    ...(props.disabled ? [theme.input.disabled, appConfig.ui?.input?.input?.disabled, props.ui?.input?.disabled] : []),

    ...(isError.value ? [theme.input.invalid, appConfig.ui?.input?.input?.invalid, props.ui?.input?.invalid] : []),

    ...(props.recommendations?.length && isRecommendationsVisible.value
      ? [theme.input.recommendations, appConfig.ui?.input?.input?.recommendations, props.ui?.input?.recommendations]
      : [])
  ]

  return {
    label: mergeClasses(theme.label, appConfig.ui?.input?.label, props.ui?.label),
    input: mergeClasses([...inputClasses, ...additionalInputClasses]),
    container: mergeClasses(theme.container, appConfig.ui?.input?.container, props.ui?.container),
    slotLeft: mergeClasses(theme.leftSlot, appConfig.ui?.input?.leftSlot, props.ui?.leftSlot),
    slotRight: mergeClasses(theme.rightSlot, appConfig.ui?.input?.rightSlot, props.ui?.rightSlot),
    recommendationsContainer: mergeClasses(
      theme.recommendationsContainer,
      appConfig.ui?.input?.recommendationsContainer,
      props.ui?.recommendationsContainer
    ),
    recommendationsList: mergeClasses(
      theme.recommendationsList,
      appConfig.ui?.input?.recommendationsList,
      props.ui?.recommendationsList
    ),
    recommendationsListItem: mergeClasses(
      theme.recommendationsListItem,
      appConfig.ui?.input?.recommendationsListItem,
      props.ui?.recommendationsListItem
    ),
    error: {
      content: mergeClasses(theme.error.content, appConfig.ui?.input?.error?.content, props.ui?.error?.content),
      text: mergeClasses(theme.error.text, appConfig.ui?.input?.error?.text, props.ui?.error?.text)
    },
    description: mergeClasses(theme.description, appConfig.ui?.input?.description, props.ui?.description),
    tooltip: {
      base: mergeClasses(theme.tooltip?.base, appConfig.ui?.input?.tooltip?.base, props.ui?.tooltip?.base),
      activator: mergeClasses(
        theme.tooltip?.activator,
        appConfig.ui?.input?.tooltip?.activator,
        props.ui?.tooltip?.activator
      ),
      body: mergeClasses(theme.tooltip?.body, appConfig.ui?.input?.tooltip?.body, props.ui?.tooltip?.body),
      bodyVisible: mergeClasses(
        theme.tooltip?.bodyVisible,
        appConfig.ui?.input?.tooltip?.bodyVisible,
        props.ui?.tooltip?.bodyVisible
      )
    }
  }
})

const handleClick = () => {
  fieldRef.value?.focus()
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  isRecommendationsVisible.value = true

  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleRecommendationClick = (suggestion: string) => {
  emit('update:modelValue', suggestion)
  isRecommendationsVisible.value = false
}

const handleClickOutside = () => {
  isRecommendationsVisible.value = false
}

onMounted(() => {
  if (props.autofocus) {
    fieldRef.value?.focus()
  }
})
</script>

<template>
  <div v-click-outside="handleClickOutside" :class="className" v-bind="attributes">
    <label v-if="label" :for="elementId" :class="uiClasses.label">
      <slot name="label">{{ label }}</slot>
      <span v-if="required">*</span>
      <span v-if="subLabel">{{ subLabel }}</span>
    </label>
    <UiTooltip :ui="uiClasses.tooltip" :disabled="!isError" placement="bottom" trigger="always" :offset-value>
      <template #activator>
        <div :class="uiClasses.container" @click="handleClick">
          <div v-if="slots.left" :class="uiClasses.slotLeft">
            <slot name="left" />
          </div>
          <input
            v-bind="$attrs"
            :id="elementId"
            ref="input"
            v-mask="mask"
            :value="modelValue"
            :class="uiClasses.input"
            :placeholder
            :type
            :autofocus
            :disabled
            :min
            :max
            :required
            :data-test
            :pattern
            :step
            :maxlength
            :autocomplete
            :name
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            @change="handleChange"
            @keydown="handleKeydown"
          />
          <div v-if="recommendations?.length && isRecommendationsVisible" :class="uiClasses.recommendationsContainer">
            <ul :data-test="`${dataTest}-recommend-list`" :class="uiClasses.recommendationsList">
              <li
                v-for="recommendation in recommendations"
                :key="recommendation"
                :class="uiClasses.recommendationsListItem"
                @click.stop.capture="handleRecommendationClick(recommendation)"
              >
                <span>{{ recommendation }}</span>
              </li>
            </ul>
          </div>
          <div v-if="slots.right" :class="uiClasses.slotRight">
            <slot name="right" />
          </div>
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

<style scoped>
input::-webkit-credentials-auto-fill-button {
  position: absolute;
  right: 0;
  visibility: hidden;
  pointer-events: none;
}

input[type='password'] {
  letter-spacing: 0.5rem;
}

input[type='password']::placeholder {
  letter-spacing: normal;
}

input[type='date'] {
  min-width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
}
</style>
