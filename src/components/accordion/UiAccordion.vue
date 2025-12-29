<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiIconName } from '../icon/config'
import type { IconSize } from '../icon/UiIcon.vue'
import type { AccordionUi } from './theme'

export interface UiAccordionProps {
  isOpen?: boolean
  isCustomToggle?: boolean
  trailingIconName?: UiIconName
  trailingIconSize?: IconSize
  ui?: UiProp<AccordionUi>
}
export interface UiAccordionSlots {
  activator(props: { toggleHandler: () => void; showContent: boolean }): unknown
  default(props: { toggleHandler: () => void }): unknown
  trailing(): unknown
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'
import UiIcon from '../icon/UiIcon.vue'

defineOptions({
  name: 'UiAccordion',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiAccordionProps>(), {
  trailingIconName: 'dropdownDown',
  trailingIconSize: undefined,
  ui: undefined
})
defineSlots<UiAccordionSlots>()

const showContent = ref(props.isOpen)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-accordion',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.accordion?.base, props.ui?.base].filter(Boolean)

    return commonClasses
  }),
  appConfig?.ui?.accordion?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    item: mergeClasses(theme.item, appConfig.ui?.accordion?.item, props.ui?.item),
    content: mergeClasses(theme.content, appConfig.ui?.accordion?.content, props.ui?.content),
    trailingIcon: mergeClasses(theme.trailingIcon, appConfig.ui?.accordion?.trailingIcon, props.ui?.trailingIcon)
  }
})

const toggleHandler = () => {
  showContent.value = !showContent.value
}
</script>

<template>
  <div :class="className" v-bind="attributes" data-test="accordion-menu">
    <div :class="uiClasses.item" data-test="accordion-menu-title" @click="!isCustomToggle ? toggleHandler() : null">
      <slot name="activator" :toggle-handler="toggleHandler" :show-content="showContent" />
      <slot name="trailing">
        <UiIcon
          :name="trailingIconName"
          :size="trailingIconSize"
          :class="[uiClasses.trailingIcon, { 'rotate-180': showContent }]"
          data-test="accordion-menu-arrow"
        />
      </slot>
    </div>
    <transition-group tag="div" name="accordion" data-test="accordion-menu-content" :class="uiClasses.content">
      <template v-if="showContent">
        <slot :toggle-handler="toggleHandler" />
      </template>
    </transition-group>
  </div>
</template>

<style lang="postcss">
.accordion-enter-active,
.accordion-leave-active {
  @apply transition duration-200 ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  @apply -translate-y-full opacity-0;
}
</style>
