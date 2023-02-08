import { TableColumn } from '@consta/uikit/Table'
import React, { ReactNode } from 'react'
import { Checkbox } from '@consta/uikit/Checkbox'
import { ITableRow } from '../../shared/SharedTable/SharedTable'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
import { openModal } from '../../shared/ModalView/ModalView'
import ExamView from '../modals/ExamView/ExamView'
import { proctor } from '../../../utils/common/nameHelper'
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'
import dayjs from 'dayjs'

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
  start: { startDate?: string; beginDate?: string }
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
    title: <HeaderCell title={'Проктор'} />,
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
    title: <HeaderCell title={'Экзамен'} />,
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
    title: <HeaderCell title={'Тип'} />,
    accessor: 'type',
    align: 'center'
  },
  {
    title: <HeaderCell title={'Начало'} />,
    accessor: 'start',
    align: 'left',
    renderCell: (row) =>
      row.start.beginDate && (
        <TwoRowCell
          firstRow={dayjs(row.start.beginDate).format('DD.MM.YYYY')}
          secondRow={
            dayjs(row.start.beginDate).format('hh:mm') +
            (row.start.startDate ? dayjs(row.start.startDate).format(' (hh:mm)') : '')
          }
        />
      ),
    sortable: true
  },
  {
    title: <HeaderCell title={'Статус'} />,
    accessor: 'status',
    align: 'left'
  },
  {
    title: null,
    accessor: 'video',
    align: 'center'
  },
  {
    title: null,
    accessor: 'more',
    align: 'center'
  }
]
