import {useEffect, useRef, useState} from 'react';

export function useVideo(videoDeviceId: string,
                         frequency?: number) {
  const player = useRef<HTMLVideoElement | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const [wait, setWait] = useState<boolean>(true)

  useEffect(() => {
    const startCapture: () => Promise<void> = async () => {
      if (player.current) {
        setWait(true)

        stream.current = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            frameRate: frequency,
            deviceId: videoDeviceId
          }
        })

        player.current.srcObject = stream.current
      }
    }

    const stopCapture: () => Promise<void> = async () => {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => {
          track.stop()
        })
        stream.current = null
      }
    }

    startCapture()
      .then(() => setWait(false))
      .catch(e => console.log(e))

    return () => {
      stopCapture().catch(e => console.log(e))
    }
  }, [frequency, videoDeviceId])

  return {wait, player}
}
