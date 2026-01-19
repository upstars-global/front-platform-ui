const stepper = {
  base: 'w-full grid grid-flow-col gap-1',
  step: {
    base: 'h-1 rounded-full',
    active: '',
    inactive: ''
  }
}

export type StepperUi = typeof stepper

export default stepper
