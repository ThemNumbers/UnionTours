import * as React from 'react'
import { FlatList, View } from 'react-native'
import { getMonthDays, NUMBER_OF_MONTHS } from './utils'
import { Month } from './modules/Month'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PendingPreview } from '../PendingWrapper/modules/PendingPreview'
import { differenceInMonths, subYears, setDay, addMonths } from 'date-fns'
import { StyledCircleIndicator } from '../UIKit/StyledCircleIndicator'
import { keyExtractor } from '../../utils/constants'
import { SelectedDates } from '../../../framework/mobx/interfaces/Tours'

export interface CalendarProps {
  initialSelectedDates?: SelectedDates
  disableRange?: boolean
  markedDays?: Date[]
  maxDate?: Date
  minDate?: Date
  numberOfMonth?: number
  onChange: (range: SelectedDates) => void
}

const Calendar: React.FC<CalendarProps> = ({
  initialSelectedDates = { startDate: undefined, endDate: undefined },
  disableRange = false,
  markedDays,
  maxDate,
  minDate,
  numberOfMonth = NUMBER_OF_MONTHS,
  onChange,
}) => {
  const insets = useSafeAreaInsets()
  const currentDay = new Date()
  const calendarStartDate = setDay(minDate || subYears(currentDay, 1), 1)
  const initialMonthIndex = differenceInMonths(
    initialSelectedDates.startDate
      ? new Date(
          initialSelectedDates.startDate.getFullYear(),
          initialSelectedDates.startDate.getMonth(),
          1
        )
      : new Date(currentDay.getFullYear(), currentDay.getMonth(), 1),
    calendarStartDate
  )
  const mutableStartDate = React.useRef(initialSelectedDates.startDate)
  const mutableEndDate = React.useRef(initialSelectedDates.endDate)
  const [prepareReady, setPrepareReady] = React.useState<boolean>(false)
  mutableStartDate.current = initialSelectedDates.startDate
  mutableEndDate.current = initialSelectedDates.endDate
  const flatListRef = React.useRef<FlatList<number> | null>(null)

  const monthArray: number[] = [...new Array(numberOfMonth)]
  const offsets: number[] = []
  let sum = 0

  monthArray.forEach((i, ii) => {
    const correctDate = addMonths(calendarStartDate, ii)
    const days = getMonthDays(correctDate.getMonth(), correctDate.getFullYear(), false)
    const weeksCount = days.length / 7
    const height = weeksCount === 4 ? 288 : weeksCount === 6 ? 384 : 336
    sum += height
    offsets.push(sum)
  })

  // Хак, чтобы избежать лагов во время открытия модального окна
  React.useEffect(() => {
    if (!prepareReady) {
      setTimeout(() => setPrepareReady(true), 310)
      setTimeout(
        () =>
          flatListRef.current &&
          flatListRef.current.scrollToOffset({
            offset: offsets[initialMonthIndex],
            animated: true,
          }),
        1000
      )
    }
  }, [prepareReady, initialMonthIndex, offsets])

  const handlePressDay = (date: Date) => {
    let newStartDate
    let newEndDate

    if (disableRange) {
      newStartDate = date
      newEndDate = undefined
    } else if (mutableStartDate.current) {
      if (mutableEndDate.current) {
        newStartDate = date
        newEndDate = undefined
      } else if (date < mutableStartDate.current) {
        newStartDate = date
      } else if (date > mutableStartDate.current) {
        newStartDate = mutableStartDate.current
        newEndDate = date
      } else {
        newStartDate = date
      }
    } else {
      newStartDate = date
    }

    const newRange: SelectedDates = {
      startDate: newStartDate as Date,
      endDate: newEndDate,
    }

    onChange(newRange)
  }

  const getItemLayout = (
    _data: number[] | null | undefined,
    index: number
  ): { length: number; offset: number; index: number } => ({
    length: 336,
    offset: 336 * index,
    index,
  })

  const renderMonth = ({ index }: { index: number }) => {
    const correctDate = addMonths(calendarStartDate, index)

    return (
      <Month
        month={correctDate.getMonth()}
        year={correctDate.getFullYear()}
        startDate={mutableStartDate.current}
        endDate={mutableEndDate.current}
        minDate={minDate}
        maxDate={maxDate}
        markedDays={markedDays}
        onPress={handlePressDay}
      />
    )
  }

  return prepareReady ? (
    <FlatList
      ref={flatListRef}
      style={{ paddingTop: 16 }}
      snapToOffsets={offsets}
      snapToAlignment={'center'}
      decelerationRate={'fast'}
      getItemLayout={getItemLayout}
      removeClippedSubviews
      onScrollToIndexFailed={() => null}
      ListFooterComponent={<View style={{ height: 56 + insets.bottom + 32 }} />}
      keyExtractor={keyExtractor}
      renderItem={renderMonth}
      data={monthArray}
    />
  ) : (
    <PendingPreview icon={<StyledCircleIndicator size={32} />} description={'Загрузка...'} />
  )
}

export { Calendar }
