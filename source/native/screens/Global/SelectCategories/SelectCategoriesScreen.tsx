import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { HomeStackParamsList } from '../../../navigation/Home/HomeStack'
import { Routes } from '../../../navigation/routes'
import { StyledText } from '../../../components/UIKit/StyledText'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { DefaultHeader } from '../../../components/DefaultHeader'
import { MoonIcon } from '../../../components/Icons/MoonIcon'
import { TouchableBounce } from '../../../components/TouchableBounce'
import { CopyIcon } from '../../../components/Icons/Employee/CopyIcon'
import { useAlertsStore, useFiltersStore } from '../../../../framework/mobx/stores'
import { FilterItem } from '../../../../framework/mobx/interfaces/Filters'
import { observer } from 'mobx-react'

const tags: Array<FilterItem> = [
  { value: 2, title: 'Индивидуальные', key: '611a815857f8c10019f8c8e9' },
  { value: 2, title: 'Туры выходного дня', key: '611a84db57f8c10019f8c903' },
  { value: 2, title: 'Групповые', key: '611a817f57f8c10019f8c8eb' },
  { value: 2, title: 'Недорогие', key: '611a84fe57f8c10019f8c905' },
  { value: 2, title: 'С перелетом', key: '611a836957f8c10019f8c8fa' },
  { value: 2, title: 'С проживанием', key: '6123b4a1020892001197bb4d' },
  { value: 2, title: 'Гастрономические', key: '611a7d1957f8c10019f8c8d5' },
  { value: 2, title: 'Мистические', key: 'none' },
  { value: 2, title: 'Экотуры', key: '611a827e57f8c10019f8c8f3' },
  { value: 2, title: 'Длительные', key: '611a860757f8c10019f8c913' },
  { value: 2, title: 'Выездные', key: 'none' },
  { value: 2, title: 'Популярные', key: 'none' },
  { value: 2, title: 'Необычные', key: 'none' },
  { value: 2, title: 'Автобусные', key: '611a7c8257f8c10019f8c8cd' },
  { value: 2, title: 'Пешеходные', key: 'none' },
  { value: 2, title: 'Этнотуры', key: '611a825557f8c10019f8c8f1' },
  { value: 2, title: 'Исторические', key: '611a7d6d57f8c10019f8c8d7' },
  { value: 2, title: 'Авторские', key: '611a7ea157f8c10019f8c8df' },
  { value: 2, title: 'Обзорные', key: '611a7cd057f8c10019f8c8d1' },
  { value: 2, title: 'Событийные', key: '611a822d57f8c10019f8c8ef' },
  { value: 2, title: 'С питанием', key: '611a842657f8c10019f8c8ff' },
  { value: 2, title: 'С детьми', key: '611a6d2257f8c10019f8c8aa' },
  { value: 2, title: 'Тематические', key: '611a7cf557f8c10019f8c8d3' },
  { value: 2, title: 'Романтические', key: 'none' },
]

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    titleText: { color: theme.colors.gray_7 },
    buttonSpace: { height: 24 },
    buttonContainer: { marginHorizontal: 16, marginBottom: 24 },
    tagsContainer: { flexDirection: 'row', marginTop: 24, flexWrap: 'wrap' },
    contentContainer: { padding: 16 },
    tagContainer: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 40,
      marginRight: 8,
      marginBottom: 12,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return styles
}

interface Props {
  route: RouteProp<HomeStackParamsList, Routes.SelectCategoriesScreen>
  navigation: StackProp<HomeStackParamsList, Routes.SelectCategoriesScreen>
}

const SelectCategoriesScreen: React.FC<Props> = observer(({ navigation, route }) => {
  const { theme, styles, toggleTheme } = useThemeStyles(createStyles)
  const { setAlert } = useAlertsStore()
  const { updateFiltersList, filters } = useFiltersStore()
  const { withBack } = route.params || {}
  const MAX_COUNT = 7
  const [selectedTags, setSelectedTags] = useState<Array<FilterItem>>([])
  const onSwitchThemePress = () => toggleTheme()

  const onTagPress = (item: FilterItem) => {
    const alreadySelected = selectedTags.find((t) => t.title === item.title)
    if (alreadySelected) {
      setSelectedTags(selectedTags.filter((t) => t.title !== item.title))
    } else if (selectedTags.length < MAX_COUNT) {
      setSelectedTags([...selectedTags, item])
    } else {
      setAlert({ type: 'warning', body: `Максимум можно выбрать только ${MAX_COUNT} категорий` })
    }
  }

  const onSavePress = () => {
    const nextFilters = filters.map((category) => ({
      ...category,
      filters: category.filters.map((f) => {
        const selectedFilter = selectedTags.find((t) => t.key === f.key)
        return selectedFilter || f
      }),
    }))
    updateFiltersList(nextFilters)
    if (withBack) {
      navigation.goBack()
    }
  }

  const renderTagItem = (item: FilterItem, idx: number) => {
    const isSelected = selectedTags.find((i) => i.title === item.title) ? true : false
    return (
      <TouchableBounce
        key={idx}
        onPress={() => onTagPress(item)}
        style={[
          styles.tagContainer,
          {
            borderColor: isSelected ? theme.colors.cyan_4 : theme.colors.gray_5,
            backgroundColor: isSelected ? theme.colors.cyan_1 : theme.colors.gray_3,
          },
        ]}
      >
        <StyledText
          size={'s'}
          family={'semibold'}
          style={{
            color: isSelected ? theme.colors.cyan_7 : theme.colors.gray_7,
          }}
        >
          {item.title}
        </StyledText>
      </TouchableBounce>
    )
  }

  return (
    <View style={styles.container}>
      <DefaultHeader
        hideBackButton={!withBack}
        title={'Интересы'}
        rightActions={[{ icon: MoonIcon, onPress: onSwitchThemePress }]}
      />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <StyledText size={'m'} family={'regular'} style={styles.titleText}>
            Выберите какие туры вам нравятся больше всего
          </StyledText>
          <View style={styles.tagsContainer}>{tags.map(renderTagItem)}</View>
        </View>
        <View style={styles.buttonSpace} />
      </ScrollView>
      <StyledButton
        containerStyle={styles.buttonContainer}
        disabled={selectedTags.length === 0}
        renderIcon={(color) => <CopyIcon size={24} color={color} />}
        title={`Сохранить ${selectedTags.length}/${MAX_COUNT}`}
        onPress={onSavePress}
      />
    </View>
  )
})

export { SelectCategoriesScreen }
