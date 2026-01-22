<script lang="ts">
import type { UiProp } from '../types'
import type { ModalUi } from './theme'
import type { ClassNameValue } from 'tailwind-merge'
import type { OverlayScrollbars } from 'overlayscrollbars'

type ModalRole = 'dialog' | 'alertdialog'

export interface UiModalProps {
  title?: string
  description?: string
  showCloseButton?: boolean
  fullscreen?: boolean
  role?: ModalRole
  isLoaded?: boolean
  isCustomScroll?: boolean
  infiniteScroll?: boolean
  infiniteScrollMargin?: number
  ui?: UiProp<ModalUi>
}

export interface UiModalEmits {
  (event: 'close'): void
  (event: 'infiniteScroll'): void
}

export interface UiModalSlots {
  header(props: { close: () => void }): unknown
  default(): unknown
  footer(props: { close: () => void }): unknown
  close(props: { close: () => void }): unknown
}
</script>

<script setup lang="ts">
import { computed, reactive, useTemplateRef, ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import { useModalControls } from '../../composables/useModalControls'
import UiIcon from '../icon/UiIcon.vue'
import UiButton from '../button/UiButton.vue'
import UiScroll from '../scroll/UiScroll.vue'
import UiLoader from '../loader/UiLoader.vue'
import theme from './theme'

defineOptions({
  name: 'UiModal',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiModalProps>(), {
  title: '',
  description: '',
  showCloseButton: true,
  fullscreen: false,
  role: 'dialog',
  isLoaded: true,
  isCustomScroll: true,
  infiniteScroll: false,
  infiniteScrollMargin: 50,
  ui: undefined
})

const emit = defineEmits<UiModalEmits>()
defineSlots<UiModalSlots>()

const appConfig = useAppConfig()
const { closeHandler: injectedClose } = useModalControls()

const showFadeEffect = reactive({
  top: false,
  bottom: false
})

const contentFallbackRef = useTemplateRef('contentFallbackRef')
const hasNativeScrollbar = ref(false)

function checkScrollbar() {
  if (!contentFallbackRef.value) return

  const element = contentFallbackRef.value
  // Element has a scrollbar when scrollHeight > clientHeight
  hasNativeScrollbar.value = element.scrollHeight > element.clientHeight
}

function handleScroll(instance: OverlayScrollbars) {
  if (!instance) return

  const { overflowAmount } = instance.state()
  const { scrollOffsetElement } = instance.elements()
  const { scrollTop } = scrollOffsetElement

  showFadeEffect.top = scrollTop > 16
  showFadeEffect.bottom = overflowAmount.y - scrollTop > 16
}

function closeHandler() {
  emit('close')
  injectedClose()
}

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-modal',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.modal?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<ModalUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.modal?.states,
      uiProp: props.ui?.states
    })

    const state = props.fullscreen ? 'fullscreen' : 'default'
    commonClasses.push(states[state])

    return commonClasses
  }),
  appConfig?.ui?.modal?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  header: mergeClasses(theme.header, appConfig?.ui?.modal?.header, props.ui?.header),
  title: mergeClasses(theme.title, appConfig?.ui?.modal?.title, props.ui?.title),
  description: mergeClasses(theme.description, appConfig?.ui?.modal?.description, props.ui?.description),
  closeButton: mergeClasses(theme.closeButton, appConfig?.ui?.modal?.closeButton, props.ui?.closeButton),
  closeIcon: mergeClasses(theme.closeIcon, appConfig?.ui?.modal?.closeIcon, props.ui?.closeIcon),
  loaderWrapper: mergeClasses(theme.loaderWrapper, appConfig?.ui?.modal?.loaderWrapper, props.ui?.loaderWrapper),
  content: mergeClasses(theme.content, appConfig?.ui?.modal?.content, props.ui?.content),
  contentFallback: mergeClasses(
    theme.contentFallback,
    appConfig?.ui?.modal?.contentFallback,
    props.ui?.contentFallback
  ),
  footer: mergeClasses(theme.footer, appConfig?.ui?.modal?.footer, props.ui?.footer)
}))

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!props.isCustomScroll && contentFallbackRef.value) {
    checkScrollbar()

    // Observe size changes to detect when a scrollbar appears/disappears
    resizeObserver = new ResizeObserver(() => {
      checkScrollbar()
    })

    resizeObserver.observe(contentFallbackRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

watch(
  () => props.isLoaded,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        checkScrollbar()
      })
    }
  }
)
</script>

<template>
  <dialog
    v-bind="attributes"
    :role="role"
    aria-modal="true"
    :aria-labelledby="title ? 'modal-title' : undefined"
    :aria-describedby="description ? 'modal-description' : undefined"
    :class="className"
  >
    <header v-if="$slots.header || title || description || showCloseButton" :class="uiClasses.header">
      <slot name="header" :close="closeHandler">
        <div v-if="title || description">
          <h2 v-if="title" id="modal-title" :class="uiClasses.title" data-test="modal-title">
            {{ title }}
          </h2>

          <p v-if="description" id="modal-description" :class="uiClasses.description">
            {{ description }}
          </p>
        </div>
      </slot>

      <slot name="close" :close="closeHandler">
        <UiButton
          v-if="showCloseButton"
          variant="default"
          size="default"
          :class="uiClasses.closeButton"
          aria-label="Close"
          data-test="modal-close"
          @click="closeHandler"
        >
          <UiIcon class="shrink-0" name="close" :class="uiClasses.closeIcon" />
        </UiButton>
      </slot>
    </header>

    <div v-if="!isLoaded" :class="uiClasses.loaderWrapper">
      <UiLoader is-centered />
    </div>

    <UiScroll
      v-if="isCustomScroll"
      v-show="isLoaded"
      :class="[
        uiClasses.content,
        {
          'show-fade-top': showFadeEffect.top,
          'show-fade-bottom': showFadeEffect.bottom
        }
      ]"
      overflow-x="hidden"
      overflow-y="scroll"
      auto-hide="never"
      :infinite-scroll="infiniteScroll"
      :infinite-scroll-margin="infiniteScrollMargin"
      @infinite-scroll="$emit('infiniteScroll')"
      @scroll="handleScroll"
    >
      <slot />
    </UiScroll>

    <div
      v-else
      v-show="isLoaded"
      ref="contentFallbackRef"
      :class="[uiClasses.contentFallback, { 'pr-6': hasNativeScrollbar }]"
    >
      <slot />
    </div>

    <footer v-if="$slots.footer" v-show="isLoaded" :class="uiClasses.footer">
      <slot name="footer" :close="closeHandler" />
    </footer>
  </dialog>
</template>

<style>
.show-fade-top::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background: linear-gradient(to bottom, var(--modal-fade-color, #110e1b), transparent);
  pointer-events: none;
  width: calc(100% - 0.5rem);
  z-index: 10;
}

.show-fade-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rem;
  background: linear-gradient(to top, var(--modal-fade-color, #110e1b), transparent);
  pointer-events: none;
  width: calc(100% - 0.5rem);
  z-index: 10;
}
</style>

<style scoped>
:deep([data-overlayscrollbars-viewport~='overflowYScroll']) {
  padding-right: 1.5rem !important;
}
</style>
