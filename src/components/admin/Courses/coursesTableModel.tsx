import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'

export interface ICoursesTableModel extends ITableRow {
  name: ReactNode
  courseCode: ReactNode
  sessionCode: ReactNode
  organization: ReactNode
  accessAllowed: ReactNode
  updated: string
  more: ReactNode
}

export const coursesColumns: TableColumn<ICoursesTableModel>[] = [
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
    title: <HeaderCell title={'Название курса'} />,
    accessor: 'name',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Код курса'} />,
    accessor: 'courseCode',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Код сессии'} />,
    accessor: 'sessionCode',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Правообладатель'} />,
    accessor: 'organization',
    align: 'left'
    sortable: true
  },
  {
    title: <HeaderCell title={'Есть доступ'} />,
    accessor: 'accessAllowed',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Обновлен'} />,
    accessor: 'updated',
    align: 'center',
    renderCell: (row) => <DateCell date={row.updated} />,
    sortable: true
  },
  {
    title: null,
    accessor: 'more',
    align: 'center'
  }
]
