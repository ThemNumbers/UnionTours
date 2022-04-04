import { useNavigation } from '@react-navigation/core'
import * as React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { Pending } from '../../../framework/mobx/interfaces/Tours'
import { useTheme } from '../../theme'
import { EmptyIcon } from '../Icons/EmptyIcon'
import { SadSmileIcon } from '../Icons/SadSmileIcon'
import { StyledCircleIndicator } from '../UIKit/StyledCircleIndicator'
import { PendingPreview } from './modules/PendingPreview'
import { ScrollViewWrapper } from './modules/ScrollViewWrapper'
interface Props {
  pending: Pending
  containerStyle?: StyleProp<ViewStyle>
  disableRefresh?: boolean
  refreshing?: boolean
  isConnected?: boolean
  onRefresh?: () => void
}

const PendingWrapper: React.FC<Props> = ({
  children,
  pending,
  disableRefresh,
  refreshing,
  isConnected = true,
  containerStyle,
  onRefresh,
}) => {
  const { theme } = useTheme()
  const navigation = useNavigation()
  const withRefresh = disableRefresh
    ? false
    : [Pending.FAILED, Pending.EMPTY].some((p) => p === pending)

  return (
    <ScrollViewWrapper withRefresh={withRefresh} onRefresh={onRefresh} refreshing={refreshing}>
      {pending === Pending.DONE ? (
        children
      ) : pending === Pending.FAILED ? (
        <PendingPreview
          icon={<SadSmileIcon color={theme.colors.gray_6} />}
          title={'Сервис временно недоступен'}
          description={'Пожалуйста, повторите попытку позже'}
          buttonTitle={'Попробовать еще раз'}
          onPress={onRefresh}
        />
      ) : pending === Pending.EMPTY ? (
        <PendingPreview
          icon={<EmptyIcon />}
          description={'Здесь пока ничего нет'}
          buttonTitle={'Ок'}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <PendingPreview
          icon={<StyledCircleIndicator size={32} />}
          containerStyle={containerStyle}
          description={
            isConnected
              ? 'Загрузка...'
              : 'Данные будут загружены, когда появится соединение с интернетом'
          }
        />
      )}
    </ScrollViewWrapper>
  )
}

export { PendingWrapper }
