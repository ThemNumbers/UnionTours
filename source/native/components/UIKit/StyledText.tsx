import React from 'react'
import { Linking, StyleSheet, TextProps, TextStyle } from 'react-native'
import HyperlinkedText from 'react-native-hyperlinked-text'
import Animated from 'react-native-reanimated'
import { Theme, useThemeStyles } from '../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    xxs: { fontSize: 12, lineHeight: 16 },
    xs: { fontSize: 13, lineHeight: 24 },
    s: { fontSize: 14, lineHeight: 24 },
    m: { fontSize: 15, lineHeight: 24 },
    l: { fontSize: 18, lineHeight: 24 },
    xl: { fontSize: 22, lineHeight: 32 },
    xxl: { fontSize: 30, lineHeight: 40 },
    bold: { fontFamily: 'Inter-Bold' },
    semibold: { fontFamily: 'Inter-SemiBold' },
    regular: { fontFamily: 'Inter-Regular' },
    medium: { fontFamily: 'Inter-Medium' },
    center: { textAlign: 'center' },
    linkTextStyle: { textDecorationLine: 'underline', color: theme.colors.blue_6 },
  })

  return styles
}

type FontSizeType = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
type FontFamilyType = 'bold' | 'semibold' | 'regular' | 'medium'

interface Props extends TextProps {
  size: FontSizeType
  family: FontFamilyType
  center?: boolean
  withLinking?: boolean
  animatedStyle?: Animated.AnimatedStyleProp<TextStyle>
}

const StyledText: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { styles } = useThemeStyles(createStyles)

  const onLinkPress = (link: string) => {
    Linking.openURL(link)
  }

  return props.withLinking ? (
    <HyperlinkedText
      allowFontScaling={false}
      ellipsizeMode={'tail'}
      {...props}
      style={[
        styles[props.size],
        styles[props.family],
        props.center ? styles.center : {},
        props.style,
      ]}
      linkStyle={[styles.linkTextStyle]}
      onLinkPress={onLinkPress}
    >
      {props.children}
    </HyperlinkedText>
  ) : (
    <Animated.Text
      allowFontScaling={false}
      ellipsizeMode={'tail'}
      {...props}
      style={[
        styles[props.size],
        styles[props.family],
        props.center ? styles.center : {},
        props.style,
        props.animatedStyle,
      ]}
    >
      {props.children}
    </Animated.Text>
  )
}

export { StyledText }
