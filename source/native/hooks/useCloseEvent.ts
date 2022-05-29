import { useNavigation } from '@react-navigation/core'
import { useEffect } from 'react'

export const useCloseEvent = (callback: () => void) => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      callback()
      return
    })

    return () => {
      navigation.removeListener('beforeRemove', () => {})
    }
  }, [callback, navigation])
}
