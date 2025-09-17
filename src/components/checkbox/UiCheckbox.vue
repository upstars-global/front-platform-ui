<script setup lang="ts">
import type { FormElementProps } from '../types.ts'
import { ref } from 'vue'
import type { UiIconName } from '../icon/config'
import UiIcon from '../icon/UiIcon.vue'

const model = defineModel<boolean>('modelValue', {
  required: true
})

interface CheckboxProps extends FormElementProps {
  icon?: UiIconName
  requiredMessage?: string
  error?: string
}

type CheckboxEmits = {
  (event: 'update:modelValue', value: boolean): void
}

defineProps<CheckboxProps>()
defineEmits<CheckboxEmits>()

const isChecked = ref(model.value)
const handleChange = (event: Event) => {
  isChecked.value = (event.target as HTMLInputElement).checked
}
</script>

<template>
  <label
    class="ui-checkbox relative flex flex-col max-w-max select-none"
    :class="{
      'is-checked': isChecked,
      'cursor-pointer': !disabled,
      'is-disabled cursor-not-allowed': disabled,
      'is-invalid': !isChecked && error,
      'is-required': required
    }"
  >
    <input
      v-model="model"
      class="absolute top-0 left-0 opacity-0"
      type="checkbox"
      :name="name"
      :form="form"
      :disabled="disabled"
      :required="required"
      @change="handleChange"
    />
    <span class="ui-checkbox__inner flex items-center">
      <slot name="checkmark">
        <div
          class="ui-checkbox__checkmark w-5 h-5 self-baseline shrink-0 relative after:absolute after:w-6 after:h-6 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
        >
          <UiIcon v-show="isChecked" :name="icon || 'check'" size="full" />
        </div>
      </slot>
      <slot name="label">
        <span>{{ label }}</span>
      </slot>
    </span>
    <slot name="error-message">
      <span v-if="!isChecked && error" class="ui-checkbox__error-message flex">
        <UiIcon name="exclamationTriangle" size="16" />
        {{ error }}
      </span>
    </slot>
    <slot v-if="required" name="required-message">
      <span class="ui-checkbox__required-message flex">
        <UiIcon name="exclamationCircle" size="16" />
        {{ requiredMessage }}
      </span>
    </slot>
  </label>
</template>
