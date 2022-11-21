import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'

export interface IScheduleTableModel extends ITableRow {
  proctor: ReactNode
  beginDate: ReactNode
  endDate: ReactNode
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
    title: <HeaderCell title={'Проктор'} />,
    accessor: 'proctor',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Начало работа'} />,
    accessor: 'beginDate',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Окончание работы'} />,
    accessor: 'endDate',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Количество сессий'} />,
    accessor: 'concurrent',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Старты'} />,
    accessor: 'maxExamsBeginnings',
    align: 'left'
  },
  {
    title: null,
    accessor: 'more',
    align: 'left'
  }
]
