import React, { FC } from 'react'
import { Modify } from '../../../utils/ts/typesUtils'
import { SelectProps } from '@consta/uikit/__internal__/src/components/Select/helpers'
import { Select } from '@consta/uikit/Select'
import genders from './items/genders'
import documents from './items/documents'
import citizenships from './items/citizenships'
import userStatuses from './items/userStatuses'
import roles from './items/roles'
import providers from './items/providers'
import examTypes from './items/examTypes'
import resolutions from './items/resolutions'

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
  },
  examTypes: {
    placeholder: 'Тип экзамена',
    label: 'Тип',
    selectItems: examTypes
  },
  resolutions: {
    placeholder: 'Заключение',
    label: 'Заключение',
    selectItems: resolutions
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
