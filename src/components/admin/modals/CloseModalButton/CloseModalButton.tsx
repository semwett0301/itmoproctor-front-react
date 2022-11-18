import React, { FC } from 'react'
import { IconClose } from '@consta/uikit/IconClose'
import { Button } from '@consta/uikit/Button'
import { closeModal } from '../../../shared/ModalView/ModalView'

const CloseModalButton: FC = () => {
  return (
    <Button
      onlyIcon={true}
      iconLeft={IconClose}
      view={'clear'}
      size={'xs'}
      onClick={() => closeModal()}
    />
  )
}

export default CloseModalButton
