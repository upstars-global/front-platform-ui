const banner = {
  base: 'block relative overflow-hidden',
  buttonWrapper: {
    variants: {
      default: ''
    }
  },
  content: {
    variants: {
      default: 'w-1/2 p-4 pr-0 lg:p-6 lg:pr-0'
    }
  },
  imageWrapper: {
    variants: {
      default: 'w-1/2'
    }
  },
  wrapper: {
    variants: {
      default: 'flex rounded-6'
    }
  }
}

export type BannerUi = typeof banner

export default banner
