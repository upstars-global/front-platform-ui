const loader = {
  base: 'relative mx-auto min-h-8 min-w-8',
  svg: 'relative w-full h-full z-10',
  circle: 'stroke-current',
  states: {
    centered: 'top-1/2 -translate-y-1/2'
  }
}

export type LoaderUi = typeof loader

export default loader
