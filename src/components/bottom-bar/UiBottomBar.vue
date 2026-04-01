<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { UiIconName } from '../icon/config'
import type { BottomBarUi } from './theme'

interface BottomBarNavigationItem {
  id: string
  label: string
  icon: UiIconName
  dataTest: string
  to?: RouteLocationRaw
  counter?: number
  isHidden?: boolean
}

export interface UiBottomBarProps {
  labels: {
    signIn: string
    signUp: string
    cashbox: string
    sidebar: string
  }
  navigation: BottomBarNavigationItem[]
  variant?: 'component-a' | 'component-b' | 'component-c' | 'component-d'
  isLockAuthButtons?: boolean
  notificationCounter?: number
  isLoggedIn?: boolean
  ui?: UiProp<BottomBarUi>
}

export interface UiBottomBarEmits {
  (event: 'click:sign-in'): void
  (event: 'click:sign-up'): void
  (event: 'open:sidebar'): void
  (event: 'open:cashbox'): void
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import UiBadge from '../badge/UiBadge.vue'
import UiButton from '../button/UiButton.vue'
import UiIcon from '../icon/UiIcon.vue'
import UiLink from '../link/UiLink.vue'
import theme from './theme'

defineOptions({
  name: 'UiBottomBar',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiBottomBarProps>(), {
  variant: 'component-a',
  notificationCounter: 0,
  ui: () => ({ strategy: 'merge' })
})
const emit = defineEmits<UiBottomBarEmits>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-bottom-bar',
  computed(() => {
    const baseClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.bottomBar?.base, props.ui?.base].filter(Boolean)
    const variants = prepareVariants({
      theme: theme.variants,
      appConfig: appConfig?.ui?.bottomBar?.variants,
      uiProp: props.ui?.variants
    })
    baseClasses.push(variants[props.variant])

    return baseClasses
  }),
  appConfig?.ui?.bottomBar?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  const action: ClassNameValue[] = [
    theme.action.base,
    appConfig?.ui?.bottomBar?.action?.base,
    props.ui?.action?.base
  ].filter(Boolean)
  const itemLabel: ClassNameValue[] = [
    theme.item.label,
    appConfig?.ui?.bottomBar?.item?.label,
    props.ui?.item?.label
  ].filter(Boolean)
  const navigation: ClassNameValue[] = [
    theme.navigation.base,
    appConfig?.ui?.bottomBar?.navigation?.base,
    props.ui?.navigation?.base
  ].filter(Boolean)

  const actionVariants = prepareVariants({
    theme: theme.action.variants,
    appConfig: appConfig?.ui?.bottomBar?.action?.variants,
    uiProp: props.ui?.action?.variants
  })
  const actionIconVariants = prepareVariants({
    theme: theme.action.icon,
    appConfig: appConfig?.ui?.bottomBar?.action?.icon,
    uiProp: props.ui?.action?.icon
  })
  const actionLabelVariants = prepareVariants({
    theme: theme.action.label,
    appConfig: appConfig?.ui?.bottomBar?.action?.label,
    uiProp: props.ui?.action?.label
  })
  const itemStates = prepareVariants({
    theme: theme.item.states,
    appConfig: appConfig?.ui?.bottomBar?.item?.states,
    uiProp: props.ui?.item?.states
  })
  const itemLabelVariants = prepareVariants({
    theme: theme.item.labelVariants,
    appConfig: appConfig?.ui?.bottomBar?.item?.labelVariants,
    uiProp: props.ui?.item?.labelVariants
  })
  const navigationStates = prepareVariants({
    theme: theme.navigation.states.loggedIn,
    appConfig: appConfig?.ui?.bottomBar?.navigation?.states?.loggedIn,
    uiProp: props.ui?.navigation?.states?.loggedIn
  })
  const navigationVariants = prepareVariants({
    theme: theme.navigation.variants,
    appConfig: appConfig?.ui?.bottomBar?.navigation?.variants,
    uiProp: props.ui?.navigation?.variants
  })

  action.push(actionVariants[props.variant])
  itemLabel.push(itemLabelVariants[props.variant])
  navigation.push(navigationVariants[props.variant])

  if (props.isLoggedIn) {
    navigation.push(navigationStates[props.variant])
  }

  return {
    container: mergeClasses(theme.container, appConfig?.ui?.bottomBar?.container, props.ui?.container),
    buttonGroup: mergeClasses(theme.buttonGroup, appConfig?.ui?.bottomBar?.buttonGroup, props.ui?.buttonGroup),
    action: {
      base: mergeClasses(action),
      icon: mergeClasses(actionIconVariants[props.variant]),
      label: mergeClasses(actionLabelVariants[props.variant])
    },
    item: {
      base: mergeClasses(theme.item.base, appConfig?.ui?.bottomBar?.item?.base, props.ui?.item?.base),
      active: mergeClasses(itemStates.active),
      label: mergeClasses(itemLabel),
      badge: mergeClasses(theme.item.badge, appConfig?.ui?.bottomBar?.item?.badge, props.ui?.item?.badge),
      icon: mergeClasses(theme.item.icon, appConfig?.ui?.bottomBar?.item?.icon, props.ui?.item?.icon),
      wrapper: mergeClasses(theme.item.wrapper, appConfig?.ui?.bottomBar?.item?.wrapper, props.ui?.item?.wrapper)
    },
    navigation: mergeClasses(navigation)
  }
})
</script>

<template>
  <div :class="className" v-bind="attributes" data-test="bottom-bar">
    <slot />
    <div
      v-if="!isLoggedIn && variant === 'component-a'"
      :class="uiClasses.buttonGroup"
      data-test="bottom-bar-button-group"
    >
      <UiButton
        :class="uiClasses.action.base"
        :ui="{ strategy: 'merge' }"
        :disabled="isLockAuthButtons"
        variant="secondary"
        data-test="bottom-bar-open-sign-in"
        @click="emit('click:sign-in')"
      >
        <span :class="uiClasses.action.label">{{ labels.signIn }}</span>
      </UiButton>
      <UiButton
        :class="uiClasses.action.base"
        :ui="{ strategy: 'merge' }"
        :disabled="isLockAuthButtons"
        data-test="bottom-bar-open-sign-up"
        @click="emit('click:sign-up')"
      >
        <span :class="uiClasses.action.label">{{ labels.signUp }}</span>
      </UiButton>
    </div>
    <div :class="uiClasses.container" data-test="bottom-bar-container">
      <UiButton
        v-if="!isLoggedIn && variant === 'component-c'"
        :class="uiClasses.action.base"
        :disabled="isLockAuthButtons"
        :ui="{ strategy: 'merge' }"
        data-test="bottom-bar-open-sign-up"
        @click="emit('click:sign-up')"
      >
        <span :class="uiClasses.action.label">{{ labels.signUp }}</span>
      </UiButton>
      <UiButton
        v-show="isLoggedIn"
        :class="uiClasses.action.base"
        :ui="{ strategy: 'merge' }"
        data-test="bottom-bar-open-cashbox"
        @click="emit('open:cashbox')"
      >
        <UiIcon :class="uiClasses.action.icon" name="plus" />
        <span :class="uiClasses.action.label">{{ labels.cashbox }}</span>
      </UiButton>
      <div :class="uiClasses.navigation" data-test="bottom-bar-navigation">
        <template v-for="item in navigation" :key="item.id">
          <UiLink
            v-if="!item.isHidden"
            :class="uiClasses.item.base"
            :active-class="uiClasses.item.active"
            :to="item.to"
            :data-test="item.dataTest"
          >
            <div :class="uiClasses.item.wrapper">
              <UiIcon :class="uiClasses.item.icon" :name="item.icon" />
              <span :class="uiClasses.item.label">{{ item.label }}</span>
              <UiBadge v-if="item.counter" :class="uiClasses.item.badge" size="default" variant="counter">
                {{ item.counter }}
              </UiBadge>
            </div>
          </UiLink>
        </template>
        <UiLink :class="uiClasses.item.base" data-test="bottom-bar-open-sidebar" @click="emit('open:sidebar')">
          <div :class="uiClasses.item.wrapper">
            <UiIcon :class="uiClasses.item.icon" name="more" />
            <span :class="uiClasses.item.label">{{ labels.sidebar }}</span>
            <UiBadge v-if="notificationCounter" :class="uiClasses.item.badge" size="default" variant="counter">
              {{ notificationCounter }}
            </UiBadge>
          </div>
        </UiLink>
      </div>
    </div>
  </div>
</template>
