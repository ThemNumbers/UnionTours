import React, { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { Routes } from '../../navigation/routes'
import { Theme, useThemeStyles } from '../../theme'
import { keyExtractor } from '../../utils/constants'
import { StyledCircleIndicator } from '../../components/UIKit/StyledCircleIndicator'
import { useFiltersStore, useToursStore } from '../../../framework/mobx/stores'
import { observer } from 'mobx-react'
import { TourItem } from './modules/TourItem'
import { Tour } from '../../../framework/mobx/interfaces/Tours'
import { UnionMainTabStackParamsList } from '../../navigation/Home/stacks/MainTabStack'
import { HeaderWithAction } from '../../components/HeaderWithAction'
import { FilterIcon } from '../../components/Icons/FilterIcon'
import { PendingPreview } from '../../components/PendingWrapper/modules/PendingPreview'
import { SadSmileIcon } from '../../components/Icons/SadSmileIcon'
import { useConnectionStatus } from '../../hooks/useConnectionStatus'
import { PendingWrapper } from '../../components/PendingWrapper'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: { marginTop: 16, paddingBottom: 16 },
    listContainer: { flex: 1 },
    footerIndicator: { marginVertical: 24, alignSelf: 'center' },
    listStyle: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    emptyListContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    separator: { flex: 1, height: 1, backgroundColor: theme.colors.gray_3, marginVertical: 16 },
  })

  return styles
}

interface Props {
  navigation: StackProp<UnionMainTabStackParamsList, Routes.MainTabScreen>
}

const MainTabScreen: React.FC<Props> = observer(({ navigation }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const { getToursList, makeFavorite, tours, favoriteTours, toursPending } = useToursStore()
  const { filters } = useFiltersStore()
  const isRequested = useRef<boolean>(false)
  const nextPageUri = false
  const { canMakeRequest } = useConnectionStatus()
  const filterIsActive = filters.some((fc) => fc.filters.some((f) => f.isSelected))

  useEffect(() => {
    if (canMakeRequest) {
      getToursList()
    }
  }, [])

  const onRefresh = () => {
    getToursList()
  }

  const renderFooter = () =>
    nextPageUri ? (
      <StyledCircleIndicator size={32} style={styles.footerIndicator} />
    ) : (
      <View style={{ height: 16 }} />
    )

  const onCardPress = (item: Tour) => {
    navigation.navigate(Routes.AboutTourScreen, { tour: item })
  }

  const onFilterPress = () => {
    navigation.navigate(Routes.FiltersListScreen, { onSave: onRefresh })
  }

  const renderItem = ({ item }: { item: Tour; index: number }) => (
    <TourItem
      item={item}
      isFavorite={favoriteTours.find((t) => t.id === item.id) ? true : false}
      onCardPress={onCardPress}
      onMakeFavorite={makeFavorite}
      key={item.id}
    />
  )

  const renderEmpty = () => (
    <PendingPreview
      icon={<SadSmileIcon color={theme.colors.gray_5} />}
      title={'Ничего не найдено'}
      description={'Измените фильтры и попробуйте снова'}
      containerStyle={styles.emptyListContainer}
    />
  )

  const renderSeparator = () => <View style={styles.separator} />
  const renderHeader = () => <View style={{ height: 8 }} />

  return (
    <View style={styles.container}>
      <HeaderWithAction
        title={'Главная'}
        containerStyle={styles.headerContainer}
        rightAction={{
          icon: FilterIcon,
          onPress: onFilterPress,
          showIndicator: filterIsActive,
        }}
      />
      <PendingWrapper
        onRefresh={onRefresh}
        refreshing={false}
        pending={toursPending}
        isConnected={canMakeRequest}
      >
        <FlatList
          data={filterIsActive ? [] : tours}
          style={styles.listContainer}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={tours.length && !filterIsActive ? undefined : styles.listStyle}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
          refreshing={false}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={renderSeparator}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          keyboardShouldPersistTaps={'handled'}
          //onEndReached={() => fetchNewsPage(selectedTags)}
          renderItem={renderItem}
        />
      </PendingWrapper>
    </View>
  )
})

export { MainTabScreen }
