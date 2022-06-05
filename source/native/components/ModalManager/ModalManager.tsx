import React, { useEffect } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import Modal from 'react-native-modal'
import { sleep } from '../../utils/sleep'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useModalsStore } from '../../../framework/mobx/stores'
import { observer } from 'mobx-react'

const styles = StyleSheet.create({
  blurWrapper: { width: '100%', height: '100%', backgroundColor: 'transparent' },
  blur: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  swipeModalStyle: { justifyContent: 'flex-end', margin: 0 },
})

const ModalManager: React.FC = observer(() => {
  const { modal, setModal } = useModalsStore()
  const [isVisible, setIsVisible] = React.useState(false)
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (modal) {
      setIsVisible(true)
    }
  }, [modal])

  const hideModal = () => {
    setIsVisible(false)
    sleep(300).then(() => {
      Keyboard.dismiss()
      setModal(undefined)
    })
  }

  const blurBackdrop = (
    <TouchableWithoutFeedback onPress={hideModal}>
      <View style={styles.blurWrapper}>
        <BlurView style={styles.blur} blurType={'dark'} blurAmount={1} />
      </View>
    </TouchableWithoutFeedback>
  )

  const modalConfig: object =
    modal && modal.withSwipe
      ? {
          backdropOpacity: 1,
          animationIn: undefined,
          animationOut: undefined,
          animationInTiming: undefined,
          animationOutTiming: undefined,
          backdropTransitionInTiming: undefined,
          propagateSwipe: true,
          style: styles.swipeModalStyle,
        }
      : {
          backdropOpacity: 0.8,
          animationIn: 'bounceIn',
          animationOut: 'fadeOut',
          animationInTiming: 500,
          animationOutTiming: 1,
          backdropTransitionInTiming: 500,
          propagateSwipe: true,
          style: undefined,
        }

  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      backdropColor="#8F9BB3"
      avoidKeyboard
      deviceWidth={width + insets.left + insets.right}
      deviceHeight={height + insets.bottom + insets.top}
      statusBarTranslucent
      supportedOrientations={['portrait', 'landscape']}
      customBackdrop={blurBackdrop}
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      onSwipeComplete={hideModal}
      swipeDirection={modal && !modal.withSwipe ? undefined : ['down']}
      {...modalConfig}
    >
      {modal ? modal.renderContent(hideModal) : <></>}
    </Modal>
  )
})

export { ModalManager }
