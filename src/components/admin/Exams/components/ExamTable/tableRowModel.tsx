import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { TestTableColumns } from './ExamTable'

export interface ITableColumns {
  id: string
  selected: boolean
  check: ReactNode
  listener: ReactNode
  proctor: ReactNode
  exam: ReactNode
  type: ReactNode
  start: ReactNode
  status: ReactNode
  video: ReactNode
  more: ReactNode
}

export const columns: TableColumn<TestTableColumns>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    hidden: true
  },
  {
    title: '',
    accessor: 'check',
    align: 'center',
    renderCell: (row) => <Checkbox checked={row.selected} />
  },
  {
    title: 'Слушатель',
    accessor: 'listener',
    align: 'left'
  },
  {
    title: 'Проктор',
    accessor: 'proctor',
    align: 'left'
  },
  {
    title: 'Экзамен',
    accessor: 'exam',
    align: 'left'
  },
  {
    title: 'Тип',
    accessor: 'type',
    align: 'center'
  },
  {
    title: 'Начало',
    accessor: 'start',
    align: 'left'
  },
  {
    title: 'Статус',
    accessor: 'status',
    align: 'center'
  },
  {
    title: '',
    accessor: 'video',
    align: 'center'
  },
  {
    title: '',
    accessor: 'more',
    align: 'center'
  }
]
