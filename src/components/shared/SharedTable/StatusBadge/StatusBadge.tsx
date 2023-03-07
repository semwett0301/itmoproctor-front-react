import React, { FC } from 'react'
import { Badge } from '@consta/uikit/Badge'
import cl from './StatusBadge.module.scss'
import { IExamRow } from '../../../../ts/interfaces/IExams'
import { IconRevert } from '@consta/uikit/IconRevert'
import dayjs from 'dayjs'

export const getExamStatus = (data: IExamRow, isStudent = false): number => {
  if (!data) return 0
  const now = dayjs()

  let status = 0
  if (data.rightDate) {
    const rightDate = dayjs(data.rightDate)
    if (rightDate <= now) status = 6
  }
  if (data.beginDate && data.endDate) {
    const beginDate = dayjs(data.beginDate)
    const endDate = dayjs(data.endDate)
    if (beginDate > now) status = 1
    if (endDate <= now) status = 8
    if (beginDate <= now && endDate > now) status = 2
    if (data.startDate) status = 3
    if (data.inspectorConnected) status = 7
    if (data.startDate && data.async) status = 9
    if (data.stopDate) {
      isStudent ? status = 10 : status = 11
    }
    if (data.videoAvailable) status = 10
    if (data.inCheck) {
      isStudent ? status = 10 : status = 12
    }
    if (data.resolution === true) status = 4
    if (data.resolution === false) status = 5
  }
  return status
}

export const customBadgePropStatus = [
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

export type CustomBadgePropStatus = typeof customBadgePropStatus[number]

export const customBadgePropStatusObject: {
  [identifier: number]: CustomBadgePropStatus
} = {
  0: 'unplanned',
  1: 'planned',
  2: 'waiting',
  3: 'withoutProctor',
  4: 'success',
  5: 'rejected',
  6: 'missed',
  7: 'withProctor',
  8: 'noAppearance',
  9: 'async',
  10: 'conclusionWaiting',
  11: 'forming',
  12: 'review'
}

export type statusObject = {
  label: string
  className: string
}

export type badgeStatusesDeclaration = {
  [key in CustomBadgePropStatus]: statusObject
}

export const statuses: badgeStatusesDeclaration = {
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
  rejected: { label: 'Прерван', className: cl.rejected },
  noAppearance: { label: 'Неявка', className: cl.noAppearance }
}

interface StatusBadgeProps {
  status: CustomBadgePropStatus
  reset?: boolean
}

const StatusBadge: FC<StatusBadgeProps> = ({ status, reset }) => {
  return (
    <Badge
      style={{ width: 'fit-content' }}
      view={'stroked'}
      className={statuses[status].className}
      label={statuses[status].label}
      icon={reset ? IconRevert : undefined}
    />
  )
}

export default StatusBadge
