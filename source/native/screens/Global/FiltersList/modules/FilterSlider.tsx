import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { FilterGroup } from '../../../../../framework/mobx/interfaces/Filters'
import { StyledSlider } from '../../../../components/UIKit/StyledSlider/StyledSlider'
import { StyledText } from '../../../../components/UIKit/StyledText'
import { Theme, useThemeStyles } from '../../../../theme'
import { formatSum } from '../../../../utils/formatter'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    label: { marginBottom: 8, color: theme.colors.gray_8 },
  })

  return styles
}

interface Props {
  item: FilterGroup
  onSave: (low: number, high: number) => void
}

const FilterSlider: React.FC<Props> = ({ item, onSave }) => {
  const { styles } = useThemeStyles(createStyles)
  const handleValueChange = useCallback(onSave, [])

  return (
    <View>
      <StyledText size={'m'} family={'semibold'} style={styles.label}>
        {item.title} ({formatSum(item.startSliderValue, true)} - {formatSum(item.endSliderValue)})
      </StyledText>
      <StyledSlider
        low={item.startSliderValue}
        high={item.endSliderValue}
        min={0}
        max={500000}
        step={500}
        onValueChanged={handleValueChange}
      />
    </View>
  )
}

export { FilterSlider }
