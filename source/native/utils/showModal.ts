export interface ModalOptions {
  withSwipe?: boolean
  renderContent: (hideModal: () => void) => React.ReactNode
}

export const showCustomModal = (modalOptions: ModalOptions) => {
  //store.dispatch(showModal(modalOptions))
}
