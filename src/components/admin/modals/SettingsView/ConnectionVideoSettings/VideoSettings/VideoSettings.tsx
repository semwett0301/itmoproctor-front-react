import { Layout } from '@consta/uikit/Layout'
import React, { FC, useState } from 'react'
import { Select } from '@consta/uikit/Select'
import { Item } from '../../../../../../ts/types/Item'
import { TextField } from '@consta/uikit/TextField'
import cl from '../ConnectionVideoSettings.module.scss'
import CheckingConnection from '../../CheckingConnection/CheckingConnection'

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

const VideoSettings: FC = () => {
  const [frequency, setFrequency] = useState<string | null>('15')
  const changeFrequency = ({ value }: { value: string | null }) => {
    if (Number(value)) setFrequency(value)
  }
  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout flex={6} className={cl.video}>
        <CheckingConnection />
      </Layout>
      <Layout flex={1}>
        <Select
          size={'s'}
          label={'Камера'}
          items={items}
          onChange={() => {
            null
          }}
        />
      </Layout>
      <Layout flex={1}>
        <Select
          size={'s'}
          label={'Микрофон'}
          items={items}
          onChange={() => {
            null
          }}
        />
      </Layout>
      <Layout className={cl.resolution} flex={1}>
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

export default VideoSettings
