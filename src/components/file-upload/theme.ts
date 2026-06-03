export interface FileUploadUi {
  base?: string
  container?: string
  description?: string
  states: {
    disabled?: string
  }
}

export default {
  base: 'w-full',
  container: 'flex flex-col items-center justify-center',
  description: 'text-caption-m text-center',
  states: {
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
  }
} as FileUploadUi
