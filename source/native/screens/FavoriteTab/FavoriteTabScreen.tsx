import React from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { Routes } from '../../navigation/routes'
import { observer } from 'mobx-react'
import { HeaderWithAction } from '../../components/HeaderWithAction'
import { UnionFavoriteTabStackParamsList } from '../../navigation/Home/stacks/FavoriteTabStack'
import { FilterIcon } from '../../components/Icons/FilterIcon'
import { TourItem } from '../MainTab/modules/TourItem'
import { Tour } from '../../../framework/mobx/interfaces/Tours'
import { PendingPreview } from '../../components/PendingWrapper/modules/PendingPreview'
import { OutlinedStarIcon } from '../../components/Icons/OutlinedStarIcon'
import { keyExtractor } from '../../utils/constants'
import { Theme, useTheme, useThemeStyles } from '../../theme'
import { useFiltersStore, useToursStore } from '../../../framework/mobx/stores'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: { marginTop: 16, paddingBottom: 16 },
    listContainer: { flex: 1 },
    listStyle: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    emptyListContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    separator: { flex: 1, height: 1, backgroundColor: theme.colors.gray_3, marginVertical: 16 },
  })

  return styles
}

interface Props {
  navigation: StackProp<UnionFavoriteTabStackParamsList, Routes.FavoriteTabScreen>
}

const FavoriteTabScreen: React.FC<Props> = observer(({ navigation }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const { makeFavorite, favoriteTours } = useToursStore()
  const { filters } = useFiltersStore()
  const filterIsActive = filters.some(
    (fc) => fc.filters.some((f) => f.isSelected) || fc.startSliderValue || fc.endSliderValue
  )

  const onCardPress = (item: Tour) => {
    navigation.navigate(Routes.AboutTourScreen, { tour: item })
  }

  const onFilterPress = () => {
    navigation.navigate(Routes.FiltersListScreen, { onSave: () => null })
  }

  const renderSeparator = () => <View style={styles.separator} />

  const renderEmpty = () => (
    <PendingPreview
      icon={<OutlinedStarIcon width={64} height={64} color={theme.colors.gray_5} />}
      title={'Список пуст'}
      description={'Отмечайте места ❤️, чтобы сохранить их здесь.'}
      containerStyle={styles.emptyListContainer}
    />
  )

  const renderItem = ({ item }: { item: Tour; index: number }) => (
    <TourItem
      item={item}
      isFavorite={favoriteTours.find((t) => t.id === item.id) ? true : false}
      onCardPress={onCardPress}
      onMakeFavorite={makeFavorite}
      key={item.id}
    />
  )

  const renderHeader = () => <View style={{ height: 8 }} />
  const renderFooter = () => <View style={{ height: 16 }} />

  return (
    <View style={styles.container}>
      <HeaderWithAction
        title={'Избранное'}
        containerStyle={styles.headerContainer}
        rightAction={{
          icon: FilterIcon,
          onPress: onFilterPress,
          showIndicator: filterIsActive,
        }}
      />

      <FlatList
        data={favoriteTours}
        style={styles.listContainer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={favoriteTours.length ? undefined : styles.listStyle}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        //onEndReached={() => fetchNewsPage(selectedTags)}
        renderItem={renderItem}
      />
    </View>
  )
})

export { FavoriteTabScreen }
