import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ImageFromType } from '../../../../framework/redux/interfaces/App'
import { Theme, useThemeStyles } from '../../../theme'
import { CameraIcon } from '../../Icons/CameraIcon'
import { CloseIcon } from '../../Icons/CloseIcon'
import { GalleryIcon } from '../../Icons/GalleryIcon'
import { StyledText } from '../../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingHorizontal: 20,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: theme.colors.gray_1,
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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 14,
    },
    optionContainer: { flexDirection: 'row', paddingVertical: 24, alignItems: 'center' },
    separator: { height: 1, width: '100%', backgroundColor: theme.colors.gray_3 },
    titleText: { color: theme.colors.gray_9 },
    closeBtnContainer: {
      width: 32,
      height: 32,
      marginRight: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionText: { color: theme.colors.gray_9, marginLeft: 16 },
  })

  return styles
}

interface Props {
  title: string
  hideModal: () => void
  onSelectType: (type: ImageFromType) => void
}

const AttachmentModalContent: React.FC<Props> = ({ title, hideModal, onSelectType }) => {
  const { theme, styles } = useThemeStyles(createStyles)
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.thumb} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={hideModal} style={styles.closeBtnContainer}>
          <CloseIcon size={32} color={theme.colors.gray_9} />
        </TouchableOpacity>
        <StyledText size={'l'} family={'bold'} style={styles.titleText}>
          {title}
        </StyledText>
      </View>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          onSelectType(ImageFromType.GALLERY)
          hideModal()
        }}
      >
        <GalleryIcon color={theme.colors.cyan_6} />
        <StyledText size={'m'} family={'semibold'} style={styles.optionText}>
          Выбрать изображение
        </StyledText>
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          onSelectType(ImageFromType.CAMERA)
          hideModal()
        }}
      >
        <CameraIcon color={theme.colors.cyan_6} />
        <StyledText size={'m'} family={'semibold'} style={styles.optionText}>
          Сделать фото
        </StyledText>
      </TouchableOpacity>
    </View>
  )
}

export { AttachmentModalContent }
