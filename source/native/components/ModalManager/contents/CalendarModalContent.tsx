import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SelectedDates } from '../../../../framework/mobx/interfaces/Tours'
import { Theme, useThemeStyles } from '../../../theme'
import { getSelectedRangeText } from '../../../utils/formatDates'
import { Calendar } from '../../Calendar'
import { WeekDays } from '../../Calendar/modules/WeekDays'
import { CloseIcon } from '../../Icons/CloseIcon'
import { StyledButton } from '../../UIKit/StyledButton'
import { StyledText } from '../../UIKit/StyledText'
import { StyledTextButton } from '../../UIKit/StyledTextButton'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    modalContainer: { flex: 1 },
    container: {
      borderTopLeftRadius: 16,
      flex: 1,
      borderTopRightRadius: 16,
      backgroundColor: theme.colors.gray_1,
    },
    thumb: {
      width: 48,
      height: 4,
      alignSelf: 'center',
      marginTop: 8,
      borderRadius: 23,
      opacity: 0.5,
      backgroundColor: theme.colors.gray_9,
    },
    periodText: { color: theme.colors.gray_9 },
    headerContainer: {
      flexDirection: 'row',
      marginTop: 20,
      justifyContent: 'center',
      marginBottom: 16,
      alignItems: 'center',
    },
    headerCloseButton: {
      width: 40,
      height: 40,
      borderRadius: 8,
      alignItems: 'center',
      position: 'absolute',
      right: 16,
      justifyContent: 'center',
      backgroundColor: theme.colors.gray_2,
    },
    headerClearButtonContainer: { position: 'absolute', right: 0, paddingRight: 16 },
    headerClearButtonText: { fontSize: 15, lineHeight: 24 },
    applyButtonContainer: {
      position: 'absolute',
      marginHorizontal: 16,
      left: 0,
      right: 0,
      flex: 1,
    },
  })

  return styles
}

interface Props {
  initialSelectedDates: SelectedDates
  disableRange?: boolean
  markedDays?: Date[]
  maxDate?: Date
  minDate?: Date
  numberOfMonth?: number
  onApply: (selectedDates: SelectedDates) => void
  hideModal: () => void
}

const CalendarModalContent: React.FC<Props> = ({
  initialSelectedDates,
  disableRange,
  markedDays,
  maxDate,
  minDate,
  numberOfMonth,
  onApply,
  hideModal,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [selectedDates, setSelectedDates] = React.useState<SelectedDates>(initialSelectedDates)
  const insets = useSafeAreaInsets()
  const selectedRangeText = getSelectedRangeText(
    selectedDates.startDate,
    selectedDates.endDate,
    selectedDates.startDate && selectedDates.endDate ? true : false
  )
  const applyBtnTitle = selectedRangeText ? `Выбрать ${selectedRangeText}` : undefined

  return (
    <View style={styles.modalContainer}>
      <View style={{ height: insets.top + 32 }} />
      <View style={styles.container}>
        <View style={styles.thumb} />
        <View style={styles.headerContainer}>
          <StyledText size={'l'} family={'bold'} center style={styles.periodText}>
            Период
          </StyledText>
          {selectedRangeText ? (
            <StyledTextButton
              title={'Очистить'}
              onPress={() => {
                setSelectedDates({ startDate: undefined, endDate: undefined })
                onApply({ startDate: undefined, endDate: undefined })
              }}
              containerStyle={styles.headerClearButtonContainer}
              textStyle={styles.headerClearButtonText}
            />
          ) : (
            <TouchableOpacity onPress={hideModal} style={styles.headerCloseButton}>
              <CloseIcon color={theme.colors.gray_9} />
            </TouchableOpacity>
          )}
        </View>
        <WeekDays />
        <View style={styles.modalContainer}>
          <Calendar
            onChange={(range) => setSelectedDates(range)}
            initialSelectedDates={selectedDates}
            minDate={minDate}
            maxDate={maxDate}
            markedDays={markedDays}
            disableRange={disableRange}
            numberOfMonth={numberOfMonth}
          />
        </View>
        {applyBtnTitle ? (
          <StyledButton
            containerStyle={[styles.applyButtonContainer, { bottom: insets.bottom + 16 }]}
            title={applyBtnTitle}
            disabled={!selectedDates.startDate}
            onPress={() => {
              onApply(selectedDates)
              hideModal()
            }}
          />
        ) : null}
      </View>
    </View>
  )
}

export { CalendarModalContent }
