import React, { useEffect } from 'react'
import { enableScreens } from 'react-native-screens'
import { StoresProvider } from './source/framework/mobx/stores'
import { AppContainer } from './source/native/navigation'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from './source/native/theme'
import { AlertManager } from './source/native/components/AlertManager'
import { ModalManager } from './source/native/components/ModalManager'
import { LogBox } from 'react-native'
import { analytics } from './source/framework/services/AnalyticService'

enableScreens(true)

const App: React.FC = () => {
  useEffect(() => {
    // TODO: FIX THIS
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
      'EventEmitter.removeListener',
      '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
      'new NativeEventEmitter',
      // See: https://github.com/react-navigation/react-navigation/issues/7839
      'Sending `onAnimatedValueUpdate` with no listeners registered.',
    ])

    analytics.logEvent(analytics.AnalyticTypes.START_APP)
  }, [])

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StoresProvider>
        <ThemeProvider>
          <AlertManager />
          <ModalManager />
          <AppContainer />
        </ThemeProvider>
      </StoresProvider>
    </SafeAreaProvider>
  )
}

export { App }
