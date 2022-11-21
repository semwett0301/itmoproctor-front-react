import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'

export interface IOrganizationsTableModel extends ITableRow {
  fullName: ReactNode
  shortName: ReactNode
  code: ReactNode
  more: ReactNode
}

export const organizationsColumn: TableColumn<IOrganizationsTableModel>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    hidden: true
  },
  {
    title: '',
    accessor: 'selected',
    align: 'center',
    renderCell: (row) => <Checkbox checked={row.selected} />
  },
  {
    title: 'Полное название',
    accessor: 'fullName',
    align: 'left',
    sortable: true
  },
  {
    title: 'Короткое название',
    accessor: 'shortName',
    align: 'left',
    sortable: true
  },
  {
    title: 'Код',
    accessor: 'code',
    align: 'left',
    sortable: true
  },
  {
    title: '',
    accessor: 'more',
    align: 'left'
  }
]
