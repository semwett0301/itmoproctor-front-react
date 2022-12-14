import React, { FC, useEffect, useRef } from 'react'
import cn from './ExamProtocol.module.scss'

import { Text } from '@consta/uikit/Text'
import { Layout } from '@consta/uikit/Layout'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { classJoiner } from '../../../utils/styleClassesUtills'
import { Card } from '@consta/uikit/Card'
import { Button } from '@consta/uikit/Button'
import { cnMixCard } from '@consta/uikit/MixCard'
import VideoPlayer from '../../shared/VideoPlayer/VideoPlayer'

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

const ExamProtocol: FC = () => {
  const playerDivRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (playerDivRef && playerDivRef.current) {
        console.log(playerDivRef.current.clientWidth)
        playerDivRef.current.style.height = `${(playerDivRef.current.clientWidth * 9) / 16}px`
      }
    })
    if (playerDivRef && playerDivRef.current) {
      console.log(playerDivRef.current.clientWidth)
      playerDivRef.current.style.height = `${(playerDivRef.current.clientWidth * 9) / 16}px`
    }
  }, [])

  const videoJsOptions = {
    sources: [
      {
        src: 'https://de-dev.itmo.ru/stream/61b783ba8f35e2769f68e1ff.webm',
        type: 'video/webm'
      }
    ]
  }

  return (
    <Layout
      direction='column'
      flex={1}
      className={classJoiner(cnMixSpace({ p: 's' }), cn.protocol)}
    >
      <div className={cn.examTitle}>
        <div>
          <Text>Название курса</Text>
          <Text>Название экзамен</Text>
        </div>
        <Button label={'Приступить к проверке'} size={'s'} />
      </div>
      <Layout direction='row' flex={1} className={cn.examBlock}>
        <Layout flex={2} direction='column'>
          <div ref={playerDivRef} className={cn.playerWrapper}>
            <VideoPlayer options={videoJsOptions} />
          </div>
          <Card
            shadow={false}
            border={false}
            horizontalSpace='xs'
            verticalSpace={'xs'}
            className={cn.violationBlock}
          ></Card>
          <Text view={'secondary'} size={'s'}>
            Нарушения
          </Text>
          <Layout
            className={classJoiner(
              cnMixCard({
                shadow: false,
                border: true,
                horizontalSpace: 'xs',
                verticalSpace: 'xs',
                form: 'round'
              }),
              cnMixSpace({ mT: 'xs' })
            )}
          ></Layout>
        </Layout>
        <Layout flex={1} className={cn.aboutExamBlock} direction={'column'}>
          <Layout direction={'column'} flex={1}>
            <Text view={'secondary'} size={'s'}>
              Об экзамене
            </Text>
            <Card
              shadow={false}
              border={true}
              horizontalSpace='xs'
              verticalSpace={'xs'}
              className={cnMixSpace({ mV: 's' })}
            >
              kjhasldksd sadlkn asd[kj [k sad[k sad[khs d[ikas d[ih s
            </Card>
          </Layout>

          <Layout flex={4} direction={'column'}>
            <Text view={'secondary'} size={'s'}>
              Ход экзамена
            </Text>
            <Card
              shadow={false}
              border={true}
              horizontalSpace='xs'
              verticalSpace={'xs'}
              className={classJoiner(cnMixSpace({ mT: 'xs' }), cn.examProcess)}
            ></Card>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default ExamProtocol
