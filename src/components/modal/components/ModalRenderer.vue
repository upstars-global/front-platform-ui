<script lang="ts">
import type { UiProp } from '../../types.ts'
import type { ModalRendererUi } from '../theme.ts'
import type { ModalItem, ModalRendererEmits } from '../types.ts'

export interface ModalRendererProps {
  modals: ModalItem[]
  isVisible?: boolean
  isMobile?: boolean
  ui?: UiProp<ModalRendererUi>
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '@src/composables/useAppConfig.ts'
import { useComponentAttributes } from '@src/composables/useUiClasses.ts'
import { modalRenderer as theme } from '../theme.ts'
import ModalWrapper from '@src/components/modal/components/ModalWrapper.vue'

defineOptions({
  name: 'ModalRenderer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<ModalRendererProps>(), {
  isMobile: false,
  ui: undefined,
  isVisible: undefined
})

defineEmits<ModalRendererEmits>()

const appConfig = useAppConfig()
const transitionName = computed(() => (props.isMobile ? 'modal-mobile' : 'modal'))

const { attributes, className, mergeClasses } = useComponentAttributes(
  'modal-renderer',
  computed(() => [theme.base, appConfig?.ui?.modalRenderer?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.modalRenderer?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  overlay: mergeClasses(theme.overlay, appConfig?.ui?.modalRenderer?.overlay, props.ui?.overlay),
  wrapper: mergeClasses(theme.wrapper, appConfig?.ui?.modalRenderer?.wrapper, props.ui?.wrapper)
}))
</script>

<template>
  <div v-show="isVisible" v-bind="attributes" :class="[className, uiClasses.overlay]" data-test="modal-container">
    <TransitionGroup tag="div" :name="transitionName" :class="uiClasses.wrapper">
      <ModalWrapper
        v-for="(modal, index) in modals"
        v-show="index === 0"
        :key="modal.name"
        :modal="modal"
        @modal-open="$emit('modal-open', modal)"
        @modal-close="$emit('modal-close', modal)"
        @close="$emit('close', modal.name)"
      />
    </TransitionGroup>
  </div>
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
