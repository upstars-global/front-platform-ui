<script lang="ts">
import type { UiProp } from '../types'
import type { ModalUi } from './theme'
import type { ClassNameValue } from 'tailwind-merge'

export type ModalRole = 'dialog' | 'alertdialog'

export interface UiModalProps {
  title?: string
  description?: string
  showCloseButton?: boolean
  fullscreen?: boolean
  role?: ModalRole
  ui?: UiProp<ModalUi>
}

export interface UiModalEmits {
  (event: 'close'): void
}

export interface UiModalSlots {
  header(props: { close: () => void }): unknown
  default(): unknown
  footer(props: { close: () => void }): unknown
  close(props: { close: () => void }): unknown
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppConfig } from '../../composables/useAppConfig'
import { useComponentAttributes } from '../../composables/useUiClasses'
import { prepareVariants } from '../../helpers/prepareClassNames'
import { useModalControls } from '../../composables/useModalControls'
import UiIcon from '../icon/UiIcon.vue'
import UiButton from '../button/UiButton.vue'
import theme from './theme'

defineOptions({
  name: 'UiModal',
  inheritAttrs: false
})

const props = withDefaults(defineProps<UiModalProps>(), {
  title: '',
  description: '',
  showCloseButton: true,
  fullscreen: false,
  role: 'dialog',
  ui: undefined
})

const emit = defineEmits<UiModalEmits>()
defineSlots<UiModalSlots>()

const appConfig = useAppConfig()
const { closeHandler: injectedClose } = useModalControls()

function closeHandler() {
  emit('close')
  injectedClose()
}

const { attributes, className, mergeClasses } = useComponentAttributes(
  'ui-modal',
  computed(() => {
    const commonClasses: ClassNameValue[] = [theme.base, appConfig?.ui?.modal?.base, props.ui?.base].filter(Boolean)

    const states = prepareVariants<ModalUi['states']>({
      theme: theme.states,
      appConfig: appConfig?.ui?.modal?.states,
      uiProp: props.ui?.states
    })

    const state = props.fullscreen ? 'fullscreen' : 'default'
    commonClasses.push(states[state])

    return commonClasses
  }),
  appConfig?.ui?.modal?.strategy || props.ui?.strategy
)

const uiClasses = computed(() => ({
  header: mergeClasses(theme.header, appConfig?.ui?.modal?.header, props.ui?.header),
  title: mergeClasses(theme.title, appConfig?.ui?.modal?.title, props.ui?.title),
  description: mergeClasses(theme.description, appConfig?.ui?.modal?.description, props.ui?.description),
  closeButton: mergeClasses(theme.closeButton, appConfig?.ui?.modal?.closeButton, props.ui?.closeButton),
  closeIcon: mergeClasses(theme.closeIcon, appConfig?.ui?.modal?.closeIcon, props.ui?.closeIcon),
  content: mergeClasses(theme.content, appConfig?.ui?.modal?.content, props.ui?.content),
  footer: mergeClasses(theme.footer, appConfig?.ui?.modal?.footer, props.ui?.footer)
}))
</script>

<template>
  <dialog
    v-bind="attributes"
    :role="role"
    aria-modal="true"
    :aria-labelledby="title ? 'modal-title' : undefined"
    :aria-describedby="description ? 'modal-description' : undefined"
    :class="className"
  >
    <header v-if="$slots.header || title || description || showCloseButton" :class="uiClasses.header">
      <slot name="header" :close="closeHandler">
        <div v-if="title || description">
          <h2 v-if="title" id="modal-title" :class="uiClasses.title" data-test="modal-title">
            {{ title }}
          </h2>

          <p v-if="description" id="modal-description" :class="uiClasses.description">
            {{ description }}
          </p>
        </div>
      </slot>

      <slot name="close" :close="closeHandler">
        <UiButton
          v-if="showCloseButton"
          variant="default"
          size="default"
          :class="uiClasses.closeButton"
          aria-label="Close"
          data-test="modal-close"
          @click="closeHandler"
        >
          <UiIcon class="shrink-0" name="close" :class="uiClasses.closeIcon" />
        </UiButton>
      </slot>
    </header>

    <section :class="uiClasses.content">
      <slot />
    </section>

    <footer v-if="$slots.footer" :class="uiClasses.footer">
      <slot name="footer" :close="closeHandler" />
    </footer>
  </dialog>
</template>
