import { Theme } from '../types/ThemeTypes'
import { DEFAULT_LIGHT_THEME_COLORS, DEFAULT_LIGHT_THEME_SPACINGS } from './LightTheme'

export const DEFAULT_DARK_THEME_ID = 'default-dark'

export const DEFAULT_DARK_THEME: Theme = {
  id: DEFAULT_DARK_THEME_ID,
  colors: DEFAULT_LIGHT_THEME_COLORS,
  spacings: DEFAULT_LIGHT_THEME_SPACINGS,
}
