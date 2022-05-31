import React, { useEffect } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated'
import { useTheme } from '../../theme'
import { triggerHaptic } from '../../utils/haptic'
import { TouchableBounce } from '../TouchableBounce'
import { StyledCircleIndicator } from './StyledCircleIndicator'
import { StyledText } from './StyledText'

const AnimatedTouchableBounce = Animated.createAnimatedComponent(TouchableBounce)

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: { flexDirection: 'row', alignItems: 'center' },
})

interface Props {
  disabled?: boolean
  loading?: boolean
  title: string
  renderIcon?: (color: string) => React.ReactNode
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  activeBgColor?: string
  inActiveBgColor?: string
  activeTextColor?: string
  inActiveTextColor?: string
}

const StyledButton: React.FC<Props> = ({
  disabled,
  loading,
  title,
  renderIcon,
  onPress,
  containerStyle,
  activeBgColor,
  inActiveBgColor,
  activeTextColor,
  inActiveTextColor,
}) => {
  const { theme } = useTheme()
  const animLoading = useSharedValue(0)
  const animDisabled = useSharedValue(disabled ? 1 : 0)
  const bgColors = [activeBgColor || theme.colors.cyan_6, inActiveBgColor || theme.colors.gray_4]
  const currentTextColor = disabled
    ? inActiveTextColor || theme.colors.gray_6
    : activeTextColor || theme.colors.gray_1

  useEffect(() => {
    animLoading.value = withTiming(loading ? 1 : 0, {
      duration: 300,
      easing: Easing.linear,
    })
  }, [loading, animLoading])

  useEffect(() => {
    animDisabled.value = withTiming(disabled ? 1 : 0, {
      duration: 300,
      easing: Easing.linear,
    })
  }, [disabled, animDisabled])

  const onBtnPress = () => {
    triggerHaptic()
    onPress()
  }

  const contentAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animLoading.value, [0, 0.4, 1], [1, 0, 0]),
    position: 'absolute',
  }))

  const indicatorAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animLoading.value, [0, 0.6, 1], [0, 0, 1]),
    position: 'absolute',
  }))

  const containerAnimStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(animDisabled.value, [0, 1], bgColors),
  }))

  return (
    <AnimatedTouchableBounce
      testID={'styled-button'}
      disabled={disabled || loading}
      onPress={onBtnPress}
      style={[styles.container, containerAnimStyle, containerStyle]}
    >
      <Animated.View style={indicatorAnimStyle}>
        <StyledCircleIndicator strokeColor={currentTextColor} size={24} />
      </Animated.View>
      <Animated.View style={[styles.contentContainer, contentAnimStyle]}>
        {renderIcon && renderIcon(currentTextColor)}
        <StyledText
          size={'m'}
          family={'medium'}
          style={{ marginLeft: renderIcon ? 10 : 0, color: currentTextColor }}
        >
          {title}
        </StyledText>
      </Animated.View>
    </AnimatedTouchableBounce>
  )
}

export { StyledButton }
