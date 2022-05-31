import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Theme, useThemeStyles } from '../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: 22,
      height: 22,
      borderRadius: 22,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.cyan_6,
    },
    innerCircle: {
      backgroundColor: theme.colors.cyan_6,
      borderRadius: 22,
    },
  })

  return styles
}
interface Props {
  radioState: boolean
}

const StyledRadioButton: React.FC<Props> = ({ radioState }) => {
  const { styles } = useThemeStyles(createStyles)
  const anim = useSharedValue(radioState ? 1 : 0)

  useEffect(() => {
    anim.value = withTiming(radioState ? 1 : 0, {
      duration: 200,
      easing: Easing.linear,
    })
  }, [radioState, anim])

  const innerCircleStyle = useAnimatedStyle(() => ({
    width: interpolate(anim.value, [0, 1], [0, 14], Extrapolate.CLAMP),
    height: interpolate(anim.value, [0, 1], [0, 14], Extrapolate.CLAMP),
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
    </View>
  )
}

export { StyledRadioButton }
