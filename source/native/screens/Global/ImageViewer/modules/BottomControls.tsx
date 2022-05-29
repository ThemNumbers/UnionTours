import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { SmallImageItem } from './SmallImageItem'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(26, 32, 44, 0.5)',
    height: 78,
    zIndex: 9,
    width: '100%',
    paddingVertical: 16,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listCorner: { width: 16 },
})

interface Props {
  useFastImage?: boolean
  currentIndex: number
  images: Array<string>
  onSelect: (index: number) => void
}

const BottomControls: React.FC<Props> = ({ currentIndex, useFastImage, images, onSelect }) => {
  const flatListRef = useRef<FlatList | null>(null)

  useEffect(() => {
    flatListRef.current &&
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true })
  }, [currentIndex])

  const keyExtractor = (i: string, ii: number) => `small-image-${ii}`

  const renderSmallImageItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <SmallImageItem
        uri={item}
        isSelected={index === currentIndex}
        onSelect={() => onSelect(index)}
        useFastImage={useFastImage}
      />
    ),
    [currentIndex, useFastImage, onSelect]
  )

  const renderListCorner = () => <View style={styles.listCorner} />

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        showsHorizontalScrollIndicator={false}
        horizontal
        ListFooterComponent={renderListCorner}
        ListHeaderComponent={renderListCorner}
        removeClippedSubviews={false}
        onScrollToIndexFailed={() => null}
        initialScrollIndex={currentIndex}
        keyExtractor={keyExtractor}
        renderItem={renderSmallImageItem}
      />
    </View>
  )
}

export { BottomControls }
