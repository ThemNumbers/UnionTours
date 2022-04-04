import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../../theme'
import { StyledText } from '../../UIKit/StyledText'
import { Dot } from './Dot'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    marginVertical: 2,
    paddingVertical: 10,
  },
  endDate: {
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  startDate: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 4,
    flexDirection: 'row',
  },
})

export type DayType = {
  date: Date
  id: string
  key: string
  isActive: boolean
  isEndDate: boolean
  isHidden: boolean
  isMonthDate: boolean
  isOutOfRange: boolean
  isStartDate: boolean
  isToday: boolean
  isVisible: boolean
}

interface Props {
  onPress: (date: Date) => void
  isMarked: boolean
  item: DayType
}

const Day: React.FC<Props> = React.memo(
  ({ item, isMarked, onPress }) => {
    const { theme } = useTheme()
    const isEdge = item.isStartDate || item.isEndDate ? true : false
    const isCurrentDay = item.isToday && item.isVisible

    if (item.isHidden) {
      return <View style={[styles.container]} />
    }

    return (
      <TouchableOpacity
        disabled={!item.isVisible}
        style={[
          styles.container,
          item.isActive && item.isVisible
            ? { backgroundColor: theme.colors.blue_1, borderRadius: 0 }
            : { backgroundColor: theme.colors.gray_1 },
          item.isStartDate ? styles.startDate : {},
          item.isEndDate ? styles.endDate : {},
          isEdge ? { backgroundColor: theme.colors.blue_6 } : {},
        ]}
        onPress={() => onPress(item.date)}
      >
        <>
          <StyledText
            size={'l'}
            family={'bold'}
            style={{
              color: isEdge
                ? theme.colors.gray_1
                : !item.isVisible
                ? theme.colors.gray_6
                : item.isActive || isCurrentDay
                ? theme.colors.blue_6
                : theme.colors.gray_7,
            }}
          >
            {item.date.getDate()}
          </StyledText>
          {item.isVisible ? (
            <View style={styles.dotContainer}>{isMarked ? <Dot isEdge={isEdge} /> : null}</View>
          ) : null}
        </>
      </TouchableOpacity>
    )
  },
  (prevProps, nextProps) =>
    prevProps.item.isActive === nextProps.item.isActive &&
    prevProps.item.isVisible === nextProps.item.isVisible &&
    prevProps.item.isStartDate === nextProps.item.isStartDate &&
    prevProps.item.isEndDate === nextProps.item.isEndDate &&
    prevProps.isMarked === nextProps.isMarked
)

export { Day }
