import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { Routes } from '../../navigation/routes'
import { observer } from 'mobx-react'
import { HeaderWithAction } from '../../components/HeaderWithAction'
import { UnionFavoriteTabStackParamsList } from '../../navigation/Home/stacks/FavoriteTabStack'

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { marginTop: 32 },
})

interface Props {
  navigation: StackProp<UnionFavoriteTabStackParamsList, Routes.FavoriteTabScreen>
}

const FavoriteTabScreen: React.FC<Props> = observer(() => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWithAction title={'Избранное'} containerStyle={styles.headerContainer} />
      </ScrollView>
    </View>
  )
})

export { FavoriteTabScreen }
