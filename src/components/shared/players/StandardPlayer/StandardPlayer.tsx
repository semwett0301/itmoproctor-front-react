import React, {FC, MutableRefObject} from 'react';
import cl from './StandardPlayer.module.scss'
import {Loader} from '@consta/uikit/Loader';
import {classJoiner} from '../../../../utils/common/styleClassesUtills';

type StandardPlayerProps = {
  wait: boolean,
  muted: boolean,
  videoRef: MutableRefObject<HTMLVideoElement | null>
  onLoadedMetadata?:  React.ReactEventHandler<HTMLVideoElement>
}

const StandardPlayer: FC<StandardPlayerProps> = ({wait, muted, videoRef, onLoadedMetadata}) => {
  return (
    <div className={cl.wrapper}>
      <video
        ref={videoRef}
        className={classJoiner(cl.video, wait ? cl.disable_video : '')}
        onLoadedMetadata={onLoadedMetadata}
        autoPlay
        playsInline
        muted={muted}
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
