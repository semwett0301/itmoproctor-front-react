import React, {FC} from 'react'
import {Select} from '@consta/uikit/Select'

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
  return <Select items={typesList} value={value} onChange={onChange} placeholder='Тип' size='s' />
}

export default ExamTypeSelect
