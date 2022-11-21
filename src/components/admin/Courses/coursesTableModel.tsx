import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'

export interface ICoursesTableModel extends ITableRow {
  name: ReactNode
  courseCode: ReactNode
  sessionCode: ReactNode
  organization: ReactNode
  accessAllowed: ReactNode
  updated: ReactNode
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
    align: 'left'
  },
  {
    title: <HeaderCell title={'Код курса'} />,
    accessor: 'courseCode',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Код сессии'} />,
    accessor: 'sessionCode',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Правообладатель'} />,
    accessor: 'organization',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Есть доступ'} />,
    accessor: 'accessAllowed',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Обновлен'} />,
    accessor: 'updated',
    align: 'center'
  },
  {
    title: null,
    accessor: 'more',
    align: 'center'
  }
]
