import React from 'react'
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { triggerHaptic } from '../../utils/haptic'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1, padding: 13, alignItems: 'center', justifyContent: 'center' },
    title: { color: theme.colors.cyan_6 },
  })

  return styles
}

interface Props {
  disabled?: boolean
  title: string
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const StyledTextButton: React.FC<Props> = (props) => {
  const { styles } = useThemeStyles(createStyles)

  const onButtonPress = () => {
    triggerHaptic()
    props.onPress()
  }

  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={onButtonPress}
      style={[styles.container, props.containerStyle]}
    >
      <StyledText size={'xs'} family={'semibold'} style={[styles.title, props.textStyle]}>
        {props.title}
      </StyledText>
    </TouchableOpacity>
  )
}

export { StyledTextButton }
