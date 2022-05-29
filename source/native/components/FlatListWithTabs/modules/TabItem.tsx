import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../../../theme'
import { StyledText } from '../../UIKit/StyledText'

const styles = StyleSheet.create({
  container: { marginRight: 8 },
  text: { paddingHorizontal: 8, paddingVertical: 12 },
  plate: { height: 4, alignSelf: 'center', borderTopLeftRadius: 4, borderTopRightRadius: 4 },
})

interface Props {
  title: string
  isActive: boolean
  index: number
  onPress: (index: number) => void
}

const TabItem: React.FC<Props> = React.memo(
  ({ title, isActive, index, onPress }) => {
    const { theme } = useTheme()
    const anim = useSharedValue(isActive ? 1 : 0)
    const onTabPress = () => onPress(index)

    useEffect(() => {
      anim.value = withTiming(isActive ? 1 : 0, { duration: 200, easing: Easing.linear })
    }, [isActive, anim])

    const animatedTextStyle = useAnimatedStyle(() => ({
      color: interpolateColor(anim.value, [0, 1], [theme.colors.gray_9, theme.colors.blue_6]),
    }))

    const animatedPlateStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(anim.value, [0, 1], ['transparent', theme.colors.blue_6]),
      width: `${interpolate(anim.value, [0, 1], [0, 100])}%`,
    }))

    return (
      <TouchableOpacity onPress={onTabPress} style={styles.container}>
        <StyledText
          animatedStyle={animatedTextStyle}
          style={styles.text}
          size={'s'}
          family={'medium'}
        >
          {title}
        </StyledText>
        <Animated.View style={[styles.plate, animatedPlateStyle]} />
      </TouchableOpacity>
    )
  },
  (prevProps, nextProps) => prevProps.isActive === nextProps.isActive
)

export { TabItem }
