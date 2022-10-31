import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'

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
    title: '',
    accessor: 'selected',
    align: 'center',
    renderCell: (row) => <Checkbox checked={row.selected} />
  },
  {
    title: 'Название курса',
    accessor: 'name',
    align: 'left'
  },
  {
    title: 'Код курса',
    accessor: 'courseCode',
    align: 'left'
  },
  {
    title: 'Код сессии',
    accessor: 'sessionCode',
    align: 'left'
  },
  {
    title: 'Правообладатель',
    accessor: 'organization',
    align: 'center'
  },
  {
    title: 'Есть доступ',
    accessor: 'accessAllowed',
    align: 'left'
  },
  {
    title: 'Обновлен',
    accessor: 'updated',
    align: 'center'
  },
  {
    title: '',
    accessor: 'more',
    align: 'center'
  }
]
