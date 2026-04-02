<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { UiBadgeProps } from '../../badge/UiBadge.vue'
import type { UiIconsNavigation } from '../../icon/config'
import type { HeaderNavigationUi } from '../theme'

export interface HeaderNavigationItem {
  id: string
  title?: string
  isHidden?: boolean
  isSpecial?: boolean
  icon?: UiIconsNavigation
  route?: RouteLocationRaw
  dataTest?: string
  hasActiveStyles?: boolean
  hasBackground?: boolean
  badge?: UiBadgeProps & {
    label?: string
  }
}

interface HeaderNavigationProps {
  items: HeaderNavigationItem[]
  ui?: HeaderNavigationUi
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import UiBadge from '../../badge/UiBadge.vue'
import UiIcon from '../../icon/UiIcon.vue'
import UiLink from '../../link/UiLink.vue'
import UiPopover from '../../popover/UiPopover.vue'

const props = withDefaults(defineProps<HeaderNavigationProps>(), {
  ui: undefined
})

let observer: IntersectionObserver | null = null
const navigationContainer = ref<HTMLElement | null>(null)
const hiddenItems = ref<string[]>([])

const hiddenLinks = computed(() => props.items.filter((item) => hiddenItems.value.includes(item.id)))

const itemClasses = (item: HeaderNavigationItem) => {
  return {
    [`nav-item-${item.id}`]: true,
    'invisible order-last': hiddenItems.value.includes(item.id),
    'px-2': item.hasBackground
  }
}

const setObserver = () => {
  if (!navigationContainer.value) {
    return
  }
  const options = {
    root: navigationContainer.value,
    rootMargin: '0px -24px 0px 0px',
    threshold: 1
  }

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const entriesKey = entry.target.getAttribute('data-key-item')

      if (!entry.isIntersecting) {
        hiddenItems.value.push(entriesKey || '')
      } else {
        hiddenItems.value = hiddenItems.value.filter((id) => id !== entriesKey)
      }
    })
  }

  observer = new IntersectionObserver(callback, options)

  // Only observe visible nav items
  const visibleNavItems = props.items.filter((item) => !item.isHidden)

  visibleNavItems.forEach(({ id }) => {
    const element = document.querySelector(`.nav-item-${id}`)

    if (element) {
      element.setAttribute('data-key-item', id)
      observer?.observe(element)
    }
  })
}

const disconnectObserver = () => {
  observer?.disconnect()
  observer = null
}

watch(
  () => props.items,
  () => {
    hiddenItems.value = []
    disconnectObserver()
    setObserver()
  }
)

onMounted(setObserver)
onBeforeUnmount(disconnectObserver)
</script>

<template>
  <div :class="ui?.base" data-test="navigation">
    <div ref="navigationContainer" :class="ui?.container">
      <template v-for="item in items" :key="item.id">
        <UiLink
          v-if="!item.isHidden"
          :key="item.id"
          :class="[
            ui?.item?.base,
            itemClasses(item),
            item.isSpecial ? ui?.item?.states?.special : '',
            item.hasBackground ? ui?.item?.states?.background : ''
          ]"
          :to="item.route"
          :active-class="item.hasActiveStyles ? ui?.item?.states?.active : ''"
          :data-test="item?.dataTest"
        >
          <UiIcon v-if="item.icon" :class="ui?.item?.icon" :name="item.icon" size="16" />
          <span>{{ item.title }}</span>
          <UiBadge v-if="item.badge" :class="ui?.item?.badge" v-bind="item.badge">
            {{ item.badge.label }}
          </UiBadge>
        </UiLink>
      </template>

      <UiPopover v-if="hiddenLinks.length" :ui="{ anchor: ui?.item?.base, content: ui?.hiddenContent }">
        <template #anchor>
          <UiLink data-test="navigation-more-button">
            <UiIcon name="more" />
          </UiLink>
        </template>
        <template #content>
          <template v-for="link in hiddenLinks" :key="link.id">
            <UiLink
              v-if="!link.isHidden"
              :key="link.id"
              :class="[ui?.item?.base, ui?.hiddenLink]"
              :to="link.route"
              :data-test="link?.dataTest"
            >
              {{ link.title }}
            </UiLink>
          </template>
        </template>
      </UiPopover>
    </div>
  </div>
</template>
