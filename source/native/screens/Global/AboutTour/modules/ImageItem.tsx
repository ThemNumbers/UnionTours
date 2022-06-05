import React from 'react'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { LoadingImage } from '../../../../components/LoadingImage'
import { ShadowView } from '../../../../components/ShadowView'
import { TouchableBounce } from '../../../../components/TouchableBounce'
import { Theme, useThemeStyles } from '../../../../theme'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { paddingBottom: 16, alignItems: 'center' },
    image: { borderRadius: 16 },
    shadowView: {
      borderRadius: 16,
      marginHorizontal: 16,
      backgroundColor: theme.colors.gray_1,
      flex: 1,
    },
  })

  return styles
}
interface Props {
  uri: string
  onPress: () => void
}

const ImageItem: React.FC<Props> = React.memo(
  ({ uri, onPress }) => {
    const { styles } = useThemeStyles(createStyles)
    const { width } = useWindowDimensions()
    const ITEM_HEIGHT = (width - 32) * 0.7725

    return (
      <TouchableBounce onPress={onPress} style={[styles.container, { width: width - 24 }]}>
        <ShadowView type={'hard'} style={[{ width: width - 32 }, styles.shadowView]}>
          <LoadingImage
            style={[styles.image, { width: width - 32, height: ITEM_HEIGHT }]}
            resizeMode={'cover'}
            uri={uri}
          />
        </ShadowView>
      </TouchableBounce>
    )
  },
  (prevProps, nextProps) => prevProps.uri === nextProps.uri
)

export { ImageItem }
