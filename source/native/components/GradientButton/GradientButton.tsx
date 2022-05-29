import React from 'react'
import { StyleProp, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { Theme, useThemeStyles } from '../../theme'
import { triggerHaptic } from '../../utils/haptic'
import { GiftIcon } from '../Icons/GiftIcon'
import { TouchableBounce } from '../TouchableBounce'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      height: 60,
      borderRadius: 16,
      marginHorizontal: 16,
      width: '100%',
      overflow: 'hidden',
    },
    gradientFill: {
      position: 'absolute',
    },
    iconWrapper: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      flexDirection: 'row',
    },
    iconContainer: {
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 36,
      backgroundColor: theme.colors.gray_1,
    },
    title: { color: theme.colors.gray_1, marginLeft: 12 },
  })

  return styles
}

interface Props {
  title: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  stopColors?: Array<string>
  icon?: React.ReactNode
}

const GradientButton: React.FC<Props> = ({
  title,
  onPress,
  containerStyle,
  stopColors = ['#FFA231', '#FFA638', '#FFAF4D', '#FAC27F'],
  icon,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const { width } = useWindowDimensions()

  const onBtnPress = () => {
    triggerHaptic()
    onPress()
  }

  return (
    <TouchableBounce onPress={onBtnPress} style={[styles.container, containerStyle]}>
      <Svg
        width={width}
        height={60}
        viewBox={`0 0 ${width} 60`}
        fill="none"
        style={styles.gradientFill}
      >
        <Rect width={width} height="60" rx="16" fill="url(#paint0_linear)" />
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="16"
            y1="89.7083"
            x2="552.331"
            y2="-289.206"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0.00537323" stopColor={stopColors[0]} />
            <Stop offset="0.315859" stopColor={stopColors[1]} />
            <Stop offset="0.454703" stopColor={stopColors[2]} stopOpacity="0.86" />
            <Stop offset="0.631577" stopColor={stopColors[3]} />
          </LinearGradient>
        </Defs>
      </Svg>
      <View style={styles.iconWrapper}>
        <View style={styles.iconContainer}>
          {icon ? icon : <GiftIcon color={theme.colors.gold_6} />}
        </View>
        <StyledText size={'m'} family={'semibold'} style={styles.title}>
          {title}
        </StyledText>
      </View>
    </TouchableBounce>
  )
}

export { GradientButton }
