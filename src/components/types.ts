import type { AccordionUi } from './accordion/theme'
import type { BadgeUi } from './badge/theme'
import type { ButtonUi } from './button/theme'
import type { CardUi } from './card/theme'
import type { CarouselUi } from './carousel/theme'
import type { CheckboxUi } from './checkbox/theme'
import type { ChipUi } from './chip/theme'
import type { CircleProgressBarUi } from './circle-progress-bar/theme'
import type { UiIcons } from './icon/config'
import type { InputUi } from './input/theme'
import type { LinkUi } from './link/theme'
import type { MenuUi } from './menu/theme'
import type { SelectUi } from './select/theme'
import type { SkeletonUi } from './skeleton/theme'
import type { TooltipUi } from './tooltip/theme'

export type Strategy = 'join' | 'merge'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined
}

export type UiProp<T> = DeepPartial<T> & { strategy?: Strategy }

interface UiConfig {
  accordion?: UiProp<AccordionUi>
  badge?: UiProp<BadgeUi>
  button?: UiProp<ButtonUi>
  card?: UiProp<CardUi>
  carousel?: UiProp<CarouselUi>
  checkbox?: UiProp<CheckboxUi>
  chip?: UiProp<ChipUi>
  circleProgressBar?: UiProp<CircleProgressBarUi>
  icon?: { strategy?: Strategy }
  link?: UiProp<LinkUi>
  menu?: UiProp<MenuUi>
  skeleton?: UiProp<SkeletonUi>
  input?: UiProp<InputUi>
  select?: UiProp<SelectUi>
  tooltip?: UiProp<TooltipUi>
}

export interface AppConfig {
  icons?: UiIcons
  ui?: UiConfig
}

export interface FormElementProps {
  name: string
  label?: string
  disabled?: boolean
  form?: string
  required?: boolean
}
