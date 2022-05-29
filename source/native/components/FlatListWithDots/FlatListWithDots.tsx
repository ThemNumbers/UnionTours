import React, { useCallback } from 'react'
import {
  View,
  FlatListProps,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import { ScalingDot } from './modules/ScalingDot'

const styles = StyleSheet.create({
  dotContainer: { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
})

interface Props extends FlatListProps<any> {
  containerStyle?: StyleProp<ViewStyle>
}

const FlatListWithDots: React.FC<Props> = ({ containerStyle, ...props }) => {
  const scrollX = useSharedValue(0)
  const { width } = useWindowDimensions()
  const offsets = props.data
    ? [...Array(props.data ? props.data.length : 0)].map((x, i) => (i ? i * (width - 24) : 0))
    : []

  const keyExtractor = useCallback((item, index) => `list-item-${index}`, [])

  return (
    <View style={containerStyle}>
      <FlatList
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => (scrollX.value = event.nativeEvent.contentOffset.x)}
        snapToAlignment={'center'}
        snapToOffsets={offsets}
        horizontal
        decelerationRate={0.89}
        {...props}
      />
      {props.data ? (
        <View style={styles.dotContainer}>
          {props.data.map((_, index) => (
            <ScalingDot key={index} index={index} inputRangeOffset={24} scrollX={scrollX} />
          ))}
        </View>
      ) : null}
    </View>
  )
}

export { FlatListWithDots }
