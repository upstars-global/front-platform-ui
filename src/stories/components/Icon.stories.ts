import type { ComponentProps } from 'vue-component-type-helpers'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import { ICONS_LIST, ICON_SIZE_LIST } from '../config/icons'
import UiIcon from '@src/components/icon/UiIcon.vue'
import { icons, type UiIconName } from '@src/components/icon/config'

type IconPropsAndCustomArgs = ComponentProps<typeof UiIcon> & { color?: string }

const names = Object.keys(icons).sort((a, b) => a.localeCompare(b)) as UiIconName[]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI Kit/Icon',
  component: UiIcon,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    name: { control: 'select', options: names },
    src: { control: 'select', options: ICONS_LIST },
    size: { control: 'select', options: ICON_SIZE_LIST },
    ui: { control: 'object' }
  },
  args: {
    color: '#222',
    size: '48'
  },
  render: (args) => ({
    name: 'Story',
    components: { UiIcon },
    setup: () => {
      return {
        args: computed(() => {
          return {
            ...args,
            style: { color: args.color }
          }
        })
      }
    },
    template: `<UiIcon v-bind="args" />`
  })
} satisfies Meta<IconPropsAndCustomArgs>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const SvgIcon: Story = {
  args: {
    name: names[0],
    src: ''
  },
  argTypes: {
    src: { table: { disable: true } }
  }
}

export const ImageIcon: Story = {
  args: {
    src: ICONS_LIST[0]
  },
  argTypes: {
    color: { table: { disable: true } },
    name: { table: { disable: true } }
  }
}
