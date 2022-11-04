import {TableColumn} from '@consta/uikit/Table'
import React, {ReactNode} from 'react'
import {Checkbox} from '@consta/uikit/Checkbox'
import {ITableRow} from '../../shared/SharedTable/SharedTable'

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
    renderCell: (row) => <Checkbox checked={row.selected} />,
    control: () => <Checkbox checked={true} />
  },
  {
    title: 'Начало',
    accessor: 'beginDate',
    align: 'left'
  },
  {
    title: 'Окончание',
    accessor: 'endDate',
    align: 'left'
  },
  {
    title: 'Активный',
    accessor: 'active',
    align: 'left'
  },
  {
    title: 'Создано',
    accessor: 'created',
    align: 'left'
  },
  {
    title: '',
    accessor: 'more',
    align: 'left'
  }
]
