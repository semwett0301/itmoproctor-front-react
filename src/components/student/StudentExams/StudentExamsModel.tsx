import React, {ReactNode} from 'react'
import {TableColumn} from '@consta/uikit/Table'
import HeaderCell from '../../shared/SharedTable/HeaderCell/HeaderCell'
import {ITableRow} from '../../shared/SharedTable/SharedTable';
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell';
import {openModal} from '../../shared/ModalView/ModalView';
import ExamView from '../../admin/modals/ExamView/ExamView';
import dayjs from 'dayjs';
import {TextPropView} from '@consta/uikit/Text';

export interface IStudentExamModel extends ITableRow{
  id: string
  exam: {
    _id: string
    courseName: string
    examName: string
  }
  deadline: {
    date: string,
    description: string,
    view?: TextPropView
  }
  status: ReactNode
  start: ReactNode,
  action: ReactNode
}

export const studentExamsColumns: TableColumn<IStudentExamModel>[] = [
   {
    title: <HeaderCell title={'Экзамен'} />,
    accessor: 'exam',
    align: 'left',
     renderCell: row => (
       <TwoRowCell
         firstRow={row.exam.courseName ?? '-'}
         secondRow={row.exam.examName}
         isLinkable
         tooltipText={'Карточка экзамена – ' + row.exam.examName}
         onClick={() => openModal(<ExamView examId={row.exam._id}/>)}
       />
     )
  },
  {
    title: <HeaderCell title={'Дедлайн'} />,
    accessor: 'deadline',
    align: 'left',
    renderCell: row => (
      <TwoRowCell
        firstRow={`${dayjs(row.deadline.date).format('DD.MM.YYYY hh:mm')}`}
        secondRow={row.deadline.description}
        secondView={row.deadline.view}
      />
    )
  },
  {
    title: <HeaderCell title={'Статус'} />,
    accessor: 'status',
    align: 'left',

  },
  {
    title: <HeaderCell title={'Начало'} />,
    accessor: 'start',
    align: 'left'
  },
  {
    title: <HeaderCell title={''} />,
    accessor: 'action',
    align: 'left'
  }
]
