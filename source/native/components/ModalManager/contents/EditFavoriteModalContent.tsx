import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Theme, useThemeStyles } from '../../../theme'
import { StyledSwitch } from '../../UIKit/StyledSwitch'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 16,
      borderTopLeftRadius: 16,
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
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      alignItems: 'center',
    },
    separator: {
      height: 1,
      width: '100%',
      marginVertical: 8,
      backgroundColor: theme.colors.gray_4,
    },
    titleText: { marginTop: 32, marginBottom: 16, color: theme.colors.gray_9 },
    description: { color: theme.colors.gray_7 },
    switchesWrapper: { marginTop: 16 },
    switchText: { color: theme.colors.gray_9 },
  })

  return styles
}

interface Props {
  initialHolidaySwitch: boolean
  initialBirthdaySwitch: boolean
  onHolidaySwitchChange: (switchState: boolean) => void
  onBirthDaySwitchChange: (switchState: boolean) => void
}

const EditFavoriteModalContent: React.FC<Props> = ({
  initialHolidaySwitch,
  initialBirthdaySwitch,
  onHolidaySwitchChange,
  onBirthDaySwitchChange,
}) => {
  const { styles } = useThemeStyles(createStyles)
  const [birthdaySwitch, setBirthdaySwitch] = useState<boolean>(initialBirthdaySwitch)
  const [holidaySwitch, setHolidaySwitch] = useState<boolean>(initialHolidaySwitch)
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.thumb} />
      <StyledText size={'l'} family={'bold'} center style={styles.titleText}>
        Уведомления
      </StyledText>
      <StyledText size={'xs'} family={'semibold'} style={styles.description}>
        Выберите уведомления, которые хотите получать об избранном контакте
      </StyledText>

      <View style={styles.switchesWrapper}>
        <View style={styles.switchContainer}>
          <StyledText size={'m'} family={'semibold'} style={styles.switchText}>
            День рождения
          </StyledText>

          <StyledSwitch
            isActive={birthdaySwitch}
            onPress={() => {
              onBirthDaySwitchChange(!birthdaySwitch)
              setBirthdaySwitch(!birthdaySwitch)
            }}
          />
        </View>

        <View style={styles.separator} />

        <View style={styles.switchContainer}>
          <StyledText size={'m'} family={'semibold'} style={styles.switchText}>
            Отпуск
          </StyledText>
          <StyledSwitch
            isActive={holidaySwitch}
            onPress={() => {
              onHolidaySwitchChange(!holidaySwitch)
              setHolidaySwitch(!holidaySwitch)
            }}
          />
        </View>
      </View>
    </View>
  )
}

export { EditFavoriteModalContent }
