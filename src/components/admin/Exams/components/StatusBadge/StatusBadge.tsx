import React, { FC } from 'react'
import { Badge } from '@consta/uikit/Badge'
import cl from './StatusBadge.module.scss'
import { IExams } from '../../../../../ts/interfaces/IExams'
import { IInspector } from '../../../../../ts/interfaces/IInspector'
import { IExpert } from '../../../../../ts/interfaces/IExpert'

export const getExamStatus = (data: IExams): number => {
  if (!data) return 0
  const now = Date.now()
  let statusID = 0

  if (data.rightDate) {
    const rightDate = Date.parse(data.rightDate)
    if (rightDate <= now) statusID = 6
  }

  if (data.startDate && data.endDate) {
    const beginDate = Date.parse(data.startDate)
    const endDate = Date.parse(data.endDate)

    if (beginDate > now) statusID = 1
    if (endDate <= now) {
      console.log('hhhh')
      statusID = 8
    }
    if (beginDate <= now && endDate > now) statusID = 2
    if (data.startDate) statusID = 3
    if (data.inspectorConnected) statusID = 7
    if (data.startDate && data.async) statusID = 9
    if (data.stopDate) statusID = 11
    if (data.videoAvailable) statusID = 10
    if (data.inCheck) statusID = 12
    if (data.resolution === true) statusID = 4
    if (data.resolution === false) statusID = 5
  }
  return statusID
}

export const getProctorName = (
  async: boolean,
  inspector: IInspector | undefined,
  expert: IExpert | undefined
): string => {
  if (inspector || expert) {
    if (async && expert) {
      return `${expert.lastname} ${expert.firstname[0]}.${expert.middlename[0]}`
    } else if (!async && inspector) {
      return `${inspector.lastname} ${inspector.firstname[0]}.${inspector.middlename[0]}`
    }
  }
  return 'Не назначен'
}

export const badgePropStatus = [
  'unplanned',
  'planned',
  'waiting',
  'withoutProctor',
  'success',
  'rejected',
  'missed',
  'withProctor',
  'noAppearance',
  'async',
  'conclusionWaiting',
  'forming',
  'review'
] as const

export type BadgePropStatus = typeof badgePropStatus[number]

export type statusObject = {
  label: string
  className: string
}

export type badgeStatusesDeclaration = {
  [key in BadgePropStatus]: statusObject
}

const statuses: badgeStatusesDeclaration = {
  unplanned: { label: 'Не запланирован', className: cl.unplanned },
  missed: { label: 'Пропущен', className: cl.missed },
  planned: { label: 'Запланирован', className: cl.planned },
  success: { label: 'Принят', className: cl.success },
  waiting: { label: 'Ожидает ', className: cl.waiting },
  conclusionWaiting: { label: 'Ожидает заключение', className: cl.conclusionWaiting },
  async: { label: 'Асинхронно', className: cl.async },
  withProctor: { label: 'С проктором', className: cl.withProctor },
  forming: { label: 'Формируется', className: cl.forming },
  review: { label: 'На проверке', className: cl.review },
  withoutProctor: { label: 'Без проктора', className: cl.withoutProctor },
  rejected: { label: 'Отклонен', className: cl.rejected },
  noAppearance: { label: 'Неявка', className: cl.noAppearance }
}

interface StatusBadgeProps {
  status: BadgePropStatus
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  return (
    <Badge view={'stroked'} className={statuses[status].className} label={statuses[status].label} />
  )
}

export default StatusBadge
