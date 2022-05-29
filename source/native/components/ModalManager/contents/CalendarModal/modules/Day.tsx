import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useThemeStyles, Theme } from '../../../../../theme'
import { StyledText } from '../../../../UIKit/StyledText'
import { Dot } from './Dot'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: 48,
      backgroundColor: theme.colors.gray_1,
    },
    endDate: { borderBottomRightRadius: 12, borderTopRightRadius: 12 },
    startDate: { borderBottomLeftRadius: 12, borderTopLeftRadius: 12 },
    dotContainer: { position: 'absolute', bottom: 8, flexDirection: 'row' },
    activeStyle: { backgroundColor: theme.colors.blue_1, borderRadius: 0 },
    text: { color: theme.colors.gray_9 },
    edgeStyle: { backgroundColor: theme.colors.blue_6 },
    edgeTextStyle: { color: theme.colors.gray_1 },
    hiddenTextStyle: { color: theme.colors.gray_7 },
    activeTextStyle: { color: theme.colors.blue_6 },
  })

  return styles
}

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
    const { styles } = useThemeStyles(createStyles)
    const isEdge = item.isStartDate || item.isEndDate ? true : false
    const isCurrentDay = item.isToday && item.isVisible
    const isActiveAndVisible = item.isActive && item.isVisible
    const isActiveOrCurrent = item.isActive || isCurrentDay

    if (item.isHidden) {
      return <View style={[styles.container]} />
    }

    return (
      <TouchableOpacity
        disabled={!item.isVisible}
        style={[
          styles.container,
          isActiveAndVisible && styles.activeStyle,
          item.isStartDate && styles.startDate,
          item.isEndDate && styles.endDate,
          isEdge && styles.edgeStyle,
        ]}
        onPress={() => onPress(item.date)}
      >
        <>
          <StyledText
            size={'m'}
            family={isCurrentDay ? 'bold' : 'regular'}
            style={[
              styles.text,
              isActiveOrCurrent && styles.activeTextStyle,
              !item.isVisible && styles.hiddenTextStyle,
              isEdge && styles.edgeTextStyle,
            ]}
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
