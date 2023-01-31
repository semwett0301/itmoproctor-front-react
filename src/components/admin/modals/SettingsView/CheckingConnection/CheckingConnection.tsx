import { Button } from '@consta/uikit/Button'
import { Text } from '@consta/uikit/Text'
import React, { FC, useEffect, useRef, useState } from 'react'
import { IconPlay } from '@consta/icons/IconPlay'
import cl from './CheckingConnection.module.scss'
import Draggable from 'react-draggable'
import LocalPlayer from '../../../../shared/players/camera/LocalPlayer/LocalPlayer';

const CheckingConnection: FC = () => {
  const videoRef = useRef<HTMLDivElement>(null)

  const [leftBound, setLeftBound] = useState<number>(0)
  const [bottomBound, setBottomBound] = useState<number>(0)

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
            <LocalPlayer/>
          </div>
        </Draggable>
        <div className={cl.mainFrame}/>
      </div>
      <div className={cl.downPanel}>
        <Button label={'Запустить'} iconLeft={IconPlay} view={'secondary'} size={'s'} />
        <Text as={'div'} size={'s'} view={'warning'}>
          Установка соединения
        </Text>
      </div>
    </div>
  )
}

export default CheckingConnection
