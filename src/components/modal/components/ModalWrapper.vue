<script lang="ts">
import type { ModalItem, ModalRendererEmits } from '../types.ts'

interface ModalWrapperProps {
  modal: ModalItem
}
</script>

<script setup lang="ts">
import { provide, useTemplateRef, onMounted, onBeforeUnmount } from 'vue'
import { CLOSE_MODAL_INJECTION_KEY } from '../types.ts'
import { useBodyScrollLock } from '@src/composables/useBodyScrollLock.ts'

const props = defineProps<ModalWrapperProps>()
const emit = defineEmits<ModalRendererEmits>()

const rendererRef = useTemplateRef<HTMLElement>('rendererRef')

useBodyScrollLock(rendererRef)

provide(CLOSE_MODAL_INJECTION_KEY, () => {
  closeHandler(props.modal)
})

function closeHandler(modal: ModalItem) {
  emit('close', modal.name)
  modal.callback?.()
}

function handleBackdropClick() {
  if (!props.modal.disableBackdropClosing) {
    closeHandler(props.modal)
  }
}

onMounted(() => {
  emit('modal-open', props.modal)
})

onBeforeUnmount(() => {
  emit('modal-close', props.modal)
})
</script>

<template>
  <div
    ref="rendererRef"
    class="absolute inset-0 flex items-end md:items-center justify-center"
    @click.self="handleBackdropClick"
  >
    <component :is="modal.component" v-bind="modal.props" />
  </div>
</template>
