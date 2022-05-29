import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../routes'
import { baseScreenOptions } from '../AppContainer'
import { SelectCategoriesScreen } from '../../screens/Global/SelectCategories'

export type CategoriesStackParamsList = {
  [Routes.SelectCategoriesScreen]: { withBack?: boolean }
}

const Stack = createStackNavigator<CategoriesStackParamsList>()

const CategoriesStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.SelectCategoriesScreen} component={SelectCategoriesScreen} />
  </Stack.Navigator>
)

export { CategoriesStack }
