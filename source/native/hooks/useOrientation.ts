import { useState, useEffect } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

export const useOrientation: () => {
  orientation: 'landscape' | 'portrait'
  dvWidth: number
  dvHeight: number
} = () => {
  const window = Dimensions.get('window')

  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(
    window.width > window.height ? 'landscape' : 'portrait'
  )
  const [dvWidth, setDvWidth] = useState(window.width)
  const [dvHeight, setDvHeight] = useState(window.height)
  useEffect(() => {
    const getOrientation = ({ window: { width, height } }: { window: ScaledSize }) => {
      if (width > height) {
        setOrientation('landscape')
      } else {
        setOrientation('portrait')
      }
      setDvWidth(width)
      setDvHeight(height)
    }
    Dimensions.addEventListener('change', getOrientation)
    return () => {
      Dimensions.removeEventListener('change', getOrientation)
    }
  })

  return { orientation, dvWidth, dvHeight }
}
