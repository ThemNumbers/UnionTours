import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { useKeyboard } from '../../hooks/useKeyboard'
import { StyledText } from './StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    label: { marginBottom: 8, color: theme.colors.gray_9 },
    required: { color: theme.colors.red_6 },
    inputContainer: {
      borderRadius: 8,
      borderWidth: 1,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      height: 40,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.gray_3,
    },
    input: {
      margin: 0,
      padding: 0,
      flex: 1,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      includeFontPadding: false,
      color: theme.colors.gray_9,
    },
  })

  return styles
}
export interface IStyledTextInput {
  label?: string
  labelStyle?: StyleProp<TextStyle>
  isRequired?: boolean
  textInputProps: TextInputProps
  containerStyle?: StyleProp<ViewStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  rightOption?: React.ReactNode
  leftOption?: React.ReactNode
  onFocus?: () => void
  onBlur?: () => void
}

export interface IStyledTextInputRef {
  focus: () => void
  blur: () => void
}

const StyledTextInput = forwardRef<IStyledTextInputRef, IStyledTextInput>(
  (
    {
      label,
      labelStyle,
      isRequired,
      textInputProps,
      containerStyle,
      inputContainerStyle,
      rightOption,
      leftOption,
      onBlur,
      onFocus,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    let inputRef = useRef<TextInput | null>(null)
    const { theme, styles } = useThemeStyles(createStyles)
    const { keyboardOpened } = useKeyboard()

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current && inputRef.current.focus(),
      blur: () => inputRef.current && inputRef.current.blur(),
    }))

    useEffect(() => {
      if (!keyboardOpened) {
        inputRef.current && inputRef.current.blur()
      }
    }, [keyboardOpened])

    return (
      <View style={[styles.container, containerStyle]}>
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
        <View
          style={[
            styles.inputContainer,
            { borderColor: isFocused ? theme.colors.blue_6 : theme.colors.gray_3 },
            inputContainerStyle,
          ]}
        >
          {leftOption ? leftOption : null}
          <TextInput
            ref={(textInputRef) => (inputRef.current = textInputRef)}
            placeholderTextColor={theme.colors.gray_6}
            allowFontScaling={false}
            multiline={false}
            {...textInputProps}
            onFocus={() => {
              onFocus && onFocus()
              setIsFocused(true)
            }}
            onBlur={() => {
              onBlur && onBlur()
              setIsFocused(false)
            }}
            style={[styles.input, textInputProps.style]}
          />
          {rightOption ? rightOption : null}
        </View>
      </View>
    )
  }
)

export { StyledTextInput }
