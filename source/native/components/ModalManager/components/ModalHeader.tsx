import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { SHOULD_NOT_UPDATE } from '../../../utils/constants'
import { CloseIcon } from '../../Icons/CloseIcon'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      paddingHorizontal: 16,
      marginBottom: 14,
    },
    thumb: {
      width: 64,
      height: 4,
      alignSelf: 'center',
      position: 'absolute',
      top: -12,
      borderRadius: 23,
      backgroundColor: theme.colors.gray_4,
    },
    title: { color: theme.colors.gray_9 },
    closeBtnContainer: {
      width: 32,
      height: 32,
      marginRight: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: { backgroundColor: theme.colors.gray_3, height: 1, marginHorizontal: 16 },
    titleContainer: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  })

  return styles
}

interface Props {
  title: string
  withSeparator?: boolean
  renderRightBtn?: () => React.ReactNode
  onClosePress: () => void
}

const ModalHeader: FC<Props> = React.memo(
  ({ title, renderRightBtn, withSeparator, onClosePress }) => {
    const { theme, styles } = useThemeStyles(createStyles)

    return (
      <>
        <View style={styles.thumb} />
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <TouchableOpacity onPress={onClosePress} style={styles.closeBtnContainer}>
              <CloseIcon size={32} color={theme.colors.gray_9} />
            </TouchableOpacity>
            <StyledText size={'l'} family={'bold'} style={styles.title}>
              {title}
            </StyledText>
          </View>
          {renderRightBtn ? renderRightBtn() : null}
        </View>
        {withSeparator ? <View style={styles.separator} /> : null}
      </>
    )
  },
  () => SHOULD_NOT_UPDATE
)

export { ModalHeader }
