const circleProgressBar = {
  base: 'relative flex justify-center items-center',
  svg: 'relative w-full h-full z-10',
  content: 'absolute inset-0 flex items-center justify-center rounded-full',
  progress: {
    trail: 'stroke-current',
    line: 'stroke-current transition-all duration-500'
  }
}

export type CircleProgressBarUi = typeof circleProgressBar

export default circleProgressBar
