import React, { useEffect } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import RNBootSplash from 'react-native-bootsplash'
import { StackNavigationOptions, TransitionPresets } from '@react-navigation/stack'
import { HomeStack } from './Home/HomeStack'
import { CategoriesStack } from './Categories/CategoriesStack'
import { FCMService } from '../../framework/services/FCMService'
import { navigateToDeeplink, navigationRef } from './RootNavigation'
import { useFiltersStore } from '../../framework/mobx/stores'
import { Routes } from './routes'
import { observer } from 'mobx-react'
import { sleep } from '../utils/sleep'

export const baseScreenOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
  cardStyle: { backgroundColor: '#FFFFFF' },
  detachPreviousScreen: false,
}

export const AppContainer: React.FC = observer(() => {
  const { filtersIsInitialized } = useFiltersStore()

  // TODO: Uncomment later
  // useDeeplinks((params) => {
  //   if (params && params['+clicked_branch_link']) {
  //     resolveData(params)
  //   }
  // })

  useEffect(() => {
    if (filtersIsInitialized !== undefined) {
      sleep(200).then(() => {
        RNBootSplash.getVisibilityStatus().then((splashVisibleStatus) => {
          splashVisibleStatus === 'visible' && RNBootSplash.hide({ fade: true })
        })
      })
    }
  }, [filtersIsInitialized])

  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
      {filtersIsInitialized === true ? (
        <>
          <HomeStack />
          <FCMService />
        </>
      ) : filtersIsInitialized !== undefined ? (
        <CategoriesStack />
      ) : null}
    </NavigationContainer>
  )
})
