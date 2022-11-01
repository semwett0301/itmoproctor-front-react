import {TableColumn} from '@consta/uikit/Table'
import React, {ReactNode} from 'react'
import {Checkbox} from '@consta/uikit/Checkbox'
import {ITableRow} from '../../shared/SharedTable/SharedTable'

export interface IOrganizationsTableModel extends ITableRow {
  fullName: ReactNode,
  shortName: ReactNode,
  code: ReactNode,
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
    renderCell: (row) => <Checkbox checked={row.selected}/>
  },
  {
    title: 'Полное название',
    accessor: 'fullName',
    align: 'left'
  },
  {
    title: 'Короткое название',
    accessor: 'shortName',
    align: 'left'
  },
  {
    title: 'Код',
    accessor: 'code',
    align: 'left'
  },
  {
    title: '',
    accessor: 'more',
    align: 'left'
  }
]
