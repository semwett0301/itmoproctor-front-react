import React, { FC } from 'react'
import { Select } from '@consta/uikit/Select'

// TYPES
export type providerItem = {
  label: string
  id: number
  provider: string | null
}

// CONSTANTS
const typesList: providerItem[] = [
  {
    label: 'Любой провайдер',
    id: 1,
    provider: null
  },
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

const ProviderSelect: FC<IProviderSelectProp> = ({ value, onChange }) => {
  return (
    <Select items={typesList} value={value} onChange={onChange} placeholder='Провайдер' size='s' />
  )
}

export default ProviderSelect
