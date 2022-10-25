import React, { FC } from 'react'
import { Combobox } from '@consta/uikit/Combobox'
import { DefaultItem } from '@consta/uikit/Select'

// CONSTANTS
export const organizationsList: DefaultItem[] = [
  {
    label: 'Университет ИТМО',
    id: 1
  },
  {
    label: 'ВШЭ',
    id: 2
  },
  {
    label: 'ДВФУ',
    id: 3
  },
  {
    label: 'Политех',
    id: 4
  },
  {
    label: 'Ростехнадзор',
    id: 5
  },
  {
    label: 'ТГУ',
    id: 6
  }
]

interface IOrganizationSelectProp {
  value: DefaultItem[] | null
  onChange: (props: { value: DefaultItem[] | null; e: React.SyntheticEvent }) => void
}

const OrganizationSelect: FC<IOrganizationSelectProp> = ({ value, onChange }) => {
  return (
    <Combobox
      items={organizationsList}
      value={value}
      multiple={true}
      onChange={onChange}
      placeholder='Правообладатель'
      size='s'
    />
  )
}

export default OrganizationSelect
