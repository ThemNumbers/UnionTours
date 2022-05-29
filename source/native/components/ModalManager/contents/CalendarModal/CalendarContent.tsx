import React from 'react'
import { StyleSheet } from 'react-native'
import { SelectedDates } from '../../../../../framework/redux/interfaces/Events'
import { StyledTextButton } from '../../../UIKit/StyledTextButton'
import { ModalContainer } from '../../components/ModalContainer'
import { ModalHeader } from '../../components/ModalHeader'
import { CalendarSelector } from './modules/CalendarSelector'

const styles = StyleSheet.create({
  clearContainer: { position: 'absolute', right: 0, paddingRight: 16 },
  clearText: { fontSize: 15, lineHeight: 24 },
})

interface Props {
  initialSelectedDates: SelectedDates
  disableRange?: boolean
  markedDays?: Date[]
  maxDate?: Date
  minDate?: Date
  onApply: (selectedDates: SelectedDates) => void
  hideModal: () => void
}

const CalendarContent: React.FC<Props> = ({
  initialSelectedDates,
  disableRange,
  markedDays,
  maxDate,
  minDate,
  onApply,
  hideModal,
}) => {
  const currentDay = new Date()
  const onSave = (dates: SelectedDates) => {
    onApply(dates)
    hideModal()
  }

  const renderRightBtn = () =>
    initialSelectedDates.startDate ? (
      <StyledTextButton
        title={'Очистить'}
        onPress={() => onSave({ startDate: undefined, endDate: undefined })}
        containerStyle={styles.clearContainer}
        textStyle={styles.clearText}
      />
    ) : null

  return (
    <ModalContainer>
      <ModalHeader
        withSeparator
        title={'Выбор даты'}
        onClosePress={hideModal}
        renderRightBtn={renderRightBtn}
      />
      <CalendarSelector
        currentDay={currentDay}
        initialSelectedDates={initialSelectedDates}
        onSave={onSave}
        disableRange={disableRange}
        markedDays={markedDays}
        minDate={minDate}
        maxDate={maxDate}
      />
    </ModalContainer>
  )
}

export { CalendarContent }
