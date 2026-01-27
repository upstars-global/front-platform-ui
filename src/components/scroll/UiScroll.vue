<script lang="ts">
import type {
  OverlayScrollbars,
  ScrollbarsAutoHideBehavior,
  ScrollbarsVisibilityBehavior,
  OverflowBehavior
} from 'overlayscrollbars'
import type { UiProp } from '../types'
import type { ScrollUi } from './theme'

export interface UiScrollProps {
  autoHide?: ScrollbarsAutoHideBehavior
  autoHideDelay?: number
  autoHideSuspend?: boolean
  visibility?: ScrollbarsVisibilityBehavior
  theme?: string | null
  dragScroll?: boolean
  clickScroll?: boolean
  pointers?: string[] | null
  overflowX?: OverflowBehavior
  overflowY?: OverflowBehavior
  showNativeOverlaidScrollbars?: boolean
  defer?: boolean
  bodyScrollLockIgnore?: boolean
  infiniteScroll?: boolean
  infiniteScrollMargin?: number
  ui?: UiProp<ScrollUi>
}

export interface UiScrollEmits {
  (event: 'scroll', instance: OverlayScrollbars): void
  (event: 'infiniteScroll'): void
}

export interface UiScrollSlots {
  default(): unknown
}
</script>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import 'overlayscrollbars/overlayscrollbars.css'

import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import scrollTheme from './theme'

defineOptions({
  name: 'UiScroll',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiScrollProps>(), {
  autoHide: 'leave',
  autoHideDelay: 300,
  autoHideSuspend: false,
  visibility: 'auto',
  theme: 'os-theme-dark',
  dragScroll: true,
  clickScroll: false,
  pointers: () => ['mouse', 'touch', 'pen'],
  overflowX: 'scroll',
  overflowY: 'scroll',
  showNativeOverlaidScrollbars: false,
  defer: true,
  bodyScrollLockIgnore: true,
  infiniteScroll: false,
  infiniteScrollMargin: 50,
  ui: () => ({ strategy: 'merge' })
})

const emit = defineEmits<UiScrollEmits>()
defineSlots<UiScrollSlots>()

const appConfig = useAppConfig()
const { attributes, className } = useComponentAttributes(
  'ui-scroll',
  computed(() => {
    return [scrollTheme.base, appConfig?.ui?.scroll?.base, props.ui?.base].filter(Boolean)
  }),
  appConfig?.ui?.scroll?.strategy || props.ui?.strategy
)

const scrollComponentRef = useTemplateRef<InstanceType<typeof OverlayScrollbarsComponent>>('scrollElement')

function infiniteScrollHandler() {
  if (!props.infiniteScroll) {
    return
  }

  const scrollComponent = scrollComponentRef.value
  if (!scrollComponent) {
    return
  }

  const viewport = scrollComponent.$el.querySelector('[data-overlayscrollbars-contents]') as HTMLDivElement | null
  if (!viewport) {
    return
  }

  const scrollPosition = viewport.scrollTop
  const scrollBottomPosition = viewport.scrollHeight - viewport.clientHeight
  const scrollDistanceToBottom = scrollBottomPosition - scrollPosition

  if (scrollDistanceToBottom < props.infiniteScrollMargin) {
    emit('infiniteScroll')
  }
}

function scrollHandler(instance: OverlayScrollbars) {
  emit('scroll', instance)
  infiniteScrollHandler()
}
</script>

<template>
  <OverlayScrollbarsComponent
    ref="scrollElement"
    :class="className"
    v-bind="attributes"
    :body-scroll-lock-ignore="bodyScrollLockIgnore || undefined"
    :options="{
      showNativeOverlaidScrollbars,
      overflow: {
        x: overflowX,
        y: overflowY
      },
      scrollbars: {
        theme,
        visibility,
        autoHide,
        autoHideDelay,
        autoHideSuspend,
        dragScroll,
        clickScroll,
        pointers
      }
    }"
    :defer="defer"
    @os-scroll="scrollHandler"
    @os-initialized="infiniteScrollHandler"
  >
    <slot />
  </OverlayScrollbarsComponent>
</template>
