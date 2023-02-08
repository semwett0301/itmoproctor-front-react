import {TableColumn} from '@consta/uikit/Table'
import React, {ReactNode} from 'react'
import {Checkbox} from '@consta/uikit/Checkbox'
import {ITableRow} from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'
import {getFullName} from '../../../utils/common/nameHelper'
import {openModal} from '../../shared/ModalView/ModalView'
import ProctorView from '../modals/ProctorView/ProctorView'

export interface IScheduleTableModel extends ITableRow {
  proctor: { firstname: string; middlename: string; lastname: string; id: string }
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
    title: <HeaderCell title={'Проктор'} />,
    accessor: 'proctor',
    align: 'left',
    renderCell: ({ proctor }) => (
      <TextWithTooltip
        text={getFullName(proctor.firstname, proctor.middlename, proctor.lastname)}
        tooltipText={'Профиль проктора'}
        onClick={() => openModal(<ProctorView profileId={proctor.id} />)}
      />
    ),
    sortable: true
  },
  {
    title: <HeaderCell title={'Начало работы'} />,
    accessor: 'beginDate',
    align: 'left',
    renderCell: (row) => <DateCell date={row.beginDate} />,
    sortable: true
  },
  {
    title: <HeaderCell title={'Окончание работы'} />,
    accessor: 'endDate',
    align: 'left',
    renderCell: (row) => <DateCell date={row.endDate} />,
    sortable: true
  },
  {
    title: <HeaderCell title={'Количество сессий'} />,
    accessor: 'concurrent',
    align: 'left',
    sortable: true
  },
  {
    title: <HeaderCell title={'Старты'} />,
    accessor: 'maxExamsBeginnings',
    align: 'left',
    sortable: true
  },
  {
    title: null,
    accessor: 'more',
    align: 'left'
  }
]
