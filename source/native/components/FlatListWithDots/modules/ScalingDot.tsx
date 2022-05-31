import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useTheme } from '../../../theme'

const styles = StyleSheet.create({
  dotStyle: { width: 8, height: 8, borderRadius: 8, marginHorizontal: 4 },
})

interface Props {
  scrollX: Animated.SharedValue<number>
  inputRangeOffset: number
  index: number
}

const ScalingDot: React.FC<Props> = ({ scrollX, inputRangeOffset, index }) => {
  const { theme } = useTheme()
  const { width } = useWindowDimensions()
  const ACTIVE_DOT_SCALE = 1.5
  const IN_ACTIVE_DOT_COLOR = theme.colors.gray_5
  const ACTIVE_DOT_COLOR = theme.colors.cyan_6

  const inputRange = [
    (index - 1) * (width - inputRangeOffset),
    index * (width - inputRangeOffset),
    (index + 1) * (width - inputRangeOffset),
  ]

  const animatedDotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(scrollX.value, inputRange, [
      IN_ACTIVE_DOT_COLOR,
      ACTIVE_DOT_COLOR,
      IN_ACTIVE_DOT_COLOR,
    ]),
    transform: [
      {
        scale: interpolate(scrollX.value, inputRange, [1, ACTIVE_DOT_SCALE, 1], Extrapolate.CLAMP),
      },
    ],
  }))

  return <Animated.View key={`dot-${index}`} style={[styles.dotStyle, animatedDotStyle]} />
}

export { ScalingDot }
