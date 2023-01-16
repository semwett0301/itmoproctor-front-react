import React, {FC, useCallback, useEffect, useState} from 'react'
import {Text} from '@consta/uikit/Text'
import {ProgressLine} from '@consta/uikit/ProgressLine'
import cl from './NetworkSettings.module.scss'
import {Button} from '@consta/uikit/Button'
import {IconPause} from '@consta/uikit/IconPause'
import {IconPlay} from '@consta/uikit/IconPlay'
import {IpInfo} from '../../../../../api/axios/modules/network';
import {request} from '../../../../../api/axios/request';
import dayjs, {Dayjs} from 'dayjs';

const NetworkSettings: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ipInfo, setIpInfo] = useState<IpInfo | undefined>(undefined)
  const [ping, setPing] = useState<number | undefined>(undefined)

  const resetData = useCallback<() => void>(() => {
    setIpInfo(undefined)
    setPing(undefined)
  }, [])

  const getIpInfo = useCallback<() => Promise<void>>(async () => {
    await request.network.getIpInfo().then(r => setIpInfo(r.data))
  }, [])

  const getPing = useCallback<() => Promise<void>>(async () => {
    const currentTime: number = dayjs().millisecond()
    await request.network.checkPing().then(() => setPing(-currentTime + dayjs().millisecond()))
  }, [])

  useEffect(() => {
    if (isLoading) {
      resetData()
      getIpInfo().then(() => getPing().then(() => setIsLoading(false)))
    }
  }, [isLoading])

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
            {ipInfo?.ip || '-'}
          </Text>
          <Text view={'primary'} size={'s'}>
            {ipInfo ? `${ipInfo.country}, ${ipInfo.city}` : '-'}
          </Text>
          <Text view={'primary'} size={'s'}>
            {ping ? `${ping} мс` : '-'}
          </Text>
          {/* <Text view={'primary'} size={'s'}> */}
          {/*   32.55 Мбит/с */}
          {/* </Text> */}
          <ProgressLine className={cl.progress}/>
          <ProgressLine className={cl.progress}/>
        </div>
      </div>
      <div className={cl.buttonWrapper}>
        {
          !isLoading ? <Button iconLeft={IconPlay} size={'s'} view={'primary'} label={'Проверить'}
                               onClick={() => setIsLoading(true)}/> :
            <Button iconLeft={IconPause} size={'s'} view={'primary'} label={'Остановить'}
                    onClick={() => setIsLoading(false)}/>
        }
      </div>
    </div>
  )
}

export default NetworkSettings
