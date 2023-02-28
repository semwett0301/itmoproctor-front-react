import {Button} from '@consta/uikit/Button'
import React, {FC, useCallback, useEffect, useRef, useState} from 'react'
import {IconPlay} from '@consta/icons/IconPlay'
import cl from './CheckingConnection.module.scss'
import Draggable from 'react-draggable'
import {IconPause} from '@consta/icons/IconPause'
import {DeviceMode, useDeviceSettings} from '../../../hooks/shared/webRtc/useDeviceSettings'
import {classJoiner} from '../../../utils/common/styleClassesUtills'
import {useWebRtc} from '../../../hooks/shared/webRtc/useWebRtc'
import StandardPlayer from '../players/StandardPlayer/StandardPlayer'
import {IconSound} from '../../../customIcons/IconSound/IconSound'
import {IconSoundOff} from '../../../customIcons/IconSoundOff/IconSoundOff'
import {CallState} from '../../../config/webCall/webCallConfig';
import {Text} from '@consta/uikit/Text';

type CheckingConnectionProps = {
  userId: string,
  type: DeviceMode
}

const CheckingConnection: FC<CheckingConnectionProps> = ({userId, type}) => {
  const videoRef = useRef<HTMLDivElement | null>(null)

  const [leftBound, setLeftBound] = useState<number>(0)
  const [bottomBound, setBottomBound] = useState<number>(0)

  const [isCheckingStart, setIsCheckingStart] = useState<boolean | null>(null)

  const [mainWait, setMainWait] = useState<boolean>(true)
  const [extraWait, setExtraWait] = useState<boolean>(true)

  const dropWaiting = useCallback<() => void>(() => {
    setMainWait(true)
    setExtraWait(true)
  }, [])

  const videoSettings = useDeviceSettings('webcam')

  const screenSettings = useDeviceSettings('screen')

  const {call, stop, input, output, statusCallState, callStatusDescription} = useWebRtc(userId, type,{
    cameraId: type === 'webcam' ? videoSettings.currentCamera?.device.deviceId : undefined,
    microId: type === 'webcam' ? videoSettings.currentInputAudio?.device.deviceId : undefined,
    maxWidth: type === 'webcam' ? videoSettings.currentResolution.width : screenSettings.currentResolution.width,
    maxHeight: type === 'webcam' ? videoSettings.currentResolution.height : screenSettings.currentResolution.height,
    maxFrameRate: type === 'webcam' ? videoSettings.currentFrequency : screenSettings.currentFrequency,
    minFrameRate: 1,
    videoWaiting: !(mainWait || extraWait),
    dropWaiting: dropWaiting
  })

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
    if (statusCallState === CallState.NO_CALL) {
      setIsCheckingStart(null)
    }
  }, [statusCallState])

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
                <StandardPlayer videoRef={input} muted={true} wait={extraWait} onLoadedMetadata={() => {
                  setExtraWait(false)
                }
                }/>
            }
          </div>
        </Draggable>
        <div className={cl.mainFrame}>
          {
            isCheckingStart ?
              <StandardPlayer videoRef={output} muted={type === 'screen' || videoSettings.currentMuted} wait={mainWait} onLoadedMetadata={() => {
                setMainWait(false)
              }
              }/>
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
          <Button label={isCheckingStart ? 'Остановить' : 'Запустить'} disabled={!videoSettings.currentCamera || !videoSettings.currentInputAudio}
                  iconLeft={isCheckingStart ? IconPause : IconPlay} view={'secondary'} size={'s'} iconSize={'s'}
                  onClick={() => {
                    setIsCheckingStart(!isCheckingStart)
                  }}/>
          {type === 'webcam' &&
              <Button className={cl.soundButton} view={'secondary'} iconSize={'s'} size={'s'}
                      disabled={!videoSettings.currentCamera || !videoSettings.currentInputAudio}
                      iconLeft={videoSettings.currentMuted ? IconSoundOff : IconSound}
                      onClick={() => {
                        videoSettings.updateMuted(!videoSettings.currentMuted)
                      }}/>}
        </div>
        <Text as={'div'} size={'s'}
              view={callStatusDescription.view}
              className={cl.status}>
          {callStatusDescription.text}
        </Text>
      </div>
    </div>
  )
}

export default CheckingConnection
