/* eslint-disable no-console */
import { Alert } from '../../framework/redux/interfaces/Alerts'
import { UnionRequestScreenType } from '../../framework/redux/interfaces/Jira'
import { logError } from '../analytic/firebase'
import { AnalyticTypes } from '../analytic/types'
import { navigateToDeeplink, navigationRef } from '../navigation/RootNavigation'
import { Routes } from '../navigation/routes'
import { IS_PROD } from './constants'
import { showAlert } from './showAlert'

export interface CustomError {
  method?: string
  endpoint: string
  where: string
  body?: string
  code?: number
  response?: string
}

const excludeRoutes = [Routes.AuthScreen, Routes.ForgotPassword]

const checkNavigationIsAvailable = () => {
  if (navigationRef) {
    const currentRoute = navigationRef.getCurrentRoute()
    if (currentRoute && excludeRoutes.every((r) => r !== currentRoute.name)) {
      return true
    }
  }
}

const routeToServiceDesc = (errorString?: string) => {
  const isAvailable = checkNavigationIsAvailable()
  if (isAvailable) {
    navigateToDeeplink(Routes.UnionRequestScreen, {
      type: UnionRequestScreenType.INCORRECT_WORK,
      analytic: { type: AnalyticTypes.SERVICE_DESC_ALERT, error: errorString },
    })
  }
}

const errorHandler = (
  error: CustomError,
  alert: Alert = {
    title: 'Ошибка',
    body: 'Не удалось загрузить данные, попробуйте позже',
    type: 'error',
  }
) => {
  const errorString = `Method: ${error.method || 'GET'}\n\nEndpoint: ${error.endpoint}\n\nWhere: ${
    error.where
  }\n\nBody: ${error.body}\n\nCode: ${error.code}\n\nResponse: ${error.response}`

  switch (error.code) {
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
      alert.title = 'Сервис временно недоступен'
      alert.body = 'Не удалось связаться с сервисом, попробуйте позже'
      break
    case 403:
      alert.title = 'Ошибка'
      alert.body = 'У вас нет необходимых прав доступа'
      break
  }
  if (IS_PROD) {
    logError(errorString)
  } else {
    console.log('-----------ERROR----------')
    console.log(errorString)
    console.log('--------------------------')
  }

  const isAvailable = checkNavigationIsAvailable()
  if (isAvailable) {
    alert.onPress = () => routeToServiceDesc(errorString)
    alert.leftBtnText = 'Написать в поддержку'
    alert.withButtons = true
    alert.rightBtnText = 'Закрыть'
  }
  showAlert(alert)
}

export { errorHandler }
