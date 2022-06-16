import React from 'react'
import { StyleSheet } from 'react-native'
import { useModalsStore } from '../../../../framework/mobx/stores'
import { ButtonWithModal } from '../../../components/ButtonWithModal'
import { AuthModalContent } from '../../../components/ModalManager/contents/AuthModalContent'
import { ShadowView } from '../../../components/ShadowView'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { StyledText } from '../../../components/UIKit/StyledText'
import { Theme, useThemeStyles } from '../../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      marginTop: 24,
      marginBottom: 32,
      padding: 24,
      backgroundColor: theme.colors.gray_1,
    },
    title: { color: theme.colors.gray_9 },
    desc: { color: theme.colors.gray_8, marginTop: 12 },
    btnContainer: { marginTop: 16 },
  })

  return styles
}

const AuthPlate: React.FC = () => {
  const { styles } = useThemeStyles(createStyles)
  const { setModal } = useModalsStore()

  const onConfirm = (data: { comment: string; attachments: Array<any> }) => {
    return Promise.resolve()
  }

  const onAuthPress = () => {
    setModal({
      withSwipe: true,
      renderContent: (hideModal: () => void) => <AuthModalContent hideModal={hideModal} />,
    })
  }

  return (
    <ShadowView type={'light'} style={styles.container}>
      <StyledText size={'l'} family={'bold'} style={styles.title}>
        Войдите в профиль
      </StyledText>
      <StyledText size={'s'} family={'regular'} style={styles.desc}>
        Чтобы иметь возможность бронировать места, а также синхронизировать список избранного и
        предпочтений на всех устройствах
      </StyledText>
      <StyledButton title={'Войти'} onPress={onAuthPress} containerStyle={styles.btnContainer} />
    </ShadowView>
  )
}

export { AuthPlate }
