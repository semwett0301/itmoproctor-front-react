import React, {FC, useState} from 'react'
import cl from '../ConnectionVideoSettings.module.scss'
import {Layout} from '@consta/uikit/Layout'
import CheckingConnection from '../../../../../shared/CheckingConnection/CheckingConnection'
import {Select} from '@consta/uikit/Select'
import {TextField} from '@consta/uikit/TextField'
import {Item} from '../../../../../../ts/types/Item'
import {useAppSelector} from '../../../../../../hooks/store/useAppSelector';

const items: Item[] = [
  {
    label: 'Первый',
    id: '1'
  },
  {
    label: 'Второй',
    id: '2'
  },
  {
    label: 'Третий',
    id: '3'
  }
]

const ScreenSettings: FC = () => {
  const [frequency, setFrequency] = useState<string | null>('15')
  const changeFrequency = ({ value }: { value: string | null }): void => {
    if (Number(value)) setFrequency(value)
  }

  const userId = useAppSelector(state => state.user._id)

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout flex={3} className={cl.video}>
        <CheckingConnection userId={userId} examId={'loopback'}/>
      </Layout>
      <Layout flex={2}>
        <Select
          size={'s'}
          label={'Номер экрана'}
          items={items}
          onChange={() => {
            console.log('')
          }}
        />
      </Layout>
      <Layout className={cl.resolution} flex={4.5}>
        <Select
          size={'s'}
          label={'Разрешение'}
          items={items}
          onChange={() => {
            null
          }}
        />
        <TextField
          size={'s'}
          label={'Частота кадров'}
          value={frequency}
          onChange={changeFrequency}
          type='number'
          step={'1'}
          min='5'
          max={'30'}
        />
      </Layout>
    </Layout>
  )
}

export default ScreenSettings
