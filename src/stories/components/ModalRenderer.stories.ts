import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, markRaw, defineComponent, h } from 'vue'
import UiModalRenderer from '../../components/modal-renderer/UiModalRenderer.vue'
import UiModal from '@src/components/modal/UiModal.vue'
import UiButton from '@src/components/button/UiButton.vue'
import type { ModalItem } from '@src/components/modal-renderer/types'

// Sample modal content component
const SampleModalContent = defineComponent({
  name: 'SampleModalContent',
  props: {
    title: { type: String, default: 'Modal Title' },
    message: { type: String, default: 'This is sample modal content.' }
  },
  setup(props) {
    return () =>
      h(
        UiModal,
        { title: props.title },
        {
          default: () => h('p', props.message),
          footer: ({ close }: { close: () => void }) => [
            h(UiButton, { variant: 'primary', onClick: close }, () => 'Close')
          ]
        }
      )
  }
})

const meta: Meta<typeof UiModalRenderer> = {
  title: 'UI Kit/ModalRenderer',
  component: UiModalRenderer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'UiModalRenderer renders a queue of modals. It should be placed in App.vue without Teleport - the consuming app handles positioning.'
      }
    }
  },
  argTypes: {
    modals: { control: 'object' },
    isMobile: { control: 'boolean' }
  }
}

export default meta
type Story = StoryObj<typeof meta>

// Background content for scroll lock testing
const backgroundContent = `
  <div class="mt-8 min-h-[200vh] bg-gradient-to-b from-slate-200 to-slate-400 p-4 rounded">
    <p class="text-slate-600 mb-4">Scroll down to test. When modal is open, scrolling should be blocked.</p>
    <div class="sticky top-4 bg-white p-4 rounded shadow">
      <p class="font-bold">Sticky indicator - scroll to see it move</p>
    </div>
  </div>
`

export const Default: Story = {
  render: () => ({
    name: 'Story',
    components: { UiModalRenderer, UiButton },
    setup() {
      const modals = ref<ModalItem[]>([])
      const isVisible = ref(false)

      function openModal() {
        modals.value = [
          {
            name: 'sample-modal',
            component: markRaw(SampleModalContent),
            props: {
              title: 'Welcome',
              message: 'This modal is rendered by UiModalRenderer. Try scrolling - it should be blocked!'
            }
          }
        ]
        isVisible.value = true
      }

      function closeModal(name: string) {
        modals.value = modals.value.filter((m) => m.name !== name)

        if (modals.value.length === 0) {
          setTimeout(() => {
            if (modals.value.length === 0) {
              isVisible.value = false
            }
          }, 500)
        }
      }

      function handleOpen(modal: ModalItem) {
        console.log('Modal opened:', modal.name)
      }

      function handleClose(modal: ModalItem) {
        console.log('Modal closed:', modal.name)
      }

      return { modals, isVisible, openModal, closeModal, handleOpen, handleClose }
    },
    template: `
      <div class="p-8">
        <UiButton variant="primary" @click="openModal">Open Modal</UiButton>
        ${backgroundContent}

        <UiModalRenderer
          :modals="modals"
          :is-visible="isVisible"
          @close="closeModal"
          @modal-open="handleOpen"
          @modal-close="handleClose"
        />
      </div>
    `
  })
}

export const WithBackdropClosingDisabled: Story = {
  render: () => ({
    name: 'Story',
    components: { UiModalRenderer, UiButton },
    setup() {
      const modals = ref<ModalItem[]>([])
      const isVisible = ref(false)

      function openModal() {
        modals.value = [
          {
            name: 'protected-modal',
            component: markRaw(SampleModalContent),
            props: {
              title: 'Protected Modal',
              message: 'Click the Close button - backdrop click is disabled.'
            },
            disableBackdropClosing: true
          }
        ]
        isVisible.value = true
      }

      function closeModal(name: string) {
        modals.value = modals.value.filter((m) => m.name !== name)

        if (modals.value.length === 0) {
          setTimeout(() => {
            if (modals.value.length === 0) {
              isVisible.value = false
            }
          }, 500)
        }
      }

      return { modals, isVisible, openModal, closeModal }
    },
    template: `
      <div class="p-8">
        <UiButton variant="primary" @click="openModal">Open Protected Modal</UiButton>
        ${backgroundContent}

        <UiModalRenderer
          :modals="modals"
          :is-visible="isVisible"
          @close="closeModal"
        />
      </div>
    `
  })
}

export const ModalStack: Story = {
  render: () => ({
    name: 'Story',
    components: { UiModalRenderer, UiButton },
    setup() {
      const modals = ref<ModalItem[]>([])
      const isVisible = ref(false)

      function openFirstModal() {
        modals.value = [
          {
            name: 'first-modal',
            component: markRaw(SampleModalContent),
            props: {
              title: 'First Modal',
              message: 'This is the first modal. Open another one!'
            }
          }
        ]
        isVisible.value = true

        openSecondModal()
      }

      function openSecondModal() {
        modals.value = [
          {
            name: 'second-modal',
            component: markRaw(SampleModalContent),
            props: {
              title: 'Second Modal',
              message: 'This is the second modal on top.'
            }
          },
          ...modals.value
        ]
      }

      function closeModal(name: string) {
        modals.value = modals.value.filter((m) => m.name !== name)

        if (modals.value.length === 0) {
          setTimeout(() => {
            if (modals.value.length === 0) {
              isVisible.value = false
            }
          }, 500)
        }
      }

      return { modals, isVisible, openFirstModal, openSecondModal, closeModal }
    },
    template: `
      <div class="p-8">
        <div class="space-x-4">
          <UiButton variant="primary" @click="openFirstModal">Open Two Modal</UiButton>
        </div>
        <p class="mt-4 text-slate-400">Stack size: {{ modals.length }}</p>
        ${backgroundContent}

        <UiModalRenderer
          :modals="modals"
          :is-visible="isVisible"
          @close="closeModal"
        />
      </div>
    `
  })
}

export const MobileTransition: Story = {
  render: () => ({
    name: 'Story',
    components: { UiModalRenderer, UiButton },
    setup() {
      const modals = ref<ModalItem[]>([])
      const isVisible = ref(false)

      function openModal() {
        modals.value = [
          {
            name: 'mobile-modal',
            component: markRaw(SampleModalContent),
            props: {
              title: 'Mobile Modal',
              message: 'This modal uses mobile slide-up transition.'
            }
          }
        ]
        isVisible.value = true
      }

      function closeModal(name: string) {
        modals.value = modals.value.filter((m) => m.name !== name)

        if (modals.value.length === 0) {
          setTimeout(() => {
            if (modals.value.length === 0) {
              isVisible.value = false
            }
          }, 500)
        }
      }

      return { modals, isVisible, openModal, closeModal }
    },
    template: `
      <div class="p-8">
        <UiButton variant="primary" @click="openModal">Open Modal (Mobile Transition)</UiButton>
        ${backgroundContent}

        <UiModalRenderer
          :modals="modals"
          :is-visible="isVisible"
          :is-mobile="true"
          @close="closeModal"
        />
      </div>
    `
  })
}
