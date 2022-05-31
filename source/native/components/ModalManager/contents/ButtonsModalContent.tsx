import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme, useThemeStyles } from '../../../theme'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { marginHorizontal: 16 },
    modalTitle: { color: theme.colors.gray_7 },
    titleContainer: {
      height: 56,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: theme.colors.gray_4,
      backgroundColor: theme.colors.gray_1,
    },
    btnContainer: {
      height: 56,
      marginTop: 8,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_1,
    },
    btnText: { color: theme.colors.cyan_6 },
  })

  return styles
}

interface ModalButton {
  title: string
  onPress: () => void
  color?: string
}

interface Props {
  title?: string
  buttons: Array<ModalButton>
  hideModal: () => void
}

const ButtonsModalContent: React.FC<Props> = ({ title, buttons, hideModal }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const insets = useSafeAreaInsets()

  const renderButton = (button: ModalButton, index: number) => {
    const btnStyle = {
      marginTop: 0,
      borderBottomColor: theme.colors.gray_4,
      borderBottomWidth: buttons.length - 1 === index ? 0 : 1,
      borderBottomRightRadius: buttons.length - 1 === index ? 8 : 0,
      borderBottomLeftRadius: buttons.length - 1 === index ? 8 : 0,
      borderTopLeftRadius: !title && index === 0 ? 8 : 0,
      borderTopRightRadius: !title && index === 0 ? 8 : 0,
    }

    const btnTextStyle = button.color ? { color: button.color } : undefined

    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          button.onPress()
          hideModal()
        }}
        activeOpacity={1}
        style={[styles.btnContainer, btnStyle]}
      >
        <StyledText size={'m'} family={'semibold'} style={[styles.btnText, btnTextStyle]}>
          {button.title}
        </StyledText>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container, { marginBottom: insets.bottom + 16 }]}>
      {title ? (
        <View style={styles.titleContainer}>
          <StyledText size={'xs'} family={'regular'} style={styles.modalTitle}>
            {title}
          </StyledText>
        </View>
      ) : null}

      {buttons.map(renderButton)}

      <TouchableOpacity onPress={hideModal} activeOpacity={1} style={styles.btnContainer}>
        <StyledText size={'m'} family={'semibold'} style={styles.btnText}>
          Отменить
        </StyledText>
      </TouchableOpacity>
    </View>
  )
}

export { ButtonsModalContent }
