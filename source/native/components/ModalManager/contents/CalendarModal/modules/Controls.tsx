import React, { useRef } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Theme, useThemeStyles } from '../../../../../theme'
import { formatDate } from '../../../../../utils/formatDates'
import { capitalizeFirstLetter } from '../../../../../utils/textHelper'
import { ArrowLeftIcon } from '../../../../Icons/ArrowLeftIcon'
import { ArrowRightIcon } from '../../../../Icons/ArrowRightIcon'
import { StyledText } from '../../../../UIKit/StyledText'
import { DirectionType, ListType, MonthItem } from '../utils'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flexDirection: 'row', height: 40, marginHorizontal: 16, marginTop: 16 },
    currentDateContainer: { flex: 1, alignItems: 'center', flexDirection: 'row' },
    date: { color: theme.colors.cyan_6, marginLeft: 8 },
    controlContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      marginLeft: 16,
      borderRadius: 8,
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_2,
    },
    backControl: {
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return styles
}

interface Props {
  selectedMonth: MonthItem
  onListChange: (type: ListType) => void
  onControlPress: (direction: DirectionType) => void
}

const Controls: React.FC<Props> = React.memo(
  ({ selectedMonth, onListChange, onControlPress }) => {
    const { theme, styles } = useThemeStyles(createStyles)
    const currentDate = new Date(selectedMonth.year, selectedMonth.month, 1)
    const currentMonthText = capitalizeFirstLetter(formatDate(currentDate, 'LLLL'))
    const currentYearText = formatDate(currentDate, 'yyyy')
    const anim = useSharedValue(0)
    const currentListType = useRef<ListType>('day')

    const animatedStyle = useAnimatedStyle(() => ({
      width: interpolate(anim.value, [0, 1], [0, 40]),
      opacity: interpolate(anim.value, [0, 0.5, 1], [0, 0, 1]),
    }))

    const runAnimation = (value: number) => (anim.value = withTiming(value, { duration: 200 }))

    const onDatePress = (type: 'year' | 'month' | 'day') => {
      if (currentListType.current !== type) {
        runAnimation(type === 'day' ? 0 : 1)
        currentListType.current = type
        onListChange(type)
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.currentDateContainer}>
          <Animated.View style={animatedStyle}>
            <TouchableOpacity onPress={() => onDatePress('day')} style={styles.backControl}>
              <ArrowLeftIcon size={24} color={theme.colors.gray_8} />
            </TouchableOpacity>
          </Animated.View>
          <StyledText
            onPress={() => onDatePress('month')}
            size={'l'}
            family={'medium'}
            style={styles.date}
          >
            {currentMonthText}
          </StyledText>

          <StyledText
            onPress={() => onDatePress('year')}
            size={'l'}
            family={'medium'}
            style={styles.date}
          >
            {currentYearText}
          </StyledText>
        </View>

        <TouchableOpacity onPress={() => onControlPress('left')} style={styles.controlContainer}>
          <ArrowLeftIcon size={24} color={theme.colors.gray_8} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onControlPress('right')} style={styles.controlContainer}>
          <ArrowRightIcon size={24} color={theme.colors.gray_8} />
        </TouchableOpacity>
      </View>
    )
  },
  (prevProps, nextProps) =>
    prevProps.selectedMonth.month === nextProps.selectedMonth.month &&
    prevProps.selectedMonth.year === nextProps.selectedMonth.year
)

export { Controls }
