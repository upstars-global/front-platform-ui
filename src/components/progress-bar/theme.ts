const progressBar = {
  base: 'relative grid gap-1 w-full',
  progress: {
    content: 'relative font-bold text-center z-10 text-caption-s mix-blend-difference',
    trail: 'relative w-full rounded-4 m-0 overflow-hidden bg-backdrop-alt-3',
    line: 'absolute left-0 top-0 bottom-0 rounded-4 transition-all duration-500 bg-personal'
  },
  size: {
    sm: 'h-2',
    md: 'h-4'
  }
}

export type ProgressBarUi = typeof progressBar

export default progressBar
