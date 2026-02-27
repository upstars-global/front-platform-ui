import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { UiIconName } from '@src/components'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiChip from '@src/components/chip/UiChip.vue'
import UiChipGroup from '@src/components/chip/UiChipGroup.vue'
import UiChipCarousel from '@src/components/chip/UiChipCarousel.vue'
import { icons } from '@src/components/icon/config'
import { ICON_SIZE_LIST } from '../config/icons'

const iconNames = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

const meta = {
  title: 'UI Kit/Chip',
  component: UiChip,
  // @ts-expect-error omitted generic type
  subcomponents: { UiChipGroup, UiChipCarousel },
  tags: ['autodocs'],
  decorators: [emitsObserver],
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    dataTest: { control: 'text' },
    isHidden: { control: 'boolean' },
    isSpecial: { control: 'boolean' },
    isActive: { control: 'boolean' },
    count: { control: 'number' },
    leadingIconName: { control: 'select', options: iconNames },
    leadingIconSize: { control: 'select', options: ICON_SIZE_LIST },
    trailingIconName: { control: 'select', options: iconNames },
    trailingIconSize: { control: 'select', options: ICON_SIZE_LIST },
    ui: { control: 'object' }
  },
  args: {
    label: 'Chip label',
    name: 'chip',
    isHidden: false,
    isSpecial: false,
    isActive: false,
    count: 0,
    ui: { base: 'w-fit' }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiChip },
    setup: () => ({ args }),
    template: `<UiChip v-bind="args" v-show="!args.isHidden" class="max-w-44">
      <template v-if="args.count" #trailing>
        {{ args.count }}
      </template>
    </UiChip>`
  })
} satisfies Meta<typeof UiChip>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Special: Story = {
  args: {
    isSpecial: true
  }
}

export const Active: Story = {
  args: {
    isActive: true
  }
}

export const LeadingIcon: Story = {
  args: {
    isSpecial: true,
    leadingIconName: 'info1'
  }
}

export const TrailingIcon: Story = {
  args: {
    trailingIconName: 'close'
  }
}
