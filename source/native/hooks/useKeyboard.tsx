import React, { useState } from 'react'
import { Keyboard, KeyboardEvent } from 'react-native'

const useKeyboard = (): { keyboardOpened: boolean; keyboardHeight: number } => {
  const [keyboardOptions, setKeyboardOptions] = useState({
    keyboardOpened: false,
    keyboardHeight: 0,
  })

  const keyboardWillShow = (e?: KeyboardEvent) =>
    setKeyboardOptions({
      keyboardHeight: e && e.endCoordinates ? e.endCoordinates.height : 0,
      keyboardOpened: true,
    })
  const keyboardWillHide = () => setKeyboardOptions({ keyboardOpened: false, keyboardHeight: 0 })

  React.useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', keyboardWillShow)
    return () => {
      keyboardWillShowSub.remove()
    }
  }, [])

  React.useEffect(() => {
    const keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', keyboardWillHide)
    return () => {
      keyboardWillHideSub.remove()
    }
  }, [])

  return keyboardOptions
}

export { useKeyboard }
