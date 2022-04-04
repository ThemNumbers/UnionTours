import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { Alert } from '../interfaces/Alerts'

class AlertsStore {
  private root: RootStore
  public alert: Alert | undefined = undefined

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      alert: observable,
      setAlert: action,
    })
    configure({
      enforceActions: 'never',
    })
  }

  public setAlert = (item: Alert | undefined) => {
    this.alert = item
  }
}

export { AlertsStore }
