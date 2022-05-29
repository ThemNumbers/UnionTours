import React from 'react'
import { ImageStyle as RNImageStyle, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { navigateToDeeplink } from '../../navigation/RootNavigation'
import { Routes } from '../../navigation/routes'
import { ImagePlaceholderIcon } from '../Icons/ImagePlaceholderIcon'

interface Props {
  uri?: string
  style: StyleProp<ViewStyle>
  resizeMode: ResizeMode
  linkBrokenComponent?: React.ReactElement
  useFastImage?: boolean
  withViewer?: boolean
}

const LoadingImage: React.FC<Props> = ({
  uri,
  style,
  resizeMode,
  linkBrokenComponent,
  useFastImage,
  withViewer,
}) => {
  const anim = useSharedValue(0)
  const [linkIsBroken, setLinkIsBroken] = React.useState<boolean>(false)

  const onImageLoad = () => (anim.value = withTiming(1, { duration: 350 }))

  const onImagePress = () =>
    uri ? navigateToDeeplink(Routes.ImageViewerScreen, { images: [uri], useFastImage }) : null

  const imageStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
  }))

  return !uri || linkIsBroken ? (
    linkBrokenComponent || <ImagePlaceholderIcon />
  ) : useFastImage ? (
    <TouchableOpacity disabled={!withViewer} activeOpacity={0.7} onPress={onImagePress}>
      <Animated.View style={[style, imageStyle]}>
        <FastImage
          source={{ uri: uri }}
          style={style as ImageStyle}
          onLoad={onImageLoad}
          onError={() => setLinkIsBroken(true)}
          resizeMode={resizeMode}
        />
      </Animated.View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity disabled={!withViewer} activeOpacity={0.7} onPress={onImagePress}>
      <Animated.Image
        source={{ uri: uri }}
        style={[style as RNImageStyle, imageStyle]}
        onLoad={onImageLoad}
        onError={() => setLinkIsBroken(true)}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  )
}

export { LoadingImage }
