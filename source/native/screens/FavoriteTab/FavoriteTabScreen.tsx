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
import { useTheme } from '../../theme'

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { marginTop: 16 },
  listContainer: { paddingTop: 16, flex: 1 },
  footerIndicator: { marginVertical: 24, alignSelf: 'center' },
  listStyle: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyListContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footerSpace: { height: 16 },
})

interface Props {
  navigation: StackProp<UnionFavoriteTabStackParamsList, Routes.FavoriteTabScreen>
}

const FavoriteTabScreen: React.FC<Props> = observer(() => {
  const { theme } = useTheme()

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

  const data: Array<any> = []

  const renderEmpty = () => (
    <PendingPreview
      icon={<OutlinedStarIcon width={64} height={64} color={theme.colors.gray_5} />}
      title={'Список пуст'}
      description={'Отмечайте места ❤️, чтобы сохранить их здесь.'}
      containerStyle={styles.emptyListContainer}
    />
  )

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
        data={data}
        style={styles.listContainer}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={data.length ? undefined : styles.listStyle}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        //onEndReached={() => fetchNewsPage(selectedTags)}
        renderItem={renderItem}
      />
    </View>
  )
})

export { FavoriteTabScreen }
