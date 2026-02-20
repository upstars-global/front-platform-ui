<script lang="ts">
import type { UiProp } from '../types'
import type { TimerUi } from './theme'

export interface UiTimerProps {
  deadline: Date | string | number | null
  labels?: {
    days?: string | null
    hours?: string | null
    minutes?: string | null
    seconds?: string | null
  }
  showDots?: boolean
  ui?: UiProp<TimerUi>
}

export interface UiTimerEmits {
  (event: 'finish'): void
}

export interface UiTimerSlots {
  leading(): unknown
  trailing(): unknown
}
</script>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'

const MILLISECONDS_SECOND = 1000

defineOptions({
  name: 'UiTimer',
  inheritAttrs: false
})
const props = withDefaults(defineProps<UiTimerProps>(), {
  labels: () => ({
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  }),
  showDots: true,
  ui: undefined
})

const emit = defineEmits<UiTimerEmits>()

const now = ref(0)
const diff = ref(0)
const interval = ref<ReturnType<typeof setInterval>>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-timer',
  computed(() => [theme.base, appConfig?.ui?.timer?.base, props.ui?.base].filter(Boolean)),
  appConfig?.ui?.timer?.strategy || props.ui?.strategy
)

function dateFormat(value: number) {
  return value < 10 ? `0${value}` : String(value)
}

const isMockerMode = computed(() => appConfig?.store?.env?.isMockerMode)
const uiClasses = computed(() => {
  return {
    item: mergeClasses(theme.item, appConfig?.ui?.timer?.item, props.ui?.item),
    day: mergeClasses(theme.day, appConfig?.ui?.timer?.day, props.ui?.day),
    hour: mergeClasses(theme.hour, appConfig?.ui?.timer?.hour, props.ui?.hour),
    minute: mergeClasses(theme.minute, appConfig?.ui?.timer?.minute, props.ui?.minute),
    second: mergeClasses(theme.second, appConfig?.ui?.timer?.second, props.ui?.second),
    dots: mergeClasses(theme.dots, appConfig?.ui?.timer?.dots, props.ui?.dots)
  }
})

const deadlineTime = computed(() => {
  if (props.deadline instanceof Date) {
    return props.deadline.getTime()
  }

  if (typeof props.deadline === 'string') {
    return new Date(props.deadline).getTime()
  }

  return props.deadline
})
const date = computed(() => {
  if (deadlineTime.value) {
    return Math.trunc(deadlineTime.value / MILLISECONDS_SECOND)
  }

  return null
})
const days = computed(() => {
  if (isMockerMode.value) {
    return '9876'
  }
  const value = dateFormat(Math.trunc(diff.value / 60 / 60 / 24))
  return value === '00' ? null : value
})
const hours = computed(() => {
  if (isMockerMode.value) {
    return '23'
  }
  return dateFormat(Math.trunc(diff.value / 60 / 60) % 24)
})
const minutes = computed(() => {
  if (isMockerMode.value) {
    return '59'
  }
  return dateFormat(Math.trunc(diff.value / 60) % 60)
})
const seconds = computed(() => {
  if (isMockerMode.value) {
    return '48'
  }
  return dateFormat(Math.trunc(diff.value) % 60)
})

function start() {
  if (isMockerMode.value) {
    return
  }

  now.value = Math.trunc(new Date().getTime() / MILLISECONDS_SECOND)

  interval.value = setInterval(() => {
    now.value = Math.trunc(new Date().getTime() / MILLISECONDS_SECOND)
  }, MILLISECONDS_SECOND)
}

watch(now, () => {
  diff.value = Number(date.value) - now.value

  if (diff.value <= 0) {
    diff.value = 0
    clearInterval(interval.value)
    emit('finish')
  }
})

watch(deadlineTime, () => start())

onMounted(() => {
  start()
})
onBeforeUnmount(() => {
  clearInterval(interval.value)
})
</script>

<template>
  <div v-bind="attributes" :class="className">
    <slot name="leading" />
    <template v-if="typeof labels.days === 'string' && days">
      <span :class="[uiClasses.item, uiClasses.day]">
        <span>{{ days }}</span>
        <span>{{ labels.days }}</span>
      </span>
      <span v-if="showDots" :class="uiClasses.dots">:</span>
    </template>
    <template v-if="typeof labels.hours === 'string'">
      <span :class="[uiClasses.item, uiClasses.hour]">
        <span>{{ hours }}</span>
        <span>{{ labels.hours }}</span>
      </span>
      <span v-if="showDots" :class="uiClasses.dots">:</span>
    </template>
    <template v-if="typeof labels.minutes === 'string'">
      <span :class="[uiClasses.item, uiClasses.minute]">
        <span>{{ minutes }}</span>
        <span>{{ labels.minutes }}</span>
      </span>
      <span v-if="showDots" :class="uiClasses.dots">:</span>
    </template>
    <template v-if="typeof labels.seconds === 'string'">
      <span :class="[uiClasses.item, uiClasses.second]">
        <span>{{ seconds }}</span>
        <span>{{ labels.seconds }}</span>
      </span>
    </template>
    <slot name="trailing" />
  </div>
</template>
