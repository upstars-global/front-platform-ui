<script lang="ts">
import type { UiProp } from '../types'
import type { PopoverUi } from './theme'

export interface UiPopoverProps {
  offset?: number
  placement?: 'bottom' | 'bottom-end' | 'bottom-start'
  ui?: UiProp<PopoverUi>
}

export interface UiPopoverEmits {
  (event: 'update:open', value: boolean): void
}

export interface UiPopoverSlots {
  anchor(props: { isOpen: boolean; toggleHandler: () => void }): unknown
  content(props: { hideHandler: () => void }): unknown
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFloating, offset as floatingOffset } from '@floating-ui/vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

defineOptions({
  name: 'UiPopover',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiPopoverProps>(), {
  offset: 0,
  placement: 'bottom',
  ui: undefined
})
defineEmits<UiPopoverEmits>()
const slots = defineSlots<UiPopoverSlots>()

const isOpen = ref(false)
const reference = ref<HTMLDivElement | null>(null)
const floating = ref<HTMLDivElement | null>(null)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-popover',
  computed(() => [theme.base, appConfig?.ui?.popover?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.popover?.strategy || props.ui?.strategy
)

const placement = computed(() => props.placement)
const middleware = computed(() => [floatingOffset(props.offset)])

const { floatingStyles } = useFloating(reference, floating, {
  placement,
  middleware
})

const uiClasses = computed(() => ({
  anchor: mergeClasses(theme.anchor, appConfig?.ui?.popover?.anchor, props.ui?.anchor),
  content: mergeClasses(theme.content, appConfig?.ui?.popover?.content, props.ui?.content),
  wrapper: mergeClasses(theme.wrapper, appConfig?.ui?.popover?.wrapper, props.ui?.wrapper)
}))

const hideHandler = () => {
  if (isOpen.value) {
    isOpen.value = false
  }
}
const toggleHandler = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div v-click-outside="hideHandler" v-bind="attributes" :class="className" data-test="popover">
    <div
      v-if="slots.anchor"
      ref="reference"
      :class="uiClasses.anchor"
      data-test="popover-anchor"
      @click="toggleHandler"
    >
      <slot name="anchor" :is-open="isOpen" :toggle-handler="toggleHandler" />
    </div>
    <div
      v-if="slots.content && isOpen"
      ref="floating"
      :class="uiClasses.wrapper"
      :style="floatingStyles"
      data-test="popover-wrapper"
    >
      <div :class="uiClasses.content" data-test="popover-content">
        <transition-group name="popover-fade">
          <slot name="content" :hide-handler="hideHandler" />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.popover-fade-enter-active,
.popover-fade-leave-active {
  @apply transition-opacity duration-200 ease-out;
}

.popover-fade-enter-from,
.popover-fade-leave-to {
  @apply opacity-0;
}
</style>
