import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import ImagePicker, { ImageOrVideo, Options } from 'react-native-image-crop-picker'
import { ImageFromType } from '../../../framework/redux/interfaces/App'
import { Theme, useThemeStyles } from '../../theme'
import { formatBytes, getFilenameFromPath } from '../../utils/formatter'
import { sleep } from '../../utils/sleep'
import { ButtonWithModal } from '../ButtonWithModal'
import { CloseIcon } from '../Icons/CloseIcon'
import { PaperClipIcon } from '../Icons/PaperClipIcon'
import { LoadingImage } from '../LoadingImage'
import { ShadowView } from '../ShadowView'
import { StyledButton } from '../UIKit/StyledButton'
import { StyledText } from '../UIKit/StyledText'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    shadowWrapper: {
      padding: 16,
      paddingRight: 0,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.gray_1,
    },
    imageName: { color: theme.colors.gray_9 },
    imageSize: { color: theme.colors.gray_7 },
    image: { width: 40, height: 40, borderRadius: 8 },
    imageDetailsContainer: { marginLeft: 16, flex: 1 },
    imageCloseCircleContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  return styles
}

const imagePickerOptions: Options = {
  width: 400,
  height: 300,
  cropping: false,
  loadingLabelText: 'Загрузка...',
  compressImageQuality: 0.8,
}

interface Props {
  btnTitle: string
  withoutModal?: boolean
  withShadows?: boolean
  activeBtnBgColor?: string
  activeBtnTextColor?: string
  selectedImage?: ImageOrVideo
  disableButton?: boolean
  style?: StyleProp<ViewStyle>
  onSelectImage: (image?: ImageOrVideo) => void
}

const ImageAttachmentButton: React.FC<Props> = ({
  btnTitle,
  withShadows,
  withoutModal,
  activeBtnBgColor,
  activeBtnTextColor,
  selectedImage,
  disableButton,
  style,
  onSelectImage,
}) => {
  const { styles, theme } = useThemeStyles(createStyles)

  const processImage = (nextSelectedImage: ImageOrVideo | undefined) => {
    onSelectImage(nextSelectedImage)
    return Promise.resolve()
  }

  const onSelectType = ({ result }: { result: ImageFromType }) => {
    return sleep(500).then(() => {
      return result === ImageFromType.CAMERA
        ? ImagePicker.openCamera(imagePickerOptions).then(processImage)
        : ImagePicker.openPicker(imagePickerOptions).then(processImage)
    })
  }

  return selectedImage ? (
    <ShadowView type={withShadows ? 'light' : 'none'} style={[styles.shadowWrapper, style]}>
      <LoadingImage
        useFastImage
        style={styles.image}
        resizeMode={'cover'}
        uri={selectedImage.path}
      />
      <View style={styles.imageDetailsContainer}>
        <StyledText size={'s'} numberOfLines={1} family={'medium'} style={styles.imageName}>
          {selectedImage.filename || getFilenameFromPath(selectedImage.path)}
        </StyledText>
        <StyledText size={'s'} family={'regular'} style={styles.imageSize}>
          {formatBytes(selectedImage.size)}
        </StyledText>
      </View>
      <TouchableOpacity
        onPress={() => onSelectImage(undefined)}
        style={styles.imageCloseCircleContainer}
      >
        <CloseIcon color={theme.colors.red_6} />
      </TouchableOpacity>
    </ShadowView>
  ) : withoutModal ? (
    <StyledButton
      title={btnTitle || 'Добавить'}
      activeBgColor={activeBtnBgColor}
      activeTextColor={activeBtnTextColor}
      renderIcon={(color) => <PaperClipIcon color={color} />}
      disabled={disableButton}
      onPress={() => onSelectType({ result: ImageFromType.GALLERY })}
      containerStyle={style}
    />
  ) : (
    <ButtonWithModal
      button={{
        isDisabled: disableButton,
        modalType: 'select',
        modalTitle: '',
        title: btnTitle || 'Добавить',
        onConfirm: onSelectType,
        renderIcon: (color) => <PaperClipIcon color={color} />,
        selectModalButtons: [
          { title: 'Выбрать фото', key: ImageFromType.GALLERY },
          { title: 'Сделать снимок', key: ImageFromType.CAMERA },
        ],
        activeBgColor: activeBtnBgColor,
        activeTextColor: activeBtnTextColor,
        style: style,
      }}
    />
  )
}

export { ImageAttachmentButton }
