import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { FilterGroup } from '../../../../framework/mobx/interfaces/Filters'
import { useFiltersStore } from '../../../../framework/mobx/stores'
import { DefaultHeader } from '../../../components/DefaultHeader'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { StyledSelectableField } from '../../../components/UIKit/StyledSelectableField'
import { HomeStackParamsList } from '../../../navigation/Home/HomeStack'
import { Routes } from '../../../navigation/routes'
import { Theme, useThemeStyles } from '../../../theme'
import { getFilterTitle } from './helper'
import { FilterSlider } from './modules/FilterSlider'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    listStyle: { paddingTop: 16, paddingHorizontal: 16 },
    footerContainer: { paddingHorizontal: 16, paddingBottom: 16 },
    showBtnContainer: { marginTop: 12 },
    dropBtnContainer: { marginTop: 16 },
    fieldContainer: { marginBottom: 16 },
  })

  return styles
}
interface Props {
  route: RouteProp<HomeStackParamsList, Routes.FiltersListScreen>
  navigation: StackProp<HomeStackParamsList, Routes.FiltersListScreen>
}

const FiltersListScreen: React.FC<Props> = observer(({ navigation, route }) => {
  const { onSave } = route.params
  const { theme, styles } = useThemeStyles(createStyles)
  const { filters, updateFiltersList, dropFiltersList } = useFiltersStore()
  const [unsavedFilters, setUnsavedFilters] = useState<FilterGroup[]>(filters)

  const onSavePress = () => {
    updateFiltersList(unsavedFilters)
    onSave()
    navigation.goBack()
  }

  const onDropPress = () => {
    dropFiltersList()
    onSave()
    navigation.goBack()
  }

  const onFieldPress = (item: FilterGroup, index: number) => {
    navigation.navigate(Routes.FilterScreen, {
      filter: item,
      onSave: (nextFilters) => {
        const newFiltersList = [...unsavedFilters]
        newFiltersList[index].filters = nextFilters
        setUnsavedFilters(newFiltersList)
      },
    })
  }

  const saveSliderValue = (index: number, low: number, high: number) => {
    const newFiltersList = [...unsavedFilters]
    newFiltersList[index].startSliderValue = low
    newFiltersList[index].endSliderValue = high
    setUnsavedFilters(newFiltersList)
  }

  const renderItem = ({ item, index }: { item: FilterGroup; index: number }) =>
    item.type === 'slider' ? (
      <FilterSlider onSave={(low, high) => saveSliderValue(index, low, high)} item={item} />
    ) : (
      <StyledSelectableField
        label={item.title}
        containerStyle={styles.fieldContainer}
        title={getFilterTitle(item)}
        onPress={() => onFieldPress(item, index)}
      />
    )

  return (
    <View style={styles.container}>
      <DefaultHeader title={'Фильтр'} />

      <FlatList
        data={unsavedFilters}
        keyExtractor={(item) => item.key}
        style={styles.listStyle}
        renderItem={renderItem}
      />

      <View style={styles.footerContainer}>
        <StyledButton
          containerStyle={styles.showBtnContainer}
          title={'Сохранить и показать'}
          onPress={onSavePress}
        />
        <StyledButton
          title={'Сбросить все'}
          onPress={onDropPress}
          activeBgColor={theme.colors.gray_2}
          activeTextColor={theme.colors.cyan_6}
          containerStyle={styles.dropBtnContainer}
        />
      </View>
    </View>
  )
})

export { FiltersListScreen }
