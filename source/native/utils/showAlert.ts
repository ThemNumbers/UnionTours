import { Alert } from '../../framework/mobx/interfaces/Alerts'
import { triggerHaptic } from './haptic'

export const showAlert = (alert: Alert) => {
  const hapticType =
    alert.type === 'error'
      ? 'notificationError'
      : alert.type === 'warning'
      ? 'notificationWarning'
      : 'notificationSuccess'
  triggerHaptic(hapticType)
  //stores.dispatch(createAlert({ ...alert, id: generateUniqId() }))
}
