import React, {FC, useEffect, useRef, useState} from 'react';
import StandardPlayer from '../../StandardPlayer/StandardPlayer';

const LocalPlayer: FC = () => {
  const player = useRef<HTMLVideoElement | null>(null)
  const [wait, setWait] = useState<boolean>(true)

  useEffect(() => {
    const startCapture: () => Promise<void> = async () => {
      if (player.current) {
        player.current.srcObject = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            width: 1200,
            height: 800
          }
        })
      }
    }

      startCapture()
        .then(() => setWait(false))
        .catch(e => console.log(e))
  }, [])


  return (
    <StandardPlayer wait={wait} videoRef={player}/>
  );
};

export default LocalPlayer;
