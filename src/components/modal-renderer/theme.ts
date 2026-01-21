const modalRenderer = {
  base: 'fixed inset-0 z-50',
  overlay: '',
  wrapper: 'min-h-full w-full flex items-end md:items-center justify-center p-0 md:p-4'
}

export type ModalRendererUi = typeof modalRenderer

export default modalRenderer
