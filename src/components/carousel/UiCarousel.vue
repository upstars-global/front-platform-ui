<script lang="ts">
import type { VNode } from 'vue'
import type { CarouselUi } from './theme'
import type { UiProp } from '../types'
import type { Navigation } from './components/CarouselNavigation.vue'

export interface UiCarouselProps {
  activeIndex?: number
  autoplay?: number
  disableFadeEffect?: boolean
  showPagination?: boolean
  showNavigation?: boolean
  transparentBorder?: boolean
  isMobile?: boolean
  navigation?: Navigation
  ui?: UiProp<CarouselUi>
}
export interface UiCarouselEmits {
  (event: 'change:page', value: number): void
}
export interface UiCarouselSlots {
  default(): unknown
}
</script>

<script setup lang="ts">
import { computed, Fragment, h, nextTick, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { observeContentChanged } from '../../helpers/observeContentChanged'
import CarouselNavigation from './components/CarouselNavigation.vue'
import CarouselPagination from './components/CarouselPagination.vue'
import theme from './theme'

defineOptions({
  name: 'UiCarousel',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiCarouselProps>(), {
  activeIndex: 0,
  autoplay: undefined,
  showNavigation: true,
  navigation: undefined,
  ui: () => ({ strategy: 'merge' })
})
const emit = defineEmits<UiCarouselEmits>()
const slots = defineSlots<UiCarouselSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-carousel',
  computed(() => {
    return [theme.base, appConfig?.ui?.carousel?.base, props.ui?.base].filter(Boolean)
  }),
  appConfig?.ui?.carousel?.strategy || props.ui?.strategy
)

const carouselList = ref<HTMLDivElement | null>(null)
const localActiveIndex = ref(props.activeIndex)
const autoPlayId = ref<number | null>(null)
const backward = ref(false)
const forward = ref(false)

const uiClasses = computed(() => {
  return {
    list: mergeClasses(theme.list, appConfig?.ui?.carousel?.list, props.ui?.list),
    item: mergeClasses(theme.item, appConfig?.ui?.carousel?.item, props.ui?.item),
    navigation: {
      container: mergeClasses(
        theme.navigation.container,
        appConfig?.ui?.carousel?.navigation?.container,
        props.ui?.navigation?.container
      ),
      button: mergeClasses(
        theme.navigation.button,
        appConfig?.ui?.carousel?.navigation?.button,
        props.ui?.navigation?.button
      ),
      prev: mergeClasses(theme.navigation.prev, appConfig?.ui?.carousel?.navigation?.prev, props.ui?.navigation?.prev),
      next: mergeClasses(theme.navigation.next, appConfig?.ui?.carousel?.navigation?.next, props.ui?.navigation?.next)
    },
    pagination: {
      container: mergeClasses(
        theme.pagination.container,
        appConfig?.ui?.carousel?.pagination?.container,
        props.ui?.pagination?.container
      ),
      inner: mergeClasses(
        theme.pagination.inner,
        appConfig?.ui?.carousel?.pagination?.inner,
        props.ui?.pagination?.inner
      ),
      item: mergeClasses(theme.pagination.item, appConfig?.ui?.carousel?.pagination?.item, props.ui?.pagination?.item),
      active: mergeClasses(
        theme.pagination.active,
        appConfig?.ui?.carousel?.pagination?.active,
        props.ui?.pagination?.active
      )
    }
  }
})
const fadeDistance = computed(() => {
  return props.isMobile ? 16 : 64
})

const getItemGap = () => {
  if (!carouselList.value) {
    return 0
  }

  const style = getComputedStyle(carouselList.value)
  return parseFloat(style.columnGap)
}
const getItemWidth = () => {
  if (!carouselList.value) {
    return 0
  }

  const gap = getItemGap()
  const { firstElementChild } = carouselList.value

  if (!firstElementChild) {
    return 0
  }

  return (firstElementChild as HTMLElement).offsetWidth + gap
}
const updateScrollPosition = (index: number) => {
  if (!carouselList.value) {
    return
  }

  const { offsetWidth } = carouselList.value
  const itemWidth = getItemWidth()

  const perPage = Math.floor(offsetWidth / itemWidth)
  const slideWidth = perPage * itemWidth

  carouselList.value.scrollTo({
    left: slideWidth * index,
    behavior: 'smooth'
  })
}
const setPosition = () => {
  const offsetToActivePosition = props.activeIndex * getItemWidth()
  carouselList.value?.scrollTo({
    left: offsetToActivePosition
  })
}
const getCurrentPage = () => {
  if (!carouselList.value) {
    return 0
  }

  const { scrollLeft, offsetWidth } = carouselList.value
  const itemWidth = getItemWidth()
  const perPage = Math.floor(offsetWidth / itemWidth)
  const slideWidth = perPage * itemWidth

  return Math.round(scrollLeft / slideWidth)
}
const calculateCarousel = (element: HTMLElement | null) => {
  if (!element) {
    return
  }

  const { scrollLeft, offsetWidth, scrollWidth } = element
  const currentScrollWidth = scrollLeft + offsetWidth

  backward.value = scrollLeft > 0
  forward.value = currentScrollWidth < scrollWidth
  localActiveIndex.value = getCurrentPage()
}
const cleanFadeEffect = () => {
  if (carouselList.value) {
    carouselList.value.style.webkitMaskImage = ''
  }
}
const handleFadeEffect = () => {
  if (!carouselList.value) {
    return
  }

  if (props.disableFadeEffect) {
    cleanFadeEffect()
    return
  }

  const carouselListElemRect = carouselList.value.getBoundingClientRect()
  const scrollLeft = carouselList.value.scrollLeft
  const itemWidth = getItemWidth()
  const itemGap = getItemGap()

  const realLeftIndex = Math.floor(scrollLeft / itemWidth)
  const realLeft = realLeftIndex * itemWidth
  const realNextLeft = realLeft + itemWidth
  const leftDiff = Math.abs(scrollLeft - realLeft)
  const leftNextDiff = Math.abs(scrollLeft - realNextLeft)
  const leftRealDiff = leftNextDiff <= fadeDistance.value ? leftNextDiff : leftDiff

  const scrollRight = scrollLeft + carouselListElemRect.width
  const realRightIndex = Math.floor(scrollRight / itemWidth)
  const realRight = realRightIndex * itemWidth - itemGap
  const realNextRight = realRight + itemWidth
  const rightDiff = Math.abs(scrollRight - realRight)
  const rightNextDiff = Math.abs(scrollRight - realNextRight)
  const rightRealDiff = rightDiff <= fadeDistance.value ? rightDiff : rightNextDiff

  const leftBorderDistance = Math.min(leftRealDiff, fadeDistance.value)
  const rightBorderDistance = Math.min(rightRealDiff, fadeDistance.value)
  const parts = []

  if (rightBorderDistance > 0) {
    parts.push(`rgba(0,0,0,${1 - rightBorderDistance / fadeDistance.value})`, `rgba(0,0,0,1) ${fadeDistance.value}px`)
  }
  if (leftBorderDistance > 0) {
    parts.push(
      `rgba(0,0,0,1) calc(100% - ${fadeDistance.value}px)`,
      `rgba(0,0,0,${1 - leftBorderDistance / fadeDistance.value})`
    )
  }
  if (parts.length) {
    carouselList.value.style.webkitMaskImage = `-webkit-linear-gradient(right, ${parts.join(', ')})`
  }
}
const handleScroll = (element: Event) => {
  calculateCarousel(element.target as HTMLElement)
  handleFadeEffect()
}
const setAutoPlay = () => {
  if (props.autoplay && autoPlayId.value === null) {
    autoPlayId.value = setInterval(() => {
      localActiveIndex.value = getCurrentPage() + 1
      if (carouselList.value) {
        const { scrollLeft, offsetWidth, scrollWidth } = carouselList.value

        if (localActiveIndex.value >= carouselList.value.children.length || scrollLeft + offsetWidth >= scrollWidth) {
          localActiveIndex.value = 0
        }
      }

      updateScrollPosition(localActiveIndex.value)
    }, props.autoplay) as unknown as number
  }
}
const stopTimer = () => {
  if (autoPlayId.value !== null) {
    clearInterval(autoPlayId.value)
    autoPlayId.value = null
  }
}
const handleNavigation = (direction: number) => {
  return updateScrollPosition(localActiveIndex.value + direction)
}
const handlePagination = (index: number) => {
  return updateScrollPosition(index)
}

watch(
  () => props.activeIndex,
  (value) => {
    if (localActiveIndex.value !== value) {
      localActiveIndex.value = value
      setPosition()
    }
  }
)
watch(
  () => localActiveIndex.value,
  (value) => {
    emit('change:page', value)
  }
)

watch(
  () => props.disableFadeEffect,
  () => {
    handleFadeEffect()
  }
)

onMounted(() => {
  nextTick(() => {
    if (props.activeIndex !== 0) {
      setPosition()
    }
    calculateCarousel(carouselList.value)
    handleFadeEffect()
  })
  if (!props.disableFadeEffect && carouselList.value) {
    observeContentChanged({
      target: carouselList.value,
      deep: false,
      callback: () => {
        handleFadeEffect()
        calculateCarousel(carouselList.value)
      }
    })
  }

  setAutoPlay()
})
onUpdated(() => {
  calculateCarousel(carouselList.value)
})
onUnmounted(() => {
  stopTimer()
})

function render() {
  let children: VNode[] = []
  let navigation: VNode | VNode[] = []
  let pagination: VNode | VNode[] = []

  const _slotDefault = (slots.default ? slots.default() : []) as VNode[]

  function getChildren(nodes: unknown) {
    const commentSymbol = Symbol.for('v-cmt')

    if (!Array.isArray(nodes)) {
      return nodes
    }

    return nodes.reduce((result, node) => {
      if (typeof node === 'object' && node?.type === commentSymbol) {
        return result
      }
      if (typeof node === 'object' && !Array.isArray(node) && node?.type === Fragment) {
        return [...result, ...getChildren(node.children)]
      }
      return [...result, node]
    }, [])
  }

  const _slotChildren = getChildren(_slotDefault)

  if (Array.isArray(_slotChildren)) {
    children = _slotChildren?.map((element, index) => {
      return h(
        'div',
        {
          class: ['ui-carousel__item', uiClasses.value.item, { 'is-transparent-border': props.transparentBorder }],
          'data-test': `carousel-scroll-item-${index}`,
          key: index
        },
        element
      )
    })
  }

  if (props.showNavigation) {
    navigation = h(CarouselNavigation, {
      backward: backward.value,
      forward: forward.value,
      iconPrev: props.navigation?.iconPrev,
      iconNext: props.navigation?.iconNext,
      iconSize: props.navigation?.iconSize,
      buttonVariant: props.navigation?.buttonVariant,
      buttonSize: props.navigation?.buttonSize,
      ui: uiClasses.value.navigation,
      onChange: handleNavigation
    })
  }

  if (props.showPagination) {
    pagination = h(CarouselPagination, {
      length: children?.length,
      activeIndex: localActiveIndex.value,
      ui: uiClasses.value.pagination,
      onChange: handlePagination
    })
  }

  return h(
    'div',
    {
      class: className.value,
      onMouseover: stopTimer,
      onMouseleave: setAutoPlay,
      ...attributes.value
    },
    [
      navigation,
      h(
        'div',
        {
          class: ['ui-carousel__list', uiClasses.value.list],
          ref: (el) => (carouselList.value = el as HTMLDivElement),
          onScroll: handleScroll
        },
        [children]
      ),
      pagination
    ]
  )
}
</script>

<template>
  <render />
</template>

<style lang="postcss">
:root {
  --carousel-item-width: theme('spacing.48');
  --carousel-gap: theme('spacing.4');

  @media screen(md) {
    --carousel-gap: theme('spacing.6');
  }
}

.ui-carousel__list {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    @apply w-full h-full snap-start;
  }
}

.ui-carousel__item.is-transparent-border {
  padding-left: var(--carousel-gap);

  &:last-child {
    padding-right: var(--carousel-gap);
  }

  @media screen(md) {
    padding-left: 0;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
