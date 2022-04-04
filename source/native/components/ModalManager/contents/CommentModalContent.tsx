import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme, useThemeStyles } from '../../../theme'
import { IS_IOS } from '../../../utils/constants'
import { sleep } from '../../../utils/sleep'
import { useKeyboard } from '../../../hooks/useKeyboard'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledText } from '../../UIKit/StyledText'
import { IStyledTextInputRef, StyledTextInput } from '../../UIKit/StyledTextInput'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-end',
      margin: 0,
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.gray_1,
    },
    thumb: {
      width: 48,
      height: 4,
      alignSelf: 'center',
      marginTop: 8,
      borderRadius: 23,
      opacity: 0.5,
      backgroundColor: theme.colors.gray_9,
    },

    inputContainer: {
      marginTop: 20,
      borderWidth: 0,
      borderBottomWidth: 1,
      borderRadius: 0,
      marginHorizontal: 8,
      paddingHorizontal: 4,
      height: undefined,
      minHeight: 40,
      backgroundColor: theme.colors.gray_1,
    },
    titleText: { paddingHorizontal: 10, marginTop: 20, color: theme.colors.gray_9 },
    inputText: { fontFamily: 'Inter-SemiBold', textAlignVertical: 'bottom', lineHeight: 24 },
    inputWrapper: { flex: 0 },
    requiredText: { marginTop: 10, marginLeft: 8, color: theme.colors.red_6 },
    acceptBtn: { marginTop: 16 },
  })

  return styles
}
interface Props {
  title: string
  buttonTitle: string
  requiredText?: string
  inputPlaceholder: string
  inputIsRequired?: boolean
  onPress: (comment: string) => void
  hideModal: () => void
}

const CommentModalContent: React.FC<Props> = ({
  title,
  onPress,
  inputPlaceholder,
  requiredText,
  buttonTitle,
  inputIsRequired,
  hideModal,
}) => {
  const [comment, setComment] = React.useState<string>('')
  const textInputRef = React.useRef<IStyledTextInputRef | null>(null)
  const { theme, styles } = useThemeStyles(createStyles)
  const { keyboardOpened, keyboardHeight } = useKeyboard()
  const { height } = useWindowDimensions()
  const CONTENT_HEIGHT = 220
  const insets = useSafeAreaInsets()
  const freeSpace = height - keyboardHeight - CONTENT_HEIGHT - insets.top
  const commentIsRequire = requiredText && inputIsRequired && !comment.length
  const btnIsDisabled = inputIsRequired && !comment.length ? true : false

  React.useEffect(() => {
    sleep(300).then(() => textInputRef.current && textInputRef.current.focus())
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled={IS_IOS ? false : true}
      keyboardVerticalOffset={keyboardOpened ? -insets.top : 0}
      style={styles.container}
    >
      <View style={styles.thumb} />
      <StyledText size={'l'} family={'bold'} center numberOfLines={2} style={styles.titleText}>
        {title}
      </StyledText>
      <StyledTextInput
        ref={textInputRef}
        containerStyle={styles.inputWrapper}
        inputContainerStyle={[
          styles.inputContainer,
          commentIsRequire ? { borderColor: theme.colors.red_6 } : undefined,
          { maxHeight: freeSpace },
        ]}
        textInputProps={{
          value: comment,
          onChangeText: (value) => setComment(value),
          maxLength: 400,
          multiline: true,
          placeholder: inputPlaceholder,
          style: styles.inputText,
        }}
      />
      {commentIsRequire ? (
        <StyledText size={'xs'} family={'semibold'} style={styles.requiredText}>
          {requiredText}
        </StyledText>
      ) : null}
      <StyledButton
        containerStyle={[styles.acceptBtn, { marginBottom: insets.bottom + 16 }]}
        title={buttonTitle}
        disabled={btnIsDisabled}
        onPress={() => {
          Keyboard.dismiss()
          onPress(comment)
          hideModal()
        }}
      />
    </KeyboardAvoidingView>
  )
}

export { CommentModalContent }
