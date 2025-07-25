import type { ComponentProps } from 'vue-component-type-helpers'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import { ICONS, ICONS_LIST } from '../config/icons'
import UiIcon from '@src/components/icon/UiIcon.vue'

type IconPropsAndCustomArgs = ComponentProps<typeof UiIcon> & { color?: string }

const names = Object.keys(ICONS)

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
    size: { control: 'select', options: ['16', '20', '24', '32', '40', '48'] }
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
    name: '',
    src: ICONS_LIST[0]
  },
  argTypes: {
    color: { table: { disable: true } },
    name: { table: { disable: true } }
  }
}

const listTemplate = `
<div class="max-w-7xl">
  <h3 class="mb-6 uppercase">There are {{ names.length }} pre-defined SVG icons.</h3>
  <ul class="flex flex-wrap gap-4 mt-6 text-center text-sm leading-4">
    <li
      v-for="name in names"
      :key="name"
      class="flex flex-col gap-2 items-center justify-center"
    >
      <div class="flex w-32 h-32 items-center justify-center rounded-xl text-slate-900 ring-1 ring-inset ring-slate-900/[0.08]">
        <UiIcon :name="name" class="m-auto" />
      </div>
      <span class="text-xs">{{ name }}</span>
    </li>
  </ul>
</div>
`

export const ListOfSvgIcons: Story = {
  render: () => ({
    components: { UiIcon },
    setup: () => ({ names }),
    template: listTemplate
  }),
  parameters: {
    actions: { disable: true },
    controls: { disable: true }
  }
}
