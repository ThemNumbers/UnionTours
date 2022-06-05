import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Animated, PanResponder, View, I18nManager, StyleSheet } from 'react-native'
import { useTheme } from '../../../theme'
import { formatSum } from '../../../utils/formatter'
import { StyledText } from '../StyledText'
import {
  clamp,
  getValueForPosition,
  isLowCloser,
  useLowHigh,
  useSelectedRail,
  useWidthLayout,
} from './helper'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 8,
    flex: 1,
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: I18nManager.isRTL ? 'flex-end' : 'flex-start',
    alignItems: 'center',
  },
  highThumbContainer: {
    position: 'absolute',
  },
  railsContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchableArea: {
    ...StyleSheet.absoluteFillObject,
  },
})

const trueFunc = () => true

interface Props {
  min: number
  max: number
  minRange?: number
  step: number
  low?: number
  high?: number
  disableRange?: boolean
  disabled?: boolean
  onValueChanged: (low: number, high: number, fromUser?: boolean) => void
  onTouchStart?: () => void
  onTouchEnd?: () => void
}

const StyledSlider: React.FC<Props> = ({
  min,
  max,
  minRange = 0,
  step,
  low: lowProp,
  high: highProp,
  disableRange = false,
  disabled = false,
  onValueChanged,
  onTouchStart,
  onTouchEnd,
}) => {
  const { theme } = useTheme()
  const { inPropsRef, inPropsRefPrev, setLow, setHigh } = useLowHigh(
    lowProp,
    disableRange ? max : highProp,
    min,
    max,
    step
  )
  const lowThumbXRef = useRef(new Animated.Value(0))
  const highThumbXRef = useRef(new Animated.Value(0))
  const pointerX = useRef(new Animated.Value(0)).current
  const { current: lowThumbX } = lowThumbXRef
  const { current: highThumbX } = highThumbXRef

  const gestureStateRef = useRef({ isLow: true, lastValue: 0, lastPosition: 0 })
  const [isPressed, setPressed] = useState(false)

  const containerWidthRef = useRef(0)
  const [thumbWidth, setThumbWidth] = useState(0)

  const [selectedRailStyle, updateSelectedRail] = useSelectedRail(
    inPropsRef,
    containerWidthRef,
    thumbWidth,
    disableRange
  )

  const updateThumbs = useCallback(() => {
    const { current: containerWidth } = containerWidthRef
    if (!thumbWidth || !containerWidth) {
      return
    }
    const { low, high } = inPropsRef.current
    if (!disableRange) {
      const { current: highThumbX } = highThumbXRef
      const highPosition = ((high - min) / (max - min)) * (containerWidth - thumbWidth)
      highThumbX.setValue(highPosition)
    }
    const { current: lowThumbX } = lowThumbXRef
    const lowPosition = ((low - min) / (max - min)) * (containerWidth - thumbWidth)
    lowThumbX.setValue(lowPosition)
    updateSelectedRail()
    onValueChanged?.(low, high, false)
  }, [disableRange, inPropsRef, max, min, onValueChanged, thumbWidth, updateSelectedRail])

  useEffect(() => {
    const { lowPrev, highPrev } = inPropsRefPrev
    if (
      (lowProp !== undefined && lowProp !== lowPrev) ||
      (highProp !== undefined && highProp !== highPrev)
    ) {
      updateThumbs()
    }
  }, [highProp, inPropsRefPrev.lowPrev, inPropsRefPrev.highPrev, lowProp])

  useEffect(() => {
    updateThumbs()
  }, [updateThumbs])

  const handleContainerLayout = useWidthLayout(containerWidthRef, updateThumbs)
  const handleThumbLayout = useCallback(
    ({ nativeEvent }) => {
      const {
        layout: { width },
      } = nativeEvent
      if (thumbWidth !== width) {
        setThumbWidth(width)
      }
    },
    [thumbWidth]
  )

  const lowStyles = useMemo(() => {
    return { transform: [{ translateX: lowThumbX }] }
  }, [lowThumbX])

  const highStyles = useMemo(() => {
    return disableRange
      ? null
      : [styles.highThumbContainer, { transform: [{ translateX: highThumbX }] }]
  }, [disableRange, highThumbX])

  const railContainerStyles = useMemo(() => {
    return [styles.railsContainer, { marginHorizontal: thumbWidth / 2 }]
  }, [thumbWidth])

  const { panHandlers } = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: trueFunc,
        onStartShouldSetPanResponderCapture: trueFunc,
        onMoveShouldSetPanResponder: trueFunc,
        onMoveShouldSetPanResponderCapture: trueFunc,
        onPanResponderTerminationRequest: trueFunc,
        onPanResponderTerminate: trueFunc,
        onShouldBlockNativeResponder: trueFunc,

        onPanResponderGrant: ({ nativeEvent }, gestureState) => {
          if (disabled) {
            return
          }
          const { numberActiveTouches } = gestureState
          if (numberActiveTouches > 1) {
            return
          }
          setPressed(true)
          const { current: lowThumbX } = lowThumbXRef
          const { current: highThumbX } = highThumbXRef
          const { locationX: downX, pageX } = nativeEvent
          const containerX = pageX - downX

          const { low, high, min, max } = inPropsRef.current
          onTouchStart?.(low, high)
          const containerWidth = containerWidthRef.current

          const lowPosition =
            thumbWidth / 2 + ((low - min) / (max - min)) * (containerWidth - thumbWidth)
          const highPosition =
            thumbWidth / 2 + ((high - min) / (max - min)) * (containerWidth - thumbWidth)

          const isLow = disableRange || isLowCloser(downX, lowPosition, highPosition)
          gestureStateRef.current.isLow = isLow

          const handlePositionChange = (positionInView) => {
            const { low, high, min, max, step } = inPropsRef.current
            const minValue = isLow ? min : low + minRange
            const maxValue = isLow ? high - minRange : max
            const value = clamp(
              getValueForPosition(positionInView, containerWidth, thumbWidth, min, max, step),
              minValue,
              maxValue
            )
            if (gestureStateRef.current.lastValue === value) {
              return
            }
            const availableSpace = containerWidth - thumbWidth
            const absolutePosition = ((value - min) / (max - min)) * availableSpace
            gestureStateRef.current.lastValue = value
            gestureStateRef.current.lastPosition = absolutePosition + thumbWidth / 2
            ;(isLow ? lowThumbX : highThumbX).setValue(absolutePosition)
            onValueChanged?.(isLow ? value : low, isLow ? high : value, true)
            ;(isLow ? setLow : setHigh)(value)
            updateSelectedRail()
          }
          handlePositionChange(downX)
          pointerX.removeAllListeners()
          pointerX.addListener(({ value: pointerPosition }) => {
            const positionInView = pointerPosition - containerX
            handlePositionChange(positionInView)
          })
        },

        onPanResponderMove: disabled
          ? undefined
          : Animated.event([null, { moveX: pointerX }], { useNativeDriver: false }),

        onPanResponderRelease: () => {
          setPressed(false)
          const { low, high } = inPropsRef.current
          onTouchEnd?.(low, high)
        },
      }),
    [
      pointerX,
      inPropsRef,
      thumbWidth,
      disableRange,
      disabled,
      onValueChanged,
      setLow,
      setHigh,
      updateSelectedRail,
    ]
  )

  const renderThumb = () => (
    <View
      style={{
        width: 16,
        height: 16,
        borderRadius: 16,
        borderWidth: 4,
        backgroundColor: theme.colors.gray_1,
        borderColor: theme.colors.cyan_7,
      }}
    />
  )

  return (
    <View style={styles.container}>
      <StyledText
        size={'s'}
        family={'semibold'}
        style={{ color: theme.colors.gray_9, marginRight: 12 }}
      >
        {min}
      </StyledText>
      <View style={{ flex: 1 }}>
        <View onLayout={handleContainerLayout} style={styles.controlsContainer}>
          <View style={railContainerStyles}>
            <View style={{ flex: 1, height: 2, backgroundColor: theme.colors.gray_3 }} />
            <Animated.View style={selectedRailStyle}>
              <View style={{ backgroundColor: theme.colors.cyan_6, height: 2 }} />
            </Animated.View>
          </View>
          <Animated.View style={lowStyles} onLayout={handleThumbLayout}>
            {renderThumb()}
          </Animated.View>
          {!disableRange && <Animated.View style={highStyles}>{renderThumb()}</Animated.View>}
          <View {...panHandlers} style={styles.touchableArea} collapsable={false} />
        </View>
      </View>
      <StyledText
        size={'s'}
        family={'semibold'}
        style={{ color: theme.colors.gray_9, marginLeft: 12 }}
      >
        {formatSum(max, true)}
      </StyledText>
    </View>
  )
}

export { StyledSlider }
