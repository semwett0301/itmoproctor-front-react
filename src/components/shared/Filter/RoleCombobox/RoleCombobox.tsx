import React, {FC} from 'react'
import {Combobox} from '@consta/uikit/Combobox'
import {DefaultItem} from '@consta/uikit/__internal__/src/components/Combobox/helpers'

// CONSTANTS
const roleList: DefaultItem[] = [
  {
    id: 1,
    label: 'Слушатель'
  },
  {
    id: 2,
    label: 'Проктор'
  },
  {
    id: 'expert',
    label: 'Эксперт'
  },
  {
    id: 3,
    label: 'Администратор'
  }
]

interface IRoleComboboxProp {
  onChange: (props: { value: DefaultItem[] | null; e: React.SyntheticEvent }) => void
  value: DefaultItem[] | null
}

const RoleCombobox: FC<IRoleComboboxProp> = ({ value, onChange }) => {
  return (
    <Combobox
      size='s'
      placeholder={'Роль'}
      items={roleList}
      multiple={true}
      value={value}
      onChange={onChange}
    />
  )
}

export default RoleCombobox
