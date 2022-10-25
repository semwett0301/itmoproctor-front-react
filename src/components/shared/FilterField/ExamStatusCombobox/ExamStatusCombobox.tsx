import React, { FC } from 'react'
import { Combobox } from '@consta/uikit/Combobox'
import cl from '../FilterField.module.scss'
import StatusTag, { TagPropStatus } from './StatusTag/StatusTag'
import { SelectItem } from '@consta/uikit/__internal__/src/components/SelectComponents/SelectItem/SelectItem'

// TYPES
export type statusComboboxItem = {
  label: string
  id: TagPropStatus
  disabled: false
}

// CONSTANTS
export const statusList: statusComboboxItem[] = [
  {
    label: 'Кроме незапланированных',
    id: 'exceptPlanned',
    disabled: false
  },
  {
    label: 'Не запланирован',
    id: 'unplanned',
    disabled: false
  },
  {
    label: 'Запланирован',
    id: 'planned',
    disabled: false
  },
  {
    label: 'Ожидает',
    id: 'waiting',
    disabled: false
  },
  {
    label: 'Идет (без проктора)',
    id: 'withoutProctor',
    disabled: false
  },
  {
    label: 'Идет (с проктором)',
    id: 'withProctor',
    disabled: false
  },
  {
    label: 'Идет (асинхронно)',
    id: 'async',
    disabled: false
  },
  {
    label: 'Формируется протокол',
    id: 'forming',
    disabled: false
  },
  {
    label: 'Ожидается заключение',
    id: 'conclusionWaiting',
    disabled: false
  },
  {
    label: 'На проверке',
    id: 'review',
    disabled: false
  },
  {
    label: 'Принят',
    id: 'success',
    disabled: false
  },
  {
    label: 'Прерван',
    id: 'interrupted',
    disabled: false
  },
  {
    label: 'Пропущен',
    id: 'missed',
    disabled: false
  },
  {
    label: 'Неявка',
    id: 'noAppearance',
    disabled: false
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
      onChange={(changeValue) => onChange(changeValue.value)}
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
