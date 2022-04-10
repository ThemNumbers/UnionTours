import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { ConnectionStatus, useConnectionStatus } from '../../hooks/useConnectionStatus'
import { BarItem, BarRef } from './BarsWrapper'
import { StyledText } from '../../components/UIKit/StyledText'
import { Theme } from '../types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar, SystemBarStyle } from 'react-native-bars'
import { useThemeStyles } from '../ThemeContext'
import { sleep } from '../../utils/sleep'

interface ConnectionStatusConfig {
  text: string
  textStyle: 'light' | 'dark'
  barStyle: 'red' | 'yellow' | 'green'
  barTextStyle: SystemBarStyle
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden' },
    text: { paddingBottom: 12, textAlign: 'center' },
    light: { color: theme.colors.gray_1 },
    dark: { color: theme.colors.gray_9 },
    red: { backgroundColor: theme.colors.red_6 },
    yellow: { backgroundColor: theme.colors.yellow_6 },
    green: { backgroundColor: theme.colors.green_6 },
  })

  return styles
}

export const getConnectionStatusConfig = (status: ConnectionStatus): ConnectionStatusConfig => {
  switch (status) {
    case ConnectionStatus.GOOD:
    case ConnectionStatus.UNKNOWN:
      return {
        text: 'Связь установлена',
        textStyle: 'light',
        barStyle: 'green',
        barTextStyle: 'light-content',
      }
    case ConnectionStatus.BAD:
      return {
        text: 'Интернет недоступен',
        textStyle: 'light',
        barStyle: 'red',
        barTextStyle: 'light-content',
      }
    case ConnectionStatus.NORMAL:
      return {
        text: 'Интернет нестабилен',
        textStyle: 'dark',
        barStyle: 'yellow',
        barTextStyle: 'dark-content',
      }
  }
}

interface Props {
  initialBar: BarItem
}

const TopBar = React.forwardRef<BarRef, Props>(({ initialBar }, ref) => {
  const { styles } = useThemeStyles(createStyles)
  const [currentBar, setCurrentBar] = useState<BarItem>(initialBar)
  const [showNetworkBar, setShowNetworkBar] = useState<boolean>(false)
  const insets = useSafeAreaInsets()
  const { connectionStatus } = useConnectionStatus()
  const networkBar = getConnectionStatusConfig(connectionStatus)
  const animHeight = useSharedValue(0)

  React.useImperativeHandle(ref, () => ({
    changeBar: (nextBar?: BarItem) =>
      setCurrentBar((prev) => {
        const prevStatusBar = prev.prev || initialBar
        return nextBar ? { ...nextBar, prev } : prevStatusBar
      }),
  }))

  useEffect(() => {
    const goodNetworkArray = [ConnectionStatus.GOOD, ConnectionStatus.UNKNOWN]
    const animToValue = goodNetworkArray.some((i) => i === connectionStatus) ? 0 : 32
    if (animToValue !== animHeight.value) {
      if (animToValue === 32) {
        setShowNetworkBar(true)
        animHeight.value = withTiming(animToValue, { duration: 350 })
      } else {
        sleep(1350).then(() => setShowNetworkBar(false))
        animHeight.value = withDelay(1000, withTiming(animToValue, { duration: 350 }))
      }
    }
  }, [animHeight, connectionStatus])

  const contentStyle = useAnimatedStyle(() => ({
    height: animHeight.value + insets.top,
  }))

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animHeight.value, [0, 12, 32], [0, 0, 1]),
  }))

  return (
    <Animated.View
      style={[
        styles.container,
        contentStyle,
        showNetworkBar ? styles[networkBar.barStyle] : { backgroundColor: currentBar.color },
      ]}
    >
      <View style={{ height: insets.top }} />
      {showNetworkBar ? (
        <StyledText
          size={'xs'}
          family={'semibold'}
          style={[styles.text, styles[networkBar.textStyle]]}
          animatedStyle={textStyle}
        >
          {networkBar.text}
        </StyledText>
      ) : null}
      <StatusBar barStyle={showNetworkBar ? networkBar.barTextStyle : currentBar.style} />
    </Animated.View>
  )
})

export { TopBar }
