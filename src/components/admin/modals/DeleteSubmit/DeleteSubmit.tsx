import React, { FC } from 'react'
import cl from './DeleteSubmit.module.scss'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { IconClose } from '@consta/uikit/IconClose'
import { classJoiner } from '../../../../utils/styleClassesUtills'

// TYPES
interface IDeleteSubmitProp {
  onSubmit: () => void
  onCancel?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined
}

const DeleteSubmit: FC<IDeleteSubmitProp> = ({ onSubmit, onCancel }) => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.firstRow}>
        <Button onlyIcon={true} iconLeft={IconClose} view={'clear'} size={'xs'} />
      </div>
      <Text className={cnMixSpace({ mV: 'l' })}>Вы уверены, что хотите удалить этот экзамен?</Text>
      <div className={classJoiner(cnMixSpace({ mT: 's' }), cl.firstRow)}>
        <Button label={'Удалить'} onClick={() => onSubmit()} view={'secondary'} />
        <Button label={'Отменить'} onClick={onCancel} />
      </div>
    </div>
  )
}

export default DeleteSubmit
