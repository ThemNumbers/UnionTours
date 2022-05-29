import React, { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import { ImageOrVideo } from 'react-native-image-crop-picker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useKeyboard } from '../../../hooks/useKeyboard'
import { Theme, useThemeStyles } from '../../../theme'
import { IS_IOS } from '../../../utils/constants'
import { sleep } from '../../../utils/sleep'
import { ImageAttachmentButton } from '../../ImageAttachmentButton'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledText } from '../../UIKit/StyledText'
import { IStyledTextInputRef, StyledTextInput } from '../../UIKit/StyledTextInput'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 16,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: theme.colors.gray_1,
      justifyContent: 'flex-end',
      margin: 0,
    },
    inputContainer: {
      marginTop: 16,
      borderWidth: 0,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderRadius: 0,
      paddingHorizontal: 4,
      height: undefined,
      backgroundColor: theme.colors.gray_1,
    },
    thumb: {
      width: 64,
      height: 4,
      alignSelf: 'center',
      position: 'absolute',
      top: -12,
      borderRadius: 23,
      backgroundColor: theme.colors.gray_4,
    },
    inputWrapper: { flex: 0 },
    titleText: { color: theme.colors.gray_9, marginTop: 32, marginBottom: 16 },
    btnContainer: { marginTop: 16 },
    requiredText: { marginTop: 4, color: theme.colors.red_6, marginBottom: 16 },
    inputText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      textAlignVertical: 'bottom',
      lineHeight: 24,
    },
    imageAttachment: { backgroundColor: theme.colors.gray_2, marginTop: 16 },
    requiredInput: { borderColor: theme.colors.red_6 },
    space: { height: 16 },
  })

  return styles
}

interface Props {
  title: string
  buttonTitle: string
  requiredText?: string
  inputPlaceholder: string
  inputIsRequired?: boolean
  withAttachments?: boolean
  countAttachments?: number
  onConfirm: (input: string, attachments: Array<ImageOrVideo>) => void
  hideModal: () => void
}

const FeedbackModalContent: React.FC<Props> = ({
  title,
  inputPlaceholder,
  requiredText,
  buttonTitle,
  withAttachments,
  countAttachments,
  inputIsRequired,
  onConfirm,
  hideModal,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [selectedAttachments, setSelectedAttachments] = useState<Array<ImageOrVideo>>([])
  const [textInput, setTextInput] = useState<string>('')
  const textInputRef = React.useRef<IStyledTextInputRef | null>(null)
  const { keyboardOpened, keyboardHeight } = useKeyboard()
  const { height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const showComment = useRef<boolean>(false)
  const commentIsRequire =
    requiredText && showComment.current && inputIsRequired && !textInput.length
  const btnIsDisabled = inputIsRequired && !textInput.length ? true : false

  React.useEffect(() => {
    sleep(300).then(() => textInputRef.current && textInputRef.current.focus())
  }, [])

  const onSelectAttachment = (value?: ImageOrVideo, index?: number) => {
    setSelectedAttachments(
      value ? [...selectedAttachments, value] : selectedAttachments.filter((a, i) => i !== index)
    )
  }

  const onConfirmPress = () => {
    Keyboard.dismiss()
    onConfirm(textInput, selectedAttachments)
    hideModal()
  }

  const onChangeText = (value: string) => {
    if (!showComment.current) {
      showComment.current = true
    }
    setTextInput(value)
  }

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      enabled={IS_IOS ? false : true}
      keyboardVerticalOffset={keyboardOpened ? -insets.top : 0}
      style={styles.container}
    >
      <View style={{ maxHeight: height - keyboardHeight - insets.top - 40 }}>
        <View style={styles.thumb} />
        <StyledText size={'xl'} family={'bold'} center style={styles.titleText}>
          {title}
        </StyledText>

        <ScrollView showsVerticalScrollIndicator={false}>
          <StyledTextInput
            ref={textInputRef}
            containerStyle={styles.inputWrapper}
            inputContainerStyle={[
              styles.inputContainer,
              commentIsRequire ? styles.requiredInput : undefined,
            ]}
            textInputProps={{
              value: textInput,
              scrollEnabled: false,
              onChangeText: onChangeText,
              maxLength: 400,
              multiline: true,
              placeholder: inputPlaceholder,
              style: styles.inputText,
            }}
          />
          {commentIsRequire ? (
            <StyledText size={'xs'} family={'regular'} style={styles.requiredText}>
              {requiredText}
            </StyledText>
          ) : (
            <View style={styles.space} />
          )}

          {withAttachments &&
            selectedAttachments.map((attachment, attachmentIndex) => (
              <ImageAttachmentButton
                key={attachmentIndex}
                onSelectImage={(selectedImage) =>
                  onSelectAttachment(selectedImage, attachmentIndex)
                }
                selectedImage={attachment}
                btnTitle={'Прикрепить файл'}
                style={styles.imageAttachment}
              />
            ))}
          {withAttachments && countAttachments && selectedAttachments.length < countAttachments ? (
            <ImageAttachmentButton
              activeBtnBgColor={theme.colors.gray_2}
              activeBtnTextColor={theme.colors.blue_6}
              withoutModal
              onSelectImage={(selectedImage) => onSelectAttachment(selectedImage)}
              selectedImage={undefined}
              btnTitle={'Прикрепить файл'}
              style={styles.btnContainer}
            />
          ) : null}

          <StyledButton
            title={buttonTitle}
            disabled={btnIsDisabled}
            onPress={onConfirmPress}
            containerStyle={[styles.btnContainer, { marginBottom: insets.bottom + 16 }]}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export { FeedbackModalContent }
