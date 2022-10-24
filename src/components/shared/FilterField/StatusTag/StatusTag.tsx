import React, { FC, SyntheticEvent } from 'react'
import cl from './StatusTag.module.scss'
import { Tag } from '@consta/uikit/Tag'
import { DefaultItem } from '@consta/uikit/Combobox'
import {badgePropStatus, statusObject} from '../../../admin/Exams/components/ExamTable/StatusBadge/StatusBadge';


// CONSTANTS
const tagPropStatus = [...badgePropStatus, 'exceptPlanned', 'allStatuses', 'interrupted'] as const
export type TagPropStatus = typeof tagPropStatus[number]

export type tagStatusesDeclaration = {
  [key in TagPropStatus]: statusObject
}

const statuses: tagStatusesDeclaration = {
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
  noAppearance: { label: 'Неявка', className: cl.noAppearance },
  exceptPlanned: { label: 'Кроме запланированных', className: cl.exceptPlanned },
  allStatuses: { label: 'Неявка', className: cl.allStatuses },
  interrupted: { label: 'Прерван', className: cl.interrupted }
}

interface IStatusTagProp {
  status: TagPropStatus
  item: DefaultItem
  onCancel?: (e: SyntheticEvent<Element, Event>) => void
}

// DEFAULT FUNCTIONS

const StatusTag: FC<IStatusTagProp> = ({ status, item, onCancel }) => {
  return (
    <Tag
      className={statuses[status].className}
      key={item.id}
      mode={'cancel'}
      label={item.label}
      size={'s'}
      onCancel={(value) => (typeof onCancel === 'undefined' ? console.log(value) : onCancel(value))}
    />
  )
}

export default StatusTag
