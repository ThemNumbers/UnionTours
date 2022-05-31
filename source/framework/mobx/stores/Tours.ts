import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { callApi } from '../../services/ApiService'
import { getItem, setItem, StorageKeys } from '../../services/StorageService'
import { Pending, Tour } from '../interfaces/Tours'

class ToursStore {
  private root: RootStore
  public tours: Array<Tour> = []
  public favoriteTours: Array<Tour> = []
  public toursPending: Pending = Pending.CLEAR
  public favoritesPending: Pending = Pending.CLEAR

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      tours: observable,
      favoriteTours: observable,
      toursPending: observable,
      favoritesPending: observable,
      getToursList: action,
      makeFavorite: action,
    })
    configure({
      enforceActions: 'never',
    })
    this.getFavoriteList()
  }

  public makeFavorite = (item: Tour) => {
    const alreadyFavorite = this.favoriteTours.find((t) => t.id === item.id)
    if (alreadyFavorite) {
      this.favoriteTours = this.favoriteTours.filter((f) => f.id !== item.id)
    } else {
      this.favoriteTours = [...this.favoriteTours, item]
    }
    this.saveFavoriteList()
  }

  public getToursList = () => {
    //this.root.filters.selectedFilters
    //this.root.filters.filters.map(f => )
    this.toursPending = Pending.LOADING
    callApi<any>({ endpoint: '/catalog?language=ru&pageSize=50&query[category]=4' })
      .then((res) => {
        this.tours = res.data.items
        this.toursPending = Pending.DONE
      })
      .catch((e) => console.log(e))
  }

  private saveFavoriteList = () => {
    setItem(StorageKeys.FAVORITES, this.favoriteTours)
  }

  private getFavoriteList = () => {
    getItem<Tour[]>(StorageKeys.FAVORITES).then((nextFavorites) => {
      if (nextFavorites) {
        this.favoriteTours = nextFavorites
        this.favoritesPending = Pending.DONE
      } else {
        this.favoriteTours = []
        this.favoritesPending = Pending.EMPTY
      }
    })
  }
}

export { ToursStore }
