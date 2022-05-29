import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '../../../../../theme'
import { SHOULD_NOT_UPDATE } from '../../../../../utils/constants'
import { StyledText } from '../../../../UIKit/StyledText'
import { DAY_NAMES } from '../utils'

const styles = StyleSheet.create({
  container: { flexDirection: 'row', height: 40, marginHorizontal: 12, marginTop: 16 },
  daysContainer: { flex: 1, alignItems: 'center' },
})

const WeekDays: React.FC = React.memo(
  () => {
    const { theme } = useTheme()

    return (
      <View style={styles.container}>
        {DAY_NAMES.map((day, index) => (
          <View key={index} style={styles.daysContainer}>
            <StyledText
              size={'m'}
              family={'medium'}
              style={{ color: day.isDayOff ? theme.colors.red_6 : theme.colors.gray_7 }}
            >
              {day.name}
            </StyledText>
          </View>
        ))}
      </View>
    )
  },
  () => SHOULD_NOT_UPDATE
)

export { WeekDays }
