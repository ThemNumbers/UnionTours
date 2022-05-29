/* eslint-disable no-console */
import crashlytics from '@react-native-firebase/crashlytics'
import firebaseAnalytics from '@react-native-firebase/analytics'
import { IS_PROD } from '../utils/constants'

const logScreenView = (name: string) => {
  firebaseAnalytics().logScreenView({ screen_name: name })
}

const setUserId = (userId: string) => {
  firebaseAnalytics().setUserId(userId)
  crashlytics().setUserId(userId)
}

const logEvent = (evt: string, data?: Object) => {
  if (IS_PROD) {
    firebaseAnalytics().logEvent(evt, data)
  } else {
    console.log('-----------LOG EVENT----------')
    console.log(`EVENT: [${evt}]`)
    console.log('------------------------------')
  }
}

const logError = (errorString: string) => {
  crashlytics().recordError(new Error(errorString), errorString)
}

const analytics = {
  setUserId,
  logScreenView,
  logEvent,
}

export { analytics, logError }
