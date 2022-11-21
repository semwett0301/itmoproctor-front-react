import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'

export interface IMaintenanceTableModel extends ITableRow {
  beginDate: string
  endDate: string
  active: ReactNode
  created: string
  more: ReactNode
}

export const maintenanceColumns: TableColumn<IMaintenanceTableModel>[] = [
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
    title: 'Начало',
    accessor: 'beginDate',
    align: 'left',
    renderCell: (row) => <DateCell date={row.beginDate} />,
    sortable: true
  },
  {
    title: 'Окончание',
    accessor: 'endDate',
    align: 'left',
    renderCell: (row) => <DateCell date={row.endDate} />,
    sortable: true
  },
  {
    title: 'Активный',
    accessor: 'active',
    align: 'left',
    sortable: true
  },
  {
    title: 'Создано',
    accessor: 'created',
    align: 'left',
    renderCell: (row) => <DateCell date={row.created} />,
    sortable: true
  },
  {
    title: '',
    accessor: 'more',
    align: 'left'
  }
]
