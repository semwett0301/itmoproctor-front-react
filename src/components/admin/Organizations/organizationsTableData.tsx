import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'

export interface IOrganizationsTableModel extends ITableRow {
  fullName: string | undefined
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
    title: null,
    accessor: 'selected',
    align: 'center',
    renderCell: (row) => <Checkbox checked={row.selected} />
  },
  {
    title: <HeaderCell title={'Полное название'} />,
    accessor: 'fullName',
    align: 'left',
    renderCell: (row) => <TextWithTooltip text={row.fullName || ''} tooltipText={row.fullName} />,
    sortable: true
  },
  {
    title: <HeaderCell title={'Короткое название'} />,
    accessor: 'shortName',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Код'} />,
    accessor: 'code',
    align: 'left',
    sortable: true
  },
  {
    title: null,
    accessor: 'more',
    align: 'left'
  }
]
