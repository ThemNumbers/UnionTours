import React, { useRef, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useDebounce } from '../../hooks/useDebounce'
import { Theme, useThemeStyles } from '../../theme'
import { sleep } from '../../utils/sleep'
import { BackArrowIcon } from '../Icons/BackArrowIcon'
import { CloseIcon } from '../Icons/CloseIcon'
import { SearchIcon } from '../Icons/SearchIcon'
import { StyledText } from '../UIKit/StyledText'
import { IStyledTextInputRef, StyledTextInput } from '../UIKit/StyledTextInput'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', flexDirection: 'row', maxHeight: 32 },
    title: { color: theme.colors.gray_9, marginLeft: 16, position: 'absolute' },
    btnContainer: { height: '100%', alignItems: 'center', justifyContent: 'center' },
    leftBtnPosition: { paddingLeft: 16 },
    rightBtnPosition: { paddingRight: 16 },
    clearFieldBtn: { paddingLeft: 8 },
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
      paddingLeft: 16,
      color: theme.colors.gray_9,
    },
    inputWrapper: {
      flexDirection: 'row',
      marginLeft: 20,
      marginRight: 16,
      alignItems: 'flex-end',
      flex: 1,
    },
  })

  return styles
}

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  title: string
  inputProps?: TextInputProps
  placeholder?: string
  onFocus?: () => void
  onBlur?: () => void
  onSubmit?: (value: string) => void
}

const HeaderWithSearch: React.FC<Props> = ({
  title,
  containerStyle,
  inputProps,
  placeholder,
  onBlur,
  onFocus,
  onSubmit,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [searchValue, setSearchValue] = useState<string>('')
  const anim = useSharedValue(0)
  const inputRef = useRef<IStyledTextInputRef | null>(null)
  const onClearFieldPress = () => onInputChange('')
  const ANIM_DURATION = 400
  const debounce = useDebounce(500)

  const animatedInputStyle = useAnimatedStyle(() => ({
    width: `${interpolate(anim.value, [0, 1], [0, 100])}%`,
    opacity: anim.value,
  }))

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(anim.value, [0, 0.3, 1], [1, 0, 0]),
    width: `${interpolate(anim.value, [0, 1], [100, 0])}%`,
  }))

  const animatedRightBtnStyle = useAnimatedStyle(() => ({
    width: interpolate(anim.value, [0, 1], [40, 0]),
    opacity: interpolate(anim.value, [0, 1], [1, 0]),
  }))

  const animatedLeftBtnStyle = useAnimatedStyle(() => ({
    width: interpolate(anim.value, [0, 1], [0, 40]),
    opacity: anim.value,
  }))

  const onOpenSearchBar = () => {
    anim.value = withTiming(1, { duration: ANIM_DURATION })
    sleep(500).then(() => inputRef.current && inputRef.current.focus())
  }

  const onCloseSearchBar = () => {
    inputRef.current && inputRef.current.blur()
    anim.value = withTiming(0, { duration: ANIM_DURATION })
    sleep(500).then(onClearFieldPress)
  }

  const onInputChange = (value: string) => {
    const nextValue = value === ' ' ? value.replace(/\s/g, '') : value
    setSearchValue(nextValue)
    debounce(() => onSubmit && onSubmit(nextValue))
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={animatedLeftBtnStyle}>
        <TouchableOpacity
          style={[styles.btnContainer, styles.leftBtnPosition]}
          onPress={onCloseSearchBar}
        >
          <BackArrowIcon color={theme.colors.gray_9} />
        </TouchableOpacity>
      </Animated.View>

      <StyledText
        size={'xl'}
        family={'bold'}
        animatedStyle={animatedTextStyle}
        style={styles.title}
      >
        {title}
      </StyledText>

      <View style={styles.inputWrapper}>
        <Animated.View style={animatedInputStyle}>
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
              value: searchValue,
              onChangeText: onInputChange,
              style: styles.inputText,
              ...inputProps,
            }}
            leftOption={<SearchIcon size={16} color={theme.colors.gray_7} />}
            rightOption={
              searchValue.length ? (
                <TouchableOpacity style={styles.clearFieldBtn} onPress={onClearFieldPress}>
                  <CloseIcon size={16} color={theme.colors.gray_8} />
                </TouchableOpacity>
              ) : undefined
            }
          />
        </Animated.View>
      </View>

      <Animated.View style={animatedRightBtnStyle}>
        <TouchableOpacity
          style={[styles.btnContainer, styles.rightBtnPosition]}
          onPress={onOpenSearchBar}
        >
          <SearchIcon color={theme.colors.gray_7} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

export { HeaderWithSearch }
