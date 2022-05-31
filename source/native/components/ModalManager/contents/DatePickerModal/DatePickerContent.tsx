import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../../theme'
import { triggerHaptic } from '../../../../utils/haptic'
import { sleep } from '../../../../utils/sleep'
import { PendingPreview } from '../../../PendingWrapper/modules/PendingPreview'
import { StyledButton } from '../../../UIKit/StyledButton'
import { StyledCircleIndicator } from '../../../UIKit/StyledCircleIndicator'
import { StyledText } from '../../../UIKit/StyledText'
import { PICKER_HEIGHT } from './Constants'
import { PickerComponent } from './modules/PickerComponent'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginHorizontal: 24,
      borderRadius: 16,
      alignSelf: 'center',
      backgroundColor: theme.colors.gray_1,
    },
    headerTitle: { paddingVertical: 20, color: theme.colors.gray_7 },
    acceptBtnContainer: { borderRadius: 16 },
    cancelBtnContainer: { marginTop: 8, borderRadius: 16 },
    header: { alignItems: 'center', justifyContent: 'center' },
    separator: { height: 1, width: '100%', backgroundColor: theme.colors.gray_3 },
    pickerContainer: { width: '100%', flexDirection: 'row' },
    pendingPreview: { minHeight: PICKER_HEIGHT, height: PICKER_HEIGHT, flex: 0 },
  })

  return styles
}

const getYearValues = (min: number, max: number) => {
  const yearValues = new Array(max - min + 1).fill(0).map((_, i) => {
    const value = min + i
    return { value, label: `${value}` }
  })
  return yearValues
}

const monthValues = [
  { value: 0, label: 'Январь' },
  { value: 1, label: 'Февраль' },
  { value: 2, label: 'Март' },
  { value: 3, label: 'Апрель' },
  { value: 4, label: 'Май' },
  { value: 5, label: 'Июнь' },
  { value: 6, label: 'Июль' },
  { value: 7, label: 'Август' },
  { value: 8, label: 'Сентябрь' },
  { value: 9, label: 'Октябрь' },
  { value: 10, label: 'Ноябрь' },
  { value: 11, label: 'Декабрь' },
]

interface Props {
  minYear?: number
  maxYear?: number
  initialDate?: Date
  onSave: (date: Date) => void
  hideModal: () => void
}

const DatePickerContent: React.FC<Props> = ({
  minYear = 2010,
  maxYear = new Date().getFullYear(),
  initialDate = new Date(),
  onSave,
  hideModal,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const [yearValues] = useState(getYearValues(minYear, maxYear))
  const [prepareReady, setPrepareReady] = useState<boolean>(false)
  const month = useRef<number>(initialDate.getMonth())
  const year = useRef<number>(initialDate.getFullYear())

  // Хак, чтобы избежать лагов во время открытия модального окна
  useEffect(() => {
    if (!prepareReady) {
      sleep(310).then(() => setPrepareReady(true))
    }
  }, [prepareReady])

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <StyledText size={'m'} family={'bold'} center style={styles.headerTitle}>
            {'Месяц и год'}
          </StyledText>
        </View>
        <View style={styles.separator} />

        {prepareReady ? (
          <View style={[styles.pickerContainer]}>
            <PickerComponent
              onChange={(monthPosition: number) => {
                month.current = monthPosition
                triggerHaptic()
              }}
              values={monthValues}
              flex={1}
              defaultValue={monthValues.findIndex((m) => m.value === month.current)}
            />
            <PickerComponent
              onChange={(yearPosition: number) => {
                const yearItem = yearValues[yearPosition]
                if (yearItem) {
                  year.current = yearItem.value
                  triggerHaptic()
                }
              }}
              values={yearValues}
              flex={1}
              defaultValue={yearValues.findIndex((y) => y.value === year.current)}
            />
          </View>
        ) : (
          <PendingPreview
            containerStyle={styles.pendingPreview}
            icon={<StyledCircleIndicator size={32} />}
            description={'Загрузка...'}
          />
        )}

        <View style={styles.separator} />
        <StyledButton
          title={'Выбрать'}
          onPress={() => {
            onSave(new Date(year.current, month.current, 1))
            hideModal()
          }}
          activeBgColor={theme.colors.gray_1}
          activeTextColor={theme.colors.cyan_6}
          containerStyle={styles.acceptBtnContainer}
        />
      </View>
      <StyledButton
        title={'Отмена'}
        onPress={hideModal}
        activeBgColor={theme.colors.gray_1}
        activeTextColor={theme.colors.cyan_6}
        containerStyle={styles.cancelBtnContainer}
      />
    </View>
  )
}

export { DatePickerContent }
