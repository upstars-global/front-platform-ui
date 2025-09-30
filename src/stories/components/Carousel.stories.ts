import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { emitsObserver } from '@src/stories/utils/decorators'
import UiCarousel from '@src/components/carousel/UiCarousel.vue'
import CarouselNavigation from '@src/components/carousel/components/CarouselNavigation.vue'
import CarouselPagination from '@src/components/carousel/components/CarouselPagination.vue'

const meta = {
  title: 'UI Kit/Carousel',
  component: UiCarousel,
  subcomponents: { CarouselNavigation, CarouselPagination },
  decorators: [emitsObserver],
  tags: ['autodocs'],
  argTypes: {
    activeIndex: { control: 'number' },
    autoplay: { control: 'number' },
    disableFadeEffect: { control: 'boolean' },
    showPagination: { control: 'boolean' },
    showNavigation: { control: 'boolean' },
    transparentBorder: { control: 'boolean' },
    isMobile: { control: 'boolean' },
    navigation: { control: 'object' },
    ui: { control: 'object' }
  },
  args: {
    showNavigation: true,
    navigation: {
      iconPrev: 'dropdownLeft',
      iconNext: 'dropdownRight',
      iconSize: '24',
      buttonVariant: 'secondary',
      buttonSize: 'default'
    }
  },
  render: (args) => ({
    name: 'Story',
    components: { UiCarousel },
    setup: () => ({
      args,
      styles: { '--carousel-item-width': '22rem' },
      getImage: (index: number) => `https://picsum.photos/id/${index + 9}/400/300`
    }),
    template: `<UiCarousel v-bind="args" :style="styles" class="max-w-5xl">
      <div v-for="index in 10" :key="index">
        <img :src="getImage(index)" alt="image" />
      </div>
    </UiCarousel>`
  })
} satisfies Meta<typeof UiCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {}

export const Autoplay: Story = {
  args: {
    autoplay: 5000
  }
}

export const WithPagination: Story = {
  args: {
    showPagination: true
  }
}
