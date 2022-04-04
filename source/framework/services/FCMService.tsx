import React from 'react'
import messaging from '@react-native-firebase/messaging'
import { resolveData } from '../resolvers'

const getAndSendFCMToken = () => {
  return messaging()
    .requestPermission({
      alert: true,
      badge: true,
      sound: true,
    })
    .then((permission) => {
      if (permission === messaging.AuthorizationStatus.AUTHORIZED) {
        return messaging().getToken()
      }
    })
}

const clearFCMToken = () => {
  return messaging().deleteToken()
}

const FCMService: React.FC = () => {
  React.useEffect(() => {
    getAndSendFCMToken()
  }, [])

  // When the application is running in foreground!
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage((n) =>
      n.data ? resolveData(n.data, n.notification!.title, n.notification!.body) : {}
    )
    return unsubscribe
  }, [])

  // When the application is running, but in background
  React.useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp((n) =>
      n.data ? resolveData(n.data) : {}
    )
    return unsubscribe
  }, [])

  // When the application is opened from a quit state.
  React.useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((n) => (n && n.data ? resolveData(n.data) : {}))
  }, [])

  return null
}

export { FCMService, getAndSendFCMToken, clearFCMToken }
