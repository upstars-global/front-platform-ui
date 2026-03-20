const banner = {
  base: 'block overflow-hidden',
  buttonWrapper: {
    variants: {
      default:
        'flex gap-2 items-center backdrop-blur-md absolute bottom-0 left-0 py-2 px-4 md:px-6 rounded-es-6 rounded-se-6 font-bold cursor-pointer'
    }
  },
  content: {
    variants: {
      default: 'w-1/2 py-4 pl-4 lg:py-6 lg:pl-6'
    }
  },
  imageWrapper: {
    variants: {
      default: 'w-1/2 h-full'
    }
  },
  image: {
    variants: {
      default: 'w-full h-full object-cover object-[left_center]'
    }
  },
  wrapper: {
    variants: {
      default: 'relative flex rounded-6 h-full overflow-hidden'
    }
  }
}

export type BannerUi = typeof banner

export default banner
