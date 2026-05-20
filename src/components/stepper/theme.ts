const stepper = {
  base: 'w-full grid grid-flow-col gap-1',
  states: {
    base: 'h-1 rounded-full',
    completed: 'bg-primary-20 opacity-50',
    active: 'bg-primary-20',
    inactive: ''
  }
}

export type StepperUi = typeof stepper

export default stepper
