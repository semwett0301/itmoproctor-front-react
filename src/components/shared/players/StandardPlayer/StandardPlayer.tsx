import React, {FC, MutableRefObject} from 'react';
import cl from './StandardPlayer.module.scss'
import {Loader} from '@consta/uikit/Loader';
import {classJoiner} from '../../../../utils/styleClassesUtills';

type StandardPlayerProps = {
  wait: boolean,
  videoRef: MutableRefObject<HTMLVideoElement | null>
}

const StandardPlayer: FC<StandardPlayerProps> = ({wait, videoRef}) => {
  return (
    <div className={cl.wrapper}>
      <video
        ref={videoRef}
        className={classJoiner(cl.video, wait ? cl.disable_video : '')}
        autoPlay
        playsInline
      />
      {
        wait ?
          <div className={cl.disable_wrapper}>
            <Loader/>
          </div> : <></>
      }

    </div>

  );
};

export default StandardPlayer;
