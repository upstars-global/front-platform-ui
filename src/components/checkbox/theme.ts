const checkbox = {
  base: 'relative flex flex-col max-w-max select-none',
  input: 'absolute top-0 left-0 opacity-0',
  container: 'flex gap-4 items-center',
  checkmark: {
    container: 'shrink-0',
    inner: 'w-full h-full border-2 rounded-1',
    checked: '',
    invalid: ''
  },
  error: 'flex gap-2',
  states: {
    disabled: 'opacity-50 cursor-not-allowed'
  }
}

export type CheckboxUi = typeof checkbox

export default checkbox
