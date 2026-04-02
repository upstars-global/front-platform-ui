<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiImageProps } from '../image/UiImage.vue'
import type { HeaderNavigationItem } from './components/HeaderNavigation.vue'
import type { HeaderUi } from './theme'

export interface UiHeaderProps {
  chatMessageCount?: number
  isMobileChatButton?: boolean
  logo?: UiImageProps
  logoRoute?: RouteLocationRaw
  navigation?: HeaderNavigationItem[]
  variant?: 'simple' | 'component-a' | 'component-b' | 'component-c' | 'component-d'
  ui?: UiProp<HeaderUi>
}

export interface UiHeaderEmits {
  (event: 'click:logo', value: MouseEvent): void
  (event: 'open:chat'): void
}

export interface UiHeaderSlots {
  top(): unknown
  ['chat-content'](): unknown
  content(): unknown
  bottom(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiImage from '../image/UiImage.vue'
import UiLink from '../link/UiLink.vue'
import UiPopover from '../popover/UiPopover.vue'
import ChatButton from './components/ChatButton.vue'
import HeaderNavigation from './components/HeaderNavigation.vue'
import theme from './theme'

defineOptions({
  name: 'UiHeader',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiHeaderProps>(), {
  chatMessageCount: 0,
  logo: undefined,
  logoRoute: undefined,
  navigation: undefined,
  variant: 'component-a',
  ui: undefined
})
const emit = defineEmits<UiHeaderEmits>()
const slots = defineSlots<UiHeaderSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-header',
  computed(() => [theme.base, appConfig?.ui?.header?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.header?.strategy || props.ui?.strategy
)

const isContent = computed(() => Boolean(props.navigation) || Boolean(slots.content))

const uiClasses = computed(() => {
  const container: ClassNameValue = [
    theme.container.base,
    appConfig?.ui?.header?.container?.base,
    props.ui?.container?.base
  ].filter(Boolean)
  const inner: ClassNameValue = [theme.inner.base, appConfig?.ui?.header?.inner?.base, props.ui?.inner?.base].filter(
    Boolean
  )

  const containerVariants = prepareVariants({
    theme: theme.container.variants,
    appConfig: appConfig?.ui?.header?.container?.variants,
    uiProp: props.ui?.container?.variants
  })

  const innerVariants = prepareVariants({
    theme: theme.inner.variants,
    appConfig: appConfig?.ui?.header?.inner?.variants,
    uiProp: props.ui?.inner?.variants
  })

  container.push(containerVariants[props.variant])
  inner.push(innerVariants[props.variant])

  const navigationItemStates: typeof theme.navigation.item.states = {
    active: '',
    background: '',
    special: ''
  }
  const itemStates = prepareVariants({
    theme: theme.navigation.item.states,
    appConfig: appConfig?.ui?.header?.navigation?.item?.states,
    uiProp: props.ui?.navigation?.item?.states
  })

  Object.entries(itemStates).forEach(([key, value]) => {
    navigationItemStates[key as keyof typeof theme.navigation.item.states] = mergeClasses(value)
  })

  return {
    chatButton: {
      base: mergeClasses(theme.chatButton.base, appConfig?.ui?.header?.chatButton?.base, props.ui?.chatButton?.base),
      badge: mergeClasses(
        theme.chatButton.badge,
        appConfig?.ui?.header?.chatButton?.badge,
        props.ui?.chatButton?.badge
      ),
      icon: mergeClasses(theme.chatButton.icon, appConfig?.ui?.header?.chatButton?.icon, props.ui?.chatButton?.icon)
    },
    content: mergeClasses(theme.content, appConfig?.ui?.header?.content, props.ui?.content),
    container: mergeClasses(container),
    inner: mergeClasses(inner),
    logo: mergeClasses(theme.logo, appConfig?.ui?.header?.logo, props.ui?.logo),
    navigation: {
      base: mergeClasses(theme.navigation.base, appConfig?.ui?.header?.navigation?.base, props.ui?.navigation?.base),
      container: mergeClasses(
        theme.navigation.container,
        appConfig?.ui?.header?.navigation?.container,
        props.ui?.navigation?.container
      ),
      hiddenContent: mergeClasses(
        theme.navigation.hiddenContent,
        appConfig?.ui?.header?.navigation?.hiddenContent,
        props.ui?.navigation?.hiddenContent
      ),
      hiddenLink: mergeClasses(
        theme.navigation.hiddenLink,
        appConfig?.ui?.header?.navigation?.hiddenLink,
        props.ui?.navigation?.hiddenLink
      ),
      item: {
        base: mergeClasses(
          theme.navigation.item.base,
          appConfig?.ui?.header?.navigation?.item?.base,
          props.ui?.navigation?.item?.base
        ),
        badge: mergeClasses(
          theme.navigation.item.badge,
          appConfig?.ui?.header?.navigation?.item?.badge,
          props.ui?.navigation?.item?.badge
        ),
        icon: mergeClasses(
          theme.navigation.item.icon,
          appConfig?.ui?.header?.navigation?.item?.icon,
          props.ui?.navigation?.item?.icon
        ),
        states: navigationItemStates
      }
    },
    wrapper: mergeClasses(theme.wrapper, appConfig?.ui?.header?.wrapper, props.ui?.wrapper)
  }
})
</script>

<template>
  <div v-bind="attributes" :class="className" data-test="header">
    <slot name="top" />
    <div :class="uiClasses.wrapper" data-test="header-wrapper">
      <div :class="uiClasses.inner" data-test="header-inner" style="max-width: var(--ui-header-max-width, 100vw)">
        <UiLink :class="uiClasses.logo" :to="logoRoute" data-test="header-logo" @click="emit('click:logo', $event)">
          <UiImage v-if="logo" v-bind="logo" class="w-full h-full" />
        </UiLink>
        <div v-if="isContent" :class="uiClasses.content" data-test="header-content">
          <HeaderNavigation v-if="navigation" :items="navigation" :ui="uiClasses.navigation" />
          <div v-if="slots.content" :class="uiClasses.container" data-test="header-container">
            <slot name="content" />
            <ChatButton
              v-if="isMobileChatButton"
              class="lg:hidden"
              :message-count="chatMessageCount"
              :ui="uiClasses.chatButton"
              @click="emit('open:chat')"
            />
            <UiPopover class="hidden lg:block" placement="bottom-end" :offset="12">
              <template #anchor>
                <ChatButton :message-count="chatMessageCount" :ui="uiClasses.chatButton" />
              </template>
              <template #content>
                <slot name="chat-content" />
              </template>
            </UiPopover>
          </div>
        </div>
      </div>
    </div>
    <slot name="bottom" />
  </div>
</template>
