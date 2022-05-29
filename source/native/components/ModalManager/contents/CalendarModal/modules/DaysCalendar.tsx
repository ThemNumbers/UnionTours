import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
} from 'react-native'
import { SelectedDates } from '../../../../../../framework/redux/interfaces/Events'
import { DirectionType, MonthItem } from '../utils'
import { Month } from './Month'
import { keyExtractor, SHOULD_NOT_UPDATE } from '../../../../../utils/constants'
import { WeekDays } from './WeekDays'
import { StyledButton } from '../../../../UIKit/StyledButton'
import { getSelectedRangeText } from '../../../../../utils/formatDates'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface DaysCalendarRef {
  swipeList: (direction: DirectionType, withAnim?: boolean) => void
  scrollToIndex: (idx: number, withAnim?: boolean) => void
}

interface Props {
  monthsArray: Array<MonthItem>
  initialMonthIdx: number
  initialSelectedDates: SelectedDates
  disableRange?: boolean
  markedDays?: Date[]
  maxDate?: Date
  minDate?: Date
  numberOfMonth?: number
  onListChange: (item: { year: number; month: number }) => void
  onSave: (selectedDates: SelectedDates) => void
}

const DaysCalendar = React.memo(
  forwardRef<DaysCalendarRef, Props>(
    (
      {
        monthsArray,
        initialMonthIdx,
        initialSelectedDates,
        disableRange = false,
        markedDays,
        maxDate,
        minDate,
        onListChange,
        onSave,
      },
      ref
    ) => {
      const { width } = useWindowDimensions()
      const currentIdx = useRef<number>(initialMonthIdx)
      const insets = useSafeAreaInsets()
      const flatListRef = useRef<FlatList<{ year: number; month: number }> | null>(null)
      const [selectedDates, setSelectedDates] = useState<SelectedDates>(initialSelectedDates)
      const mutableSelectedDates = useRef<SelectedDates>(selectedDates)
      mutableSelectedDates.current = selectedDates

      const selectedRangeText = getSelectedRangeText(
        selectedDates.startDate,
        selectedDates.endDate,
        selectedDates.startDate && selectedDates.endDate ? true : false
      )
      const applyBtnTitle = selectedRangeText ? `Выбрать ${selectedRangeText}` : 'Выбрать'

      const scrollToIndex = (page: number, withAnim?: boolean) => {
        flatListRef.current &&
          flatListRef.current.scrollToIndex({ animated: withAnim ? true : false, index: page })
      }

      useImperativeHandle(ref, () => ({
        swipeList: (direction, withAnim) => {
          const nextIdx = direction === 'left' ? currentIdx.current - 1 : currentIdx.current + 1
          currentIdx.current = nextIdx
          scrollToIndex(nextIdx, withAnim)
        },
        scrollToIndex: (idx, withAnim) => {
          currentIdx.current = idx
          scrollToIndex(idx, withAnim)
        },
      }))

      const onScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const { contentOffset } = e.nativeEvent
          const nextCurrentIdx = Math.round(contentOffset.x / width)

          if (nextCurrentIdx !== currentIdx.current) {
            currentIdx.current = nextCurrentIdx
            onListChange(monthsArray[nextCurrentIdx])
          }
        },
        [monthsArray, width, onListChange]
      )

      const onDayPress = useCallback(
        (date: Date) => {
          let newStartDate
          let newEndDate

          if (disableRange) {
            newStartDate = date
            newEndDate = undefined
          } else if (mutableSelectedDates.current.startDate) {
            if (mutableSelectedDates.current.endDate) {
              newStartDate = date
              newEndDate = undefined
            } else if (date < mutableSelectedDates.current.startDate) {
              newStartDate = date
            } else if (date > mutableSelectedDates.current.startDate) {
              newStartDate = mutableSelectedDates.current.startDate
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

          setSelectedDates(newRange)
        },
        [disableRange]
      )

      const renderMonth = React.useCallback(
        ({ item }: { item: { year: number; month: number }; index: number }) => (
          <Month
            month={item.month}
            year={item.year}
            startDate={mutableSelectedDates.current.startDate}
            endDate={mutableSelectedDates.current.endDate}
            minDate={minDate}
            maxDate={maxDate}
            markedDays={markedDays}
            onPress={onDayPress}
          />
        ),
        [markedDays, maxDate, minDate, onDayPress]
      )

      return (
        <>
          <WeekDays />
          <FlatList
            ref={flatListRef}
            horizontal
            onContentSizeChange={() => scrollToIndex(currentIdx.current)}
            showsHorizontalScrollIndicator={false}
            snapToInterval={width}
            decelerationRate={0.89}
            onScrollToIndexFailed={() => null}
            keyExtractor={keyExtractor}
            renderItem={renderMonth}
            data={monthsArray}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScroll={onScroll}
          />
          <StyledButton
            containerStyle={[
              { marginTop: 16, marginHorizontal: 16, marginBottom: insets.bottom + 8 },
            ]}
            title={applyBtnTitle}
            disabled={!selectedDates.startDate}
            onPress={() => onSave(selectedDates)}
          />
        </>
      )
    }
  ),
  () => SHOULD_NOT_UPDATE
)

export { DaysCalendar }
