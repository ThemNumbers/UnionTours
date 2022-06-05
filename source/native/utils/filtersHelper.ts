import { FilterGroup } from '../../framework/mobx/interfaces/Filters'

export const getFilterTitle = (filters: Array<FilterGroup>) => {
  return filters.filter((fc) => {
    const selectedFilters = fc.filters.filter((f) => f.isSelected)
    if (selectedFilters.length) {
      const selectedFiltersTitles = selectedFilters.map((f) => f.title)
      return selectedFiltersTitles.length > 1
        ? selectedFiltersTitles.join(', ')
        : selectedFilters.join('')
    } else {
      return fc.placeholder
    }
  })
}
