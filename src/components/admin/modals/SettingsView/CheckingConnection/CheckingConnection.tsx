import {Button} from '@consta/uikit/Button'
import {Text} from '@consta/uikit/Text'
import React, {FC, useEffect, useRef, useState} from 'react'
import {IconPlay} from '@consta/icons/IconPlay'
import cl from './CheckingConnection.module.scss'
import Draggable from 'react-draggable'
import LocalPlayer from '../../../../shared/players/camera/LocalPlayer/LocalPlayer';
import {IconPause} from '@consta/icons/IconPause';
import {useDeviceSettings} from '../../../../../hooks/shared/webRtc/useDeviceSettings';

const CheckingConnection: FC = () => {
  const videoRef = useRef<HTMLDivElement>(null)

  const [leftBound, setLeftBound] = useState<number>(0)
  const [bottomBound, setBottomBound] = useState<number>(0)

  const [isCheckingStart, setIsCheckingStart] = useState<boolean>(false)

  const {
    currentCamera,
    currentInputAudio,
    currentFrequency
  } = useDeviceSettings()

  useEffect(() => {
    if (videoRef.current?.offsetWidth && videoRef.current?.offsetHeight) {
      setLeftBound((-videoRef.current.offsetWidth * 2) / 3 + 8)
      setBottomBound((videoRef.current.offsetHeight * 2) / 3 + 8)
    }
  }, [videoRef.current])

  return (
    <div className={cl.wrapper}>
      <div ref={videoRef} className={cl.video}>
        <Draggable
          axis={'both'}
          bounds={{
            left: leftBound,
            right: 27,
            bottom: bottomBound,
            top: 0
          }}
        >
          <div className={cl.extraFrame}>
            {
              isCheckingStart ?
                <LocalPlayer videoDeviceId={currentCamera?.device.deviceId ?? ''} frequency={currentFrequency}/> :
                <img
                  src={'https://images.squarespace-cdn.com/content/v1/5bbcad0f2727be3646b9fee1/1581444002162-ENI9OCULKLB1M1JE3XD0/image-asset.png?format=1000w'}
                  alt={'Локальный плеер'}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}/>
            }
          </div>
        </Draggable>
        <div className={cl.mainFrame}/>
      </div>
      <div className={cl.downPanel}>
        <Button label={isCheckingStart ? 'Остановить' : 'Запустить'} disabled={!currentCamera || !currentInputAudio}
                iconLeft={isCheckingStart ? IconPause : IconPlay} view={'secondary'} size={'s'} onClick={() => setIsCheckingStart(!isCheckingStart)}/>
        <Text as={'div'} size={'s'} view={'warning'}>
          Установка соединения
        </Text>
      </div>
    </div>
  )
}

export default CheckingConnection
