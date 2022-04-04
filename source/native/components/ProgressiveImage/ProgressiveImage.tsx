import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  StyleProp,
  ImageStyle,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import { ResizeMode } from 'react-native-fast-image'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Theme, useThemeStyles } from '../../theme'
import { Routes } from '../../navigation/routes'
import { useIsMounted } from '../../hooks/useIsMounted'
import { HomeStackParamsList } from '../../navigation/stacks/HomeStack'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      overflow: 'hidden',
      alignItems: 'center',
      backgroundColor: theme.colors.gray_3,
      justifyContent: 'center',
    },
  })

  return styles
}

interface Props {
  thumbUri?: string
  fullUri: string
  style?: StyleProp<ImageStyle>
  resizeMode?: ResizeMode
  withViewer?: boolean
}

const ProgressiveImage: React.FC<Props> = ({
  thumbUri,
  fullUri,
  style,
  resizeMode,
  withViewer,
}) => {
  const anim = useSharedValue(0)
  const { styles } = useThemeStyles(createStyles)
  const { width } = useWindowDimensions()
  const SCREEN_WIDTH = width - 32
  const [heightImage, setHeightImage] = React.useState<number | undefined>(undefined)
  const isMounted = useIsMounted()
  const navigation = useNavigation<StackNavigationProp<HomeStackParamsList>>()

  const onImagePress = () => navigation.navigate(Routes.ImageViewerScreen, { images: [fullUri] })

  const onImageLoad = () => {
    anim.value = withTiming(1, { duration: 350 })
  }

  React.useEffect(() => {
    if (!heightImage) {
      Image.getSize(fullUri, (w: number, h: number) => {
        const newWidth = SCREEN_WIDTH > w ? w : SCREEN_WIDTH
        const newHeight = (h / w) * newWidth
        if (isMounted.current) {
          setHeightImage(newHeight)
        }
      })
    }
  }, [fullUri, SCREEN_WIDTH, isMounted, heightImage])

  const imageStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
    zIndex: 1,
  }))

  const imageSize = {
    width: SCREEN_WIDTH,
    height: heightImage || (SCREEN_WIDTH + 32) * 0.5125,
  }

  return (
    <View style={[styles.container, style, imageSize]}>
      {heightImage ? (
        <Animated.Image
          source={{ uri: thumbUri || fullUri }}
          style={[{ ...StyleSheet.absoluteFillObject }, imageSize]}
          blurRadius={1}
          resizeMode={resizeMode}
        />
      ) : null}

      {heightImage ? (
        <TouchableOpacity disabled={!withViewer} onPress={onImagePress}>
          <Animated.Image
            source={{ uri: fullUri }}
            style={[imageStyle, imageSize]}
            onLoad={onImageLoad}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export { ProgressiveImage }
