import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { UiIconName, UiTabProps } from '@src/components'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiTabs from '@src/components/tabs/UiTabs.vue'
import UiTab from '@src/components/tabs/UiTab.vue'
import { ref, watch } from 'vue'

const iconsMap: { name: UiIconName; tab: UiTabProps['id'] }[] = [
  { name: 'profile', tab: 'tab-1' },
  { name: 'support', tab: 'tab-2' },
  { name: 'notificationsOff', tab: 'tab-3' }
]

const items: UiTabProps[] = [
  { id: 'tab-1', label: 'Profile' },
  { id: 'tab-2', label: 'Support' },
  { id: 'tab-3', label: 'Notifications' }
]

const meta = {
  title: 'UI Kit/Tabs',
  component: UiTabs,
  subcomponents: { UiTab },
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    activeTab: { control: 'text' },
    id: { control: 'text' },
    // @ts-expect-error invalid error. 'array' is correct based on docs
    items: { control: 'array' },
    ui: { control: 'object' }
  },
  args: {
    activeTab: 'tab-1',
    id: 'tabs',
    items
  },
  render: (args) => ({
    name: 'Story',
    components: { UiTabs },
    setup: () => {
      const model = ref(args.activeTab)
      watch(
        () => args.activeTab,
        (value) => (model.value = value)
      )
      return { args, model }
    },
    template: `<UiTabs v-bind="args" v-model:active-tab="model" class="max-w-96" />`
  })
} satisfies Meta<typeof UiTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const DisabledTab: Story = {
  args: {
    items: items.map((item) => {
      let isDisabled = false
      if (item.id === 'tab-3') {
        isDisabled = true
      }
      return { ...item, isDisabled }
    })
  }
}

export const WithLeadingIcon: Story = {
  args: {
    items: items.map((item) => ({
      ...item,
      leadingIconName: iconsMap.find((icon) => icon.tab === item.id)?.name
    }))
  }
}

export const WithTrailingIcon: Story = {
  args: {
    items: items.map((item) => ({
      ...item,
      trailingIconName: iconsMap.find((icon) => icon.tab === item.id)?.name
    }))
  }
}

export const WithContent: Story = {
  args: {
    activeTab: 'tab-2'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiTabs },
    setup: () => {
      const model = ref(args.activeTab)
      watch(
        () => args.activeTab,
        (value) => (model.value = value)
      )
      return { args, model }
    },
    template: `<UiTabs v-bind="args" v-model:active-tab="model" class="max-w-96">
      <template #content="{ item }">
        <p>This is the {{ item.label }} tab content.</p>
      </template>
    </UiTabs>`
  })
}
