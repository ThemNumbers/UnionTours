import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamsList } from '../../navigation/stacks/HomeStack'
import { Routes } from '../../navigation/routes'
import { ShadowHeader } from '../../components/ShadowHeader'

const styles = StyleSheet.create({
  container: { flex: 1 },
  check: { backgroundColor: 'red' },
})

interface IProps {
  navigation: StackNavigationProp<HomeStackParamsList, Routes.MainScreen>
}

const MainScreen: React.FC<IProps> = () => {
  const onRefresh = () => {
    console.log('res')
  }

  return (
    <View style={styles.container}>
      <ShadowHeader title={'Лента'} />
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
        <View style={{ backgroundColor: 'green', height: 300, width: 100 }} />
      </ScrollView>
    </View>
  )
}

export { MainScreen }
