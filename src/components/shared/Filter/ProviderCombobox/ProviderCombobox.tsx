import React, {FC} from 'react'
import {Combobox} from '@consta/uikit/Combobox'

// TYPES
export type providerItem = {
  label: string
  id: number
  provider: 'local' | 'openedu' | null
}

// CONSTANTS
const typesList: providerItem[] = [
  {
    label: 'Локальный',
    id: 2,
    provider: 'local'
  },
  {
    label: 'OpenEdu',
    id: 3,
    provider: 'openedu'
  }
]

interface IProviderSelectProp {
  value: providerItem | null
  onChange: (props: { value: providerItem | null; e: React.SyntheticEvent }) => void
}

const ProviderCombobox: FC<IProviderSelectProp> = ({ value, onChange }) => {
  return (
    <Combobox
      items={typesList}
      value={value}
      onChange={onChange}
      placeholder='Провайдер'
      size='s'
    />
  )
}

export default ProviderCombobox
