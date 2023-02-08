import React, {FC, useEffect, useState} from 'react'
import cl from './ExamView.module.scss'
import {Text} from '@consta/uikit/Text'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import ModalViewConstructor, {IRowViewItem} from '../TwoBlockModalRow/ModalViewConstructor'
import {SkeletonText} from '@consta/uikit/Skeleton'
import {request} from '../../../../api/axios/request'
import {useTranslation} from 'react-i18next'
import {getProctor, getStudentName} from '../../../../utils/common/nameHelper'
import {getStrDate} from '../../../../utils/common/dateUtils'
import ResolutionText from './ResolutionText'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'

// TYPES
interface IExamViewProp {
  examId: string
}

const ExamView: FC<IExamViewProp> = ({ examId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'shared' })

  const [isLoad, setIsLoad] = useState<boolean>(true)
  const [items, setItems] = useState<IRowViewItem[]>([])

  useEffect(() => {
    request.student.exams.getExamInfo(examId).then((r) => {
      const data = r.data
      console.log(data)
      const ii: IRowViewItem[] = [
        {
          title: 'Экзамен',
          content: data.subject
        },
        {
          title: 'Идентификатор экзамена',
          content: data.examId
        },
        {
          title: 'Идентификатор попытки',
          content: data._id
        },
        {
          title: 'Правообладатель',
          content: data.organization.shortName
        },
        {
          title: 'Курс',
          content: data.course?.courseCode
        },
        {
          title: 'Сессия',
          content: data.course?.sessionCode
        },
        {
          title: 'Испытание',
          content: data.assignment
        },
        {
          title: 'Ссылка',
          content: (
            <Text size={'s'} as={'a'} target={'_blank'} rel='noreferrer' href={data.platformURL}>
              Полетели
            </Text>
          )
        },
        {
          title: 'Код',
          content: data.course?.courseCode
        },
        {
          title: 'Тип',
          content: t(`examTypes.${!!data.async}`)
        },
        {
          title: 'Верификация',
          content: !data.verifications?.length
            ? (data.verifications && 'Без верификаций') || 'По умолчанию(из курса)'
            : data.verifications.join(',')
        },
        {
          title: 'Сроки',
          content: 'с ' + getStrDate(data.leftDate) + ' по ' + getStrDate(data.rightDate)
        },
        {
          title: 'Длительность',
          content: t('minutesPlurals.counter', { count: data.duration })
        },
        {
          title: 'Начало',
          content:
            getStrDate(data.beginDate) +
            (data.startDate ? getStrDate(data.startDate, ' (hh:mm)') : '')
        },
        {
          title: 'Окончание',
          content:
            getStrDate(data.endDate) + (data.stopDate ? getStrDate(data.stopDate, ' (hh:mm)') : '')
        },
        {
          title: 'Слушатель',
          content: getStudentName(data.student)
        },
        {
          title: 'Эксперт',
          content: getProctor(!!data.async, data.inspector, data.expert).fullName
        },
        {
          title: 'Заключение',
          content: <ResolutionText resolution={data.resolution} />
        },
        {
          title: 'Комментарий',
          content: data.comment
        },
        {
          title: 'Комментарий для администратора',
          content: data.note ?? 'empty'
        },
        {
          title: 'Информация',
          content: data.info ?? 'empty'
        }
      ]
      setIsLoad(false)
      setItems(ii)
    })
  }, [examId, t])

  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'exam'} />
      {isLoad ? (
        <SkeletonText rows={10} fontSize='s' lineHeight={'l'} />
      ) : (
        <div className={cnMixSpace({ pH: 'm', pV: 's' })}>
          <ModalViewConstructor items={items} />
        </div>
      )}
    </div>
  )
}

export default ExamView
