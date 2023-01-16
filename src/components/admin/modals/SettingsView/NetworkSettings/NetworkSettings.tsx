import React, { FC } from 'react'
import { Text } from '@consta/uikit/Text'
import { ProgressLine } from '@consta/uikit/ProgressLine'
import cl from './NetworkSettings.module.scss'
import { Button } from '@consta/uikit/Button'
import { IconPause } from '@consta/uikit/IconPause'
import { IconPlay } from '@consta/uikit/IconPlay'

const NetworkSettings: FC = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.infoWrapper}>
        <div className={cl.textWrapper}>
          <Text view={'secondary'} size={'s'}>
            IP-адрес
          </Text>
          <Text view={'secondary'} size={'s'}>
            Местоположение
          </Text>
          <Text view={'secondary'} size={'s'}>
            Время отклика
          </Text>
          <Text view={'secondary'} size={'s'}>
            Скорость передачи
          </Text>
          <Text view={'secondary'} size={'s'}>
            Скорость получения
          </Text>
        </div>
        <div className={cl.textWrapper}>
          <Text view={'primary'} size={'s'}>
            131.64.24.193
          </Text>
          <Text view={'primary'} size={'s'}>
            RU, St Petersburg
          </Text>
          <Text view={'primary'} size={'s'}>
            11 мс
          </Text>
          <Text view={'primary'} size={'s'}>
            32.55 Мбит/с
          </Text>
          <ProgressLine className={cl.progress} />
        </div>
      </div>
      <div className={cl.buttonWrapper}>
        <Button iconLeft={IconPlay} size={'s'} view={'primary'} label={'Проверить'} />
        <Button iconLeft={IconPause} size={'s'} view={'primary'} label={'Остановить'} />
      </div>
    </div>
  )
}

export default NetworkSettings
