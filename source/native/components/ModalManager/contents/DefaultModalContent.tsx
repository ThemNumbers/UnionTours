import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Theme, useThemeStyles } from '../../../theme'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginHorizontal: 30,
      borderRadius: 14,
      alignSelf: 'center',
      backgroundColor: theme.colors.gray_3,
    },
    buttonsWrapper: {
      width: '100%',
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    title: { color: theme.colors.gray_9 },
    titleContainer: { paddingHorizontal: 16, paddingVertical: 19 },
    horizontalDivider: { width: '100%', height: 1, backgroundColor: theme.colors.gray_5 },
    verticalDivider: { width: 1, height: '100%', backgroundColor: theme.colors.gray_5 },
    buttonContainer: { alignItems: 'center', justifyContent: 'center', height: 44, flex: 1 },
    btnText: { color: theme.colors.cyan_6 },
  })

  return styles
}
interface Props {
  title: string
  leftButtonText?: string
  rightButtonText: string
  onLeftButtonPress?: () => void
  onRightButtonPress?: () => void
  hideModal: () => void
}

const DefaultModalContent: React.FC<Props> = ({
  title,
  leftButtonText,
  rightButtonText,
  onLeftButtonPress,
  onRightButtonPress,
  hideModal,
}) => {
  const { styles } = useThemeStyles(createStyles)

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <StyledText size={'l'} family={'semibold'} center style={styles.title}>
          {title}
        </StyledText>
      </View>

      <View style={styles.horizontalDivider} />

      <View style={styles.buttonsWrapper}>
        {leftButtonText ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              onLeftButtonPress && onLeftButtonPress()
              hideModal()
            }}
          >
            <StyledText
              size={'m'}
              family={'regular'}
              numberOfLines={1}
              center
              style={styles.btnText}
            >
              {leftButtonText}
            </StyledText>
          </TouchableOpacity>
        ) : null}

        <View style={styles.verticalDivider} />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            onRightButtonPress && onRightButtonPress()
            hideModal()
          }}
        >
          <StyledText
            size={'m'}
            family={'semibold'}
            center
            numberOfLines={1}
            style={styles.btnText}
          >
            {rightButtonText}
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export { DefaultModalContent }
