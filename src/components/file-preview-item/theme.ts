export interface FilePreviewItemUi {
  base?: string
  container?: string
  infoContainer?: string
  contentContainer?: string
  fileName?: string
  fileSize?: string
  removeButton?: string
  removeIcon?: string
}

export default {
  base: 'w-full min-w-0',
  container: 'flex min-w-0 items-center justify-between gap-2',
  infoContainer: 'flex min-w-0 flex-1 items-center',
  contentContainer: 'flex min-w-0 flex-1 flex-col overflow-hidden',
  fileName: 'block min-w-0 truncate',
  fileSize: 'block min-w-0 truncate',
  removeButton: 'shrink-0',
  removeIcon: ''
} as FilePreviewItemUi
