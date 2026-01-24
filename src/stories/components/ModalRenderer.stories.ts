import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { inject, markRaw, defineComponent, h } from 'vue'
import UiModal from '@src/components/modal/UiModal.vue'
import UiButton from '@src/components/button/UiButton.vue'
import type { ModalItem } from '@src/components/modal-renderer/types'
import { modalManager } from '../utils/decorators'

interface ModalRendererStoryArgs {
  buttonText: string
  modalName?: string
  modalProps?: Record<string, unknown>
  disableBackdropClosing?: boolean
  openMultiple?: (openModal: (config: ModalItem) => void) => void
}

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

const meta = {
  title: 'UI Kit/ModalRenderer',
  decorators: [modalManager],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'UiModalRenderer renders a queue of modals. It should be placed in App.vue without Teleport - the consuming app handles positioning. Mobile view is automatically detected using useMediaQuery (MD breakpoint: 767px).'
      }
    }
  },
  render: (args: ModalRendererStoryArgs) => ({
    components: { UiButton },
    setup() {
      const { openModal } = inject<{ openModal: (config: ModalItem) => void; closeModal: (name: string) => void }>(
        'modalManager'
      )!

      const handleOpen = () => {
        if (args.openMultiple) {
          args.openMultiple(openModal)
        } else {
          openModal({
            name: args.modalName || 'sample-modal',
            component: markRaw(SampleModalContent),
            props: args.modalProps || {},
            disableBackdropClosing: args.disableBackdropClosing || false
          })
        }
      }

      return { handleOpen, buttonText: args.buttonText }
    },
    template: `<UiButton variant="primary" @click="handleOpen">{{ buttonText }}</UiButton>`
  })
} satisfies Meta<ModalRendererStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    buttonText: 'Open Modal',
    modalName: 'sample-modal',
    modalProps: {
      title: 'Welcome',
      message: 'This modal is rendered by UiModalRenderer. Try scrolling - it should be blocked!'
    }
  }
}

export const WithBackdropClosingDisabled: Story = {
  args: {
    buttonText: 'Open Protected Modal',
    modalName: 'protected-modal',
    modalProps: {
      title: 'Protected Modal',
      message: 'Click the Close button - backdrop click is disabled.'
    },
    disableBackdropClosing: true
  }
}

export const ModalStack: Story = {
  args: {
    buttonText: 'Open Two Modals',
    openMultiple: (openModal: (config: ModalItem) => void) => {
      openModal({
        name: 'first-modal',
        component: markRaw(SampleModalContent),
        props: {
          title: 'First Modal',
          message: 'This is the first modal. The second modal will appear on top!'
        }
      })

      setTimeout(() => {
        openModal({
          name: 'second-modal',
          component: markRaw(SampleModalContent),
          props: {
            title: 'Second Modal',
            message: 'This is the second modal on top. Close it to see the first one.'
          }
        })
      }, 100)
    }
  }
}

export const MobileTransition: Story = {
  args: {
    buttonText: 'Open Modal (Responsive Transition)',
    modalName: 'mobile-modal',
    modalProps: {
      title: 'Responsive Modal',
      message:
        'This modal automatically uses mobile slide-up transition on screens ≤767px wide. Resize your browser to see the effect!'
    }
  }
}
