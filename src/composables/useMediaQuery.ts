import { computed, ref, watch, type Ref } from 'vue'

type Observer<T> = {
  [key: number | string]: T
}

interface ObservableObj {
  listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void
  mqList: MediaQueryList
  clients?: number
}

interface MediaObservableObj extends ObservableObj {
  isMediaMatch: Ref<boolean>
}

const mediaMaxBreakpoints = {
  XS: 359,
  SM: 479,
  MD: 767,
  LG: 1023,
  XL: 1439
} as const

const observer: Observer<MediaObservableObj> = {}

type MediaMaxBreakpoints = (typeof mediaMaxBreakpoints)[keyof typeof mediaMaxBreakpoints]

const mapMediaObserver = (mediaMax: MediaMaxBreakpoints = mediaMaxBreakpoints.LG) => {
  if (import.meta.env.SSR) {
    return {
      isMediaMatch: () => mediaMaxBreakpoints.SM >= mediaMax,
      dispose() {}
    }
  }
  function onMediaMatch(e: MediaQueryListEvent) {
    const observerRecord = observer[mediaMax]

    if (observerRecord) {
      observerRecord.isMediaMatch.value = e.matches
    }
  }
  const isMediaMatch = ref<boolean>(mediaMaxBreakpoints.SM >= mediaMax)
  let unwatch: () => void
  const timer = setTimeout(() => {
    if (!observer[mediaMax]) {
      const mqList = window.matchMedia(`(max-width: ${mediaMax}px)`)

      observer[mediaMax] = {
        listener: onMediaMatch,
        mqList,
        clients: 0,
        isMediaMatch: ref(mqList.matches)
      } as MediaObservableObj

      mqList.addEventListener('change', onMediaMatch)
    }
    const observerRecord = observer[mediaMax]

    if (observerRecord) {
      observerRecord.clients = (observerRecord.clients || 0) + 1

      isMediaMatch.value = observerRecord.isMediaMatch.value
      unwatch = watch(observerRecord.isMediaMatch, () => {
        isMediaMatch.value = observerRecord.isMediaMatch.value
      })
    }
  })

  return {
    isMediaMatch: () => isMediaMatch.value,
    dispose() {
      if (unwatch) {
        unwatch()
        const observerRecord = observer[mediaMax]
        if (observerRecord) {
          observerRecord.clients = (observerRecord.clients || 0) - 1
          if (observerRecord.clients === 0) {
            observerRecord.mqList.removeEventListener('change', observerRecord.listener)
            delete observer[mediaMax]
          }
        }
      } else {
        clearTimeout(timer)
      }
    }
  }
}

export const useMediaQuery = (mediaMax: MediaMaxBreakpoints = mediaMaxBreakpoints.LG) => ({
  isMediaMatch: computed(mapMediaObserver(mediaMax).isMediaMatch)
})
