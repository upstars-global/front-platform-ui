const carousel = {
  base: 'group/carousel relative flex items-center overflow-hidden w-full',
  list: 'carousel-gap carousel-grid-cols carousel-auto-cols w-full h-full relative grid grid-flow-col overflow-x-scroll overflow-y-hidden z-1 snap-x snap-mandatory',
  item: '',
  navigation: {
    container:
      'flex items-center opacity-0 invisible group-hover/carousel:md:opacity-100 group-hover/carousel:md:visible',
    button: 'absolute p-2 rounded-full m-auto transition-all duration-300 ease-easing opacity-100 visible z-10',
    prev: 'left-4',
    next: 'right-4'
  },
  pagination: {
    container: 'absolute bottom-0 w-full text-center z-10',
    inner: 'inline-flex mx-auto',
    item: 'w-6 h-6 p-2 bg-clip-content border-0 rounded-full outline-none outline-0 appearance-none cursor-pointer',
    active: ''
  }
}

export type CarouselUi = typeof carousel
export type CarouselNavigationUi = typeof carousel.navigation
export type CarouselPaginationUi = typeof carousel.pagination

export default carousel
