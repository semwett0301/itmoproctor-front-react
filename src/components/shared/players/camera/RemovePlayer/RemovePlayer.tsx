import React, {FC, useRef, useState} from 'react';
import StandardPlayer from '../../StandardPlayer/StandardPlayer';

const RemovePlayer: FC = () => {
  const player = useRef<HTMLVideoElement | null>(null)
  const stream = useRef<MediaStream | null>(null)
  const [wait, setWait] = useState<boolean>(true)

  return (
    <StandardPlayer wait={wait} muted={false} videoRef={player}/>
  );
}

export default RemovePlayer;
