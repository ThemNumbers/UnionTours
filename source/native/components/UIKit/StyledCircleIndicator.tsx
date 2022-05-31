import React, { useEffect } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated'
import Svg, { Circle } from 'react-native-svg'
import { useTheme } from '../../theme'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)
const AnimatedSVG = Animated.createAnimatedComponent(Svg)

interface Props {
  size: number
  strokeColor?: string
  style?: StyleProp<ViewStyle>
}

const StyledCircleIndicator: React.FC<Props> = ({ size, strokeColor, style }) => {
  const progressSpin = useSharedValue(0)
  const { theme } = useTheme()
  const strokeWidth = size / 10
  const radius = (size - strokeWidth) / 2

  useEffect(() => {
    progressSpin.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.inOut(Easing.linear) }),
      -1,
      false
    )
  }, [progressSpin])

  const svgStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progressSpin.value}deg` }],
  }))

  return (
    <AnimatedSVG
      width={radius * 2 + strokeWidth}
      height={radius * 2 + strokeWidth}
      style={[svgStyle, style]}
    >
      <AnimatedCircle
        r={radius}
        x={radius + strokeWidth / 2}
        y={radius + strokeWidth / 2}
        opacity={0.2}
        stroke={strokeColor || theme.colors.cyan_6}
        strokeWidth={strokeWidth}
      />
      <AnimatedCircle
        r={radius}
        strokeLinecap={'round'}
        strokeDashoffset={((Math.PI * 2 * 100) / 85) * radius}
        strokeDasharray={`${radius * 2 * Math.PI} ${radius * 2 * Math.PI}`}
        x={radius + strokeWidth / 2}
        y={radius + strokeWidth / 2}
        stroke={strokeColor || theme.colors.cyan_6}
        strokeWidth={strokeWidth}
      />
    </AnimatedSVG>
  )
}

export { StyledCircleIndicator }
