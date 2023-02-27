import {Button} from '@consta/uikit/Button'
import React, {FC, useEffect, useRef, useState} from 'react'
import {IconPlay} from '@consta/icons/IconPlay'
import cl from './CheckingConnection.module.scss'
import Draggable from 'react-draggable'
import {IconPause} from '@consta/icons/IconPause'
import {useDeviceSettings} from '../../../hooks/shared/webRtc/useDeviceSettings'
import {classJoiner} from '../../../utils/common/styleClassesUtills'
import {useWebRtc} from '../../../hooks/shared/webRtc/useWebRtc'
import StandardPlayer from '../players/StandardPlayer/StandardPlayer'
import {IconSound} from '../../../customIcons/IconSound/IconSound'
import {IconSoundOff} from '../../../customIcons/IconSoundOff/IconSoundOff'
import {CallState} from '../../../config/webCall/webCallConfig';
import {Text} from '@consta/uikit/Text';

type CheckingConnectionProps = {
  userId: string,
  examId: string
}

const CheckingConnection: FC<CheckingConnectionProps> = ({ userId, examId }) => {
  const videoRef = useRef<HTMLDivElement | null>(null)

  const [leftBound, setLeftBound] = useState<number>(0)
  const [bottomBound, setBottomBound] = useState<number>(0)

  const [isCheckingStart, setIsCheckingStart] = useState<boolean | null>(null)

  const {
    currentCamera,
    currentInputAudio,
    currentFrequency,
    currentResolution,
    currentMuted,
    updateMuted
  } = useDeviceSettings()

  const { call, stop, input, output, statusCallState, callStatusDescription } = useWebRtc(userId, {
    cameraId: currentCamera?.device.deviceId,
    microId: currentInputAudio?.device.deviceId,
    maxWidth: currentResolution.width,
    maxHeight: currentResolution.height,
    maxFrameRate: currentFrequency,
    minFrameRate: 1
  })

  useEffect(() => {
    console.log(statusCallState);
  }, [statusCallState])

  // const status = useMemo<{
  //   text: string,
  //   view: TextPropView
  // } | null>(() => {
  //   if (callState.current) {
  //     return {
  //       text: callState.current === CallState.PROCESSING_CALL ? 'Установка соединения' :
  //         callState.current === CallState.IN_CALL ? 'Соединение установлено' :
  //           callState.current === CallState.NO_CALL ? 'Текст ошибки' : '',
  //       view: callState.current === CallState.IN_CALL ? 'success' :
  //         callState.current === CallState.PROCESSING_CALL ? 'warning' : 'alert'
  //     }
  //   }
  //   return null
  // }, [callState.current])

  useEffect(() => {
    if (videoRef.current?.offsetWidth && videoRef.current?.offsetHeight) {
      setLeftBound((-videoRef.current.offsetWidth * 2) / 3 + 8)
      setBottomBound((videoRef.current.offsetHeight * 2) / 3 + 8)
    }
  }, [])

  useEffect(() => {
    if (isCheckingStart !== null) {
      if (isCheckingStart) {
        call(userId)
      } else {
        stop()
      }
    }
  }, [isCheckingStart])

  // console.log(callState.current)

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
          <div className={classJoiner(cl.extraFrame, !isCheckingStart ? cl.extraFrameDisabled : '')}>
            {
              isCheckingStart &&
              <StandardPlayer videoRef={input} muted={true} wait={statusCallState !== CallState.IN_CALL} />
            }
          </div>
        </Draggable>
        <div className={cl.mainFrame}>
          {
            isCheckingStart ?
              <StandardPlayer videoRef={output} muted={currentMuted} wait={statusCallState !== CallState.IN_CALL} />
              :
              <div className={cl.emptyMainFrame}>
                <div>
                  Трансляция не запущена.
                </div>
                <div>
                  Для проверки связи нажмите кнопку «Запустить».
                </div>
              </div>
          }
        </div>
      </div>
      <div className={cl.downPanel}>
        <div>
          <Button label={isCheckingStart ? 'Остановить' : 'Запустить'} disabled={!currentCamera || !currentInputAudio}
                  iconLeft={isCheckingStart ? IconPause : IconPlay} view={'secondary'} size={'s'} iconSize={'s'}
                  onClick={() => {
                    setIsCheckingStart(!isCheckingStart)
                  }} />
          <Button className={cl.soundButton} view={'secondary'} iconSize={'s'} size={'s'}
                  iconLeft={currentMuted ? IconSoundOff : IconSound}
                  onClick={() => {
                    updateMuted(!currentMuted)
                  }} />
        </div>
        <Text as={'div'} size={'s'}
             view={callStatusDescription.view}>
         {callStatusDescription.text}
        </Text>
      </div>
    </div>
  )
}

export default CheckingConnection
