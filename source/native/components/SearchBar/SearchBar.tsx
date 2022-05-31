import React, { useEffect, useRef } from 'react'
import { StyleProp, ViewStyle, TextInputProps, View, StyleSheet } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { IStyledTextInputRef, StyledTextInput } from '../UIKit/StyledTextInput'
import { SearchIcon } from '../Icons/SearchIcon'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { height: 32, flexDirection: 'row', alignItems: 'center' },
    inputWrapper: { flex: 1 },
    inputContainer: {
      height: 32,
      flex: 1,
      borderRadius: 24,
      borderColor: theme.colors.gray_3,
      backgroundColor: theme.colors.gray_3,
    },
    inputText: {
      opacity: 0.7,
      fontFamily: 'Inter-SemiBold',
      fontSize: 12,
      color: theme.colors.gray_9,
    },
    cancelText: {
      fontFamily: 'Inter-SemiBold',
      fontSize: 15,
      lineHeight: 24,
      color: theme.colors.cyan_6,
    },
  })

  return styles
}

interface Props {
  inputProps: TextInputProps
  containerStyle?: StyleProp<ViewStyle>
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  onCancel?: () => void
  onSubmit?: () => void
}

const SearchBar: React.FC<Props> = ({
  inputProps,
  containerStyle,
  placeholder,
  onBlur,
  onFocus,
  onCancel,
  onSubmit,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const anim = useSharedValue(0)
  const inputRef = useRef<IStyledTextInputRef | null>(null)

  useEffect(() => {
    const toValue = inputProps.value && inputProps.value.length ? 1 : 0
    anim.value = withTiming(toValue, { duration: 300 })
  }, [inputProps.value, anim])

  const animatedStyle = useAnimatedStyle(() => ({
    width: interpolate(anim.value, [0, 1], [0, 77]),
    marginLeft: interpolate(anim.value, [0, 1], [0, 8]),
    opacity: anim.value,
  }))

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={styles.inputWrapper}>
        <StyledTextInput
          ref={inputRef}
          inputContainerStyle={styles.inputContainer}
          onFocus={onFocus}
          onBlur={onBlur}
          textInputProps={{
            placeholderTextColor: theme.colors.gray_7,
            returnKeyType: 'search',
            autoCorrect: true,
            placeholder: placeholder || 'Поиск',
            autoCapitalize: 'none',
            onSubmitEditing: onSubmit,
            style: styles.inputText,
            ...inputProps,
          }}
          rightOption={<SearchIcon color={theme.colors.gray_7} />}
        />
      </Animated.View>
      <Animated.Text
        ellipsizeMode={'tail'}
        numberOfLines={1}
        allowFontScaling={false}
        onPress={() => {
          onCancel && onCancel()
          inputRef.current && inputRef.current.blur()
        }}
        style={[styles.cancelText, animatedStyle]}
      >
        Отменить
      </Animated.Text>
    </View>
  )
}

export { SearchBar }
