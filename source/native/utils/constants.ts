import { getUniqueId, getVersion, isTablet } from 'react-native-device-info'
import { Platform } from 'react-native'

const IS_TABLET = isTablet()
const DEVICE_ID = getUniqueId()
const APP_VERSION = getVersion()

const IS_IOS = Platform.OS === 'ios'

const API_HOST = 'https://api.russpass.ru/cmsapi/'

const SHOULD_NOT_UPDATE = true

const DATE_FILTERS_ARRAY = ['За все время', 'За сутки', 'За неделю', 'За месяц', 'За квартал']

const keyExtractor = <T>(_item: T, index: number): string => String(index)

export {
  IS_TABLET,
  DEVICE_ID,
  APP_VERSION,
  IS_IOS,
  API_HOST,
  DATE_FILTERS_ARRAY,
  SHOULD_NOT_UPDATE,
  keyExtractor,
}
