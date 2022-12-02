import React, { FC } from 'react'
import cl from './DeleteSubmit.module.scss'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { Layout } from '@consta/uikit/Layout'
import { DatePicker } from '@consta/uikit/DatePicker'

// TYPES
interface IDeleteSubmitProp {
  onSubmit: () => void
  onCancel?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined
}

const DeleteSubmit: FC<IDeleteSubmitProp> = ({ onSubmit, onCancel }) => {
  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'submit'} />
      <Text size={'s'} className={cnMixSpace({ p: 's' })}>
        Вы уверены, что хотите удалить этот экзамен?
      </Text>
      <div className={classJoiner(cnMixSpace({ pH: '2xl', pT: '3xs', pB: 'm' }), cl.buttonBlock)}>
        <Button label={'Удалить'} onClick={() => onSubmit()} size={'s'} />
        <Button label={'Отменить'} onClick={onCancel} view={'secondary'} size={'s'} />
      </div>

      <Layout direction={'row'}>
        <DatePicker label={'Label date'} type={'date-time-range'} labelPosition={'left'} />
      </Layout>
    </div>
  )
}

export default DeleteSubmit
