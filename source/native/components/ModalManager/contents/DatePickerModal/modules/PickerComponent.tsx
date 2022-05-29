import React, { useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, ListRenderItem, FlatListProps } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { ITEM_HEIGHT, PICKER_HEIGHT } from '../Constants'
import { PickerItem } from './PickerItem'

type TFlatList = React.ComponentClass<Animated.AnimateProps<FlatListProps<any>>, IValue>
const AnimatedFlatList: TFlatList = Animated.createAnimatedComponent(FlatList)

const styles = StyleSheet.create({
  container: { height: PICKER_HEIGHT, overflow: 'hidden' },
  flatListContainer: { paddingVertical: ITEM_HEIGHT * 2 },
  lines: {
    borderColor: '#E6E4EA',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
  },
})

interface IValue {
  value: number
  label: string
}

interface PickerProps {
  defaultValue: number
  values: IValue[]
  flex: number
  onChange: (value: number) => void
}

const PickerComponent: React.FC<PickerProps> = ({ values, defaultValue, flex, onChange }) => {
  const ref = useRef<FlatList<IValue>>(null)
  const translateY = useSharedValue(0)
  const scrolled: Animated.SharedValue<boolean> = useSharedValue(false)

  useEffect(() => {
    if (defaultValue > values.length - 1) {
      translateY.value = ITEM_HEIGHT * values.length - 1
      onChange(values.length - 1)
    }
  }, [values, defaultValue, onChange, translateY])

  const onScroll = useAnimatedScrollHandler<{ beginY?: number; endY?: number }>({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y
      const value = event.contentOffset.y / ITEM_HEIGHT
      if (!scrolled.value) {
        return (scrolled.value = true)
      }

      if (value % 1 === 0 && scrolled.value) {
        return runOnJS(onChange)(value)
      }
    },
  })

  const opacity = useAnimatedStyle(() => ({
    opacity: withTiming(scrolled.value ? 1 : 0, { duration: 1000 }),
  }))

  const renderItem: ListRenderItem<IValue> = useCallback(
    ({ item, index }) => (
      <PickerItem key={index} item={item} index={index} translateY={translateY} />
    ),
    [translateY]
  )

  return (
    <View style={[styles.container, { flex }]}>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.lines} />
      </View>
      <AnimatedFlatList
        onLayout={() => {
          if (ref.current) {
            ref.current.scrollToIndex({
              index: defaultValue,
              animated: false,
            })
          }
          if (defaultValue === 0) {
            scrolled.value = true
          }
        }}
        ref={ref as any}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `picker-elem-${index}`}
        style={opacity}
        contentContainerStyle={styles.flatListContainer}
        data={values}
        //@ts-ignore
        renderItem={renderItem}
        snapToInterval={ITEM_HEIGHT}
        onScroll={onScroll}
      />
    </View>
  )
}

export { PickerComponent }
