import { icons } from './config'

export const addIcon = (name: string, icon: string) => {
  icons[name] = icon
}

export const addIcons = (iconsSet: Record<string, string>) => {
  Object.entries(iconsSet).forEach(([name, icon]) => {
    icons[name] = icon
  })
}
