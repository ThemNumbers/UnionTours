import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAlertsStore } from '../../../framework/mobx/stores'
import { IS_IOS } from '../../utils/constants'
import { sleep } from '../../utils/sleep'
import { AlertItem } from './AlertItem'

const MAX_DURATION = 8000

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
    backgroundColor: 'transparent',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
})

const AlertManager: React.FC = () => {
  const { alert, setAlert } = useAlertsStore()
  const insets = useSafeAreaInsets()
  const snapPoints = [-insets.top - 32 - 200, 0]
  const animValue = useSharedValue(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onAlertPress = () => {
    alert && alert.onPress && alert.onPress()
    onHide()
  }

  const onHide = useCallback(() => {
    animValue.value = withTiming(0, { duration: 200 })
    sleep(200).then(() => {
      setAlert(undefined)
      timer.current && clearTimeout(timer.current)
    })
  }, [animValue])

  const onShow = useCallback(
    (duration: number) => {
      animValue.value = withTiming(1, { duration: 200 })
      timer.current = setTimeout(onHide, duration)
    },
    [animValue, onHide]
  )

  useEffect(() => {
    if (alert) {
      const duration = alert.body && alert.title ? MAX_DURATION : MAX_DURATION / 2
      if (timer.current) {
        clearTimeout(timer.current)
        animValue.value = withTiming(0, { duration: 200 })
        sleep(200).then(() => onShow(duration))
      } else {
        onShow(duration)
      }
    }
  }, [animValue, onHide, onShow, alert])

  const animatedStyle = useAnimatedStyle(() => ({
    top: withSpring(interpolate(animValue.value, [0, 1], snapPoints), {
      damping: 25,
      stiffness: 300,
    }),
    opacity: IS_IOS ? animValue.value : 1,
  }))

  const renderSwipeableAction = () => <View style={styles.fullWidth} />

  return alert ? (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Swipeable
        renderLeftActions={renderSwipeableAction}
        renderRightActions={renderSwipeableAction}
        onSwipeableLeftOpen={onHide}
        onSwipeableRightOpen={onHide}
      >
        <AlertItem alert={alert} onPress={onAlertPress} onHide={onHide} />
      </Swipeable>
    </Animated.View>
  ) : null
}

export { AlertManager }
