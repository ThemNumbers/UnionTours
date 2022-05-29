import React from 'react'
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native'
import { areEqual, chunkArray, getMonthDays, sameDate } from '../utils'
import { Day, DayType } from './Day'

const styles = StyleSheet.create({
  weekContainer: { flexDirection: 'row', marginTop: 8 },
})

export interface MonthProps {
  month: number
  year: number
  disableRange?: boolean
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  markedDays?: Date[]
  onPress: (date: Date) => void
}

const Month: React.FC<MonthProps> = React.memo(
  ({
    month,
    year,
    disableRange = false,
    startDate,
    endDate,
    minDate,
    maxDate,
    markedDays = [],
    onPress,
  }) => {
    const { width } = useWindowDimensions()
    const weeks = chunkArray(
      getMonthDays(month, year, disableRange, startDate, endDate, minDate, maxDate),
      7
    )

    return (
      <TouchableOpacity style={{ width, paddingHorizontal: 12 }} activeOpacity={1}>
        {weeks.map((week: DayType[], index: number) => (
          <View key={String(index)} style={styles.weekContainer}>
            {week.map((day: DayType) => (
              <Day
                key={day.key}
                item={day}
                isMarked={markedDays.find((d) => sameDate(d, day.date)) ? true : false}
                onPress={onPress}
              />
            ))}
          </View>
        ))}
      </TouchableOpacity>
    )
  },
  areEqual
)

export { Month }
