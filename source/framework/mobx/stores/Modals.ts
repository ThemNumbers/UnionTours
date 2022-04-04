import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { Alert } from '../interfaces/Alerts'

class ModalsStore {
  private root: RootStore
  public modal: any | undefined = undefined

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      modal: observable,
      setModal: action,
    })
    configure({
      enforceActions: 'never',
    })
  }

  public setModal = (item: Alert | undefined) => {
    this.modal = item
  }
}

export { ModalsStore }
