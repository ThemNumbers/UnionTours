import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { Routes } from '../../navigation/routes'
import { observer } from 'mobx-react'
import { UnionProfileTabStackParamsList } from '../../navigation/Home/stacks/ProfileTabStack'
import { HeaderWithAction } from '../../components/HeaderWithAction'
import { SafetyCertificateIcon } from '../../components/Icons/SafetyCertificateIcon'
import { StyledPlateInfo } from '../../components/UIKit/StyledPlateInfo'
import { useTheme } from '../../theme'
import { SettingIcon } from '../../components/Icons/SettingIcon'
import { ShareIcon } from '../../components/Icons/ShareIcon'
import { AuthPlate } from './modules/AuthPlate'
import { MoonIcon } from '../../components/Icons/MoonIcon'
import { OutlinedMoonIcon } from '../../components/Icons/OutlinedMoonIcon'
import { LikeOutlinedIcon } from '../../components/Icons/LikeOutlinedIcon'
import { useModalsStore } from '../../../framework/mobx/stores'
import { DefaultModalContent } from '../../components/ModalManager/contents/DefaultModalContent'

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { marginTop: 16 },
})

interface Props {
  navigation: StackProp<UnionProfileTabStackParamsList, Routes.ProfileTabScreen>
}

const ProfileTabScreen: React.FC<Props> = observer(({ navigation }) => {
  const { theme } = useTheme()
  const { setModal } = useModalsStore()

  const onChangePriorityPress = () => {
    setModal({
      withSwipe: false,
      renderContent: (hideModal: () => void) => (
        <DefaultModalContent
          hideModal={hideModal}
          title={'Вы уверены что хотите изменить список предпочтений?'}
          leftButtonText={'Отмена'}
          rightButtonText={'Изменить'}
          onRightButtonPress={() =>
            navigation.navigate(Routes.SelectCategoriesScreen, { withBack: true })
          }
        />
      ),
    })
  }

  return (
    <View style={styles.container}>
      <HeaderWithAction title={'Профиль'} containerStyle={styles.headerContainer} />
      <ScrollView>
        <View style={{ padding: 16, flex: 1 }}>
          <AuthPlate />
          <StyledPlateInfo
            icon={<OutlinedMoonIcon color={theme.colors.cyan_6} />}
            title={'Изменить тему'}
            onPress={() => null}
          />
          <StyledPlateInfo
            icon={<SettingIcon color={theme.colors.cyan_6} />}
            title={'Push-уведомления'}
            onPress={() => navigation.navigate(Routes.PushSettingsScreen)}
          />
          <StyledPlateInfo
            icon={<ShareIcon color={theme.colors.cyan_6} />}
            title={'Поделиться приложением'}
            onPress={() => navigation.navigate(Routes.AboutAppScreen)}
          />
          <StyledPlateInfo
            icon={<LikeOutlinedIcon color={theme.colors.cyan_6} />}
            title={'Список предпочтений'}
            onPress={onChangePriorityPress}
          />
          <StyledPlateInfo
            icon={<SafetyCertificateIcon color={theme.colors.cyan_6} />}
            title={'О приложении'}
            onPress={() => navigation.navigate(Routes.AboutAppScreen)}
          />
        </View>
      </ScrollView>
    </View>
  )
})

export { ProfileTabScreen }
