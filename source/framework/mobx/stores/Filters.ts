import { observable, makeObservable, action, configure } from 'mobx'
import { RootStore } from '.'
import { getItem, setItem, StorageKeys } from '../../services/StorageService'
import { FilterGroup } from '../interfaces/Filters'
import { initialFilters } from '../mocks/Filters'

class FiltersStore {
  private root: RootStore
  public filtersIsInitialized: boolean | undefined = undefined
  public filters: Array<FilterGroup> = []

  constructor(root: RootStore) {
    this.root = root
    makeObservable(this, {
      filters: observable,
      filtersIsInitialized: observable,
      updateFiltersList: action,
      dropFiltersList: action,
    })
    configure({
      enforceActions: 'never',
    })
    this.getFiltersList()
  }

  public updateFiltersList = (nextFilters: Array<FilterGroup>) => {
    this.filters = nextFilters
    if (!this.filtersIsInitialized) {
      this.filtersIsInitialized = true
    }
    setItem(StorageKeys.FILTERS, this.filters)
  }

  public dropFiltersList = () => {
    this.filters = this.filters.map((fc) => ({
      ...fc,
      startSliderValue: undefined,
      endSliderValue: undefined,
      filters: fc.filters.map((f) => ({ ...f, isSelected: false })),
    }))
    setItem(StorageKeys.FILTERS, this.filters)
  }

  private getFiltersList = () => {
    getItem<FilterGroup[]>(StorageKeys.FILTERS).then((nextFilters) => {
      if (nextFilters) {
        this.filters = nextFilters
        this.dropFiltersList()
        this.filtersIsInitialized = true
      } else {
        this.filters = initialFilters
        this.filtersIsInitialized = false
      }
    })
  }
}

export { FiltersStore }
