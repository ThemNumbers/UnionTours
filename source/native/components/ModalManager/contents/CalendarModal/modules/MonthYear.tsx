import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Theme, useThemeStyles } from '../../../../../theme'
import { StyledText } from '../../../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: 48,
      borderRadius: 50,
      paddingHorizontal: 8,
      backgroundColor: 'transparent',
    },
    activeContainer: { backgroundColor: theme.colors.blue_6 },
    text: { color: theme.colors.gray_9 },
    activeText: { color: theme.colors.gray_1 },
  })

  return styles
}

interface Props {
  onPress: () => void
  isMarked: boolean
  item: string
}

const MonthYear: React.FC<Props> = React.memo(
  ({ item, isMarked, onPress }) => {
    const { styles } = useThemeStyles(createStyles)

    return (
      <TouchableOpacity
        style={[styles.container, isMarked ? styles.activeContainer : undefined]}
        onPress={onPress}
      >
        <StyledText size={'m'} family={'medium'} style={isMarked ? styles.activeText : styles.text}>
          {item}
        </StyledText>
      </TouchableOpacity>
    )
  },
  (prevProps, nextProps) => prevProps.isMarked === nextProps.isMarked
)

export { MonthYear }
