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
  [key in BadgePropStatus]: status
}

const statuses: statusesDeclaration = {
  unplanned: { label: 'Не запланирован', className: cl.succes },
  missed: { label: 'Пропущен', className: cl.succes },
  planned: { label: 'Запланирован', className: cl.succes },
  success: { label: 'Принят', className: cl.success },
  waiting: { label: 'Ожидает ', className: cl.waiting },
  conclusionWaiting: { label: 'Ожидает заключение', className: cl.succes },
  async: { label: 'Асинхронно', className: cl.succes },
  withProctor: { label: 'С проктором', className: cl.succes },
  forming: { label: 'Формируется', className: cl.succes },
  review: { label: 'На проверке', className: cl.succes },
  withoutProctor: { label: 'Без проктора', className: cl.succes },
  rejected: { label: 'Отклонен', className: cl.succes },
  noAppearance: { label: 'Неявка', className: cl.succes }
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
