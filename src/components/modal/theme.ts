export const modal = {
  base: 'relative flex flex-col m-0 min-h-[320px] max-h-[80vh] md:min-w-[432px] md:max-w-[80vw]',

  states: {
    default: 'rounded-t-6 md:rounded-6',
    fullscreen:
      'h-full max-h-full rounded-none border-t-4 md:h-auto md:min-h-[320px] md:max-h-[80vh] md:rounded-6 md:border-0'
  },

  // Header
  header: 'relative flex items-center p-4',
  title: 'px-8 text-center',
  description: 'px-5 text-center',

  // Close button
  closeButton: 'absolute top-4 right-4 size-6',
  closeIcon: 'size-4',

  content: 'flex-1 overflow-y-auto p-4 md:p-6',
  footer: 'flex flex-col gap-4 p-4'
}

export type ModalUi = typeof modal

export const modalRenderer = {
  base: 'fixed inset-0 z-50',
  overlay: '',
  wrapper: 'min-h-full w-full flex items-end md:items-center justify-center p-0 md:p-4'
}
export type ModalRendererUi = typeof modalRenderer

export default modal
