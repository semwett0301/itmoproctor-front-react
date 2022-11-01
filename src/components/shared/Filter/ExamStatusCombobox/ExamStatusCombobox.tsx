import React, { FC } from 'react'
import { Combobox } from '@consta/uikit/Combobox'
import cl from './ExamStatusCombobox.module.scss'
import StatusTag, { TagPropStatus } from './StatusTag/StatusTag'
import { SelectItem } from '@consta/uikit/__internal__/src/components/SelectComponents/SelectItem/SelectItem'

// TYPES

export type statusComboboxItem = {
  label: string
  id: TagPropStatus
  disabled: false
  getStatus: string | number | null
  groupId: number
}

type statusComboboxGroups = {
  id: number
  label: string
}

const statusGroupsList: statusComboboxGroups[] = [
  { id: 1, label: '' },
  { id: 2, label: '' }
]

// CONSTANTS

export const statusList: statusComboboxItem[] = [
  {
    label: 'Кроме незапланированных',
    id: 'exceptPlanned',
    disabled: false,
    getStatus: '1,2,3,4,5,6,7,8,9,10,11,12',
    groupId: 1
  },
  {
    label: 'Не запланирован',
    id: 'unplanned',
    disabled: false,
    getStatus: '0',
    groupId: 1
  },
  {
    label: 'Запланирован',
    id: 'planned',
    disabled: false,
    getStatus: '1',
    groupId: 1
  },
  {
    label: 'Ожидает',
    id: 'waiting',
    disabled: false,
    getStatus: '2',
    groupId: 1
  },
  {
    label: 'Идет (без проктора)',
    id: 'withoutProctor',
    disabled: false,
    getStatus: '3',
    groupId: 1
  },
  {
    label: 'Идет (с проктором)',
    id: 'withProctor',
    disabled: false,
    getStatus: '7',
    groupId: 1
  },
  {
    label: 'Идет (асинхронно)',
    id: 'async',
    disabled: false,
    getStatus: '9',
    groupId: 1
  },
  {
    label: 'Формируется протокол',
    id: 'forming',
    disabled: false,
    getStatus: '11',
    groupId: 1
  },
  {
    label: 'Ожидается заключение',
    id: 'conclusionWaiting',
    disabled: false,
    getStatus: '10',
    groupId: 1
  },
  {
    label: 'На проверке',
    id: 'review',
    disabled: false,
    getStatus: '12',
    groupId: 1
  },
  {
    label: 'Принят',
    id: 'success',
    disabled: false,
    getStatus: '4',
    groupId: 1
  },
  {
    label: 'Прерван',
    id: 'interrupted',
    disabled: false,
    getStatus: '5',
    groupId: 1
  },
  {
    label: 'Пропущен',
    id: 'missed',
    disabled: false,
    getStatus: '6',
    groupId: 1
  },
  {
    label: 'Неявка',
    id: 'noAppearance',
    disabled: false,
    getStatus: '8',
    groupId: 1
  },
  {
    label: 'Сброшен',
    id: 'reset',
    disabled: false,
    getStatus: null,
    groupId: 2
  },
  {
    label: 'Не сброшен',
    id: 'notReset',
    disabled: false,
    getStatus: null,
    groupId: 2
  }
]

interface IExamStatusComboboxProp {
  onChange: (value: statusComboboxItem[] | null) => void
  value: statusComboboxItem[] | null
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
        if (
          value &&
          changeValue.value &&
          changeValue.value.includes(statusList[0]) &&
          !value.includes(statusList[0])
        ) {
          changeValue.value = [statusList[0]]
          onChange(changeValue.value)
        } else if (
          value &&
          changeValue.value &&
          changeValue.value.includes(statusList[0]) &&
          value.includes(statusList[0])
        ) {
          onChange(changeValue.value.filter((item) => item.id !== statusList[0].id))
        } else {
          onChange(changeValue.value)
        }
      }}
      renderValue={(props) => (
        <StatusTag
          key={props.item.id}
          status={props.item.id}
          item={props.item}
          onCancel={props.handleRemove}
        />
      )}
      renderItem={({ item, hovered, active, onClick, onMouseEnter }) => (
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
          className={cl.yellow}
        />
      )}
    />
  )
}

export default ExamStatusCombobox
