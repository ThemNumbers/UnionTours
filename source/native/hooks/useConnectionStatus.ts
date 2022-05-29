import { useCallback, useEffect, useRef, useState } from 'react'
import NetInfo, {
  NetInfoCellularGeneration,
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo'
import { AppState, AppStateStatus } from 'react-native'

enum ConnectionStatus {
  GOOD = 'GOOD',
  NORMAL = 'NORMAL',
  BAD = 'BAD',
}

const useConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.GOOD)
  const appStateRef = useRef<AppStateStatus>('active')
  const canMakeRequest = [ConnectionStatus.NORMAL, ConnectionStatus.GOOD].some(
    (s) => s === connectionStatus
  )

  const handleNetInfoState = useCallback(
    (state: NetInfoState) => {
      const nextConnectionStatus =
        state && state.isConnected
          ? state.type === NetInfoStateType.wifi
            ? ConnectionStatus.GOOD
            : state.type === NetInfoStateType.cellular
            ? state.details.cellularGeneration === NetInfoCellularGeneration['3g']
              ? ConnectionStatus.NORMAL
              : state.details.cellularGeneration === NetInfoCellularGeneration['2g']
              ? ConnectionStatus.BAD
              : ConnectionStatus.GOOD
            : state.type === NetInfoStateType.vpn
            ? ConnectionStatus.GOOD
            : ConnectionStatus.BAD
          : ConnectionStatus.BAD

      if (nextConnectionStatus !== connectionStatus && appStateRef.current === 'active') {
        setConnectionStatus(nextConnectionStatus)
      }
    },
    [connectionStatus]
  )

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      appStateRef.current = nextAppState
      if (nextAppState === 'active') {
        NetInfo.fetch().then(handleNetInfoState)
      }
    },
    [handleNetInfoState]
  )

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleNetInfoState)
    AppState.addEventListener('change', handleAppStateChange)

    return () => {
      AppState.removeEventListener('change', handleAppStateChange)
      unsubscribe()
    }
  }, [handleAppStateChange, handleNetInfoState])

  return { connectionStatus, canMakeRequest }
}

export { useConnectionStatus, ConnectionStatus }
