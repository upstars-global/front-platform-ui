const stepper = {
  base: 'w-full grid grid-flow-col gap-1',
  states: {
    base: 'h-1',
    completed: '',
    active: '',
    inactive: ''
  }
}

export type StepperUi = typeof stepper

export default stepper
