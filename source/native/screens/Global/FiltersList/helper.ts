import { FilterGroup } from '../../../../framework/mobx/interfaces/Filters'

export const getFilterTitle = (group: FilterGroup) => {
  const selectedFilters = group.filters.filter((f) => f.isSelected)
  if (selectedFilters.length > 0) {
    const selectedFiltersTitles = selectedFilters.map((f) => f.title)
    return selectedFiltersTitles.length > 1
      ? selectedFiltersTitles.join(', ')
      : selectedFiltersTitles.join('')
  } else {
    return group.placeholder
  }
}
