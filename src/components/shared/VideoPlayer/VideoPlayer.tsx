import React, { FC } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IVideoPlayerProps {
  options: videojs.PlayerOptions
}

const initialOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  controlBar: {
    volumePanel: {
      inline: false
    }
  }
}

// interface IVideoPlayerProp {
//   options: unknown
//   onReady: () => void
// }

const VideoPlayer: FC<IVideoPlayerProps> = ({ options }) => {
  const videoNode = React.useRef<HTMLVideoElement>(null)
  const player = React.useRef<videojs.Player>(null)

  React.useEffect(() => {
    if (player.current && videoNode.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      player.current = videojs(videoNode.current, {
        ...initialOptions,
        ...options
      }).ready(function () {
        // console.log('onPlayerReady', this);
      })
    }
    return () => {
      if (player.current) {
        player.current.dispose()
      }
    }
  }, [options])

  return <video ref={videoNode} className='video-js' />
}

export default VideoPlayer
