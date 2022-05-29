import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { StyledText } from '../../../../UIKit/StyledText'
import { ITEM_HEIGHT, VISIBLE_ITEMS } from '../Constants'

const styles = StyleSheet.create({
  item: { height: ITEM_HEIGHT, justifyContent: 'center' },
  label: { color: '#000000' },
})

const perspective = 600
const RADIUS_REL = VISIBLE_ITEMS * 2
const RADIUS = RADIUS_REL * ITEM_HEIGHT

interface IValue {
  value: number
  label: string
}

interface Props {
  item: IValue
  index: number
  translateY: Animated.SharedValue<number>
}

const PickerItem: FC<Props> = ({ item, index, translateY }) => {
  const style = useAnimatedStyle(() => {
    const y = interpolate(
      translateY.value - index * ITEM_HEIGHT,
      [-ITEM_HEIGHT * 2, 0, ITEM_HEIGHT * 2],
      [-0.7, 0, 0.7],
      Extrapolate.CLAMP
    )
    const rotateX = Math.asin(y)
    const z = RADIUS * Math.cos(rotateX) - RADIUS

    return {
      transform: [
        { perspective },
        { rotateX: rotateX + 'rad' },
        { scale: perspective / (perspective - z) },
      ],
      opacity: interpolate(y, [-0.7, 0, 0.7], [0.4, 1, 0.4]),
    }
  })

  return (
    <TouchableOpacity activeOpacity={1}>
      <Animated.View key={item.value} style={[styles.item, style]}>
        <StyledText size={'xl'} family={'regular'} center style={styles.label}>
          {item.label}
        </StyledText>
      </Animated.View>
    </TouchableOpacity>
  )
}

export { PickerItem }
