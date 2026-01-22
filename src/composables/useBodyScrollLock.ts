import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, nextTick, watch } from 'vue'
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock-upgrade'

const isServer = typeof window === 'undefined'

const allowTouchMove = (el: EventTarget) => {
  let element = el as HTMLElement | null
  while (element && element !== document.body) {
    if (element.getAttribute('body-scroll-lock-ignore') !== null) {
      return true
    }
    element = element.parentElement
  }
  return false
}

export function useBodyScrollLock(element: Ref<HTMLElement | null>, isVisible?: Ref<boolean>) {
  if (isVisible) {
    watch(
      () => isVisible.value,
      (value) => {
        if (!isServer) {
          if (value) {
            nextTick(() => {
              if (element.value) {
                disableBodyScroll(element.value, {
                  reserveScrollBarGap: true,
                  allowTouchMove
                })
              }
            })
            return
          }

          clearAllBodyScrollLocks()
        }
      }
    )
  } else {
    onMounted(() => {
      nextTick(() => {
        if (element.value) {
          disableBodyScroll(element.value, {
            reserveScrollBarGap: true,
            allowTouchMove
          })
        }
      })
    })

    onBeforeUnmount(() => {
      clearAllBodyScrollLocks()
    })
  }
}
