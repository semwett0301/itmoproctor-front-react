import React, { FC, SyntheticEvent } from 'react'
import cl from './StatusTag.module.scss'
import { Tag } from '@consta/uikit/Tag'
import { DefaultItem } from '@consta/uikit/Combobox'
import { customBadgePropStatus, statusObject } from '../../../SharedTable/StatusBadge/StatusBadge'
import { classJoiner } from '../../../../../utils/styleClassesUtills'
import { statuses } from '../model/statuses'

// CONSTANTS
export const tagPropStatus = [
  ...customBadgePropStatus,
  'exceptPlanned',
  'interrupted',
  'reset',
  'notReset'
] as const
export type TagPropStatus = typeof tagPropStatus[number]

export type tagStatusesDeclaration = {
  [key in TagPropStatus]: statusObject
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
      className={classJoiner(cl[statuses[status].className], cl.statusTag)}
      key={item.id}
      mode={'cancel'}
      label={item.label}
      size={'s'}
      onCancel={(value) => (typeof onCancel === 'undefined' ? console.log(value) : onCancel(value))}
    />
  )
}

export default StatusTag
