<script lang="ts">
import type { CarouselPaginationUi } from '../theme'

interface CarouselPaginationProps {
  length: number
  activeIndex: number
  ui?: CarouselPaginationUi
}

interface CarouselPaginationEmits {
  (event: 'change', value: number): void
}
</script>

<script setup lang="ts">
import UiButton from '../../button/UiButton.vue'

defineOptions({
  name: 'CarouselPagination',
  inheritAttrs: false
})

defineProps<CarouselPaginationProps>()
const emit = defineEmits<CarouselPaginationEmits>()

const paginate = (index: number) => emit('change', index)
</script>

<template>
  <div :class="ui?.container">
    <div :class="ui?.inner" role="tablist">
      <UiButton
        v-for="(_, index) in length"
        :key="index"
        :class="[ui?.item, index === activeIndex ? ui?.active : '']"
        :ui="{ strategy: 'merge' }"
        variant="default"
        size="default"
        :value="index"
        :aria-label="String(index)"
        data-test="carousel-pagination-dot"
        aria-hidden="false"
        role="tab"
        @click="paginate(index)"
      />
    </div>
  </div>
</template>
