import React, {FC} from 'react'
import {Combobox} from '@consta/uikit/Combobox'

// TYPES
export type typeItem = {
  label: string
  id: number
  flag: boolean
}

// CONSTANTS
const typesList: typeItem[] = [
  {
    label: 'Асинхронный',
    id: 1,
    flag: true
  },
  {
    label: 'Синхроннный',
    id: 2,
    flag: false
  }
]

interface IExamTypeSelectProp {
  value: typeItem | null
  onChange: (props: { value: typeItem | null; e: React.SyntheticEvent }) => void
}

const ExamTypeSelect: FC<IExamTypeSelectProp> = ({ value, onChange }) => {
  return (
    <Combobox
      items={typesList}
      value={value}
      onChange={(p) => {
        onChange({ value: p.value, e: p.e })
      }}
      placeholder='Тип'
      size='s'
    />
  )
}

export default ExamTypeSelect
