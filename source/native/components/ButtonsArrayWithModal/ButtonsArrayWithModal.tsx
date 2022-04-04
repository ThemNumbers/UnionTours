import React, { useState } from 'react'
import { ButtonWithModal, IButtonWithModal } from '../ButtonWithModal/ButtonWithModal'

interface Props {
  buttons: Array<IButtonWithModal>
}

const ButtonsArrayWithModal: React.FC<Props> = ({ buttons }) => {
  const [processedIndex, setProcessedIndex] = useState<number | undefined>(undefined)
  const onProcessIndex = (index?: number) => setProcessedIndex(index)

  const checkIfDisabledBtn = (index: number, isDisabled?: boolean) =>
    (processedIndex !== undefined && index !== processedIndex) || isDisabled ? true : false

  return (
    <>
      {buttons.map((b, i) => (
        <ButtonWithModal
          key={i}
          buttonIdx={i}
          button={{
            ...b,
            isDisabled: checkIfDisabledBtn(i, b.isDisabled),
          }}
          onProcessIndex={onProcessIndex}
        />
      ))}
    </>
  )
}

export { ButtonsArrayWithModal }
