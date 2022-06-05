import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../../theme'
import { DefaultHeader } from '../../../../components/DefaultHeader'
import { StyledSwitch } from '../../../../components/UIKit/StyledSwitch'
import { StyledText } from '../../../../components/UIKit/StyledText'
import { UnionProfileTabStackParamsList } from '../../../../navigation/Home/stacks/ProfileTabStack'
import { Routes } from '../../../../navigation/routes'
import { useConnectionStatus } from '../../../../hooks/useConnectionStatus'
import { useIsMounted } from '../../../../hooks/useIsMounted'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    itemDescText: { marginTop: 4, lineHeight: 18, color: theme.colors.gray_7 },
    listContainer: { paddingTop: 16 },
    title: { color: theme.colors.gray_9 },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginHorizontal: 16,
      marginBottom: 24,
    },
  })

  return styles
}

interface PushSettings {
  filters: boolean
  favorites: boolean
  tours: boolean
}

interface PushSettingItem {
  title: string
  description: string
  key: keyof PushSettings
  switchState: boolean
}

interface Props {
  navigation: StackProp<UnionProfileTabStackParamsList, Routes.PushSettingsScreen>
}

const PushSettingsScreen: React.FC<Props> = () => {
  const { styles } = useThemeStyles(createStyles)
  const [pushSettings, setPushSettings] = useState<PushSettings>({
    filters: false,
    favorites: true,
    tours: true,
  })

  const pushSettingsArray: Array<PushSettingItem> = [
    {
      title: 'Предпочтения',
      description: 'Уведомим о новых турах по вашим предпочтениям',
      key: 'filters',
      switchState: pushSettings.filters,
    },
    {
      title: 'Цены',
      description: 'Сообщим об изменении цен для туров в избранном',
      key: 'favorites',
      switchState: pushSettings.favorites,
    },
    {
      title: 'Туры',
      description: 'Поможем не пропустить новые интересные места к посещению',
      key: 'tours',
      switchState: pushSettings.tours,
    },
  ]

  const updatePushSetting = (key: keyof PushSettings, value: boolean) => {
    const nextPushSettings = { ...pushSettings, [key]: !value }
    setPushSettings(nextPushSettings)
    // save to local
  }

  const renderItem = ({ item }: { item: PushSettingItem }) => (
    <View style={styles.itemContainer}>
      <View style={styles.container}>
        <StyledText size={'m'} family={'semibold'} style={styles.title}>
          {item.title}
        </StyledText>
        <StyledText size={'xs'} family={'regular'} style={styles.itemDescText}>
          {item.description}
        </StyledText>
      </View>
      <StyledSwitch
        isActive={item.switchState}
        onPress={() => updatePushSetting(item.key, item.switchState)}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <DefaultHeader title={'Push-уведомления'} />
      <FlatList
        data={pushSettingsArray}
        style={styles.listContainer}
        keyExtractor={(i, ii) => `push-setting-${ii}`}
        renderItem={renderItem}
      />
    </View>
  )
}

export { PushSettingsScreen }
