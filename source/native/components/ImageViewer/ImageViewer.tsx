import * as React from 'react'
import { I18nManager, StyleSheet, useWindowDimensions, View } from 'react-native'
import { ImageZoom } from './modules/ImageZoom'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A202C',
  },
  moveBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

interface ImageViewerProps {
  imageUrls: Array<string>
  flipThreshold?: number
  maxOverflow?: number
  initialIndex?: number
  menuContext?: any
  enableImageZoom?: boolean
  enableSwipeDown?: boolean
  swipeDownThreshold?: number
  doubleClickInterval?: number
  minScale?: number
  maxScale?: number
  pageAnimateTime?: number
  onClick?: () => void
  onDoubleClick?: () => void
  onMove?: (position?: any) => void
  renderFooter?: (currentIndex: number) => React.ReactElement<any>
  renderHeader?: (currentIndex?: number, allSize?: number) => React.ReactElement<any>
  renderImage?: (uri: string) => React.ReactElement<any>
  onSwipeDown?: () => void
}

export interface ImageViewerRef {
  changeIndex: (index: number) => void
}

const ImageViewer = React.forwardRef<ImageViewerRef, ImageViewerProps>(
  (
    {
      imageUrls = [],
      flipThreshold = 80,
      maxOverflow = 300,
      initialIndex = 0,
      enableImageZoom = true,
      enableSwipeDown = false,
      swipeDownThreshold,
      doubleClickInterval,
      minScale,
      maxScale,
      pageAnimateTime = 200,
      onClick,
      onDoubleClick,
      onMove,
      renderFooter,
      renderHeader,
      renderImage,
      onSwipeDown,
    },
    ref
  ) => {
    const [currentShowIndex, setCurrentShowIndex] = React.useState<number>(initialIndex || 0)
    const { width, height } = useWindowDimensions()
    const positionXNumber = React.useRef<number>(
      width * currentShowIndex * (I18nManager.isRTL ? 1 : -1)
    )
    const standardPositionX = React.useRef<number>(positionXNumber.current)
    const positionX = useSharedValue(positionXNumber.current)

    React.useImperativeHandle(ref, () => ({
      changeIndex: (index: number) => {
        setCurrentShowIndex(index)
        positionXNumber.current = width * index * (I18nManager.isRTL ? 1 : -1)
        standardPositionX.current = positionXNumber.current
        positionX.value = positionXNumber.current
      },
    }))

    const handleHorizontalOuterRangeOffset = (offsetX: number = 0) => {
      positionXNumber.current = standardPositionX.current + offsetX
      positionX.value = positionXNumber.current
    }

    const goBack = () => {
      if (currentShowIndex === 0) {
        resetPosition()
        return
      }

      positionXNumber.current = !I18nManager.isRTL
        ? standardPositionX.current + width
        : standardPositionX.current - width
      standardPositionX.current = positionXNumber.current
      positionX.value = withTiming(positionXNumber.current, { duration: pageAnimateTime })
      setCurrentShowIndex((currentShowIndex || 0) - 1)
    }

    const goNext = () => {
      if (currentShowIndex === imageUrls.length - 1) {
        resetPosition()
        return
      }

      positionXNumber.current = !I18nManager.isRTL
        ? standardPositionX.current - width
        : standardPositionX.current + width
      standardPositionX.current = positionXNumber.current
      positionX.value = withTiming(positionXNumber.current, { duration: pageAnimateTime })
      setCurrentShowIndex((currentShowIndex || 0) + 1)
    }

    const resetPosition = () => {
      positionXNumber.current = standardPositionX.current
      positionX.value = withTiming(standardPositionX.current, { duration: 150 })
    }

    const handleResponderRelease = (vx: number = 0) => {
      const vxRTL = I18nManager.isRTL ? -vx : vx
      const isLeftMove = I18nManager.isRTL
        ? positionXNumber.current - standardPositionX.current < -(flipThreshold || 0)
        : positionXNumber.current - standardPositionX.current > (flipThreshold || 0)
      const isRightMove = I18nManager.isRTL
        ? positionXNumber.current - standardPositionX.current > (flipThreshold || 0)
        : positionXNumber.current - standardPositionX.current < -(flipThreshold || 0)

      if (vxRTL > 0.7) {
        goBack()
        return
      } else if (vxRTL < -0.7) {
        goNext()
        return
      }

      if (isLeftMove) {
        goBack()
      } else if (isRightMove) {
        goNext()
        return
      } else {
        resetPosition()
        return
      }
    }

    const ImageElements = imageUrls.map((image, index) => {
      if ((currentShowIndex || 0) > index + 1 || (currentShowIndex || 0) < index - 1) {
        return <View key={index} style={{ width: width, height: height }} />
      }

      return (
        <ImageZoom
          key={index}
          cropWidth={width}
          cropHeight={height}
          maxOverflow={maxOverflow}
          horizontalOuterRangeOffset={handleHorizontalOuterRangeOffset}
          responderRelease={handleResponderRelease}
          onMove={onMove}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          imageWidth={width}
          imageHeight={height}
          enableSwipeDown={enableSwipeDown}
          swipeDownThreshold={swipeDownThreshold}
          onSwipeDown={onSwipeDown}
          panToMove
          pinchToZoom={enableImageZoom}
          enableDoubleClickZoom={enableImageZoom}
          doubleClickInterval={doubleClickInterval}
          minScale={minScale}
          maxScale={maxScale}
        >
          {renderImage ? renderImage(image) : null}
        </ImageZoom>
      )
    })

    const moveBoxStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: positionX.value }],
    }))

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.moveBox, moveBoxStyle, { width: width * imageUrls.length }]}>
          {ImageElements}
        </Animated.View>
        {renderHeader ? renderHeader((currentShowIndex || 0) + 1, imageUrls.length) : null}

        {renderFooter ? renderFooter(currentShowIndex) : null}
      </View>
    )
  }
)

export { ImageViewer }
