import React from 'react'
import { View, TouchableOpacity, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { ArrowRightIcon } from '../Icons/ArrowRightIcon'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    label: { marginBottom: 8, color: theme.colors.gray_9 },
    required: { color: theme.colors.red_6 },
    field: { paddingRight: 8, flex: 1 },
    fieldContainer: {
      height: 40,
      borderRadius: 8,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.gray_3,
    },
  })

  return styles
}

interface Props {
  label?: string
  title?: string
  placeholder?: string
  labelStyle?: StyleProp<TextStyle>
  isRequired?: boolean
  containerStyle?: StyleProp<ViewStyle>
  customRightIcon?: React.ReactElement
  onPress?: () => void
}

const StyledSelectableField: React.FC<Props> = ({
  containerStyle,
  isRequired,
  labelStyle,
  label,
  title,
  placeholder,
  customRightIcon,
  onPress,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)

  return (
    <View style={containerStyle}>
      {label ? (
        <StyledText size={'m'} family={'semibold'} style={[styles.label, labelStyle]}>
          {label}
          {isRequired ? (
            <StyledText size={'m'} family={'semibold'} style={styles.required}>
              *
            </StyledText>
          ) : null}
        </StyledText>
      ) : null}

      <TouchableOpacity style={styles.fieldContainer} onPress={onPress}>
        <StyledText
          size={'m'}
          family={'regular'}
          numberOfLines={1}
          style={[styles.field, { color: title ? theme.colors.gray_9 : theme.colors.gray_6 }]}
        >
          {title || placeholder}
        </StyledText>

        {customRightIcon ? customRightIcon : <ArrowRightIcon color={theme.colors.gray_9} />}
      </TouchableOpacity>
    </View>
  )
}

export { StyledSelectableField }
