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
    title: <HeaderCell title={'Проктор'} />,
    accessor: 'proctor',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Экзамен'} />,
    accessor: 'exam',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Тип'} />,
    accessor: 'type',
    align: 'center'
  },
  {
    title: <HeaderCell title={'Начало'} />,
    accessor: 'start',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Статус'} />,
    accessor: 'status',
    align: 'left'
  },
  {
    title: null,
    accessor: 'video',
    align: 'center'
  },
  {
    title: null,
    accessor: 'more',
    align: 'center'
  }
]
