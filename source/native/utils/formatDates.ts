import {
  format,
  isToday,
  isTomorrow,
  getDayOfYear,
  getMonth,
  isBefore,
  setDay,
  differenceInDays,
  differenceInMonths,
  formatDistanceToNow,
  isSameDay,
  setYear,
  isAfter,
  getYear,
} from 'date-fns'
import { ru } from 'date-fns/locale'

const locales = {
  ru,
}

const parseDate = (date?: string | Date): Date | undefined => {
  if (date) {
    if (date instanceof Date) {
      return date
    }
    try {
      const parsed = Date.parse(date)

      if (!isNaN(parsed)) {
        const timestamp = new Date(date)
        return timestamp instanceof Date ? timestamp : undefined
      }
    } catch (e) {
      return undefined
    }
    return undefined
  }
  return undefined
}

const getSelectedRangeText = (
  firstDate?: Date | string,
  secondDate?: Date | string,
  short?: boolean
): string | undefined => {
  const fpDate = parseDate(firstDate)
  const spDate = parseDate(secondDate)
  const monthFormat = `${short ? 'MMM' : 'MMMM'}`
  const yearFormat = ' yyyy'

  if (fpDate && spDate) {
    const isDifferentYear = getYear(spDate) > getYear(fpDate) ? true : false
    const isDifferentMonth = getMonth(spDate) > getMonth(fpDate) || isDifferentYear ? true : false
    const divider = ' — '
    const startDateMonthFormat = isDifferentMonth ? monthFormat : ''
    const startDateYearFormat = isDifferentYear ? yearFormat : ''
    const startDate = formatDate(fpDate, `d ${startDateMonthFormat}${startDateYearFormat}`)
    const endDate = formatDate(spDate, `d ${monthFormat}${startDateYearFormat}`)

    return `${startDate}${divider}${endDate}`
  } else if (fpDate) {
    return formatDate(fpDate, `d ${monthFormat}`)
  }
}

const isSameDayOfYear = (first?: Date | string, second?: Date | string): boolean => {
  const firstParsedDate = parseDate(first)
  const secondParsedDate = parseDate(second)
  if (firstParsedDate && secondParsedDate) {
    return getDayOfYear(firstParsedDate) === getDayOfYear(secondParsedDate)
  } else {
    return false
  }
}

const getEventDateText = (start?: string, end?: string, allDay?: boolean) => {
  if (start && end) {
    const startDateFormat = allDay ? '' : ', HH:mm'
    const endDateFormat = allDay ? 'весь день' : 'HH:mm'
    const divider = ' — '
    const startDate = formatDate(start, `d MMMM, eeeeee${startDateFormat}`)
    const isSame = !isSameDate(start, end)
    const sameEndDateText = formatDate(end, `d MMMM, eeeeee, ${endDateFormat}`)
    const differentEndDateText = allDay ? ', весь день' : `${divider}${formatDate(end, 'HH:mm')}`
    const endDate = isSame ? `${divider}${sameEndDateText}` : differentEndDateText

    return `${startDate}${endDate}`
  }
  return ''
}

const formatDate = (d?: Date | string, pattern?: string): string => {
  const parsedDate = parseDate(d)
  if (parsedDate) {
    return format(parsedDate, pattern || 'd.MM.yy', {
      locale: locales.ru,
    })
  } else {
    return ''
  }
}

const getTodayAfterDate = (d: Date | string): string => {
  const compareDate = new Date()
  const parsedDate = parseDate(d)
  if (parsedDate) {
    if (isToday(setYear(parsedDate, compareDate.getFullYear()))) {
      return 'Сегодня'
    } else if (isTomorrow(setYear(parsedDate, compareDate.getFullYear()))) {
      return `Завтра, ${formatDate(parsedDate, 'd MMMM')}`
    } else {
      return formatDate(parsedDate, 'd MMMM')
    }
  } else {
    return ''
  }
}

const isSameDate = (firstDate: Date | string, secondDate: Date | string): boolean => {
  const firstParsedDate = parseDate(firstDate)
  const secondParsedDate = parseDate(secondDate)

  if (firstParsedDate && secondParsedDate) {
    return isSameDay(firstParsedDate, secondParsedDate)
  } else {
    return false
  }
}

const isSameOrAfterDate = (firstDate: Date | string, secondDate: Date | string): boolean => {
  const firstParsedDate = parseDate(firstDate)
  const secondParsedDate = parseDate(secondDate)

  if (firstParsedDate && secondParsedDate) {
    return (
      isSameDay(firstParsedDate, secondParsedDate) || isAfter(firstParsedDate, secondParsedDate)
    )
  } else {
    return false
  }
}

const fromNowDate = (d: Date | string): string => {
  const parsedDate = parseDate(d)

  if (parsedDate) {
    return formatDistanceToNow(parsedDate, {
      locale: locales.ru,
    })
  } else {
    return ''
  }
}

const getDifferenceInDays = (
  firstDate: Date | string | undefined,
  secondDate: Date | string | undefined
): number => {
  const firstParsedDate = parseDate(firstDate)
  const secondParsedDate = parseDate(secondDate)

  if (firstParsedDate && secondParsedDate) {
    return differenceInDays(firstParsedDate, secondParsedDate)
  } else {
    return 0
  }
}

const getDifferenceInMonths = (firstDate: Date | string, secondDate: Date | string): number => {
  const firstParsedDate = parseDate(firstDate)
  const secondParsedDate = parseDate(secondDate)

  if (firstParsedDate && secondParsedDate) {
    return differenceInMonths(setDay(firstParsedDate, 1), setDay(secondParsedDate, 1))
  } else {
    return 0
  }
}

const isBetweenDates = (
  startDate: Date | string,
  endDate: Date | string,
  compareDate: Date | string
): boolean => {
  const startParsedDate = parseDate(startDate)
  const endParsedDate = parseDate(endDate)
  const compareParsedDate = parseDate(compareDate)

  if (startParsedDate && endParsedDate && compareParsedDate) {
    return (
      (isAfter(compareParsedDate, startParsedDate) && isBefore(compareParsedDate, endParsedDate)) ||
      isSameDate(compareParsedDate, startParsedDate) ||
      isSameDate(compareParsedDate, endParsedDate)
    )
  } else {
    return false
  }
}

export {
  parseDate,
  getEventDateText,
  isBetweenDates,
  getDifferenceInMonths,
  getDifferenceInDays,
  fromNowDate,
  isSameOrAfterDate,
  isSameDate,
  getSelectedRangeText,
  isSameDayOfYear,
  getTodayAfterDate,
  formatDate,
}
