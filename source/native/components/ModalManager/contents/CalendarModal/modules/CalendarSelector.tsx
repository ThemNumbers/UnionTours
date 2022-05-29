import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SelectedDates } from '../../../../../../framework/redux/interfaces/Events'
import { Controls } from './Controls'
import {
  chunkArray,
  DirectionType,
  getMonthsValues,
  getYearValues,
  ListType,
  monthFormatter,
  MonthItem,
  yearFormatter,
} from '../utils'
import { DaysCalendar, DaysCalendarRef } from './DaysCalendar'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { sleep } from '../../../../../utils/sleep'
import { StyleSheet, View } from 'react-native'
import { PendingPreview } from '../../../../PendingWrapper/modules/PendingPreview'
import { StyledCircleIndicator } from '../../../../UIKit/StyledCircleIndicator'
import { MonthYearPicker } from './MonthYearPicker'

interface Props {
  currentDay: Date
  initialSelectedDates: SelectedDates
  disableRange?: boolean
  markedDays?: Date[]
  maxDate?: Date
  minDate?: Date
  onSave: (selectedDates: SelectedDates) => void
}

const CalendarSelector: React.FC<Props> = ({
  currentDay,
  initialSelectedDates,
  disableRange,
  markedDays,
  maxDate,
  minDate,
  onSave,
}) => {
  const insets = useSafeAreaInsets()
  const initialMonth = useMemo(
    () =>
      initialSelectedDates.startDate
        ? initialSelectedDates.startDate.getMonth()
        : currentDay.getMonth(),
    [currentDay, initialSelectedDates.startDate]
  )
  const initialYear = useMemo(
    () =>
      initialSelectedDates.startDate
        ? initialSelectedDates.startDate.getFullYear()
        : currentDay.getFullYear(),
    [currentDay, initialSelectedDates.startDate]
  )
  const [selectedMonth, setSelectedMonth] = useState<MonthItem>({
    month: initialMonth,
    year: initialYear,
  })
  const mutableSelectedMonth = useRef<MonthItem>(selectedMonth)
  mutableSelectedMonth.current = selectedMonth
  const [prepareReady, setPrepareReady] = useState<boolean>(false)
  const years = getYearValues(2007, 2026)
  const months = getMonthsValues()
  const monthsArray: Array<MonthItem> = useMemo(() => {
    let data: Array<MonthItem> = []
    years.forEach((year) => months.forEach((month) => data.push({ year: year, month: month })))
    return data
  }, [months, years])

  const initialMonthIdx = useMemo(
    () => monthsArray.findIndex((i) => i.month === initialMonth && i.year === initialYear),
    [monthsArray, initialMonth, initialYear]
  )
  const animDays = useSharedValue(1)
  const animMonths = useSharedValue(0)
  const animYears = useSharedValue(0)
  const daysListRef = useRef<DaysCalendarRef | null>(null)

  // Хак, чтобы избежать лагов во время открытия модального окна
  useEffect(() => {
    if (!prepareReady) {
      sleep(310).then(() => setPrepareReady(true))
    }
  }, [prepareReady])

  const onControlPress = useCallback((direction: DirectionType) => {
    daysListRef.current && daysListRef.current.swipeList(direction, true)
  }, [])

  const onListChange = useCallback(
    (type: ListType) => {
      animDays.value = withTiming(0, { duration: 150 })
      animMonths.value = withTiming(0, { duration: 150 })
      animYears.value = withTiming(0, { duration: 150 })
      sleep(150).then(() => {
        if (type === 'day') {
          animDays.value = withTiming(1, { duration: 150 })
        } else if (type === 'month') {
          animMonths.value = withTiming(1, { duration: 150 })
        } else {
          animYears.value = withTiming(1, { duration: 150 })
        }
      })
    },
    [animDays, animMonths, animYears]
  )

  const animDaysStyle = useAnimatedStyle(() => ({
    opacity: animDays.value,
    zIndex: animDays.value,
  }))

  const animMonthsStyle = useAnimatedStyle(() => ({
    opacity: animMonths.value,
    zIndex: animMonths.value,
  }))

  const animYearsStyle = useAnimatedStyle(() => ({
    opacity: animYears.value,
    zIndex: animYears.value,
  }))

  const onChangeMonth = useCallback(
    (value: number) => {
      const nextIdx = monthsArray.findIndex(
        (i) => i.year === mutableSelectedMonth.current.year && i.month === value
      )
      setSelectedMonth(monthsArray[nextIdx])
      daysListRef.current && daysListRef.current.scrollToIndex(nextIdx, false)
    },
    [monthsArray]
  )

  const onChangeYear = useCallback(
    (value: number) => {
      const nextIdx = monthsArray.findIndex(
        (i) => i.year === value && i.month === mutableSelectedMonth.current.month
      )
      setSelectedMonth(monthsArray[nextIdx])
      daysListRef.current && daysListRef.current.scrollToIndex(nextIdx, false)
    },
    [monthsArray]
  )

  return prepareReady ? (
    <>
      <Controls
        selectedMonth={selectedMonth}
        onControlPress={onControlPress}
        onListChange={onListChange}
      />
      <View style={{ height: 480 + insets.bottom, width: '100%' }}>
        <Animated.View style={[StyleSheet.absoluteFillObject, animDaysStyle]}>
          <DaysCalendar
            monthsArray={monthsArray}
            ref={daysListRef}
            initialMonthIdx={initialMonthIdx}
            onListChange={(item) => setSelectedMonth(item)}
            onSave={onSave}
            initialSelectedDates={initialSelectedDates}
            minDate={minDate}
            maxDate={maxDate}
            markedDays={markedDays}
            disableRange={disableRange}
            numberOfMonth={12}
          />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFillObject, animMonthsStyle]}>
          <MonthYearPicker
            values={chunkArray(months, 3)}
            selectedValue={selectedMonth.month}
            formatter={monthFormatter}
            onChange={onChangeMonth}
          />
        </Animated.View>

        <Animated.View style={[StyleSheet.absoluteFillObject, animYearsStyle]}>
          <MonthYearPicker
            values={chunkArray(years, 4)}
            selectedValue={selectedMonth.year}
            formatter={yearFormatter}
            onChange={onChangeYear}
          />
        </Animated.View>
      </View>
    </>
  ) : (
    <PendingPreview
      containerStyle={{ minHeight: 536 + insets.bottom, height: 536 + insets.bottom, flex: 0 }}
      icon={<StyledCircleIndicator size={32} />}
      description={'Загрузка...'}
    />
  )
}

export { CalendarSelector }
