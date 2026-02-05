<script lang="ts">
import type { IconSize } from '../icon/UiIcon.vue'
import type { UiIconName } from '../icon/config'
import type { TabUi } from './theme'

export interface UiTabProps {
  id: string
  label: string
  leadingIconName?: UiIconName
  leadingIconSize?: IconSize
  trailingIconName?: UiIconName
  trailingIconSize?: IconSize
  isActive?: boolean
  isDisabled?: boolean
  ui?: TabUi
}

interface UiTabEmits {
  (event: 'click', value: MouseEvent): void
}
interface UiTabSlots {
  default(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import UiIcon from '../icon/UiIcon.vue'

const props = withDefaults(defineProps<UiTabProps>(), {
  leadingIconName: undefined,
  leadingIconSize: undefined,
  trailingIconName: undefined,
  trailingIconSize: undefined,
  ui: () => ({ strategy: 'merge' })
})

const emit = defineEmits<UiTabEmits>()
defineSlots<UiTabSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-tab',
  computed(() => {
    const commonClasses = [props.ui?.base]

    if (props.isActive) {
      commonClasses.push(props.ui?.active)
    }

    if (props.isDisabled) {
      commonClasses.push(props.ui?.disabled)
    }

    return commonClasses.filter(Boolean)
  }),
  appConfig?.ui?.tabs?.strategy || props.ui?.strategy
)
</script>

<template>
  <div v-bind="attributes" :class="className" @click="emit('click', $event)">
    <UiIcon v-if="leadingIconName" :name="leadingIconName" :size="leadingIconSize" :class="ui?.leadingIcon" />
    <slot>
      <span>{{ label }}</span>
    </slot>
    <UiIcon v-if="trailingIconName" :name="trailingIconName" :size="trailingIconSize" :class="ui?.trailingIcon" />
  </div>
</template>
