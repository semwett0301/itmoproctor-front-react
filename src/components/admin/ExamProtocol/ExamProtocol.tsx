import React, { FC, useEffect, useRef, useState } from 'react'
import cn from './ExamProtocol.module.scss'
import { Text } from '@consta/uikit/Text'
import { Layout } from '@consta/uikit/Layout'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { classJoiner } from '../../../utils/styleClassesUtills'
import { Card } from '@consta/uikit/Card'
import { Button } from '@consta/uikit/Button'
import { cnMixCard } from '@consta/uikit/MixCard'
import VideoPlayer from '../../shared/VideoPlayer/VideoPlayer'
import videojs from 'video.js'
import { useParams } from 'react-router-dom'
import { request } from '../../../api/axios/request'
import { IExam } from '../../../ts/interfaces/IExam'
import AboutBlock from './AboutBlock/AboutBlock'
import ViolationsBlock from './ViolationsBlock/ViolationsBlock'
import ExamProcessBlock from './ExamProcessBlock/ExamProcessBlock'
import Player = videojs.Player

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

const ExamProtocol: FC = () => {
  const playerDivRef = useRef<HTMLDivElement>(null)
  const { id } = useParams()
  const [exam, setExam] = useState<IExam>()

  const handlePlayerReady = (p: Player): void => {
    // You can handle player events here, for example:
    p.on('waiting', () => {
      videojs.log('player is waiting')
    })

    p.on('dispose', () => {
      videojs.log('player will dispose')
    })

    p.on('resize', () => {
      console.log('resize')
    })

    console.log(p)
  }

  const source = {
    src: `https://de-dev.itmo.ru/stream/${id}.webm`,
    type: 'video/webm'
  }

  useEffect(() => {
    if (id) {
      request.expert.exams.getExam(id).then(({ data }) => {
        console.log(id)
        console.log(data)
        setExam(data)
      })
    }
  }, [id])

  return (
    <Layout
      direction='column'
      flex={1}
      className={classJoiner(cnMixSpace({ p: 's' }), cn.protocol)}
    >
      <div className={cn.examTitle}>
        <div>
          <Text>{exam?.subject ?? 'Название экзамена отсутствует'}</Text>
          <Text view={'secondary'} size={'s'} lineHeight={'l'}>
            {'Изменить после разделения поля subject на 2 поля'}
          </Text>
        </div>
        <Button label={'Приступить к проверке'} size={'s'} />
      </div>
      <Layout direction='row' flex={1} className={cn.examBlock}>
        {/* 1 column */}
        <Layout flex={2} direction='column'>
          <div ref={playerDivRef} className={cn.playerWrapper}>
            <VideoPlayer source={source} onReady={handlePlayerReady} exam={exam} />
          </div>
          <Card
            shadow={false}
            border={true}
            horizontalSpace='xs'
            verticalSpace={'xs'}
            className={cn.violationTimeline}
          >
            <Text>Тамлайн нарушений</Text>
          </Card>
          <Text view={'secondary'} size={'s'}>
            Нарушения
          </Text>
          <div
            className={classJoiner(
              cnMixCard({
                shadow: false,
                border: true,
                form: 'round'
              }),
              cnMixSpace({ mT: 'xs' }),
              cn.violationBlock
            )}
          >
            <ViolationsBlock report={exam?.report} />
          </div>
        </Layout>
        <Layout flex={1} className={cn.aboutExamBlock} direction={'column'}>
          <Layout direction={'column'} flex={1}>
            <Text view={'secondary'} size={'s'}>
              Об экзамене
            </Text>
            <AboutBlock exam={exam} />
          </Layout>

          <Layout flex={4} direction={'column'}>
            <Text view={'secondary'} size={'s'}>
              Ход экзамена
            </Text>
            <Layout className={cn.examProcess}>
              <ExamProcessBlock examId={exam?._id} />
            </Layout>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default ExamProtocol
