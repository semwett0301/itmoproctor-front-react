import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'

export interface IExamsTableModel extends ITableRow {
  listener: ReactNode
  proctor: ReactNode
  exam: ReactNode
  type: ReactNode
  async: ReactNode
  start: ReactNode
  status: ReactNode
  video: ReactNode
  more: ReactNode
}

export const examsColumn: TableColumn<IExamsTableModel>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    hidden: true
  },
  {
    title: null,
    accessor: 'selected',
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
    align: 'left'
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
