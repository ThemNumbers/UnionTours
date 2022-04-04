import { useRef } from 'react'

export function useDebounce(wait = 400, leading = false) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const func = useRef<any | null>(null)

  const _clearTimer = () => {
    timer.current && clearTimeout(timer.current)
    timer.current = null
  }

  return (newFunction: () => void, scope?: () => void, args?: Array<object>) => {
    // Leading (Call on first)
    if (leading === true) {
      func.current = newFunction

      // If timer not active, call.
      if (timer.current === null) {
        func.current && func.current.apply(scope, args)
      }

      _clearTimer()
      timer.current = setTimeout(() => _clearTimer(), wait)
    }
    // Default (Call on last)
    else {
      _clearTimer()

      func.current = newFunction

      timer.current = setTimeout(() => {
        func.current && func.current.apply(scope, args)
        _clearTimer()
      }, wait)
    }
  }
}