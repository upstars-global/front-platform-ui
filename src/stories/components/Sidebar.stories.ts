import type { Decorator, Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import { emitsObserver, vueRouter } from '@src/stories/utils/decorators'
import { UiSidebar } from '@src/components'
import StoryPlaceholder from '@src/stories/utils/components/StoryPlaceholder.vue'
import { getSidebarNavigation } from '../config/sidebar'

const fullScreenOverlay: Decorator = (_story, context) => ({
  setup() {
    const classes = []
    if (context.viewMode === 'docs') {
      classes.push('h-[740px]')
    }
    return { classes }
  },
  template: `<div :class="classes"><story/></div>`
})

const meta = {
  title: 'UI Kit/Sidebar',
  component: UiSidebar,
  tags: ['autodocs'],
  decorators: [emitsObserver, vueRouter(), fullScreenOverlay],
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    open: { control: 'boolean' },
    // @ts-expect-error invalid error. 'array' is correct based on docs
    navigation: { control: 'array' },
    title: { control: 'text' },
    closeIconName: { control: 'text' },
    closeIconSize: { control: 'number' },
    side: { control: 'select', options: ['left', 'right'] },
    ui: { control: 'object' }
  },
  args: {
    open: true,
    title: 'More'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiSidebar, StoryPlaceholder },
    setup: () => {
      const model = ref(args.open)
      const updateModel = (value?: boolean) => {
        model.value = value
      }
      watch(
        () => args.open,
        (value) => updateModel(value)
      )
      return { args, model, updateModel }
    },
    template: `<UiSidebar v-bind="args" v-model:open="model">
      <template #content>
        <StoryPlaceholder class="h-16 text-light">content slot</StoryPlaceholder>
      </template>
      <template #footer>
        <StoryPlaceholder class="h-16 text-light">footer slot</StoryPlaceholder>
      </template>
      <template #time>
        <StoryPlaceholder class="h-8 text-light">time slot</StoryPlaceholder>
      </template>
    </UiSidebar>`
  })
} satisfies Meta<typeof UiSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const ComponentA: Story = {
  args: {
    navigation: getSidebarNavigation(),
    variant: 'component-a'
  }
}

export const ComponentB: Story = {
  args: {
    navigation: getSidebarNavigation(true),
    variant: 'component-b'
  }
}

export const ComponentC: Story = {
  args: {
    navigation: getSidebarNavigation(false, true),
    variant: 'component-c'
  }
}

export const ComponentD: Story = {
  args: {
    navigation: getSidebarNavigation(true),
    variant: 'component-d'
  }
}
