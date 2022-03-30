import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { getItem, setItem, StorageKeys } from '../../services/StorageService'
import { FavoriteItem } from '../interfaces/Favorites'

enum MarkCount {
  LOW = 0.25, // Просмотр
  MIDDLE = 0.5, // Полный просмотр
  UPPER_MIDDLE = 0.75, // Просмотр с кликом на отзывы и элементы
  HIGH = 1, // В избранное
}

class PreferencesStore {
  private root: RootStore
  public preferences: Array<FavoriteItem> = []

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      preferences: observable,
      // addToFavoriteList: action,
      //  removeFromFavoriteListById: action,
    })
    configure({
      enforceActions: 'never',
    })
    //this.getFavoriteList()
  }

  // public addToFavoriteList = (item: FavoriteItem) => {
  //   this.preferences = [...this.favoritesList, item]
  //   this.saveFavoriteList()
  // }

  // public removeFromFavoriteListById = (id: number) => {
  //   this.preferences = this.favoritesList.filter((f) => f.id !== id)
  //   this.saveFavoriteList()
  // }

  // private saveFavoriteList = () => {
  //   setItem(StorageKeys.FAVORITES, this.favoritesList)
  // }

  // private getFavoriteList = () => {
  //   getItem<FavoriteItem[]>(StorageKeys.FAVORITES)
  //     .then((nextFavorites) => {
  //       if (nextFavorites) {
  //         this.favoritesList = nextFavorites
  //       } else {
  //         this.favoritesList = []
  //         // mark as empty in pending
  //       }
  //     })
  //     .catch(() => {
  //       this.favoritesList = []
  //       // mark as error in pending
  //     })
  // }
}

export { PreferencesStore }
