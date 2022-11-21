import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'

export interface IUsersTableModel extends ITableRow {
  user: ReactNode
  login: ReactNode
  provider: ReactNode
  role: ReactNode
  university: ReactNode
  regDate: ReactNode
  lastDate: ReactNode
  more: ReactNode
}

export const usersColumns: TableColumn<IUsersTableModel>[] = [
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
    title: <HeaderCell title={'Пользователь'} />,
    accessor: 'user',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Логин'} />,
    accessor: 'login',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Провайдер'} />,
    accessor: 'provider',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Роль'} />,
    accessor: 'role',
    align: 'center'
  },
  {
    title: <HeaderCell title={'Университет'} />,
    accessor: 'university',
    align: 'left'
  },
  {
    title: <HeaderCell title={'Дата Рег'} />,
    accessor: 'regDate',
    align: 'center'
  },
  {
    title: <HeaderCell title={'Посл Вход'} />,
    accessor: 'lastDate',
    align: 'center'
  },
  {
    title: null,
    accessor: 'more',
    align: 'center'
  }
]
