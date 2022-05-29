import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { LoadingImage } from '../../../../components/LoadingImage'
import { useTheme } from '../../../../theme'

const styles = StyleSheet.create({
  imageWrapper: { padding: 2, borderRadius: 2, marginHorizontal: 3, borderWidth: 1 },
  image: { width: 32, height: 40, borderRadius: 2 },
})

interface Props {
  useFastImage?: boolean
  uri: string
  isSelected: boolean
  onSelect: () => void
}

const SmallImageItem: React.FC<Props> = ({ uri, useFastImage, isSelected, onSelect }) => {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      onPress={onSelect}
      disabled={isSelected ? true : false}
      style={[
        styles.imageWrapper,
        { borderColor: isSelected ? theme.colors.gray_5 : 'transparent' },
      ]}
    >
      <LoadingImage
        useFastImage={useFastImage}
        withHeaders
        style={styles.image}
        resizeMode={'cover'}
        uri={uri}
      />
    </TouchableOpacity>
  )
}

export { SmallImageItem }
