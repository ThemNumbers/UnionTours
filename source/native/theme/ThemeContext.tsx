import React, { useState, useCallback, useRef } from 'react'
import { BarItem, BarsWrapper, BarsWrapperRef } from './bars/BarsWrapper'
import {
  DEFAULT_DARK_THEME,
  DEFAULT_DARK_THEME_ID,
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from './themes'

import { Theme } from './types'

type Generator<T extends object> = (theme: Theme) => T
interface ProvidedValue {
  theme: Theme
  toggleTheme: () => void
  changeBarStyle: (type: 'top' | 'bottom', bar?: BarItem) => void
}

const Context = React.createContext<ProvidedValue>({
  theme: DEFAULT_LIGHT_THEME,
  toggleTheme: () => null,
  changeBarStyle: () => null,
})

interface Props {
  initial?: Theme
}

const ThemeProvider: React.FC<Props> = React.memo((props) => {
  const [theme, setTheme] = useState<Theme>(props.initial || DEFAULT_LIGHT_THEME)
  const barsRef = useRef<BarsWrapperRef>(null)

  const changeBarStyle = useCallback((type: 'top' | 'bottom', bar?: BarItem) => {
    barsRef.current && barsRef.current.changeBarStyle(type, bar)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setTheme((currentTheme) => {
      if (currentTheme.id === DEFAULT_LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME
      }
      if (currentTheme.id === DEFAULT_DARK_THEME_ID) {
        return DEFAULT_LIGHT_THEME
      }
      return currentTheme
    })
  }, [])

  const memoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      theme,
      toggleTheme,
      changeBarStyle,
    }
    return value
  }, [theme, toggleTheme, changeBarStyle])

  return (
    <Context.Provider value={memoizedValue}>
      <BarsWrapper
        initialTopBar={{
          color: theme.colors.gray_2,
          style: 'dark-content',
        }}
        initialBottomBar={{
          color: theme.colors.gray_1,
          style: 'dark-content',
        }}
        ref={barsRef}
      >
        {props.children}
      </BarsWrapper>
    </Context.Provider>
  )
})

export { ThemeProvider }

export const useTheme = () => React.useContext(Context)

export const useThemeStyles = <T extends object>(fn: Generator<T>) => {
  const { theme, changeBarStyle, toggleTheme } = useTheme()

  const styles = React.useMemo(() => fn(theme), [fn, theme])
  return { styles, theme, changeBarStyle, toggleTheme }
}
