import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../../routes'
import { baseScreenOptions } from '../../AppContainer'
import { FavoriteTabScreen } from '../../../screens/FavoriteTab/FavoriteTabScreen'
import { HomeStackParamsList } from '../HomeStack'

type FavoriteTabStackParamsList = {
  [Routes.FavoriteTabScreen]: undefined
}

export type UnionFavoriteTabStackParamsList = FavoriteTabStackParamsList & HomeStackParamsList

const Stack = createStackNavigator<FavoriteTabStackParamsList>()

const FavoriteTabStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.FavoriteTabScreen} component={FavoriteTabScreen} />
  </Stack.Navigator>
)

export { FavoriteTabStack }
