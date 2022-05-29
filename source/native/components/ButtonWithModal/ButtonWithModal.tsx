import React, { useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { showCustomModal } from '../../utils/showModal'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import { useIsMounted } from '../../hooks/useIsMounted'
import { ButtonsModalContent } from '../ModalManager/contents/ButtonsModalContent'
import { DefaultModalContent } from '../ModalManager/contents/DefaultModalContent'
import { StyledButton } from '../UIKit/StyledButton'
import { FeedbackModalContent } from '../ModalManager/contents/FeedbackModalContent'

export interface IButtonWithModal {
  title: string
  isDisabled?: boolean
  modalTitle: string
  modalLeftBtnText?: string
  modalRightBtnText?: string
  modalType?: 'comment' | 'select' | 'default'
  style?: StyleProp<ViewStyle>
  inputIsRequired?: boolean
  returnKey?: string
  requiredText?: string
  inputPlaceholder?: string
  activeBgColor?: string
  activeTextColor?: string
  withAttachments?: boolean
  countAttachments?: number
  selectModalButtons?: Array<{ title: string; key: string }>
  renderIcon?: (color: string) => React.ReactNode
  onConfirm: (data?: any) => Promise<void>
  onNavigate?: (onConfirm: (data?: any) => Promise<void>, data?: any) => void
}

interface Props {
  button: IButtonWithModal
  buttonIdx?: number
  onProcessIndex?: (index?: number) => void
}

const ButtonWithModal: React.FC<Props> = ({ buttonIdx, button, onProcessIndex }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { canMakeRequest } = useConnectionStatus()
  const isMounted = useIsMounted()
  const withSwipeModal = button.modalType === 'select' || button.modalType === 'comment'
  const selectModalButtons = button.selectModalButtons
    ? button.selectModalButtons.map((b) => ({
        title: b.title,
        onPress: () =>
          button.onNavigate
            ? button.onNavigate(processResult, { result: b.key })
            : processResult({ result: b.key, comment: '' }),
      }))
    : []

  const processLoading = (state: boolean) => {
    if (isMounted.current) {
      onProcessIndex && onProcessIndex(state ? buttonIdx : undefined)
      setIsLoading(state)
    }
  }

  const processResult = (data?: object) => {
    processLoading(true)
    return button.onConfirm(data).finally(() => processLoading(false))
  }

  const renderModalContent = (hideModal: () => void) => {
    switch (button.modalType) {
      case 'select':
        return (
          <ButtonsModalContent
            title={button.modalTitle}
            buttons={selectModalButtons}
            hideModal={hideModal}
          />
        )
      case 'comment':
        return (
          <FeedbackModalContent
            title={button.modalTitle}
            buttonTitle={button.modalRightBtnText || button.title}
            inputIsRequired={button.inputIsRequired}
            requiredText={button.requiredText}
            inputPlaceholder={button.inputPlaceholder || ''}
            withAttachments={button.withAttachments}
            countAttachments={button.countAttachments}
            hideModal={hideModal}
            onConfirm={(comment, attachments) =>
              processResult({ comment, attachments, result: button.returnKey })
            }
          />
        )
      case 'default':
        return (
          <DefaultModalContent
            hideModal={hideModal}
            title={button.modalTitle}
            leftButtonText={button.modalLeftBtnText || 'Отмена'}
            rightButtonText={button.modalRightBtnText || button.title}
            onRightButtonPress={() => processResult({ comment: '', result: button.returnKey })}
          />
        )
      default:
        return null
    }
  }

  const onButtonPress = () => {
    if (canMakeRequest) {
      if (button.modalType) {
        showCustomModal({
          withSwipe: withSwipeModal,
          renderContent: renderModalContent,
        })
      } else {
        if (button.onNavigate) {
          button.onNavigate(processResult, { result: button.returnKey })
        } else {
          processResult({ result: button.returnKey, comment: '' })
        }
      }
    }
  }

  return (
    <StyledButton
      containerStyle={button.style}
      activeBgColor={button.activeBgColor}
      renderIcon={button.renderIcon}
      activeTextColor={button.activeTextColor}
      disabled={button.isDisabled}
      loading={isLoading}
      title={button.title}
      onPress={onButtonPress}
    />
  )
}

export { ButtonWithModal }
