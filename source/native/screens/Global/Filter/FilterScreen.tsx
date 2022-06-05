import { RouteProp } from '@react-navigation/core'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { FlatList, Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { FilterItem } from '../../../../framework/mobx/interfaces/Filters'
import { DefaultHeader } from '../../../components/DefaultHeader'
import { SearchBar } from '../../../components/SearchBar'
import { StyledButton } from '../../../components/UIKit/StyledButton'
import { StyledText } from '../../../components/UIKit/StyledText'
import { HomeStackParamsList } from '../../../navigation/Home/HomeStack'
import { Routes } from '../../../navigation/routes'
import { Theme, useThemeStyles } from '../../../theme'
import { FilterElement } from './modules/FilterElement'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    listContainer: { paddingHorizontal: 16 },
    searchContainer: { marginTop: 16, marginHorizontal: 16, marginBottom: 12 },
    footerSpace: { height: 100 },
    itemSeparator: { flex: 1, height: 1 },
    notFoundText: { color: theme.colors.gray_7 },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 48,
      justifyContent: 'center',
    },
    selectBtnContainer: {
      position: 'absolute',
      marginHorizontal: 16,
      left: 0,
      right: 0,
      bottom: 16,
      flex: 1,
    },
  })

  return styles
}

interface Props {
  route: RouteProp<HomeStackParamsList, Routes.FilterScreen>
  navigation: StackProp<HomeStackParamsList, Routes.FilterScreen>
}

const FilterScreen: React.FC<Props> = ({ route, navigation }) => {
  const { filter, onSave } = route.params
  const { theme, styles } = useThemeStyles(createStyles)
  const [values, setValues] = useState<Array<FilterItem>>(filter.filters)
  const [searchInput, setSearchInput] = useState('')

  const onSavePress = () => {
    onSave(values)
    navigation.goBack()
  }

  const onSelectValue = (item: FilterItem) => {
    const index = values.findIndex((v) => v.key === item.key)
    const shouldSelect =
      filter.type === 'select-single'
        ? values.filter((v) => v.isSelected).length === 1
          ? false
          : true
        : true
    if (shouldSelect) {
      const nextValues = [...values]
      nextValues[index].isSelected = !nextValues[index].isSelected
      setValues(nextValues)
    } else {
      const nextValues: FilterItem[] = values.map((v, idx) => ({
        ...v,
        isSelected: idx === index ? !v.isSelected : false,
      }))
      setValues(nextValues)
    }
  }

  const renderItemSeparatorComponent = () => (
    <View style={[styles.itemSeparator, { backgroundColor: theme.colors.gray_3 }]} />
  )

  const renderListFooterComponent = () => <View style={styles.footerSpace} />

  const renderItem = ({ item }: { item: FilterItem }) => (
    <FilterElement item={item} onSelect={onSelectValue} />
  )

  const filteredValues = values.filter((v) =>
    v.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <DefaultHeader title={filter.title} />
      <SearchBar
        inputProps={{ onChangeText: (value) => setSearchInput(value), value: searchInput }}
        containerStyle={styles.searchContainer}
        onCancel={() => setSearchInput('')}
        onSubmit={() => null}
      />
      {filteredValues.length === 0 ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
          <View style={styles.emptyContainer}>
            <StyledText size={'xs'} family={'regular'} center style={styles.notFoundText}>
              Ничего не найдено
            </StyledText>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <FlatList
          data={filteredValues}
          keyExtractor={(i) => `filter-value-${i.key}`}
          style={styles.listContainer}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          ListFooterComponent={renderListFooterComponent}
          renderItem={renderItem}
        />
      )}

      <StyledButton
        containerStyle={styles.selectBtnContainer}
        title={'Выбрать'}
        onPress={onSavePress}
      />
    </View>
  )
}

export { FilterScreen }
