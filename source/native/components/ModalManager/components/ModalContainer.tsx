import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { SHOULD_NOT_UPDATE } from '../../../utils/constants'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.gray_1,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
    },
  })

  return styles
}

const ModalContainer: FC = React.memo(
  ({ children }) => {
    const { styles } = useThemeStyles(createStyles)

    return <View style={styles.container}>{children}</View>
  },
  () => SHOULD_NOT_UPDATE
)

export { ModalContainer }
