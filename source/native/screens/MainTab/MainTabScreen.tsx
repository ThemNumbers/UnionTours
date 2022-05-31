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
    headerContainer: { marginTop: 16 },
    listContainer: { paddingTop: 16, flex: 1 },
    footerIndicator: { marginVertical: 24, alignSelf: 'center' },
    listStyle: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    emptyListContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  })

  return styles
}

interface Props {
  navigation: StackProp<UnionMainTabStackParamsList, Routes.MainTabScreen>
}

const MainTabScreen: React.FC<Props> = observer(() => {
  const { theme, changeBarStyle, styles } = useThemeStyles(createStyles)
  const { getToursList, tours, toursPending } = useToursStore()
  const { selectedFilters } = useFiltersStore()
  const isRequested = useRef<boolean>(false)
  const nextPageUri = false
  const { canMakeRequest } = useConnectionStatus()

  useEffect(() => {
    if (canMakeRequest) {
      getToursList()
    }
  }, [])

  const onRefresh = () => {
    console.log('res')
  }

  const renderFooter = () =>
    nextPageUri ? <StyledCircleIndicator size={32} style={styles.footerIndicator} /> : null

  const onCardPress = () => {
    console.log('on card press')
  }

  const renderItem = ({ item }: { item: Tour; index: number }) => (
    <TourItem item={item} isLast={false} onItemPress={onCardPress} key={item.id} />
  )

  const onFilterPress = () => {
    console.log('fil pres')
  }

  const filterIsActive = false

  const renderEmpty = () => (
    <PendingPreview
      icon={<SadSmileIcon color={theme.colors.gray_5} />}
      title={'Ничего не найдено'}
      description={'Измените фильтры и попробуйте снова'}
      containerStyle={styles.emptyListContainer}
    />
  )

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
          data={tours}
          style={styles.listContainer}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={tours.length ? undefined : styles.listStyle}
          ListFooterComponent={renderFooter}
          refreshing={false}
          keyExtractor={keyExtractor}
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
