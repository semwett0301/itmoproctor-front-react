import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'

export interface IScheduleTableModel extends ITableRow {
  proctor: ReactNode
  beginDate: string
  endDate: string
  concurrent: ReactNode
  maxExamsBeginnings: ReactNode
  more: ReactNode
}

export const scheduleColumns: TableColumn<IScheduleTableModel>[] = [
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
    title: 'Проктор',
    accessor: 'proctor',
    align: 'left',
    sortable: true
  },
  {
    title: 'Начало работа',
    accessor: 'beginDate',
    align: 'left',
    renderCell: (row) => <DateCell date={row.beginDate} />,
    sortable: true
  },
  {
    title: 'Окончание работы',
    accessor: 'endDate',
    align: 'left',
    renderCell: (row) => <DateCell date={row.endDate} />,
    sortable: true
  },
  {
    title: 'Количество сессий',
    accessor: 'concurrent',
    align: 'left',
    sortable: true
  },
  {
    title: 'Старты',
    accessor: 'maxExamsBeginnings',
    align: 'left',
    sortable: true
  },
  {
    title: '',
    accessor: 'more',
    align: 'left'
  }
]
