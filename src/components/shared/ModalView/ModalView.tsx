import React, { FC } from 'react'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Modal } from '@consta/uikit/Modal'
import {
  setComponentActionCreator,
  setInvisibleActionCreator,
  setVisibleActionCreator
} from '../../../store/reducers/selectedModal/selectedModalActionCreators'
import store from '../../../store'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { classJoiner } from '../../../utils/styleClassesUtills'
import cl from './ModalView.module.scss'

export function openModal(component: JSX.Element): void {
  store.dispatch(setComponentActionCreator(component))
  store.dispatch(setVisibleActionCreator())
}

export function closeModal(): void {
  store.dispatch(setInvisibleActionCreator())
}

const ModalView: FC = () => {
  const { visible, component } = useAppSelector((state) => state.selectedModal)

  return (
    <Modal
      isOpen={visible}
      hasOverlay
      onEsc={closeModal}
      onClickOutside={closeModal}
      className={cl.modal}
    >
      {component || <></>}
    </Modal>
  )
}

export default ModalView
