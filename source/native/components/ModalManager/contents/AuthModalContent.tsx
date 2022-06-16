import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme, useThemeStyles } from '../../../theme'
import { GoogleIcon } from '../../Icons/GoogleIcon'
import { VKIcon } from '../../Icons/VKIcon'
import { YandexIcon } from '../../Icons/YandexIcon'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledSwitch } from '../../UIKit/StyledSwitch'
import { StyledText } from '../../UIKit/StyledText'
import { ModalContainer } from '../components/ModalContainer'
import { ModalHeader } from '../components/ModalHeader'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    desc: { color: theme.colors.gray_8, marginBottom: 12 },
    btnContainer: { marginVertical: 8, borderWidth: 1, borderColor: theme.colors.cyan_6 },
  })

  return styles
}

interface Props {
  hideModal: () => void
}

const AuthModalContent: React.FC<Props> = ({ hideModal }) => {
  const { styles, theme } = useThemeStyles(createStyles)
  const insets = useSafeAreaInsets()

  return (
    <ModalContainer>
      <ModalHeader withSeparator title={'Авторизация'} onClosePress={hideModal} />
      <View style={{ padding: 16, paddingBottom: insets.bottom + 24, width: '100%' }}>
        <StyledText size={'s'} family={'regular'} style={styles.desc}>
          Войдите, чтобы иметь возможность бронировать места, а также синхронизировать список
          избранного и предпочтений на всех устройствах
        </StyledText>
        <StyledButton
          title={'Войти через ВКонтакте'}
          onPress={() => null}
          renderIcon={(color) => <VKIcon color={color} />}
          containerStyle={styles.btnContainer}
        />
        <StyledButton
          title={'Войти через Яндекс'}
          onPress={() => null}
          renderIcon={(color) => <YandexIcon color={color} />}
          activeBgColor={theme.colors.gray_1}
          activeTextColor={theme.colors.cyan_6}
          containerStyle={styles.btnContainer}
        />
        <StyledButton
          title={'Войти через Google'}
          onPress={() => null}
          renderIcon={(color) => <GoogleIcon color={color} />}
          activeBgColor={theme.colors.gray_1}
          activeTextColor={theme.colors.cyan_6}
          containerStyle={styles.btnContainer}
        />
      </View>
    </ModalContainer>
  )
}

export { AuthModalContent }
