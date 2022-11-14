import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/reduxHooks';
import {setInvisibleActionCreator} from '../../../store/reducers/selectedModal/selectedModalActionCreators';
import {Modal} from '@consta/uikit/Modal';

const ModalView: FC = () => {
  const {visible, component} = useAppSelector(state => state.selectedModal)
  const dispatch = useAppDispatch()

  const setInvisible = () => {
    dispatch(setInvisibleActionCreator())
  }


  return (
    <Modal
      isOpen={visible}
      hasOverlay
      onEsc={setInvisible}
      onClickOutside={setInvisible}
    >
      {component || <></>}
    </Modal>
  );
};

export default ModalView;
