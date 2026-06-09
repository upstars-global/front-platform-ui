const filePreviewItem = {
  base: 'w-full',
  container: 'flex items-center justify-between gap-2 p-2 w-full text-left rounded-2 border',
  infoContainer: 'flex min-w-0 flex-1 items-center gap-3',
  contentContainer: 'flex flex-1 flex-col overflow-hidden',
  fileName: 'text-caption-m leading-4 truncate ',
  fileSize: 'text-caption-s leading-4 truncate',
  removeButton: '!p-1.5 shrink-0 rounded-full transition-colors duration-200 cursor-pointer',
  removeIcon: ''
}

export type FilePreviewItemUi = typeof filePreviewItem

export default filePreviewItem
