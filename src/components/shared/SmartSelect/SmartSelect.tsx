import React, { FC } from 'react'
import { Modify } from '../../../utils/typesUtils'
import { SelectProps } from '@consta/uikit/__internal__/src/components/Select/helpers'
import { Select } from '@consta/uikit/Select'
import genders from './Items/genders'
import documents from './Items/documents'
import citizenships from './Items/citizenships'
import userStatuses from './Items/userStatuses'
import roles from './Items/roles'
import providers from './Items/providers'

// TYPES

// CONSTANTS
export const SmartSelectProps = {
  genders: {
    placeholder: 'Пол',
    label: 'Пол',
    selectItems: genders
  },
  documents: {
    placeholder: 'Тип документа',
    label: 'Тип документа',
    selectItems: documents
  },
  citizenship: {
    placeholder: 'Гражданство',
    label: 'Гражданство',
    selectItems: citizenships
  },
  userStatuses: {
    placeholder: 'Статус',
    label: 'Статус',
    selectItems: userStatuses
  },
  roles: {
    placeholder: 'Роль пользователя в систме',
    label: 'Роль в системе',
    selectItems: roles
  },
  providers: {
    placeholder: 'Провайдер авторизации',
    label: 'Провайдер',
    selectItems: providers
  }
}
// DEFAULT FUNCTIONS

type ItemsType = keyof typeof SmartSelectProps
type ISmartSelectProp = Modify<SelectProps, { items?: never; placeholder?: never }> & {
  itemsType: ItemsType
  withLabel?: boolean
}

const SmartSelect: FC<ISmartSelectProp> = ({ itemsType, withLabel, size, ...rest }) => {
  const { placeholder, selectItems, label } = SmartSelectProps[itemsType]

  return (
    <Select
      {...rest}
      items={selectItems}
      placeholder={placeholder}
      size={size ?? 's'}
      label={withLabel ? rest.label || label : undefined}
    />
  )
}

export default SmartSelect
