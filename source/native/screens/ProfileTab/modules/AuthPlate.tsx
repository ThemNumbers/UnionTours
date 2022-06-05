import React from 'react'
import { StyleSheet } from 'react-native'
import { ButtonWithModal } from '../../../components/ButtonWithModal'
import { ShadowView } from '../../../components/ShadowView'
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

  const onConfirm = (data: { comment: string; attachments: Array<any> }) => {
    return Promise.resolve()
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
      <ButtonWithModal
        button={{
          modalType: 'comment',
          inputIsRequired: true,
          requiredText: 'Обязательное поле ввода',
          modalTitle: 'Обратная связь',
          modalRightBtnText: 'Отправить',
          inputPlaceholder: 'Расскажите о вашем пожелании или поделитесь идеей',
          withAttachments: false,
          countAttachments: 3,
          title: 'Войти',
          onConfirm: onConfirm,
          style: styles.btnContainer,
        }}
      />
    </ShadowView>
  )
}

export { AuthPlate }
