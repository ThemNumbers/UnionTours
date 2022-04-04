import * as React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { HomeStack } from './stacks/HomeStack'
import RNBootSplash from 'react-native-bootsplash'
import { FCMService } from '../../framework/services/FCMService'
import { navigationRef } from './RootNavigation'

export const AppContainer: React.FC = () => {
  React.useEffect(() => {
    RNBootSplash.getVisibilityStatus().then((splashVisibleStatus) => {
      splashVisibleStatus === 'visible' && RNBootSplash.hide({ fade: true })
    })
  }, [])

  return (
    <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
      <>
        <HomeStack />
        <FCMService />
      </>
    </NavigationContainer>
  )
}
