import { inject } from 'vue'
import { CLOSE_MODAL_INJECTION_KEY } from '../components/modal/types'

export function useModalControls() {
  const close = inject(CLOSE_MODAL_INJECTION_KEY)

  return {
    closeHandler() {
      close?.()
    }
  }
}
