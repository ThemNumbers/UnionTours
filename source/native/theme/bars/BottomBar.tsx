import React, { useState } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BarItem, BarRef } from './BarsWrapper'
import { NavigationBar } from 'react-native-bars'
interface Props {
  initialBar: BarItem
}

const BottomBar = React.forwardRef<BarRef, Props>(({ initialBar }, ref) => {
  const [currentBar, setCurrentBar] = useState<BarItem>(initialBar)
  const insets = useSafeAreaInsets()

  React.useImperativeHandle(ref, () => ({
    changeBar: (nextBar?: BarItem) => {
      setCurrentBar((prev) => (nextBar ? { ...nextBar, prev } : prev.prev || initialBar))
    },
  }))

  return (
    <View style={{ backgroundColor: currentBar.color, height: insets.bottom }}>
      <NavigationBar barStyle={currentBar.style} />
    </View>
  )
})

export { BottomBar }
