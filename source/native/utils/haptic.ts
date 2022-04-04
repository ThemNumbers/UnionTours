import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { IS_IOS } from './constants'

type HapticType = ReactNativeHapticFeedback.HapticFeedbackTypes

const options = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
}

export const triggerHaptic = (type: HapticType = IS_IOS ? 'impactLight' : 'virtualKey') =>
  ReactNativeHapticFeedback.trigger(type, options)
