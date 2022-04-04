import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../../theme'

const styles = StyleSheet.create({
  dot: { width: 4, height: 4, borderRadius: 2 },
})

interface Props {
  isEdge: boolean
}

const Dot: React.FC<Props> = React.memo(
  ({ isEdge }) => {
    const { theme } = useTheme()

    return (
      <View
        style={[
          styles.dot,
          { backgroundColor: isEdge ? theme.colors.gray_1 : theme.colors.blue_6 },
        ]}
      />
    )
  },
  (prevProps, nextProps) => prevProps.isEdge === nextProps.isEdge
)

export { Dot }
