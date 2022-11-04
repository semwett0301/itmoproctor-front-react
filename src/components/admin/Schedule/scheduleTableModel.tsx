import {TableColumn} from '@consta/uikit/Table'
import React, {ReactNode} from 'react'
import {Checkbox} from '@consta/uikit/Checkbox'
import {ITableRow} from '../../shared/SharedTable/SharedTable'

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
    renderCell: (row) => <Checkbox checked={row.selected} />,
    control: () => <Checkbox checked={true} />
  },
  {
    title: 'Проктор',
    accessor: 'proctor',
    align: 'left'
  },
  {
    title: 'Начало работа',
    accessor: 'beginDate',
    align: 'left'
  },
  {
    title: 'Окончание работы',
    accessor: 'endDate',
    align: 'left'
  },
  {
    title: 'Количество сессий',
    accessor: 'concurrent',
    align: 'left'
  },
  {
    title: 'Старты',
    accessor: 'maxExamsBeginnings',
    align: 'left'
  },
  {
    title: '',
    accessor: 'more',
    align: 'left'
  }
]
