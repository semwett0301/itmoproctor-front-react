import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'

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
    title: <HeaderCell title={'Слушатель'} />,
    accessor: 'listener',
    align: 'left',
    sortable: true
  },
  {
    title: 'Проктор',
    accessor: 'proctor',
    align: 'left',
    sortable: true
  },
  {
    title: 'Экзамен',
    accessor: 'exam',
    align: 'left',
    sortable: true
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
