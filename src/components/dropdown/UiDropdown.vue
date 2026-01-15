<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { DropdownUi } from './theme'

export interface UiDropdownProps {
  offset?: number
  placement?: 'bottom' | 'bottom-end' | 'bottom-start'
  ui?: UiProp<DropdownUi>
}

export interface UiDropdownSlots {
  activator(): unknown
  default(props: { hide: () => void }): unknown
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFloating, offset as floatingOffset } from '@floating-ui/vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiDropdown',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiDropdownProps>(), {
  offset: 0,
  placement: 'bottom-start',
  ui: undefined
})

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-dropdown',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig.ui?.dropdown?.base, props.ui?.base].filter(Boolean)

    return commonClasses
  }),
  appConfig.ui?.dropdown?.strategy || props.ui?.strategy
)

const isShowFilter = ref(false)
const reference = ref<HTMLDivElement | null>(null)
const floating = ref<HTMLDivElement | null>(null)

const placement = computed(() => props.placement)
const middleware = computed(() => [floatingOffset(props.offset)])

const { floatingStyles } = useFloating(reference, floating, {
  placement,
  middleware
})

const uiClasses = computed(() => {
  return {
    activator: mergeClasses(theme.activator, appConfig.ui?.dropdown?.activator, props.ui?.activator),
    content: mergeClasses(theme.content, appConfig.ui?.dropdown?.content, props.ui?.content)
  }
})

function hide() {
  isShowFilter.value = false
}
function show() {
  isShowFilter.value = true
}
</script>

<template>
  <div v-click-outside="hide" :class="className" data-test="dropdown" v-bind="attributes">
    <div ref="reference" :class="uiClasses.activator" @click="show">
      <slot name="activator" />
    </div>
    <div
      v-if="isShowFilter"
      ref="floating"
      :style="floatingStyles"
      :class="uiClasses.content"
      data-test="dropdown-content"
    >
      <slot :hide="hide" />
    </div>
  </div>
</template>
