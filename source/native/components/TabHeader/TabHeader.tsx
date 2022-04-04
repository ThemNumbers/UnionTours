import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { FilterIcon } from '../Icons/FilterIcon'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { alignItems: 'center', height: 40, marginTop: 16, flexDirection: 'row' },
    titleText: { paddingLeft: 16, flex: 1, color: theme.colors.gray_9 },
    btnWrapper: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    indicator: {
      width: 8,
      height: 8,
      borderRadius: 8,
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: theme.colors.blue_6,
    },
  })

  return styles
}

interface Props {
  title: string
  renderRightButton?: () => React.ReactNode
  withFilter?: boolean
  filterIsActive?: boolean
  onFilterPress?: () => void
}

const TabHeader: React.FC<Props> = ({
  title,
  renderRightButton,
  withFilter,
  filterIsActive,
  onFilterPress,
}) => {
  const { theme, styles } = useThemeStyles(createStyles)

  return (
    <View style={styles.container}>
      <StyledText size={'xl'} family={'bold'} style={styles.titleText}>
        {title}
      </StyledText>

      {renderRightButton ? (
        renderRightButton()
      ) : withFilter ? (
        <TouchableOpacity style={styles.btnWrapper} onPress={onFilterPress}>
          <View>
            <FilterIcon color={theme.colors.gray_7} />
            {filterIsActive ? <View style={styles.indicator} /> : null}
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export { TabHeader }
