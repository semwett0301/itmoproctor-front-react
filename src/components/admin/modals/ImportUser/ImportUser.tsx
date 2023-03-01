import React, {FC} from 'react';
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle';
import {classJoiner} from '../../../../utils/common/styleClassesUtills';
import {cnMixSpace} from '@consta/uikit/MixSpace';
import cl from './ImportUser.module.scss'

const ImportUser: FC = () => {
  return (
    <>
      <ModalTitle title={'importUser'}/>
      <div className={classJoiner(cnMixSpace({pH: '2xs'}), cl.wrapper)}/>
    </>
  );
};

export default ImportUser;
