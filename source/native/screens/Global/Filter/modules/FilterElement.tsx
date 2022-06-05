import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FilterItem } from '../../../../../framework/mobx/interfaces/Filters'
import { CheckMarkIcon } from '../../../../components/Icons/CheckMarkIcon'
import { StyledText } from '../../../../components/UIKit/StyledText'
import { Theme, useThemeStyles } from '../../../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: { flex: 1, color: theme.colors.gray_9 },
  })

  return styles
}

interface Props {
  item: FilterItem
  onSelect: (item: FilterItem) => void
}

const FilterElement: React.FC<Props> = ({ item, onSelect }) => {
  const { theme, styles } = useThemeStyles(createStyles)

  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.container}>
      <StyledText size={'m'} family={'semibold'} style={styles.title}>
        {item.title}
      </StyledText>
      {item.isSelected ? <CheckMarkIcon color={theme.colors.cyan_6} /> : null}
    </TouchableOpacity>
  )
}

export { FilterElement }
