import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    dot: { width: 4, height: 4, borderRadius: 2 },
    whiteDot: { backgroundColor: theme.colors.gray_1 },
    blueDot: { backgroundColor: theme.colors.cyan_6 },
  })

  return styles
}

interface Props {
  isEdge: boolean
}

const Dot: React.FC<Props> = React.memo(
  ({ isEdge }) => {
    const { styles } = useThemeStyles(createStyles)

    return <View style={[styles.dot, isEdge ? styles.whiteDot : styles.blueDot]} />
  },
  (prevProps, nextProps) => prevProps.isEdge === nextProps.isEdge
)

export { Dot }
