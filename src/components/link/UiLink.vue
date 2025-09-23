<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { LinkUi } from './theme'

export interface UiLinkProps {
  to?: RouteLocationRaw
  activeClass?: ClassNameValue
  exactActiveClass?: ClassNameValue
  variant?: 'primary' | 'default'
  ui?: UiProp<LinkUi>
}

export interface UiLinkEmits {
  (event: 'click', value: MouseEvent): void
}
</script>

<script setup lang="ts">
import { computed, resolveComponent, useAttrs, type ConcreteComponent } from 'vue'
import { twMerge, twJoin } from 'tailwind-merge'
import { isExternalUrl } from '../../helpers/externalUrl'
import { prepareVariants } from '../../helpers/prepareClassNames'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

const VUE_ROUTER_LINK_TAG = 'RouterLink'

defineOptions({
  name: 'UiLink',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiLinkProps>(), {
  to: undefined,
  variant: 'default',
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
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.link?.base, props.ui?.base].filter(Boolean)

    const variants = prepareVariants<LinkUi['variants']>({
      theme: theme.variants,
      appConfig: appConfig?.ui?.link?.variants,
      uiProp: props.ui?.variants
    })

    commonClasses.push(variants[props.variant])

    return commonClasses
  }),
  appConfig?.ui?.link?.strategy || props.ui?.strategy
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
  const classList = [className.value, isActive ? props.activeClass : '', isExactActive ? props.exactActiveClass : '']
  if (props.ui?.strategy === 'merge') {
    return twMerge(classList)
  }

  return twJoin(classList)
}
</script>

<template>
  <component
    :is="component"
    v-if="isRouterLink"
    v-slot="{ href, isActive, isExactActive }"
    v-bind="computedProps"
    custom
  >
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
