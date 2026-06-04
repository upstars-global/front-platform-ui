const fileUpload = {
  base: 'w-full',
  container: 'flex flex-col items-center justify-center',
  description: 'text-caption-m text-center mt-4',
  states: {
    disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
  }
}

export type FileUploadUi = typeof fileUpload

export default fileUpload
