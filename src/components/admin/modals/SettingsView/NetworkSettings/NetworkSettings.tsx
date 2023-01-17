import React, { Dispatch, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Text } from '@consta/uikit/Text'
import { ProgressLine } from '@consta/uikit/ProgressLine'
import cl from './NetworkSettings.module.scss'
import { Button } from '@consta/uikit/Button'
import { IconPause } from '@consta/uikit/IconPause'
import { IconPlay } from '@consta/uikit/IconPlay'
import { IpInfo } from '../../../../../api/axios/modules/network'
import { request } from '../../../../../api/axios/request'
import dayjs, { Dayjs } from 'dayjs'
import { getColumnLeftOffset } from '@consta/uikit/__internal__/src/components/Table/helpers'

const NetworkSettings: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ipInfo, setIpInfo] = useState<IpInfo | undefined>(undefined)
  const [ping, setPing] = useState<number | undefined>(undefined)

  const [rx, setRx] = useState<number | undefined>(undefined)
  const [tx, setTx] = useState<number | undefined>(undefined)

  const [rxProgress, setRxProgress] = useState<number | undefined>(undefined)
  const [txProgress, setTxProgress] = useState<number | undefined>(undefined)
  const controller = useMemo(() => new AbortController(), [isLoading])

  const resetData = useCallback<() => void>(() => {
    setIpInfo(undefined)
    setPing(undefined)
    setRx(undefined)
    setTx(undefined)
    setRxProgress(undefined)
    setTxProgress(undefined)
  }, [])

  const buffer = useMemo<string>(() => {
    let res = 'x'
    for (let i = 0; i < 23; i++) {
      res += res
    }
    return res
  }, [])

  useEffect(() => {
    const getIpInfo = async () => {
      const res = await request.network.getIpInfo(controller)
      setIpInfo(res.data)
    }

    const getPing = async () => {
      const currentTime = performance.now()

      await request.network.checkPing(controller)

      setPing(Math.floor(performance.now() - currentTime))
    }

    const setResOrProgress = (
      setProgress: Dispatch<number | undefined>,
      setRes: Dispatch<number | undefined>,
      progress: ProgressEvent,
      previousTime: number
    ) => {
      const currentProgress = Math.floor((progress.loaded / progress.total) * 100)

      if (currentProgress < 100) {
        if (currentProgress < 99) {
          setProgress(currentProgress)
        }
      }
    }

    const checkTX = async () => {
      const currentTime = performance.now()

      await request.network.getTX(
        buffer,
        (progress) => {
          setResOrProgress(setTxProgress, setTx, progress, currentTime)
        },
        controller
      )

      const currentPing = ping ?? 0
      const diff = performance.now().valueOf() - currentTime - currentPing || 1
      setTx(Number(((8 * 1000 * 8) / diff).toFixed(2)))
      setTxProgress(undefined)
    }

    const checkRX = async () => {
      const currentTime = performance.now()

      await request.network.getRX((progress) => {
        setResOrProgress(setRxProgress, setRx, progress, currentTime)
      }, controller)

      const currentPing = ping ?? 0
      const diff = performance.now() - currentTime - currentPing || 1
      setRx(Number(((8 * 1000 * 8) / diff).toFixed(2)))
      setRxProgress(undefined)
    }

    if (isLoading) {
      resetData()
      getIpInfo().then(() =>
        getPing().then(() => checkTX().then(() => checkRX().then(() => setIsLoading(false))))
      )
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
            {ipInfo?.country ?? '-'}, {ipInfo?.city ?? '-'}
          </Text>
          <Text view={'primary'} size={'s'}>
            {ping !== undefined ? `${ping} мс` : '-'}
          </Text>
          {txProgress ? (
            <ProgressLine value={txProgress} className={cl.progress} />
          ) : (
            <Text view={tx ? (tx > 1 ? 'success' : 'alert') : 'primary'} size={'s'}>
              {tx !== undefined ? `${tx} Мбит/с` : '-'}
            </Text>
          )}

          {rxProgress ? (
            <ProgressLine value={rxProgress} className={cl.progress} />
          ) : (
            <Text view={rx ? (rx > 1 ? 'success' : 'alert') : 'primary'} size={'s'}>
              {rx !== undefined ? `${rx} Мбит/с` : '-'}
            </Text>
          )}
        </div>
      </div>
      <div className={cl.buttonWrapper}>
        {!isLoading ? (
          <Button
            iconLeft={IconPlay}
            size={'s'}
            view={'primary'}
            label={'Проверить'}
            onClick={() => setIsLoading(true)}
          />
        ) : (
          <Button
            iconLeft={IconPause}
            size={'s'}
            view={'primary'}
            label={'Остановить'}
            onClick={() => {
              controller.abort()
              setIsLoading(false)
              resetData()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default NetworkSettings
