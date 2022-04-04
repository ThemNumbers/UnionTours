import { showAlert } from '../../native/utils/showAlert'
import { resolveTour } from './TourResolver'

const resolveData = (data: any, title?: string, body?: string) => {
  if (title && body) {
    showAlert({
      title,
      body,
      type: 'info',
      withButtons: true,
      onPress: () => resolveSwitcher(data),
    })
  } else {
    resolveSwitcher(data)
  }
}

const resolveSwitcher = (data: any) => {
  if (data && data.type) {
    switch (data.type) {
      case 'about-card':
        resolveTour(data)
        break
      default:
        break
    }
  }
}

export { resolveSwitcher, resolveData }
