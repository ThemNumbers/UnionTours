import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../../theme'
import { CheckBoxIcon } from '../Icons/CheckBoxIcon'

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

interface Props {
  checkBoxState: boolean
}

const StyledCheckBox: React.FC<Props> = ({ checkBoxState }) => {
  const { theme } = useTheme()
  const anim = useSharedValue(checkBoxState ? 1 : 0)

  useEffect(() => {
    anim.value = withTiming(checkBoxState ? 1 : 0, {
      duration: 200,
      easing: Easing.linear,
    })
  }, [checkBoxState, anim])

  const containerStyle = useAnimatedStyle(() => ({
    borderWidth: interpolate(anim.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  }))

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: anim.value }],
  }))

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: checkBoxState ? theme.colors.blue_6 : theme.colors.gray_3,
          borderColor: checkBoxState ? theme.colors.blue_6 : theme.colors.gray_5,
        },
        containerStyle,
      ]}
    >
      <Animated.View style={iconStyle}>
        <CheckBoxIcon />
      </Animated.View>
    </Animated.View>
  )
}

export { StyledCheckBox }
