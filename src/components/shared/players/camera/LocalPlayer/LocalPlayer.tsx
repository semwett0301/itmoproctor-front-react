import React, {FC, useEffect, useRef, useState} from 'react';
import StandardPlayer from '../../StandardPlayer/StandardPlayer';
import {useVideo} from '../../../../../hooks/shared/webRtc/useVideo';

type LocalPlayerProps = {
  videoDeviceId: string
  frequency: number
}

const LocalPlayer: FC<LocalPlayerProps> = ({videoDeviceId, frequency}) => {
  const {wait, player} = useVideo(videoDeviceId, frequency)

  return (
    <StandardPlayer muted={true} wait={wait} videoRef={player}/>
  );
};

export default LocalPlayer;
