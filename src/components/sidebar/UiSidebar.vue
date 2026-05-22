<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiIconName } from '../icon/config'
import type { IconSize } from '../icon/UiIcon.vue'
import type { SidebarNavigationItem } from './components/SidebarNavigation.vue'
import type { SidebarUi } from './theme'

export interface UiSidebarProps {
  navigation?: SidebarNavigationItem[]
  title?: string
  closeIconName?: UiIconName
  closeIconSize?: IconSize
  side?: 'left' | 'right'
  variant?: 'component-a' | 'component-b' | 'component-c' | 'component-d'
  ui?: UiProp<SidebarUi>
}

export interface UiSidebarEmits {
  (event: 'update:open', value: boolean): void
}

export interface UiSidebarSlots {
  header(): unknown
  title(): unknown
  content(): unknown
  default(): unknown
  footer(): unknown
  time(): unknown
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiIcon from '../icon/UiIcon.vue'
import UiScroll from '../scroll/UiScroll.vue'
import SidebarNavigation from './components/SidebarNavigation.vue'
import theme from './theme'

defineOptions({
  name: 'UiSidebar',
  inheritAttrs: false
})

const open = defineModel<boolean>('open', { default: false })

const props = withDefaults(defineProps<UiSidebarProps>(), {
  navigation: undefined,
  title: undefined,
  closeIconName: 'close',
  closeIconSize: '24',
  side: 'right',
  variant: 'component-a',
  ui: undefined
})

defineEmits<UiSidebarEmits>()
const slots = defineSlots<UiSidebarSlots>()

const sidebarRef = ref<HTMLElement | null>(null)

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-sidebar',
  computed(() => [theme.base, appConfig?.ui?.sidebar?.base, props.ui?.base].filter(Boolean)),
  props.ui?.strategy || appConfig?.ui?.sidebar?.strategy
)

const uiClasses = computed(() => {
  const container: ClassNameValue = [
    theme.container.base,
    appConfig?.ui?.sidebar?.container?.base,
    props.ui?.container?.base
  ].filter(Boolean)

  const containerSide = prepareVariants({
    theme: theme.container.side,
    appConfig: appConfig?.ui?.sidebar?.container?.side,
    uiProp: props.ui?.container?.side
  })

  container.push(containerSide[props.side])

  const content: ClassNameValue = [theme.content.base, appConfig?.ui?.sidebar?.content?.base, props.ui?.content?.base]
  const contentVariants = prepareVariants({
    theme: theme.content.variants,
    appConfig: appConfig?.ui?.sidebar?.content?.variants,
    uiProp: props.ui?.content?.variants
  })

  content.push(contentVariants[props.variant])

  const navigation: ClassNameValue = [
    theme.navigation.base,
    appConfig?.ui?.sidebar?.navigation?.base,
    props.ui?.navigation?.base
  ].filter(Boolean)

  const navigationItemStates: typeof theme.navigation.item.states = {
    active: '',
    background: '',
    special: ''
  }

  const itemStates = prepareVariants({
    theme: theme.navigation.item.states,
    appConfig: appConfig?.ui?.sidebar?.navigation?.item?.states,
    uiProp: props.ui?.navigation?.item?.states
  })

  const navigationVariants = prepareVariants({
    theme: theme.navigation.variants,
    appConfig: appConfig?.ui?.sidebar?.navigation?.variants,
    uiProp: props.ui?.navigation?.variants
  })

  navigation.push(navigationVariants[props.variant])

  Object.entries(itemStates).forEach(([key, value]) => {
    navigationItemStates[key as keyof typeof theme.navigation.item.states] = mergeClasses(value)
  })

  const navigationItem: ClassNameValue = [
    theme.navigation.item.base,
    appConfig?.ui?.sidebar?.navigation?.item?.base,
    props.ui?.navigation?.item?.base
  ].filter(Boolean)

  const navigationItemVariants = prepareVariants({
    theme: theme.navigation.item.variants,
    appConfig: appConfig?.ui?.sidebar?.navigation?.item?.variants,
    uiProp: props.ui?.navigation?.item?.variants
  })

  navigationItem.push(navigationItemVariants[props.variant])

  if (props.side === 'left') {
    container.push(!open.value ? '-translate-x-full' : 'translate-x-0')
  }
  if (props.side === 'right') {
    container.push(!open.value ? 'translate-x-0' : '-translate-x-full')
  }

  return {
    container: mergeClasses(container),
    content: mergeClasses(content),
    header: mergeClasses(theme.header, appConfig?.ui?.sidebar?.header, props.ui?.header),
    title: mergeClasses(theme.title, appConfig?.ui?.sidebar?.title, props.ui?.title),
    closeIcon: mergeClasses(theme.closeIcon, appConfig?.ui?.sidebar?.closeIcon, props.ui?.closeIcon),
    timeSlot: mergeClasses(theme.timeSlot, appConfig?.ui?.sidebar?.timeSlot, props.ui?.timeSlot),
    overlay: mergeClasses(theme.overlay, appConfig?.ui?.sidebar?.overlay, props.ui?.overlay),
    navigation: {
      base: mergeClasses(navigation),
      item: {
        base: mergeClasses(navigationItem),
        icon: mergeClasses(
          theme.navigation.item.icon,
          appConfig?.ui?.sidebar?.navigation?.item?.icon,
          props.ui?.navigation?.item?.icon
        ),
        label: mergeClasses(
          theme.navigation.item.label,
          appConfig?.ui?.sidebar?.navigation?.item?.label,
          props.ui?.navigation?.item?.label
        ),
        badge: mergeClasses(
          theme.navigation.item.badge,
          appConfig?.ui?.sidebar?.navigation?.item?.badge,
          props.ui?.navigation?.item?.badge
        ),
        image: mergeClasses(
          theme.navigation.item.image,
          appConfig?.ui?.sidebar?.navigation?.item?.image,
          props.ui?.navigation?.item?.image
        ),
        states: navigationItemStates
      }
    }
  }
})

useBodyScrollLock(sidebarRef, open)

const closeSidebar = () => {
  open.value = false
}
</script>

<template>
  <div v-bind="attributes" :class="className">
    <div :class="uiClasses.overlay" />
    <div
      ref="sidebarRef"
      v-click-outside="closeSidebar"
      v-touch:swipe.stop="closeSidebar"
      data-test="sidebar"
      :class="uiClasses.container"
    >
      <div :class="uiClasses.header" data-test="sidebar-header">
        <slot name="header">
          <div v-if="props.title || Boolean(slots.title)" :class="uiClasses.title">
            <slot name="title">{{ title }}</slot>
          </div>
          <UiIcon :class="uiClasses.closeIcon" :name="closeIconName" :size="closeIconSize" @click="closeSidebar" />
        </slot>
      </div>
      <UiScroll :class="uiClasses.content" data-test="sidebar-content">
        <slot name="content" />
        <div>
          <slot />
          <!-- @vue-expect-error incorrect types -->
          <SidebarNavigation v-if="navigation" :items="navigation" :ui="uiClasses.navigation" />
        </div>
        <slot name="footer" />
      </UiScroll>
      <div :class="uiClasses.timeSlot">
        <slot name="time" />
      </div>
    </div>
  </div>
</template>
