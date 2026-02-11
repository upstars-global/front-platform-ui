import type { Decorator } from '@storybook/vue3-vite'
import { h, ref, provide } from 'vue'
import { action } from 'storybook/actions'
import UiModalRenderer from '@src/components/modal-renderer/UiModalRenderer.vue'
import type { ModalItem } from '@src/components/modal-renderer/types'

const getBackgroundContent = (isStoryView: boolean) => {
  const heightClass = isStoryView ? 'min-h-[200vh]' : 'min-h-[300px]'
  return `
    <div class="mt-8 ${heightClass} bg-gradient-to-b from-slate-200 to-slate-400 p-4 rounded">
      <p class="text-slate-600 mb-4">Scroll down to test. When modal is open, scrolling should be blocked.</p>
      <div class="sticky top-4 bg-white p-4 rounded shadow">
        <p class="font-bold">Sticky indicator - scroll to see it move</p>
      </div>
    </div>
  `
}

/**
 * Modal Manager Decorator
 *
 * Provides modal state management and auto-renders UiModalRenderer for stories.
 * Stories can inject 'modalManager' to access openModal and closeModal functions.
 *
 * Features:
 * - Modal stack support (multiple modals)
 * - Auto-renders background content for scroll lock testing
 * - Handles 500ms transition delay for closing
 * - Logs modal events to Storybook Actions Tab
 */
export const modalManager: Decorator = (story, context) => ({
  setup(_, { attrs }) {
    const modals = ref<ModalItem[]>([])
    const isVisible = ref(false)

    const openModal = (config: ModalItem) => {
      modals.value = [config, ...modals.value] // Add to stack (newest on top)
      isVisible.value = true
    }

    const closeModal = (name: string) => {
      modals.value = modals.value.filter((m) => m.name !== name)

      if (modals.value.length === 0) {
        setTimeout(() => {
          if (modals.value.length === 0) {
            isVisible.value = false
          }
        }, 500) // Match transition duration
      }
    }

    const handleModalOpen = action('modal-open')
    const handleModalClose = action('modal-close')

    // Provide to stories
    provide('modalManager', { openModal, closeModal })

    const isStoryView = context.viewMode === 'story'

    return () =>
      h('div', { class: 'p-8' }, [
        h(story(), attrs), // Story content (trigger buttons)
        h('div', { innerHTML: getBackgroundContent(isStoryView) }), // Background for scroll testing
        h(UiModalRenderer, {
          // Auto-rendered modal renderer
          modals: modals.value,
          isVisible: isVisible.value,
          onClose: closeModal,
          onModalOpen: handleModalOpen,
          onModalClose: handleModalClose
        })
      ])
  }
})
