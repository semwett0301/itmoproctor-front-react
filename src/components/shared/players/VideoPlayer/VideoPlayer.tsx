import React, { FC, useEffect } from 'react'
import videojs, { VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.css'
import './VideoPlayer.scss'
import { backwardIcon, downloadIcon, forwardIcon } from './IconsHTML'
import { openModal } from '../../ModalView/ModalView'
import DownloadSubmit from '../../../admin/modals/DownloadSubmit/DownloadSubmit'
import { IExam } from '../../../../ts/interfaces/IExam'
import { IconArrowRight } from '@consta/icons/IconArrowRight'
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft'

// TYPES
export interface SourceObject {
  // The url to the source
  src: string
  // The mime type of the source
  type?: string | undefined
}

// CONSTANTS

// DEFAULT FUNCTIONS

interface IVideoPlayerProp {
  source: SourceObject
  onReady: (player: videojs.Player) => void
  exam?: IExam
}

const VideoPlayer: FC<IVideoPlayerProp> = ({ source, onReady, exam }) => {
  const videoRef = React.useRef<HTMLDivElement | null>(null)
  const playerRef = React.useRef<VideoJsPlayer>()

  const initialOptions = {
    playbackRates: [0.5, 1, 1.5, 2, 3, 5],
    inactivityTimeout: 1000,
    bigPlayButton: false,
    userActions: {
      hotkeys: false
    },

    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    isAudio: true,
    sources: [source]
  }

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered')

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, initialOptions, () => {
        videojs.log('player is ready')
        // videojs.registerComponent()
        if (onReady) {
          onReady(player)
        }
      }))

      const Button = videojs.getComponent('Button')

      const SeekForwardBtn = new Button(player, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clickHandler: function (): void {
          player.currentTime(player.currentTime() + 5)
          videojs.log('forward')
        },
        controlText: 'forward',
        className: 'seek-forward withShadow'
      })
      SeekForwardBtn.el().innerHTML = forwardIcon

      const SeekBackwardBtn = new Button(player, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clickHandler: function (): void {
          player.currentTime(player.currentTime() - 5)
          videojs.log('backward')
        },
        controlText: 'backward',
        className: 'seek-backward withShadow'
      })
      SeekBackwardBtn.el().innerHTML = backwardIcon

      const DownloadButton = new Button(player, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clickHandler: function (): void {
          openModal(
            <DownloadSubmit
              href={source.src}
              onSubmit={() => {
                // const tag = document.createElement('a')
                // tag.target = '_blank'
                // if (exam?.student) {
                //   tag.href = 'stream/' + exam._id + '.webm'
                //   tag.download = exam._id + '-' + exam.student.username + '.webm'
                //   console.log(tag.href)
                //   console.log(tag.download)
                // }
                // document.body.appendChild(tag)
                // tag.click()
                // document.body.removeChild(tag)
              }}
            />
          )
          videojs.log('download')
        },
        controlText: 'download',
        className: 'download withShadow'
      })

      DownloadButton.el().innerHTML = downloadIcon

      player.getChild('ControlBar')?.addChild(SeekBackwardBtn)
      player.getChild('ControlBar')?.addChild(SeekForwardBtn)
      player.getChild('ControlBar')?.addChild(DownloadButton)

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current
      player.src(initialOptions.sources[0])
    }
  }, [videoRef])

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose()
        playerRef.current = undefined
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player=''>
      <div ref={videoRef} />
    </div>
  )
}

export default VideoPlayer