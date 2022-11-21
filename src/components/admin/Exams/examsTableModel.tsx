import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
import { openModal } from '../../shared/ModalView/ModalView'
import ExamView from '../modals/ExamView/ExamView'
import { proctor } from '../../../utils/nameHelper'
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'

export interface IExamsTableModel extends ITableRow {
  listener: string
  proctor: proctor
  exam: {
    _id: string
    subject: string
    assigment: string
  }
  type: ReactNode
  async: ReactNode
  start: string
  status: ReactNode
  video: ReactNode
  more: ReactNode
}

export const examsColumn: TableColumn<IExamsTableModel>[] = [
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
    title: <HeaderCell title={'Слушатель'} />,
    accessor: 'listener',
    align: 'left',
    renderCell: (row) => (
      <TextWithTooltip text={row.listener} tooltipText={'Профиль слушателя – ' + row.listener} />
    ),
    sortable: true
  },
  {
    title: 'Проктор',
    accessor: 'proctor',
    align: 'left',
    renderCell: (row) => (
      <TextWithTooltip
        text={row.proctor.shortName}
        tooltipText={
          row.proctor.exists
            ? 'Профиль проктора – ' + row.proctor.fullName
            : 'Проктор на экзамен не назначен'
        }
        onClick={() => console.log(row.proctor)}
      />
    ),
    sortable: true
  },
  {
    title: 'Экзамен',
    accessor: 'exam',
    align: 'left',
    renderCell: (row) => {
      return (
        <TwoRowCell
          firstRow={row.exam.subject}
          secondRow={row.exam.assigment}
          tooltipText={'Карточка экзамена – ' + row.exam.subject}
          onClick={() => openModal(<ExamView examId={row.exam._id} />)}
        />
      )
    },
    sortable: true
  },
  {
    title: 'Тип',
    accessor: 'type',
    align: 'center'
  },
  {
    title: 'Начало',
    accessor: 'start',
    align: 'left',
    renderCell: (row) => <DateCell date={row.start} />,
    sortable: true
  },
  {
    title: 'Статус',
    accessor: 'status',
    align: 'left'
  },
  {
    title: '',
    accessor: 'video',
    align: 'center'
  },
  {
    title: '',
    accessor: 'more',
    align: 'center'
  }
]
