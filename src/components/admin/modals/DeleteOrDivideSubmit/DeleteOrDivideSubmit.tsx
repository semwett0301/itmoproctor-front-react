import React, { FC } from 'react'
import cl from './DeleteOrDivideSubmit.module.scss'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { classJoiner } from '../../../../utils/common/styleClassesUtills'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'

// TYPES
interface IDeleteOrDivideSubmitProp {
  onSubmit: () => void
  onDivide: () => void
  onCancel?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined
}

const DeleteOrDivideSubmit: FC<IDeleteOrDivideSubmitProp> = ({ onSubmit, onDivide, onCancel }) => {
  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'deleteSubmit'} />
      <Text size={'s'} className={cnMixSpace({ p: 's' })}>Вы действительно хотите {<Text size={'s'} view={'alert'} display={'inline'} className={classJoiner(cnMixSpace({ p: 's' }), cl.alert)}>удалить</Text>} выбранные записи?
        Выберите действие: удалить полностью или разделить под экзамены?
      </Text>
      <div className={cl.buttonWrapper}>
        <div className={classJoiner(cnMixSpace({ pH: '2xl', pT: '3xs', pB: 'm' }), cl.buttonBlock)}>
          <Button label={'Удалить'} onClick={() => onSubmit()} size={'s'} />
          <Button label={'Разделить'} onClick={() => onDivide()} size={'s'} />
          <Button label={'Отменить'} onClick={onCancel} view={'secondary'} size={'s'} />
        </div>
      </div>
    </div>
  )
}

export default DeleteOrDivideSubmit
