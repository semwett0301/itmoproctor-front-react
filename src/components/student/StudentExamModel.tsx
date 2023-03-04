import React, {ReactNode} from 'react'
import {TableColumn} from '@consta/uikit/Table'
import HeaderCell from '../shared/SharedTable/HeaderCell/HeaderCell'

export interface IStudentExamModel {
  id: string
  exam: ReactNode
  duration: ReactNode
  status: ReactNode
  start: ReactNode
}

export const studentExamColumns: TableColumn<IStudentExamModel>[] = [
  {
    title: '',
    accessor: 'id',
    align: 'center'
  },
  {
    title: <HeaderCell title={'Экзамен'} />,
    accessor: 'exam',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Длительность'} />,
    accessor: 'duration',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Статус'} />,
    accessor: 'status',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Начало'} />,
    accessor: 'start',
    align: 'left'
  }
]
