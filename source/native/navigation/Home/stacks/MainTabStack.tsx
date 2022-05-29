import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../../routes'
import { baseScreenOptions } from '../../AppContainer'
import { HomeStackParamsList } from '../HomeStack'
import { MainTabScreen } from '../../../screens/MainTab'

type MainTabStackParamsList = {
  [Routes.MainTabScreen]: undefined
}

export type UnionMainTabStackParamsList = MainTabStackParamsList & HomeStackParamsList

const Stack = createStackNavigator<UnionMainTabStackParamsList>()

const MainTabStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.MainTabScreen} component={MainTabScreen} />
  </Stack.Navigator>
)

export { MainTabStack }
