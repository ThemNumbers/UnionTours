export interface ModalOptions {
  withSwipe?: boolean
  renderContent: (hideModal: () => void) => React.ReactNode
}
