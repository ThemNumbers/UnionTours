import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { getItem, setItem, StorageKeys } from '../../services/StorageService'
import { FilterGroup, FilterItem } from '../interfaces/Filters'
import { initialFilters } from '../mocks/Filters'

class FiltersStore {
  private root: RootStore
  public filtersIsInitialized: boolean | undefined = undefined
  public filters: Array<FilterGroup> = []
  public selectedFilters: Array<FilterItem> = []

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      filters: observable,
      filtersIsInitialized: observable,
      selectedFilters: observable,
      updateFiltersList: action,
      selectFilter: action,
    })
    configure({
      enforceActions: 'never',
    })
    this.getFiltersList()
  }

  public updateFiltersList = (nextFilters: Array<FilterGroup>) => {
    this.filters = nextFilters
    this.saveFiltersList()
  }

  public selectFilter = (item: FilterItem) => {
    const filterIsSelected = this.selectedFilters.find((f) => f.key === item.key)
    if (filterIsSelected) {
      this.selectedFilters = this.selectedFilters.filter((f) => f.key !== item.key)
    } else {
      this.selectedFilters = [...this.selectedFilters, item]
    }
  }

  private saveFiltersList = () => {
    setItem(StorageKeys.FILTERS, this.filters)
  }

  private getFiltersList = () => {
    getItem<FilterGroup[]>(StorageKeys.FILTERS).then((nextFilters) => {
      if (nextFilters) {
        this.filters = nextFilters
        this.filtersIsInitialized = true
      } else {
        this.filters = initialFilters
        this.filtersIsInitialized = false
      }
    })
  }
}

export { FiltersStore }
