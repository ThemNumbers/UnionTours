import { createNavigationContainerRef, StackActions } from '@react-navigation/core'
import { sleep } from '../utils/sleep'
import { Routes } from './routes'

export const navigationRef = createNavigationContainerRef<any>()

export const navigateToDeeplink = (routeName: Routes, params?: object) => {
  if (navigationRef && navigationRef.isReady()) {
    const currentRoute = navigationRef.getCurrentRoute()
    if (currentRoute && routeName === currentRoute.name) {
      navigationRef.dispatch({ ...StackActions.push(routeName, params) })
    } else {
      navigationRef.navigate(routeName, params)
    }
  } else {
    sleep(1000).then(() => navigateToDeeplink(routeName, params))
  }
}
