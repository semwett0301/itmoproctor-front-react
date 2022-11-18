import React, { FC, useState } from 'react'
import cl from './ExamView.module.scss'
import TwoBlockModalRow from '../TwoBlockModalRow/TwoBlockModalRow'
import CloseModalButton from '../CloseModalButton/CloseModalButton'
import { Text } from '@consta/uikit/Text'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { Layout } from '@consta/uikit/Layout'
import ModalViewConstructor, { IRowViewItem } from '../TwoBlockModalRow/ModalViewConstructor'
import { SkeletonText } from '@consta/uikit/Skeleton'
import { request } from '../../../../api/axios/request'
import { useTranslation } from 'react-i18next'
import { getProctorName, getStudentName } from '../../../../utils/nameHelper'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface IExamViewProp {
  examId: string
}

const ExamView: FC<IExamViewProp> = ({ examId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'shared.examTypes' })

  const [isLoad, setIsLoad] = useState<boolean>(true)
  const items: IRowViewItem[] = []
  // request.exam
  // .getExam(examId)
  // .then((r) => {
  //   const data = r.data
  //   const ii: IRowViewItem[] = [
  //     {
  //       title: 'Экзамен',
  //       content: data.subject
  //     },
  //     {
  //       title: 'Идентификатор экзамена',
  //       content: data.examId
  //     },
  //     {
  //       title: 'Идентификатор попытки',
  //       content: data._id
  //     },
  //     {
  //       title: 'Правообладатель',
  //       content: data.organization.shortName || ''
  //     },
  //     {
  //       title: 'Курс',
  //       content: data.course?.courseCode || ''
  //     },
  //     {
  //       title: 'Сессия',
  //       content: data.course?.sessionCode || ''
  //     },
  //     {
  //       title: 'Испытание',
  //       content: data.assignment
  //     },
  //     {
  //       title: 'Ссылка',
  //       content: 'В процессе'
  //     },
  //     {
  //       title: 'Код',
  //       content: data.course?.courseCode || ''
  //     },
  //     {
  //       title: 'Тип',
  //       content: t('String.toString(data.async)')
  //     },
  //     {
  //       title: 'Верификация',
  //       content: data.verifications?.join(',') || ''
  //     },
  //     {
  //       title: 'Сроки',
  //       content: data.leftDate
  //     },
  //     {
  //       title: 'Длительность',
  //       content: `${data.duration}`
  //     },
  //     {
  //       title: 'Начало',
  //       content: data.beginDate
  //     },
  //     {
  //       title: 'Окончание',
  //       content: data.endDate
  //     },
  //     {
  //       title: 'Слушатель',
  //       content: getStudentName(data.student)
  //     },
  //     {
  //       title: 'Эксперт',
  //       content: getProctorName(data.async, data.inspector, data.expert).fullName
  //     },
  //     {
  //       title: 'Заключение',
  //       content: '?'
  //     },
  //     {
  //       title: 'Комментарий',
  //       content: data.comment
  //     }
  //   ]
  //   return ii
  // })
  // .then((r) => r)

  return (
    <div className={cl.wrapper}>
      <div className={cl.title}>
        <Text>Профиль пользователя</Text> <CloseModalButton />
      </div>
      <Layout
        direction={'column'}
        className={classJoiner(cnMixSpace({ pH: 'm', pV: 's' }), cl.contentList)}
      >
        {isLoad ? (
          <SkeletonText rows={10} fontSize='s' lineHeight={'l'} />
        ) : (
          <ModalViewConstructor items={[]} />
        )}
      </Layout>
    </div>
  )
}

export default ExamView
