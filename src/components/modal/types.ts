import type { Component, InjectionKey } from 'vue'

export interface ModalItem {
  name: string
  component: Component
  props?: Record<string, unknown>
  disableBackdropClosing?: boolean
  callback?: () => void
}

export interface ModalRendererEmits {
  (e: 'close', name: string): void
  (e: 'modal-open', modal: ModalItem): void
  (e: 'modal-close', modal: ModalItem): void
}

export const CLOSE_MODAL_INJECTION_KEY = 'closeModalHandler' as unknown as InjectionKey<() => void>
