import * as React from 'react'
import { View, ScrollView, RefreshControl, useWindowDimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({ container: { flex: 1 } })

interface Props {
  withRefresh?: boolean
  refreshing?: boolean
  onRefresh?: () => void
}

const ScrollViewWrapper: React.FC<Props> = ({ children, withRefresh, refreshing, onRefresh }) => {
  const { width } = useWindowDimensions()

  return withRefresh ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing || false} onRefresh={onRefresh} />}
    >
      <View style={[styles.container, { width: width }]}>{children}</View>
    </ScrollView>
  ) : (
    <View style={styles.container}>{children}</View>
  )
}

export { ScrollViewWrapper }
