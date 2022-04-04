import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { ShadowView } from '../../ShadowView'
import { StyledText } from '../../UIKit/StyledText'
import { areEqual, getMonthDays, MONTH_NAMES, sameDate } from '../utils'
import { Day, DayType } from './Day'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      marginBottom: 8,
      paddingBottom: 16,
      paddingTop: 24,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: theme.colors.gray_1,
    },
    monthText: { paddingBottom: 24, color: theme.colors.gray_9 },
    weekContainer: { flexDirection: 'row' },
  })

  return styles
}
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
    const monthName = `${MONTH_NAMES[month]} ${year}`
    const { styles } = useThemeStyles(createStyles)
    const days = getMonthDays(month, year, disableRange, startDate, endDate, minDate, maxDate)
    const weeks = []

    while (days.length) {
      weeks.push(days.splice(0, 7))
    }

    return (
      <TouchableOpacity activeOpacity={1}>
        <ShadowView style={styles.container} type={'light'}>
          <StyledText size={'l'} family={'bold'} style={styles.monthText}>
            {monthName}
          </StyledText>
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
        </ShadowView>
      </TouchableOpacity>
    )
  },
  areEqual
)

export { Month }
