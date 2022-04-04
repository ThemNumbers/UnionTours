import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { ImageStyle as RNImageStyle, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import FastImage, { ImageStyle, ResizeMode } from 'react-native-fast-image'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Routes } from '../../navigation/routes'
import { HomeStackParamsList } from '../../navigation/stacks/HomeStack'
import { ImagePlaceholderIcon } from '../Icons/ImagePlaceholderIcon'

interface Props {
  uri?: string
  style: StyleProp<ViewStyle>
  resizeMode: ResizeMode
  linkBrokenComponent?: React.ReactElement
  useFastImage?: boolean
  withHeaders?: boolean
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
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>()

  const onImageLoad = () => (anim.value = withTiming(1, { duration: 350 }))

  const onImagePress = () =>
    uri ? navigation.navigate(Routes.ImageViewerScreen, { images: [uri] }) : {}

  const imageStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
  }))

  return !uri || linkIsBroken ? (
    linkBrokenComponent || <ImagePlaceholderIcon />
  ) : useFastImage ? (
    <TouchableOpacity disabled={!withViewer} activeOpacity={0.7} onPress={onImagePress}>
      <Animated.View style={[style, imageStyle]}>
        <FastImage
          source={{ uri: uri, headers: undefined }}
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
        source={{ uri: uri, headers: undefined }}
        style={[style as RNImageStyle, imageStyle]}
        onLoad={onImageLoad}
        onError={() => setLinkIsBroken(true)}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  )
}

export { LoadingImage }
