export interface ReviewWidgetUi {
  base?: string
  container?: string
  headerTitle?: string
  imageContainer?: string
  image?: string
  contentContainer?: string
  content?: string
  title?: string
  description?: string
  actionArea?: string
}

export default {
  base: 'w-full',
  container: 'flex flex-col items-center w-full',
  headerTitle: 'text-center',
  imageContainer: 'flex justify-center',
  image: 'w-full h-full',
  contentContainer: 'flex flex-col items-center text-center w-full',
  content: '',
  title: '',
  description: '',
  actionArea: ''
} as ReviewWidgetUi
