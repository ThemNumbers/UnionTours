import { useCallback, useMemo, useRef, useState } from 'react'
import { Animated, I18nManager, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
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
  labelFixedContainer: {
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
  },
  labelFloatingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
  },
  touchableArea: {
    ...StyleSheet.absoluteFillObject,
  },
})

/**
 * low and high state variables are fallbacks for props (props are not required).
 * This hook ensures that current low and high are not out of [min, max] range.
 * It returns an object which contains:
 * - ref containing correct low, high, min, max and step to work with.
 * - setLow and setHigh setters
 * @param lowProp
 * @param highProp
 * @param min
 * @param max
 * @param step
 * @returns {{inPropsRef: React.MutableRefObject<{high: (*|number), low: (*|number)}>, setLow: (function(number): undefined), setHigh: (function(number): undefined)}}
 */
export const useLowHigh = (
  lowProp: number,
  highProp: number,
  min: number,
  max: number,
  step: number
) => {
  const validLowProp = lowProp === undefined ? min : clamp(lowProp, min, max)
  const validHighProp = highProp === undefined ? max : clamp(highProp, min, max)
  const inPropsRef = useRef({ low: validLowProp, high: validHighProp })
  const { low: lowState, high: highState } = inPropsRef.current
  const inPropsRefPrev = { lowPrev: lowState, highPrev: highState }

  // Props have higher priority.
  // If no props are passed, use internal state variables.
  const low = clamp(lowProp === undefined ? lowState : lowProp, min, max)
  const high = clamp(highProp === undefined ? highState : highProp, min, max)

  // Always update values of refs so pan responder will have updated values
  Object.assign(inPropsRef.current, { low, high, min, max, step })

  const setLow = (value) => (inPropsRef.current.low = value)
  const setHigh = (value) => (inPropsRef.current.high = value)
  return { inPropsRef, inPropsRefPrev, setLow, setHigh }
}

/**
 * Sets the current value of widthRef and calls the callback with new width parameter.
 * @param widthRef
 * @param callback
 * @returns {function({nativeEvent: *}): void}
 */
export const useWidthLayout = (widthRef, callback) => {
  return useCallback(
    ({ nativeEvent }) => {
      const {
        layout: { width },
      } = nativeEvent
      const { current: w } = widthRef
      if (w !== width) {
        widthRef.current = width
        if (callback) {
          callback(width)
        }
      }
    },
    [callback, widthRef]
  )
}

export const useSelectedRail = (inPropsRef, containerWidthRef, thumbWidth, disableRange) => {
  const { current: left } = useRef(new Animated.Value(0))
  const { current: right } = useRef(new Animated.Value(0))
  const update = useCallback(() => {
    const { low, high, min, max } = inPropsRef.current
    const { current: containerWidth } = containerWidthRef
    const fullScale = (max - min) / (containerWidth - thumbWidth)
    const leftValue = (low - min) / fullScale
    const rightValue = (max - high) / fullScale
    left.setValue(disableRange ? 0 : leftValue)
    right.setValue(disableRange ? containerWidth - thumbWidth - leftValue : rightValue)
  }, [inPropsRef, containerWidthRef, disableRange, thumbWidth, left, right])
  const styles = useMemo(
    () => ({
      position: 'absolute',
      left: I18nManager.isRTL ? right : left,
      right: I18nManager.isRTL ? left : right,
    }),
    [left, right]
  )
  return [styles, update]
}

/**
 * @param floating
 * @returns {{onLayout: ((function({nativeEvent: *}): void)|undefined), style: [*, {top}]}}
 */
export const useLabelContainerProps = (floating) => {
  const [labelContainerHeight, setLabelContainerHeight] = useState(0)
  const onLayout = useCallback(({ nativeEvent }) => {
    const {
      layout: { height },
    } = nativeEvent
    setLabelContainerHeight(height)
  }, [])

  const top = floating ? -labelContainerHeight : 0
  const style = [floating ? styles.labelFloatingContainer : styles.labelFixedContainer, { top }]
  return { style, onLayout: onLayout }
}

export const isLowCloser = (downX, lowPosition, highPosition) => {
  if (lowPosition === highPosition) {
    return downX < lowPosition
  }
  const distanceFromLow = Math.abs(downX - lowPosition)
  const distanceFromHigh = Math.abs(downX - highPosition)
  return distanceFromLow < distanceFromHigh
}

export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

export const getValueForPosition = (positionInView, containerWidth, thumbWidth, min, max, step) => {
  const availableSpace = containerWidth - thumbWidth
  const relStepUnit = step / (max - min)
  let relPosition = (positionInView - thumbWidth / 2) / availableSpace
  const relOffset = relPosition % relStepUnit
  relPosition -= relOffset
  if (relOffset / relStepUnit >= 0.5) {
    relPosition += relStepUnit
  }
  return clamp(min + Math.round(relPosition / relStepUnit) * step, min, max)
}
