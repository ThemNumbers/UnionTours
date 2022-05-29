import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { Profile } from '../interfaces/Profile'

class ProfileStore {
  private root: RootStore
  public profile: Profile | undefined = undefined

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      profile: observable,
      login: action,
    })
    configure({
      enforceActions: 'never',
    })
  }

  public login = () => {
    // Make login
  }
}

export { ProfileStore }
