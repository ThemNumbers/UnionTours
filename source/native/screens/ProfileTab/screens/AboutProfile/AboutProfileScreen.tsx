import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, View, TouchableOpacity, StyleSheet, Share, RefreshControl } from 'react-native'
import { Theme, useThemeStyles } from '../../../../theme'
import { AlertItem } from '../../../../components/AlertManager/AlertItem'
import { DefaultHeader } from '../../../../components/DefaultHeader'
import { PersonIcon } from '../../../../components/Icons/PersonIcon'
import { PlusIcon } from '../../../../components/Icons/PlusIcon'
import { LoadingImage } from '../../../../components/LoadingImage'
import { ShadowView } from '../../../../components/ShadowView'
import { TextBlockArray } from '../../../../components/TextBlockArray'
import { StyledText } from '../../../../components/UIKit/StyledText'
import { UnionProfileTabStackParamsList } from '../../../../navigation/Home/stacks/ProfileTabStack'
import { Routes } from '../../../../navigation/routes'
import { formatDate } from '../../../../utils/formatDates'
import { useConnectionStatus } from '../../../../hooks/useConnectionStatus'
import { parseFullName, formatPhoneNumber } from '../../../../utils/formatter'
import { StyledTextBlockProps } from '../../../../components/UIKit/StyledTextBlock'
import { ShareIcon } from '../../../../components/Icons/ShareIcon'
import { useProfileStore } from '../../../../../framework/mobx/stores'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    shadowWrapper: {
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      width: '100%',
      borderRadius: 16,
      padding: 16,
      backgroundColor: theme.colors.gray_1,
    },
    imageContainer: {
      width: 72,
      height: 72,
      borderRadius: 72,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_3,
    },
    editImage: {
      position: 'absolute',
      bottom: 0,
      right: -4.5,
      width: 20,
      height: 20,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.gray_1,
      backgroundColor: theme.colors.cyan_6,
    },
    contentShadowWrapper: {
      flex: 1,
      width: '100%',
      marginTop: 16,
      borderRadius: 16,
      padding: 16,
      paddingBottom: 4,
      backgroundColor: theme.colors.gray_1,
    },
    container: { flex: 1 },
    alertContainer: { paddingTop: 16, paddingBottom: 8 },
    contentContainer: { alignItems: 'center', marginTop: 16, marginHorizontal: 16 },
    image: { width: 72, height: 72, borderRadius: 72 },
    profileInfo: { marginTop: 16, color: theme.colors.gray_9 },
    position: { color: theme.colors.gray_7 },
    contacts: { marginBottom: 16 },
  })

  return styles
}

interface Props {
  navigation: StackProp<UnionProfileTabStackParamsList, Routes.AboutProfileScreen>
}

const AboutProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const { canMakeRequest } = useConnectionStatus()
  const { profile } = useProfileStore()
  const phoneExist = profile && profile.workPhones && profile.workPhones.length ? true : false

  const onSharePress = () => {
    if (profile) {
      Share.share({
        message: `${profile.fullName}\n${profile.email}\n${profile.workPhones[0] || ''}`,
      })
    }
  }

  const mainInfoArray: Array<StyledTextBlockProps | undefined> = profile
    ? [
        {
          label: 'День рождения',
          value: profile.birthDate ? formatDate(profile.birthDate, 'd MMMM') : undefined,
          selectable: true,
        },
        { label: 'Бизнес-юнит', value: profile.departmentMain, selectable: true },
        { label: 'Отдел', value: profile.department, selectable: true },
        {
          label: 'В компании с',
          value: profile.employmentDate ? formatDate(profile.employmentDate) : undefined,
          selectable: true,
        },
      ]
    : []

  const additionalInfoArray: Array<StyledTextBlockProps | undefined> = profile
    ? [
        {
          label: 'Мобильный',
          selectable: true,
          value: phoneExist ? formatPhoneNumber(profile.workPhones[0]) : undefined,
          titleRightActionText: phoneExist ? 'Редактировать' : 'Добавить',
        },
        { label: 'Email', value: profile.email, selectable: true },
      ]
    : []

  return (
    <View style={styles.container}>
      <DefaultHeader
        title={'Информация о профиле'}
        rightActions={[{ icon: ShareIcon, onPress: onSharePress }]}
      />

      <ScrollView>
        {!phoneExist ? (
          <AlertItem
            alert={{
              type: 'warning',
              title: 'Укажите телефон в контактах, чтобы коллеги могли вас найти',
            }}
            containerStyle={styles.alertContainer}
          />
        ) : null}
        <View style={styles.contentContainer}>
          <ShadowView type={'light'} style={styles.shadowWrapper}>
            <TouchableOpacity style={styles.imageContainer}>
              <LoadingImage
                useFastImage
                style={styles.image}
                resizeMode={'cover'}
                linkBrokenComponent={<PersonIcon size={40} color={theme.colors.gray_7} />}
                uri={profile && profile.photoFull ? profile.photoFull : undefined}
              />
              <View style={styles.editImage}>
                <PlusIcon size={15} />
              </View>
            </TouchableOpacity>

            {profile ? (
              <StyledText size={'l'} family={'bold'} style={styles.profileInfo}>
                {profile.lastName} {profile.firstName}
              </StyledText>
            ) : null}
            {profile ? (
              <StyledText size={'xs'} family={'semibold'} style={styles.position}>
                {profile.position || 'Не указано'}
              </StyledText>
            ) : null}
          </ShadowView>

          <ShadowView type={'light'} style={styles.contentShadowWrapper}>
            <TextBlockArray label={'Основная информация'} textsArray={mainInfoArray} />
          </ShadowView>

          <ShadowView type={'light'} style={[styles.contentShadowWrapper, styles.contacts]}>
            <TextBlockArray label={'Контакты'} textsArray={additionalInfoArray} />
          </ShadowView>
        </View>
      </ScrollView>
    </View>
  )
}

export { AboutProfileScreen }
