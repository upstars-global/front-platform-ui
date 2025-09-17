<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ClassNameValue } from 'tailwind-merge'
import type { DeepPartial } from '../types'
import type { LinkUi } from './theme'

export interface UiLinkProps {
  to?: RouteLocationRaw
  activeClass?: string
  exactActiveClass?: string
  variant?: 'primary' | 'unstyled'
  ui?: DeepPartial<LinkUi>
}

export interface UiLinkEmits {
  (event: 'click', value: MouseEvent): void
}
</script>

<script setup lang="ts">
import { computed, resolveComponent, useAttrs, type ConcreteComponent } from 'vue'
import { twMerge } from 'tailwind-merge'
import { isExternalUrl } from '../../helpers/externalUrl'
import { useAppConfig } from '../../composables/useAppConfig.ts'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

const VUE_ROUTER_LINK_TAG = 'RouterLink'

defineOptions({
  name: 'UiLink',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiLinkProps>(), {
  to: undefined,
  variant: 'unstyled',
  activeClass: undefined,
  exactActiveClass: undefined,
  ui: undefined
})

const attrs = useAttrs()

defineEmits<UiLinkEmits>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-link',
  computed(() => {
    const baseClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.link?.base, props.ui?.base]

    if (props.variant === 'primary') {
      baseClasses.push([theme.variants.primary, appConfig?.ui?.link?.variants?.primary, props.ui?.variants?.primary])
    }

    return baseClasses
  })
)

const isBelongsToCurrentDomain = computed(() => {
  if (typeof window !== 'undefined') {
    const currentDomain = location.hostname
    const regex = new RegExp(`^(http|https)://${currentDomain.replace('.', '\\.')}.*$`)

    return typeof props.to === 'string' && regex.test(props.to)
  }

  return false
})
const isExternal = computed(() => {
  if (isBelongsToCurrentDomain.value) {
    return false
  }

  return typeof props.to === 'string' && isExternalUrl(props.to)
})
const isSpecialLink = computed(() => {
  if (typeof props.to !== 'string') {
    return false
  }

  return /tel:/.test(props.to) || /mailto:/.test(props.to) || props.to.startsWith('#')
})
const isNativeLinkTag = computed(() => isExternal.value || isBelongsToCurrentDomain.value || isSpecialLink.value)

const targetAttribute = computed(() => (isExternal.value ? '_blank' : (attrs.target as string | undefined)))
const relAttribute = computed(() => {
  if (!targetAttribute.value?.includes('_blank') || (targetAttribute.value?.includes('_blank') && !isExternal.value)) {
    return (attrs.rel as string) || undefined
  }

  return `${attrs.rel || ''} noreferrer noopener`.trim()
})

const url = computed(() => {
  if (!props.to) {
    return undefined
  }

  if (isNativeLinkTag.value) {
    return { href: props.to }
  }

  return { to: props.to }
})
const component = computed(() => {
  if (!props.to) {
    return 'span'
  }

  return isNativeLinkTag.value ? 'a' : resolveComponent(VUE_ROUTER_LINK_TAG)
})
const isRouterLink = computed(() => {
  return (component.value as ConcreteComponent).name === VUE_ROUTER_LINK_TAG
})
const computedProps = computed(() => {
  if (component.value === 'span') {
    return {
      ...attributes.value
    }
  }

  return {
    ...attributes.value,
    ...url.value
  }
})
function getClassName(isActive: boolean, isExactActive: boolean) {
  return twMerge(className.value, isActive ? props.activeClass : '', isExactActive ? props.exactActiveClass : '')
}
</script>

<template>
  <component :is="component" v-if="isRouterLink" v-slot="{ href, isActive, isExactActive }" :to="url" custom>
    <a
      :href="href"
      v-bind="attributes"
      :class="getClassName(isActive, isExactActive)"
      :target="targetAttribute"
      :rel="relAttribute"
      @click="$emit('click', $event)"
    >
      <slot />
    </a>
  </component>
  <component
    :is="component"
    v-else
    :class="className"
    v-bind="computedProps"
    :target="targetAttribute"
    :rel="relAttribute"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>
