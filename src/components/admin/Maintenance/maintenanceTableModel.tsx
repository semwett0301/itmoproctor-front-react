import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'

export interface IMaintenanceTableModel extends ITableRow {
  beginDate: ReactNode
  endDate: ReactNode
  active: ReactNode
  created: ReactNode
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
    title: <HeaderCell title={'Начало'} />,
    accessor: 'beginDate',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Окончание'} />,
    accessor: 'endDate',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Активный'} />,
    accessor: 'active',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Создано'} />,
    accessor: 'created',
    align: 'left'
  },
  {
    title: null,
    accessor: 'more',
    align: 'left'
  }
]
