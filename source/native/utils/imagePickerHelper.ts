import { ImageFromType } from '../../framework/redux/interfaces/App'
import { sleep } from './sleep'
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'
import { getFilenameFromPath } from './formatter'

const imagePickerOptions = {
  width: 300,
  height: 400,
  cropping: true,
  cropperChooseText: 'Выбрать',
  cropperCancelText: 'Отменить',
  loadingLabelText: 'Загрузка...',
}

export const openImagePicker = (
  type: ImageFromType,
  processImage: (file: { uri: string; name: string; type: string }) => void
) => {
  const prepareData = (value: ImageOrVideo | undefined) => {
    if (value) {
      const file = {
        uri: value.path,
        name: value.filename || getFilenameFromPath(value.path) || '',
        type: value.mime,
      }
      processImage(file)
    }
  }

  // sleep for waiting close modal
  sleep(500).then(() => {
    return type === ImageFromType.CAMERA
      ? ImagePicker.openCamera(imagePickerOptions).then(prepareData)
      : ImagePicker.openPicker(imagePickerOptions).then(prepareData)
  })
}
