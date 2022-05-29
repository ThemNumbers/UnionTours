import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MonthYear } from './MonthYear'

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, marginTop: 16 },
  line: { flexDirection: 'row', marginTop: 8, marginBottom: 24 },
})

interface Props {
  values: Array<Array<number>>
  selectedValue?: number
  formatter: (value: number) => string
  onChange: (value: number) => void
}

const MonthYearPicker: React.FC<Props> = React.memo(
  ({ values, selectedValue, formatter, onChange }) => (
    <View style={styles.container}>
      {values.map((line: number[], index: number) => (
        <View key={String(index)} style={styles.line}>
          {line.map((item: number) => (
            <MonthYear
              key={String(item)}
              item={formatter(item)}
              isMarked={selectedValue === item}
              onPress={() => onChange(item)}
            />
          ))}
        </View>
      ))}
    </View>
  ),
  (prevProps, nextProps) => prevProps.selectedValue === nextProps.selectedValue
)

export { MonthYearPicker }
