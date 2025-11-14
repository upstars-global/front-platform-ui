<script lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import type { ClassNameValue } from 'tailwind-merge'
import type { UiIconName } from '../icon/config'
import type { UiProp } from '../types'
import type { MenuUi } from './theme'

export interface UiMenuItem {
  routerName?: string
  label?: string
  iconName?: UiIconName
  isHidden?: boolean
  to?: RouteLocationRaw | string
  dataTest?: string
}

export interface UiMenuProps {
  items: UiMenuItem[]
  ui?: UiProp<MenuUi>
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'
import UiIcon from '../icon/UiIcon.vue'
import UiLink from '../link/UiLink.vue'

defineOptions({
  name: 'UiMenu',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiMenuProps>(), {
  ui: undefined
})

const router = useRouter()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-menu',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.menu?.base, props.ui?.base].filter(Boolean)

    return commonClasses
  }),
  appConfig?.ui?.menu?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  return {
    item: {
      base: mergeClasses(theme.item.base, appConfig?.ui?.menu?.item?.base, props.ui?.item?.base),
      active: mergeClasses(theme.item.active, appConfig?.ui?.menu?.item?.active, props.ui?.item?.active)
    }
  }
})

const getPath = (path?: RouteLocationRaw | string) => {
  if (!path) {
    return ''
  }
  if (typeof path === 'object') {
    return router.resolve(path).path
  }
  return path.startsWith('/') ? path : `/${path}`
}
const getItemPath = (item: UiMenuItem): RouteLocationRaw | string => {
  if (item.routerName) {
    return item.routerName.startsWith('#') ? { path: item.routerName } : { name: item.routerName }
  }

  if (item.to) {
    return getPath(item.to)
  }

  return ''
}
</script>

<template>
  <div v-bind="attributes" :class="className">
    <template v-for="(item, index) in items" :key="index">
      <UiLink
        v-if="!item.isHidden"
        :to="getItemPath(item)"
        :data-test="item.dataTest"
        :class="uiClasses.item.base"
        :active-class="uiClasses.item.active"
      >
        <UiIcon v-if="item.iconName" :name="item.iconName" class="mr-2" />
        {{ item.label }}
      </UiLink>
    </template>
  </div>
</template>
