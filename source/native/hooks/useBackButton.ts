import { useFocusEffect } from '@react-navigation/core'
import { BackHandler } from 'react-native'

const useBackButton = (handler: () => void) => {
  useFocusEffect(() => {
    const onBackPress = () => {
      handler()
      return true
    }
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => subscription.remove()
  })
}

export { useBackButton }
