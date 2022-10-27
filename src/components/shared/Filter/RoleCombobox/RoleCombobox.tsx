import React, { FC } from 'react'
import { Combobox } from '@consta/uikit/Combobox'
import { DefaultItem } from '@consta/uikit/__internal__/src/components/Combobox/helpers'

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
    id: 3,
    label: 'Эксперт'
  },
  {
    id: 4,
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
      placeholder={'Слушатель'}
      items={roleList}
      multiple={true}
      value={value}
      onChange={onChange}
    />
  )
}

export default RoleCombobox