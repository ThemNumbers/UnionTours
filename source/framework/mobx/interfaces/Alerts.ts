export interface Alert {
  id?: string
  title?: string
  body?: string
  type: 'success' | 'warning' | 'error' | 'info'
  withButtons?: boolean
  leftBtnText?: string
  rightBtnText?: string
  onPress?: () => void
}
