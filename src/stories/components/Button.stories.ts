import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { UiIconName } from '@src/components'
import UiButton from '@src/components/button/UiButton.vue'
import UiIcon from '@src/components/icon/UiIcon.vue'
import { emitsObserver } from '@src/stories/utils/decorators'
import { icons } from '@src/components/icon/config'
import { ICON_SIZE_LIST } from '../config/icons'

const variantOptions = ['primary', 'secondary', 'tertiary', 'default']
const sizeOptions = ['sm', 'md', 'lg', 'default']

const iconNames = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

const meta = {
  title: 'UI Kit/Button',
  component: UiButton,
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    size: { control: 'select', options: sizeOptions },
    variant: { control: 'select', options: variantOptions },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    isActive: { control: 'boolean' },
    leadingIconName: { control: 'select', options: iconNames },
    leadingIconSize: { control: 'select', options: ICON_SIZE_LIST },
    trailingIconName: { control: 'select', options: iconNames },
    trailingIconSize: { control: 'select', options: ICON_SIZE_LIST }
  },
  args: {
    size: 'md'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiButton },
    setup: () => ({ args }),
    template: `<UiButton v-bind="args">Button</UiButton>`
  })
} satisfies Meta<typeof UiButton>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    variant: 'primary'
  }
}

export const LeadingIcon: Story = {
  args: {
    variant: 'primary',
    leadingIconName: 'info3'
  }
}

export const TrailingIcon: Story = {
  args: {
    variant: 'primary',
    trailingIconName: 'info1'
  }
}

export const Variants: Story = {
  argTypes: {
    size: { table: { disable: true } },
    variant: { table: { disable: true } }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiButton, UiIcon },
    setup: () => ({
      args,
      options: ['icon', 'sm', 'md', 'lg'],
      variantOptions
    }),
    template: `
      <div class="grid grid-rows-5 gap-4">
        <div v-for="option in options" :key="option" class="grid grid-cols-[2rem,_repeat(4,10rem)] gap-4 items-center">
          <p class="w-6">{{ option }}</p>
          <div v-for="variant in variantOptions" :key="variant">
            <UiButton v-if="option === 'icon'" v-bind="args" class="p-2 rounded-full" size="default" :variant="variant">
              <UiIcon name="search" />
            </UiButton>
            <UiButton v-else v-bind="args" :size="option" :variant="variant">
              {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
            </UiButton>
          </div>
        </div>
      </div>
    `
  })
}
