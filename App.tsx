import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { StoresProvider } from './source/framework/mobx/stores'
import { AppContainer } from './source/native/navigation'

const styles = StyleSheet.create({ container: { flex: 1 } })

enableScreens(true)

const App: React.FC = () => (
  <SafeAreaView>
    <StoresProvider>
      <AppContainer />
    </StoresProvider>
  </SafeAreaView>
)

export { App }