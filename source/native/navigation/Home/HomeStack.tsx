import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../routes'
import { baseScreenOptions } from '../AppContainer'
import { HomeTabs } from './HomeTabs'
import { ImageViewerScreen } from '../../screens/Global/ImageViewer'
import { AboutTourScreen } from '../../screens/Global/AboutTour'
import { Tour } from '../../../framework/mobx/interfaces/Tours'
import { SelectCategoriesScreen } from '../../screens/Global/SelectCategories'

export type HomeStackParamsList = {
  [Routes.HomeStack]: undefined

  [Routes.SelectCategoriesScreen]: { withBack?: boolean }
  [Routes.ImageViewerScreen]: {
    images: Array<string>
    initialIndex?: number
    useFastImage?: boolean
  }
  [Routes.AboutTourScreen]: { tour: Tour }
}

const Stack = createStackNavigator<HomeStackParamsList>()

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.HomeStack} component={HomeTabs} />

    {/* THIS SHOULD PLACE SCREENS WITHOUT TAB BAR */}
    <Stack.Screen name={Routes.ImageViewerScreen} component={ImageViewerScreen} />
    <Stack.Screen name={Routes.SelectCategoriesScreen} component={SelectCategoriesScreen} />
    <Stack.Screen name={Routes.AboutTourScreen} component={AboutTourScreen} />
  </Stack.Navigator>
)

export { HomeStack }
