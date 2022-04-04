import React, { useMemo, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  column: { flexDirection: 'column' },
})

interface Props {
  axis?: 'horizontal' | 'vertical'
  dashColor?: string
  dashGap?: number
  dashLength?: number
  dashStyle?: StyleProp<ViewStyle>
  dashThickness?: number
  style?: StyleProp<ViewStyle>
}

const DashedLine: React.FC<Props> = ({
  axis = 'horizontal',
  dashGap = 2,
  dashLength = 4,
  dashThickness = 2,
  dashColor = '#000',
  dashStyle,
  style,
}) => {
  const [lineLength, setLineLength] = useState<number>(0)
  const isRow = axis === 'horizontal'
  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength))

  const dashStyles = useMemo(
    () => ({
      width: isRow ? dashLength : dashThickness,
      height: isRow ? dashThickness : dashLength,
      marginRight: isRow ? dashGap : 0,
      marginBottom: isRow ? 0 : dashGap,
      backgroundColor: dashColor,
    }),
    [dashColor, dashGap, dashLength, dashThickness, isRow]
  )

  return (
    <View
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout
        setLineLength(isRow ? width : height)
      }}
      style={[style, isRow ? styles.row : styles.column]}
    >
      {[...Array(numOfDashes)].map((_, i) => {
        return <View key={i} style={[dashStyles, dashStyle]} />
      })}
    </View>
  )
}

export { DashedLine }
