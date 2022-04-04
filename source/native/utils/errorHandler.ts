/* eslint-disable no-console */
import { Alert } from '../../framework/mobx/interfaces/Alerts'
import { logError } from '../../framework/services/AnalyticService'
import { showAlert } from './showAlert'

export interface CustomError {
  method?: string
  endpoint: string
  where: string
  body?: string
  code?: number
  response?: string
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
  logError(errorString)
  console.log('-----------ERROR----------')
  console.log(errorString)
  console.log('--------------------------')
  showAlert(alert)
}

export { errorHandler }
