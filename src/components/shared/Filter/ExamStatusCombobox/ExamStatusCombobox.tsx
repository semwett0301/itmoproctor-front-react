import React, {FC} from 'react'
import {Combobox} from '@consta/uikit/Combobox'
import cl from './ExamStatusCombobox.module.scss'
import StatusTag, {TagPropStatus} from './StatusTag/StatusTag'
import {SelectItem} from '@consta/uikit/__internal__/src/components/SelectComponents/SelectItem/SelectItem'
import {statuses} from './model/statuses'

// TYPES

export type StatusComboboxItem = {
  label: string
  id: TagPropStatus
  disabled: false
  getStatus: string | boolean | null
  groupId?: number
  className: string
}

type StatusComboboxGroups = {
  id: number
  label: string
}

const statusGroupsList: StatusComboboxGroups[] = [
  { id: 1, label: '' },
  { id: 2, label: '' }
]

// CONSTANTS

export const statusList: StatusComboboxItem[] = [
  {
    label: 'Кроме незапланированных',
    id: 'exceptPlanned',
    disabled: false,
    getStatus: '1,2,3,4,5,6,7,8,9,10,11,12',
    className: statuses.exceptPlanned.className
  },
  {
    label: 'Не запланирован',
    id: 'unplanned',
    disabled: false,
    getStatus: '0',
    className: statuses.unplanned.className
  },
  {
    label: 'Запланирован',
    id: 'planned',
    disabled: false,
    getStatus: '1',
    className: statuses.planned.className
  },
  {
    label: 'Ожидает',
    id: 'waiting',
    disabled: false,
    getStatus: '2',
    className: statuses.waiting.className
  },
  {
    label: 'Идет (без проктора)',
    id: 'withoutProctor',
    disabled: false,
    getStatus: '3',
    className: statuses.withoutProctor.className
  },
  {
    label: 'Идет (с проктором)',
    id: 'withProctor',
    disabled: false,
    getStatus: '7',
    className: statuses.withProctor.className
  },
  {
    label: 'Идет (асинхронно)',
    id: 'async',
    disabled: false,
    getStatus: '9',
    className: statuses.async.className
  },
  {
    label: 'Формируется протокол',
    id: 'forming',
    disabled: false,
    getStatus: '11',
    className: statuses.forming.className
  },
  {
    label: 'Ожидается заключение',
    id: 'conclusionWaiting',
    disabled: false,
    getStatus: '10',
    className: statuses.conclusionWaiting.className
  },
  {
    label: 'На проверке',
    id: 'review',
    disabled: false,
    getStatus: '12',
    className: statuses.review.className
  },
  {
    label: 'Принят',
    id: 'success',
    disabled: false,
    getStatus: '4',
    className: statuses.success.className
  },
  {
    label: 'Прерван',
    id: 'interrupted',
    disabled: false,
    getStatus: '5',
    className: statuses.interrupted.className
  },
  {
    label: 'Пропущен',
    id: 'missed',
    disabled: false,
    getStatus: '6',
    className: statuses.missed.className
  },
  {
    label: 'Неявка',
    id: 'noAppearance',
    disabled: false,
    getStatus: '8',
    className: statuses.noAppearance.className
  },
  {
    label: 'Сброшен',
    id: 'reset',
    disabled: false,
    getStatus: false,
    groupId: 2,
    className: statuses.reset.className
  },
  {
    label: 'Не сброшен',
    id: 'notReset',
    disabled: false,
    getStatus: true,
    groupId: 2,
    className: statuses.notReset.className
  }
]

interface IExamStatusComboboxProp {
  onChange: (value: StatusComboboxItem[] | null) => void
  value: StatusComboboxItem[] | null
}

const ExamStatusCombobox: FC<IExamStatusComboboxProp> = ({ value, onChange }) => {
  return (
    <Combobox
      size='s'
      placeholder={'Статус'}
      className={cl.combobox}
      items={statusList}
      multiple={true}
      value={value}
      groups={statusGroupsList}
      onChange={(changeValue) => {
        if (value && changeValue.value) {
          const groupTwo = changeValue.value.filter((e) => e.groupId === 2)
          const currentGroupTwo = value.filter((e) => e.groupId === 2)

          if (groupTwo.length === 2) {
            changeValue.value = changeValue.value.filter(
              (e) => !e.groupId || e.groupId !== 2 || !currentGroupTwo.includes(e)
            )
          }

          if (changeValue.value.includes(statusList[0])) {
            if (!value.includes(statusList[0])) {
              changeValue.value = [
                ...changeValue.value.filter((item) => item.groupId),
                statusList[0]
              ]
            } else {
              if (changeValue.value.filter(item => !item.groupId).length !== 1) {
                changeValue.value = changeValue.value.filter(item => item.id !== statusList[0].id)
              }
            }
          }
        }

        onChange(changeValue.value)
      }}
      renderValue={(props) => (
        <StatusTag
          key={props.item.id}
          status={props.item.id}
          item={props.item}
          onCancel={props.handleRemove}
        />
      )}
      renderItem={({ item, hovered, active, onClick, onMouseEnter }) => {
        const currentClassName: string = item.className

        return (
          <SelectItem
            label={item.label}
            active={active}
            hovered={hovered}
            multiple={true}
            size={'s'}
            indent={'normal'}
            disabled={item.disabled}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            className={cl[currentClassName]}
          />
        )
      }}
    />
  )
}

export default ExamStatusCombobox
