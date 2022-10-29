import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'

export interface IUsersTableData extends ITableRow {
  check: ReactNode | null
  user: ReactNode
  login: ReactNode
  provider: ReactNode
  role: ReactNode
  university: ReactNode
  regDate: ReactNode
  lastDate: ReactNode
  more: ReactNode
}

export const usersColumns: TableColumn<IUsersTableData>[] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    hidden: true
  },
  {
    title: '',
    accessor: 'check',
    align: 'center',
    renderCell: (row) => <Checkbox checked={row.selected} />
  },
  {
    title: 'Пользователь',
    accessor: 'user',
    align: 'left'
  },
  {
    title: 'Логин',
    accessor: 'login',
    align: 'left'
  },
  {
    title: 'Провайдер',
    accessor: 'provider',
    align: 'left'
  },
  {
    title: 'Роль',
    accessor: 'role',
    align: 'center'
  },
  {
    title: 'Университет',
    accessor: 'university',
    align: 'center'
  },
  {
    title: 'Дата Рег',
    accessor: 'regDate',
    align: 'center'
  },
  {
    title: 'Посл Вход',
    accessor: 'lastDate',
    align: 'center'
  },
  {
    title: '',
    accessor: 'more',
    align: 'center'
  }
]
