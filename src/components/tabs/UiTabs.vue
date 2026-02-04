<script lang="ts">
import type { UiProp, Strategy } from '../types'
import type { TabUi, TabsUi } from '../tabs/theme'
import type { UiTabProps } from './UiTab.vue'

export interface UiTabsProps {
  id: string
  items: UiTabProps[]
  ui?: UiProp<TabsUi>
}
export interface UiTabsEmits {
  (event: 'update:activeTab', value: UiTabProps['id']): void
}
export interface UiTabsSlots {
  item(props: { item: UiTabProps; ui: TabUi }): unknown
  content(props: { item: UiTabProps }): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import UiTab from './UiTab.vue'
import theme from './theme'

defineOptions({
  name: 'UiTabs',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiTabsProps>(), {
  ui: undefined
})

const emit = defineEmits<UiTabsEmits>()
defineSlots<UiTabsSlots>()

const modelValue = defineModel<UiTabProps['id']>('activeTab', { required: true })

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-tabs',
  computed(() => {
    return [theme.base, appConfig?.ui?.tabs?.base, props.ui?.base].filter(Boolean)
  }),
  appConfig?.ui?.tabs?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    container: mergeClasses(theme.container, appConfig.ui?.tabs?.container, props.ui?.container),
    content: mergeClasses(theme.content, appConfig.ui?.tabs?.content, props.ui?.content),
    item: {
      strategy: 'merge' as Strategy,
      base: mergeClasses(theme.item.base, appConfig.ui?.tabs?.item?.base, props.ui?.item?.base),
      active: mergeClasses(theme.item.active, appConfig.ui?.tabs?.item?.active, props.ui?.item?.active),
      disabled: mergeClasses(theme.item.disabled, appConfig.ui?.tabs?.item?.disabled, props.ui?.item?.disabled),
      leadingIcon: mergeClasses(
        theme.item.leadingIcon,
        appConfig.ui?.tabs?.item?.leadingIcon,
        props.ui?.item?.leadingIcon
      ),
      trailingIcon: mergeClasses(
        theme.item.trailingIcon,
        appConfig.ui?.tabs?.item?.trailingIcon,
        props.ui?.item?.trailingIcon
      )
    }
  }
})

function setDataTestAttribute(id: UiTabProps['id'], type: 'tab' | 'content' = 'tab') {
  const attributes = []
  attributes.push(`${props.id}__${type}-${id}`)
  if (modelValue.value === id) {
    attributes.push(`${props.id}__${type}-${id}--active`)
  }

  return attributes.join(' ')
}

function handleClick(item: UiTabProps) {
  if (item.isDisabled) {
    return
  }
  emit('update:activeTab', item.id)
}
</script>

<template>
  <div v-bind="attributes" :class="className">
    <div :class="uiClasses.container">
      <template v-for="item in items" :key="`tab-${item.id}`">
        <slot name="item" :item="item" :ui="uiClasses.item">
          <UiTab
            v-bind="item"
            :is-active="modelValue === item.id"
            :ui="uiClasses.item"
            :data-test="setDataTestAttribute(item.id)"
            @click="() => handleClick(item)"
          />
        </slot>
      </template>
    </div>
    <template v-for="item in items" :key="`content-${item.id}`">
      <div
        v-if="$slots['content']"
        v-show="modelValue === item.id"
        :class="uiClasses.content"
        :data-test="setDataTestAttribute(item, 'content')"
      >
        <slot name="content" :item="item" />
      </div>
    </template>
  </div>
</template>
