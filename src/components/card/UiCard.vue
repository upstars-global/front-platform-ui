<script lang="ts">
import type { ClassNameValue } from 'tailwind-merge'
import type { UiProp } from '../types'
import type { CardUi } from './theme'

export interface UiCardProps {
  as?: string
  isRounded?: boolean
  isReverse?: boolean
  orientation?: 'vertical' | 'horizontal'
  variant?: 'default' | 'outline' | 'soft' | 'subtle'
  ui?: UiProp<CardUi>
}
export interface UiCardSlots {
  header(): unknown
  default(): unknown
  body(): unknown
  footer(): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import theme from './theme'
import { prepareVariants } from '@src/helpers/prepareClassNames.ts'

const props = withDefaults(defineProps<UiCardProps>(), {
  as: 'div',
  isRounded: true,
  orientation: 'vertical',
  variant: 'default',
  ui: () => ({ strategy: 'merge' })
})

const slots = defineSlots<UiCardSlots>()

const appConfig = useAppConfig()
const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-card',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.card?.base, props.ui?.base].filter(Boolean)

    const variants = prepareVariants<CardUi['variants']>({
      theme: theme.variants,
      appConfig: appConfig?.ui?.card?.variants,
      uiProp: props.ui?.variants
    })

    commonClasses.push(variants[props.variant])

    const roundedClasses = [theme.rounded, appConfig?.ui?.card?.rounded, props.ui.rounded].filter(Boolean)

    if (props.isRounded) {
      commonClasses.push(roundedClasses)
    }

    const orientation = prepareVariants<CardUi['orientation']>({
      theme: theme.orientation,
      appConfig: appConfig?.ui?.card?.orientation,
      uiProp: props.ui?.orientation
    })

    if (props.orientation === 'horizontal' && (!!slots.header || !!slots.body || !!slots.footer)) {
      commonClasses.push(orientation[props.orientation])
    }

    return commonClasses
  }),
  appConfig?.ui?.card?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => {
  const wrapper = [mergeClasses(theme.wrapper, appConfig.ui?.card?.wrapper, props.ui.wrapper)]

  if (props.isReverse) {
    wrapper.push('order-last')
  }

  return {
    header: mergeClasses(theme.header, appConfig.ui?.card?.header, props.ui.header),
    body: mergeClasses(theme.body, appConfig.ui?.card?.body, props.ui.body),
    footer: mergeClasses(theme.footer, appConfig.ui?.card?.footer, props.ui.footer),
    wrapper
  }
})
</script>

<template>
  <component :is="as" v-bind="attributes" :class="className">
    <div v-if="!!slots.header || !!slots.body || !!slots.footer" :class="uiClasses.wrapper">
      <div v-if="!!slots.header" :class="uiClasses.header">
        <slot name="header" />
      </div>
      <div v-if="!!slots.body" :class="uiClasses.body">
        <slot name="body" />
      </div>
      <div v-if="!!slots.footer" :class="uiClasses.footer">
        <slot name="footer" />
      </div>
    </div>

    <slot />
  </component>
</template>
