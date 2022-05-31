import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Theme, useThemeStyles } from '../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: 48,
      height: 28,
      borderWidth: 1,
      padding: 1,
      borderRadius: 48,
      alignSelf: 'flex-start',
      justifyContent: 'center',
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_1,
    },
  })

  return styles
}
interface Props {
  isActive: boolean
  onPress: () => void
}

const StyledSwitch: React.FC<Props> = ({ isActive, onPress }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const anim = useSharedValue(isActive ? 1 : 0)
  const ACTIVE_BACKGROUND_COLOR = theme.colors.cyan_6
  const IN_ACTIVE_BACKGROUND_COLOR = theme.colors.gray_3
  const ACTIVE_BORDER_COLOR = theme.colors.cyan_6
  const IN_ACTIVE_BORDER_COLOR = theme.colors.gray_5

  useEffect(() => {
    anim.value = withTiming(isActive ? 1 : 0, { duration: 200, easing: Easing.linear })
  }, [isActive, anim])

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      anim.value,
      [0, 1],
      [IN_ACTIVE_BACKGROUND_COLOR, ACTIVE_BACKGROUND_COLOR]
    ),
    borderColor: interpolateColor(
      anim.value,
      [0, 1],
      [IN_ACTIVE_BORDER_COLOR, ACTIVE_BORDER_COLOR]
    ),
  }))

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(anim.value, [0, 1], [0, 20], Extrapolate.CLAMP),
      },
    ],
  }))

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.View style={[styles.circle, circleStyle]} />
      </Animated.View>
    </TouchableOpacity>
  )
}

export { StyledSwitch }
