import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { TouchableBounce } from '../TouchableBounce'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    titleText: { marginTop: 8, color: theme.colors.gray_7 },
    btnContainer: {
      width: 48,
      height: 48,
      borderRadius: 48,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.blue_6,
    },
  })

  return styles
}
interface Props {
  title?: string
  icon: React.ReactNode
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
}

const StyledRoundButton: React.FC<Props> = ({
  title,
  icon,
  onPress,
  containerStyle,
  buttonStyle,
}) => {
  const { styles } = useThemeStyles(createStyles)

  return (
    <TouchableBounce onPress={onPress} style={[styles.container, containerStyle]}>
      <View style={[styles.btnContainer, buttonStyle]}>{icon}</View>
      {title ? (
        <StyledText size={'xs'} family={'semibold'} center style={styles.titleText}>
          {title}
        </StyledText>
      ) : null}
    </TouchableBounce>
  )
}

export { StyledRoundButton }
