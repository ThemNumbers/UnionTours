import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { StackNavigationProp as StackProp } from '@react-navigation/stack'
import { Routes } from '../../navigation/routes'
import { observer } from 'mobx-react'
import { UnionProfileTabStackParamsList } from '../../navigation/Home/stacks/ProfileTabStack'
import { HeaderWithAction } from '../../components/HeaderWithAction'

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { marginTop: 32 },
})

interface Props {
  navigation: StackProp<UnionProfileTabStackParamsList, Routes.ProfileTabScreen>
}

const ProfileTabScreen: React.FC<Props> = observer(() => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWithAction title={'Профиль'} containerStyle={styles.headerContainer} />
      </ScrollView>
    </View>
  )
})

export { ProfileTabScreen }
