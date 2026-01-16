<script lang="ts">
import type { UiProp } from '../types'
import type { ModalRendererUi } from './theme'
import type { ModalItem, ModalRendererEmits } from './types'

export interface UiModalRendererProps {
  modals: ModalItem[]
  isVisible?: boolean
  ui?: UiProp<ModalRendererUi>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { useMediaQuery, mediaMaxBreakpoints } from '../../composables/useMediaQuery'
import theme from './theme'
import ModalWrapper from './components/ModalWrapper.vue'

defineOptions({
  name: 'UiModalRenderer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiModalRendererProps>(), {
  ui: undefined,
  isVisible: undefined
})

defineEmits<ModalRendererEmits>()

const appConfig = useAppConfig()
const { isMediaMatch: isMobileView } = useMediaQuery(mediaMaxBreakpoints.MD)
const transitionName = computed(() => (isMobileView.value ? 'modal-mobile' : 'modal'))

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-modal-renderer',
  computed(() => [theme.base, appConfig?.ui?.modalRenderer?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.modalRenderer?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  overlay: mergeClasses(theme.overlay, appConfig?.ui?.modalRenderer?.overlay, props.ui?.overlay),
  wrapper: mergeClasses(theme.wrapper, appConfig?.ui?.modalRenderer?.wrapper, props.ui?.wrapper)
}))
</script>

<template>
  <TransitionGroup
    v-show="isVisible"
    tag="div"
    :name="transitionName"
    v-bind="attributes"
    :class="[className, uiClasses.overlay]"
    data-test="modal-container"
  >
    <ModalWrapper
      v-for="(modal, index) in modals"
      v-show="index === 0"
      :key="modal.name"
      :modal="modal"
      :class="uiClasses.wrapper"
      @modal-open="$emit('modal-open', modal)"
      @modal-close="$emit('modal-close', modal)"
      @close="$emit('close', modal.name)"
    />
  </TransitionGroup>
</template>

<style lang="postcss">
.modal-enter-active,
.modal-leave-active,
.modal-mobile-enter-active,
.modal-mobile-leave-active {
  @apply transition-all duration-500 ease-in-out;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-mobile-enter-from,
.modal-mobile-leave-to {
  @apply translate-y-[26.5rem] opacity-0;
}
</style>
