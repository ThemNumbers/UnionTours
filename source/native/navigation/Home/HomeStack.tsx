import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from '../routes'
import { baseScreenOptions } from '../AppContainer'
import { HomeTabs } from './HomeTabs'
import { ImageViewerScreen } from '../../screens/Global/ImageViewer'
import { AboutTourScreen } from '../../screens/Global/AboutTour'
import { Tour } from '../../../framework/mobx/interfaces/Tours'
import { SelectCategoriesScreen } from '../../screens/Global/SelectCategories'
import { FiltersListScreen } from '../../screens/Global/FiltersList'
import { FilterScreen } from '../../screens/Global/Filter'
import { FilterGroup, FilterItem } from '../../../framework/mobx/interfaces/Filters'

export type HomeStackParamsList = {
  [Routes.HomeStack]: undefined

  [Routes.SelectCategoriesScreen]: { withBack?: boolean }
  [Routes.ImageViewerScreen]: {
    images: Array<string>
    initialIndex?: number
    useFastImage?: boolean
  }
  [Routes.AboutTourScreen]: { tour: Tour }
  [Routes.FiltersListScreen]: {
    onSave: () => void
  }
  [Routes.FilterScreen]: {
    filter: FilterGroup
    onSave: (filters: Array<FilterItem>) => void
  }
}

const Stack = createStackNavigator<HomeStackParamsList>()

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={baseScreenOptions}>
    <Stack.Screen name={Routes.HomeStack} component={HomeTabs} />

    {/* THIS SHOULD PLACE SCREENS WITHOUT TAB BAR */}
    <Stack.Screen name={Routes.ImageViewerScreen} component={ImageViewerScreen} />
    {/* <Stack.Screen name={Routes.SelectCategoriesScreen} component={SelectCategoriesScreen} /> */}
    <Stack.Screen name={Routes.AboutTourScreen} component={AboutTourScreen} />
    <Stack.Screen name={Routes.FiltersListScreen} component={FiltersListScreen} />
    <Stack.Screen name={Routes.FilterScreen} component={FilterScreen} />
  </Stack.Navigator>
)

export { HomeStack }
