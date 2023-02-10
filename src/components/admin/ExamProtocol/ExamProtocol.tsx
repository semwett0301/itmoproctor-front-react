import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import cn from './ExamProtocol.module.scss'
import { Text } from '@consta/uikit/Text'
import { Layout } from '@consta/uikit/Layout'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { Button } from '@consta/uikit/Button'
import { cnMixCard } from '@consta/uikit/MixCard'
import VideoPlayer from '../../shared/players/VideoPlayer/VideoPlayer'
import videojs from 'video.js'
import { useParams } from 'react-router-dom'
import { request } from '../../../api/axios/request'
import { IExam } from '../../../ts/interfaces/IExam'
import AboutBlock from './AboutBlock/AboutBlock'
import ViolationsBlock from './ViolationsBlock/ViolationsBlock'
import ExamProcessBlock from './ExamProcessBlock/ExamProcessBlock'
import NotFound from '../../shared/errors/NotFound/NotFound'
import TimeLineHist from './TimeLineHist/TimeLineHist'
import { openModal } from '../../shared/ModalView/ModalView'
import ExamDeclineModal from './modals/ExamDeclineModal/ExamDeclineModal'
import ExamSubmitModal from './modals/ExamSubmitModal/ExamSubmitModal'
import axiosConfig from '../../../config/api/axiosСonfig'
import { useAppSelector } from '../../../hooks/store/useAppSelector'
import { classJoiner } from '../../../utils/common/styleClassesUtills'
import Loading from '../../shared/Loading/Loading'
import SyncChat from './SyncChat/SyncChat'
import Player = videojs.Player

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

const ExamProtocol: FC = () => {
  const playerDivRef = useRef<HTMLDivElement>(null)
  const { id } = useParams<{ id: string }>()
  const [exam, setExam] = useState<IExam>()
  const [isExamLoading, setIsExamLoading] = useState<boolean>(true)

  const [comment, setComment] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)

  const user = useAppSelector((state) => state.user)

  const [player, setPlayer] = useState<videojs.Player | null>(null)
  // const [progressState, setProgressState] = useState<'ableToStart' | 'inProgress' | 'finish'>()

  const handlePlayerReady = (p: Player): void => {
    setPlayer(p)
    // You can handle player events here, for example:
    p.on('waiting', () => {
      videojs.log('player is waiting')
    })

    p.on('dispose', () => {
      videojs.log('player will dispose')
    })
  }

  const source = {
    src: `${axiosConfig.baseUrl}stream/${id}.webm`,
    type: 'video/webm'
  }

  const updateExam = (): void => {
    if (id)
      request.expert.exams
        .getExam(id)
        .then(({ data }) => {
          setExam(data)
        })
        .catch((e) => {
          console.log(e)
        })
  }

  useEffect(() => {
    if (id) {
      setIsExamLoading(true)
      request.expert.exams
        .getExam(id)
        .then(({ data }) => {
          setExam(data)
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => setIsExamLoading(false))
    }
  }, [id])

  const checkStatus = useMemo<'ableToStart' | 'inProgress' | 'finish' | undefined>(() => {
    if (exam) {
      console.log(exam)
      if (exam.stopDate && typeof exam.resolution !== 'boolean') {
        if (!exam.expert || (exam.expert._id === user._id && !exam.inCheck)) {
          return 'ableToStart'
        } else if (exam.expert && exam.expert._id === user._id && exam.inCheck) {
          return 'inProgress'
        }
      }
    }
  }, [exam, user._id])

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

            {checkStatus === 'ableToStart' && (
              <Button
                label={'Приступить к проверке'}
                size={'s'}
                onClick={() =>
                  request.expert.exams
                    .startCheck({
                      ...exam,
                      inCheck: true,
                      expert: {
                        username: user.username,
                        firstname: user.firstname,
                        middlename: user.middlename,
                        lastname: user.lastname,
                        _id: user._id
                      }
                    })
                    .then(updateExam)
                }
              />
            )}

            {checkStatus === 'inProgress' && (
              <div className={cn.resultBtnWrap}>
                <Button
                  className={cn.acceptBtn}
                  label={'Принять'}
                  view={'secondary'}
                  size={'s'}
                  onClick={() =>
                    openModal(
                      <ExamSubmitModal
                        exam={exam}
                        prevComment={comment}
                        prevNote={note}
                        update={updateExam}
                      />
                    )
                  }
                />
                <Button
                  className={cn.declineBtn}
                  label={'Отклонить'}
                  view={'secondary'}
                  size={'s'}
                  onClick={() =>
                    openModal(
                      <ExamDeclineModal
                        exam={exam}
                        prevComment={comment}
                        prevNote={note}
                        update={updateExam}
                      />
                    )
                  }
                />
              </div>
            )}
          </div>
          <Layout direction='row' flex={1} className={cn.examBlock}>
            {/* 1 column */}
            <Layout flex={2} direction='column' style={{ maxWidth: '60%' }}>
              <div
                ref={playerDivRef}
                className={classJoiner(cn.playerWrapper, cnMixSpace({ mB: 's' }))}
              >
                <VideoPlayer source={source} onReady={handlePlayerReady} exam={exam} />
              </div>

              {exam.async ? <TimeLineHist report={exam.report} player={player} /> : null}

              <Text view={'secondary'} size={'s'}>
                {exam.async ? 'Нарушения' : 'Диалог'}
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
                {exam.async ? <ViolationsBlock report={exam.report} /> : <SyncChat exam={exam} />}
              </div>
            </Layout>
            {/* 2 column */}
            <Layout className={cn.aboutExamBlock} direction={'column'}>
              <Layout direction={'column'}>
                <Text view={'secondary'} size={'s'}>
                  Об экзамене
                </Text>
                <AboutBlock
                  exam={exam}
                  commentState={{ comment, setComment }}
                  noteState={{ note, setNote }}
                  updateExam={updateExam}
                />
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
