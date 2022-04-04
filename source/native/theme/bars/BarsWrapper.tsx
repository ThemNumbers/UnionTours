import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { SystemBarStyle } from 'react-native-bars'
import { BottomBar } from './BottomBar'
import { TopBar } from './TopBar'

const styles = StyleSheet.create({ content: { flex: 1 } })

export interface BarItem {
  color: string
  style: SystemBarStyle
  prev?: BarItem
}

export interface BarRef {
  changeBar: (bar?: BarItem) => void
}

export interface BarsWrapperRef {
  changeBarStyle: (type: 'top' | 'bottom', bar?: BarItem) => void
}

interface Props {
  initialTopBar: BarItem
  initialBottomBar: BarItem
  children?: React.ReactNode
}

const BarsWrapper = React.forwardRef<BarsWrapperRef, Props>(
  ({ initialBottomBar, initialTopBar, children }, ref) => {
    const topBarRef = useRef<BarRef | null>(null)
    const bottomBarRef = useRef<BarRef | null>(null)

    React.useImperativeHandle(ref, () => ({
      changeBarStyle: (type: 'top' | 'bottom', bar?: BarItem) => {
        type === 'top'
          ? topBarRef.current && topBarRef.current.changeBar(bar)
          : bottomBarRef.current && bottomBarRef.current.changeBar(bar)
      },
    }))

    return (
      <>
        <TopBar ref={topBarRef} initialBar={initialTopBar} />
        <View style={styles.content}>{children}</View>
        <BottomBar ref={bottomBarRef} initialBar={initialBottomBar} />
      </>
    )
  }
)

export { BarsWrapper }
