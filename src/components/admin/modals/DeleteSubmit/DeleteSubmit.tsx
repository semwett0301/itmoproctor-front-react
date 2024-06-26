import React, {FC} from 'react'
import cl from './DeleteSubmit.module.scss'
import {Text} from '@consta/uikit/Text'
import {Button} from '@consta/uikit/Button'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'

// TYPES
interface IDeleteSubmitProp {
  onSubmit: () => void
  onCancel?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined
}

const DeleteSubmit: FC<IDeleteSubmitProp> = ({ onSubmit, onCancel }) => {
  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'deleteSubmit'} />
      <Text size={'s'} className={cnMixSpace({ p: 's' })}>
        Вы действительно хотите удалить выбранные записи?
      </Text>
      <div className={classJoiner(cnMixSpace({ pH: '2xl', pT: '3xs', pB: 'm' }), cl.buttonBlock)}>
        <Button label={'Удалить'} onClick={() => onSubmit()} size={'s'} />
        <Button label={'Отменить'} onClick={onCancel} view={'secondary'} size={'s'} />
      </div>
    </div>
  )
}

export default DeleteSubmit
