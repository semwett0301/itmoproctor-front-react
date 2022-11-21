import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'
import { getFullName } from '../../../utils/nameHelper'
import { openModal } from '../../shared/ModalView/ModalView'
import ListenerView from '../modals/ListenerView/ListenerView'

export interface IUsersTableModel extends ITableRow {
  user: {
    id: string
    firstname: string
    middlename: string
    lastname: string
  }
  login: ReactNode
  provider: ReactNode
  role: ReactNode
  university: ReactNode
  regDate: string
  lastDate: string
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
    align: 'left',
    renderCell: (row) => (
      <TextWithTooltip
        text={getFullName(row.user.lastname, row.user.firstname, row.user.middlename)}
        tooltipText={'Профиль пользователя'}
        onClick={() => openModal(<ListenerView profileId={row.user.id} />)}
      />
    ),
    sortable: true
  },
  {
    title: <HeaderCell title={'Логин'} />,
    accessor: 'login',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Провайдер'} />,
    accessor: 'provider',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Роль'} />,
    accessor: 'role',
    align: 'center',
    sortable: true
  },
  {
    title: <HeaderCell title={'Университет'} />,
    accessor: 'university',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Дата Рег'} />,
    accessor: 'regDate',
    align: 'center',
    renderCell: (row) => <DateCell date={row.regDate} />,
    sortable: true
  },
  {
    title: <HeaderCell title={'Посл Вход'} />,
    accessor: 'lastDate',
    align: 'center',
    renderCell: (row) => <DateCell date={row.lastDate} />,
    sortable: true
  },
  {
    title: null,
    accessor: 'more',
    align: 'center'
  }
]
