import { useEffect, useRef } from 'react'
import { isSameDate } from '../utils/formatDates'

const useLocalDateRefresher = (refreshHandler: () => void) => {
  const mutableCurrentDate = useRef(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDate = new Date()
      const dateIsDifferent = !isSameDate(mutableCurrentDate.current, nextDate)
      if (dateIsDifferent) {
        mutableCurrentDate.current = nextDate
        refreshHandler()
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [refreshHandler])
}

export { useLocalDateRefresher }
