import React, { useCallback, useRef } from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native'
import { Theme, useThemeStyles } from '../../theme'
import { keyExtractor } from '../../utils/constants'
import { TabItem } from './modules/TabItem'

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: { flex: 1 },
    corner: { width: 24 },
    tagsList: { paddingLeft: 16 },
    separator: { width: '100%', height: 1, backgroundColor: theme.colors.gray_3 },
  })

  return styles
}

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  data: Array<string>
  renderContent: (title: string, index: number) => JSX.Element | null
  onTabChange?: (idx: number) => void
}

const FlatListWithTabs: React.FC<Props> = React.memo(
  ({ containerStyle, data, renderContent, onTabChange }) => {
    const { width } = useWindowDimensions()
    const { styles } = useThemeStyles(createStyles)
    const tabsListRef = useRef<FlatList | null>(null)
    const contentsListRef = useRef<FlatList | null>(null)
    const [currentCardIdx, setCurrentCardIdx] = React.useState(0)

    const onTabPress = (index: number) => {
      contentsListRef.current &&
        contentsListRef.current.scrollToIndex({
          index: index,
          viewPosition: 0.5,
          animated: false,
        })
    }

    const onScroll = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const nextPageIdx = Math.round(e.nativeEvent.contentOffset.x / width)
        if (nextPageIdx !== currentCardIdx) {
          setCurrentCardIdx(nextPageIdx)
          tabsListRef.current &&
            tabsListRef.current.scrollToIndex({
              index: nextPageIdx,
              viewPosition: 0.5,
              animated: true,
            })
          onTabChange && onTabChange(nextPageIdx)
        }
      },
      [currentCardIdx, width, onTabChange]
    )

    const renderTagItem = useCallback(
      ({ item, index }: { item: string; index: number }) => (
        <TabItem
          index={index}
          title={item}
          isActive={index === currentCardIdx}
          onPress={onTabPress}
        />
      ),
      [currentCardIdx]
    )

    const renderListCorner = () => <View style={styles.corner} />

    const renderContentItem = useCallback(
      ({ item, index }: { item: string; index: number }) => (
        <View style={{ width }}>{renderContent(item, index)}</View>
      ),
      [width, renderContent]
    )

    return (
      <View style={[styles.container, containerStyle]}>
        <View>
          <FlatList
            ref={tabsListRef}
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={renderListCorner}
            onScrollToIndexFailed={() => null}
            keyExtractor={keyExtractor}
            style={styles.tagsList}
            renderItem={renderTagItem}
          />
        </View>

        <View style={styles.separator} />

        <FlatList
          ref={contentsListRef}
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScroll}
          keyboardShouldPersistTaps={'handled'}
          onScrollToIndexFailed={() => null}
          decelerationRate={0.89}
          style={styles.container}
          keyExtractor={keyExtractor}
          renderItem={renderContentItem}
        />
      </View>
    )
  },
  (prevProps, nextProps) => prevProps.data === nextProps.data
)

export { FlatListWithTabs }
