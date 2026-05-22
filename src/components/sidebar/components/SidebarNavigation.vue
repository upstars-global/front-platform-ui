<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { UiIconName } from '../../icon/config'
import type { UiImageProps } from '../../image/UiImage.vue'
import type { SidebarNavigationUi } from '../theme'

export interface SidebarNavigationItem {
  title: string
  icon: UiIconName
  image?: UiImageProps
  route: RouteLocationRaw
  hide?: boolean
  dataTest?: string
  visibleOnlyOnXs?: boolean
  theme?: 'special'
  hasBackground?: boolean
  badge?: {
    label: string
    theme: string
  }
}

interface SidebarNavigationProps {
  items: SidebarNavigationItem[]
  ui?: SidebarNavigationUi
}
</script>

<script setup lang="ts">
import UiBadge from '../../badge/UiBadge.vue'
import UiIcon from '../../icon/UiIcon.vue'
import UiImage from '../../image/UiImage.vue'
import UiLink from '../../link/UiLink.vue'

withDefaults(defineProps<SidebarNavigationProps>(), {
  ui: undefined
})
</script>

<template>
  <div :class="ui?.base" data-test="sidebar-navigation">
    <template v-for="(item, index) in items" :key="`sidebar-nav-item -${index}`">
      <UiLink
        v-if="!item.hide"
        :to="item.route"
        :class="[
          ui?.item.base,
          item.theme === 'special' ? ui?.item?.states?.special : '',
          item.hasBackground ? ui?.item?.states?.background : ''
        ]"
        :active-class="ui?.item?.states?.active"
        :data-test="item.dataTest"
      >
        <UiIcon :name="item.icon" :class="ui?.item.icon" />
        <div :class="ui?.item.label">
          <span>{{ item.title }}</span>
          <UiBadge v-if="item.badge" :class="[item.badge.theme, ui?.item.badge]" size="sm">
            {{ item.badge.label }}
          </UiBadge>
        </div>
        <UiImage v-if="item.image" v-bind="item.image" :class="ui?.item.image" />
      </UiLink>
    </template>
  </div>
</template>
