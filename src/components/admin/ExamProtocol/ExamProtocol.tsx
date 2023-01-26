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
import Loading from '../../shared/loading/Loading'
import NotFound from '../../shared/errors/NotFound/NotFound'
import axiosConfig from '../../../config/axiosСonfig'

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

const ExamProtocol: FC = () => {
  const playerDivRef = useRef<HTMLDivElement>(null)
  const { id } = useParams<{ id: string }>()
  const [exam, setExam] = useState<IExam>()
  const [isExamLoading, setIsExamLoading] = useState<boolean>(false)

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
    src: `${axiosConfig.baseUrl}stream/${id}.webm`,
    type: 'video/webm'
  }

  useEffect(() => {
    if (id) {
      setIsExamLoading(true)
      request.expert.exams
        .getExam(id)
        .then(({ data }) => {
          console.log(id)
          console.log(data)
          setExam(data)
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => setIsExamLoading(false))
    }
  }, [id])

  return (
    <Layout
      direction='column'
      flex={1}
      className={classJoiner(cnMixSpace({ p: 's' }), cn.protocol)}
    >
      {isExamLoading ? (
        <Loading />
      ) : !exam ? (
        <NotFound />
      ) : (
        <>
          <div className={cn.examTitle}>
            <div>
              <Text>{exam.name ?? exam.subject}</Text>
              <Text view={'secondary'} size={'s'} lineHeight={'l'}>
                {exam.course?.name ?? ''}
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
            <Layout className={cn.aboutExamBlock} direction={'column'}>
              <Layout direction={'column'}>
                <Text view={'secondary'} size={'s'}>
                  Об экзамене
                </Text>
                <AboutBlock exam={exam} />
              </Layout>

              <Layout flex={10} direction={'column'}>
                <Text view={'secondary'} size={'s'}>
                  Ход экзамена
                </Text>
                <Layout className={cn.examProcess}>
                  <ExamProcessBlock exam={exam} />
                </Layout>
              </Layout>
            </Layout>
          </Layout>
        </>
      )}
    </Layout>
  )
}

export default ExamProtocol
