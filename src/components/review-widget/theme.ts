const reviewWidget = {
  base: 'w-full',
  container: 'flex flex-col items-center w-full gap-6 p-4 rounded-4',
  headerTitle: 'text-center text-h3 font-bold',
  imageContainer: 'flex justify-center w-24 h-24',
  image: 'w-full h-full',
  contentContainer: 'flex flex-col items-center text-center w-full gap-4',
  content: 'flex flex-col gap-2',
  title: '',
  description: 'text-body',
  contactSupportButton: 'w-full md:w-auto',
  filePreviewItem: 'max-w-[560px]',
  actionArea: 'w-full'
}

export type ReviewWidgetUi = typeof reviewWidget

export default reviewWidget
