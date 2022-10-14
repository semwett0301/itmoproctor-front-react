import React, { FC } from 'react'
import { Badge } from '@consta/uikit/Badge'
import cl from './StatusBadge.module.scss'

export const badgePropStatus = [
  'unplanned',
  'missed',
  'planned',
  'success',
  'waiting',
  'conclusionWaiting',
  'async',
  'withProctor',
  'forming',
  'review',
  'withoutProctor',
  'rejected',
  'noAppearance'
] as const

export type BadgePropStatus = typeof badgePropStatus[number]

type status = {
  label: string
  className: string
}

type statusesDeclaration = {
  [key: string]: status
}

const statuses: statusesDeclaration = {
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
