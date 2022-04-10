import React, { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamsList } from '../../navigation/stacks/HomeStack'
import { Routes } from '../../navigation/routes'
import { ShadowHeader } from '../../components/ShadowHeader'
import { useFocusEffect } from '@react-navigation/core'
import { Theme, useThemeStyles } from '../../theme'
import { keyExtractor } from '../../utils/constants'
import { StyledCircleIndicator } from '../../components/UIKit/StyledCircleIndicator'
import { Hotel } from '../../../framework/mobx/interfaces/Tours'
import { useToursStore } from '../../../framework/mobx/stores'
import { observer } from 'mobx-react'
import { TourItem } from './modules/TourItem'
import { FilterIcon } from '../../components/Icons/FilterIcon'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    listContainer: { paddingTop: 16, flex: 1 },
    footerIndicator: { marginVertical: 24, alignSelf: 'center' },
    footerSpace: { height: 16 },
  })

  return styles
}

interface IProps {
  navigation: StackNavigationProp<HomeStackParamsList, Routes.MainScreen>
}

const MainScreen: React.FC<IProps> = observer(() => {
  const { theme, changeBarStyle, styles } = useThemeStyles(createStyles)
  const { hotels, getToursList } = useToursStore()
  const isRequested = useRef<boolean>(false)
  const nextPageUri = true

  useFocusEffect(() => {
    changeBarStyle('top', { color: theme.colors.gray_1, style: 'dark-content' })

    return () => {
      changeBarStyle('top')
    }
  })

  useEffect(() => {
    getToursList()
  }, [])

  const onRefresh = () => {
    console.log('res')
  }

  const renderFooter = () =>
    nextPageUri ? (
      <StyledCircleIndicator size={32} style={styles.footerIndicator} />
    ) : (
      <View style={styles.footerSpace} />
    )

  const onCardPress = () => {
    console.log('on card press')
  }

  const renderItem = ({ item }: { item: Hotel; index: number }) => (
    <TourItem item={item} isLast={false} onNewsPress={onCardPress} key={item.id} />
  )

  return (
    <View style={styles.container}>
      <ShadowHeader title={'Лента'} onButtonPress={() => null} btnIcon={<FilterIcon />} />
      <FlatList
        data={hotels}
        style={styles.listContainer}
        ListFooterComponent={renderFooter}
        refreshing={false}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        keyboardShouldPersistTaps={'handled'}
        //onEndReached={() => fetchNewsPage(selectedTags)}
        renderItem={renderItem}
      />
    </View>
  )
})

export { MainScreen }
