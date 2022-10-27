import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'

export interface ExamsTableData extends ITableRow {
  check: ReactNode | null
  user: ReactNode
  login: ReactNode
  provider: ReactNode
  role: ReactNode
  university: ReactNode
  regDate: ReactNode
  lastDate: ReactNode
  more: ReactNode
}

export const examsColumn: TableColumn<ExamsTableData>[] = [
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
    accessor: 'user',
    align: 'left'
  },
  {
    title: 'Проктор',
    accessor: 'login',
    align: 'left'
  },
  {
    title: 'Экзамен',
    accessor: 'provider',
    align: 'left'
  },
  {
    title: 'Тип',
    accessor: 'role',
    align: 'center'
  },
  {
    title: 'Тип',
    accessor: 'university',
    align: 'center'
  },
  {
    title: 'Тип',
    accessor: 'regDate',
    align: 'center'
  },
  {
    title: 'Тип',
    accessor: 'lastDate',
    align: 'center'
  },
  {
    title: '',
    accessor: 'more',
    align: 'center'
  }
]
