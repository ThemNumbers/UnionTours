import { FamiliarizationType, FilterList } from '../../framework/redux/interfaces/Todo'
import { addDays, addMonths, addYears, isBefore, subDays, subMonths, subYears } from 'date-fns'
import { isBetweenDates } from './formatDates'

export const getNewFilersList = (data: Array<any>, filtersList: Array<FilterList>) => {
  let newFiltersList = [...filtersList]
  data.forEach((d: any) => {
    newFiltersList = newFiltersList.map((filter) => ({
      ...filter,
      items: d[filter.key] && !filter.static ? [...filter.items, d[filter.key]] : filter.items,
    }))
  })

  newFiltersList = newFiltersList.map((f) => ({
    ...f,
    items: f.items.filter((i, ii, s) => s.indexOf(i) === ii),
  }))
  return newFiltersList
}

const getDiffDate = (date: string, isDeadline: boolean) => {
  switch (date) {
    case 'За сутки':
      return isDeadline ? addDays(new Date(), 1) : subDays(new Date(), 1)
    case 'За неделю':
      return isDeadline ? addDays(new Date(), 7) : subDays(new Date(), 7)
    case 'За месяц':
      return isDeadline ? addMonths(new Date(), 1) : subMonths(new Date(), 1)
    case 'За квартал':
      return isDeadline ? addMonths(new Date(), 3) : subMonths(new Date(), 3)
    default:
      return isDeadline ? addYears(new Date(), 1) : subYears(new Date(), 1)
  }
}

const getFamiliarizationType = (category: string) => {
  switch (category) {
    case 'Результат согласования':
      return FamiliarizationType.Approvement
    case 'Результат рассмотрения':
      return FamiliarizationType.Considerations
    case 'Результат утверждения':
      return FamiliarizationType.Approvals
    case 'Ознакомление':
      return FamiliarizationType.Default
    default:
      return ''
  }
}

export const getDataWithFilters = (data: Array<any>, filters: Array<FilterList>) => {
  return data.filter((d: any) => {
    const filterSort = filters.map((f) => {
      if (f.selectedIdx && f.selectedIdx.length) {
        if (
          f.key === 'date' ||
          f.key === 'deadline' ||
          f.key === 'creationDate' ||
          f.key === 'startDate' ||
          f.key === 'dateModified'
        ) {
          const selectedDate = f.items[f.selectedIdx[0]]
          const isDeadline = f.key === 'deadline'
          const diffDate = getDiffDate(selectedDate, isDeadline)
          const startDate = isDeadline ? new Date() : diffDate
          const endDate = isDeadline ? diffDate : new Date()
          const isOverdue = isDeadline && isBefore(new Date(d[f.key]), startDate)

          return d[f.key] ? isBetweenDates(startDate, endDate, d[f.key]) || isOverdue : true
        } else if (f.key === 'category') {
          let filteredItems = f.items.filter((i, ii) => f.selectedIdx.includes(ii))
          filteredItems = filteredItems.map(getFamiliarizationType)

          return filteredItems.find((i) => i === d[f.key]) ? true : false
        } else {
          const filteredItems = f.items.filter((i, ii) => f.selectedIdx.includes(ii))
          const filteredItemsString = filteredItems.join(' ')
          return filteredItemsString.includes(d[f.key])
        }
      } else {
        return true
      }
    })
    return filterSort.every((f) => f)
  })
}
