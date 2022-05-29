import React, { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { Routes } from '../../navigation/routes'
import { useFocusEffect } from '@react-navigation/core'
import { Theme, useThemeStyles } from '../../theme'
import { keyExtractor } from '../../utils/constants'
import { StyledCircleIndicator } from '../../components/UIKit/StyledCircleIndicator'
import { useToursStore } from '../../../framework/mobx/stores'
import { observer } from 'mobx-react'
import { TourItem } from './modules/TourItem'
import { Tour } from '../../../framework/mobx/interfaces/Tours'
import { UnionMainTabStackParamsList } from '../../navigation/Home/stacks/MainTabStack'
import { HeaderWithAction } from '../../components/HeaderWithAction'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    headerContainer: { marginTop: 32 },
    listContainer: { paddingTop: 16, flex: 1 },
    footerIndicator: { marginVertical: 24, alignSelf: 'center' },
    footerSpace: { height: 16 },
  })

  return styles
}

interface Props {
  navigation: StackProp<UnionMainTabStackParamsList, Routes.MainTabScreen>
}

const MainTabScreen: React.FC<Props> = observer(() => {
  const { theme, changeBarStyle, styles } = useThemeStyles(createStyles)
  const { getToursList } = useToursStore()
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

  const renderItem = ({ item }: { item: Tour; index: number }) => (
    <TourItem item={item} isLast={false} onItemPress={onCardPress} key={item.id} />
  )

  return (
    <View style={styles.container}>
      <HeaderWithAction title={'Главная'} containerStyle={styles.headerContainer} />
      <FlatList
        data={[]}
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

export { MainTabScreen }
