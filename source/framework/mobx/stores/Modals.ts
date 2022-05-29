import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { ModalOptions } from '../interfaces/Modals'

class ModalsStore {
  private root: RootStore
  public modal: ModalOptions | undefined = undefined

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

  public setModal = (item: ModalOptions | undefined) => {
    this.modal = item
  }
}

export { ModalsStore }
