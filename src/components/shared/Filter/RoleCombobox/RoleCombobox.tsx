import React, { FC } from 'react'
import { statusComboboxItem } from '../ExamStatusCombobox/ExamStatusCombobox'
import { Combobox } from '@consta/uikit/Combobox'
import { DefaultItem } from '@consta/uikit/__internal__/src/components/Combobox/helpers'

// CONSTANTS
const roleList: DefaultItem[] = [
  {
    id: '',
    label: 'Слушатель'
  },
  {
    id: '',
    label: 'Проктор'
  },
  {
    id: '',
    label: 'Эксперт'
  },
  {
    id: '',
    label: 'Администратор'
  }
]

interface IRoleComboboxProp {
  onChange: (props: { value: DefaultItem[] | null; e: React.SyntheticEvent }) => void
  value: statusComboboxItem[] | null
}

const RoleCombobox: FC<IRoleComboboxProp> = ({ value, onChange }) => {
  return (
    <Combobox
      size='s'
      placeholder={'Статус'}
      items={roleList}
      multiple={true}
      value={value}
      onChange={onChange}
    />
  )
}

export default RoleCombobox
