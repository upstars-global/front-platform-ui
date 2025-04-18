export enum ButtonColors {
  primary = 'primary',
  neutral = 'neutral',
  destructive = 'destructive'
}

export enum ButtonVariants {
  filled = 'filled',
  outline = 'outline',
  soft = 'soft',
  ghost = 'ghost'
}

export enum ButtonSizes {
  lg = 'lg',
  md = 'md',
  sm = 'sm'
}

export enum ButtonTypes {
  standard = 'standard',
  icon = 'icon',
  caption = 'caption',
  slab = 'slab',
  action = 'action'
}

export type ButtonColor = keyof typeof ButtonColors
export type ButtonVariant = keyof typeof ButtonVariants
export type ButtonSize = keyof typeof ButtonSizes
export type ButtonType = keyof typeof ButtonTypes

export interface IProps {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType

  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  fullWidthMobile?: boolean

  leadingIcon?: string
  trailingIcon?: string
  icon?: string

  label?: string
  caption?: string

  uppercase?: boolean
  initialCase?: boolean

  submit?: boolean
}

export interface IEmits {
  (event: 'click', value: MouseEvent): void
}
export interface ISlots {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default(): any
  caption(): any
}
