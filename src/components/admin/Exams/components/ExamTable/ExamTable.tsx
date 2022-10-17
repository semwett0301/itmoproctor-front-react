import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Table } from '@consta/uikit/Table'
import cl from './ExamTable.module.scss'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
import { TabItem } from '../../../Admin'
import { columns, ITableColumns } from './tableRowModel'
import StatusBadge, {
  badgePropStatus,
  getExamStatus,
  getProctorName
} from '../StatusBadge/StatusBadge'
import TwoRowCell from '../TwoRowCell/TwoRowCell'
import TypeBadge from '../TypeBadge/TypeBadge'
import { request } from '../../../../../api/axios/request'
import { IExams } from '../../../../../ts/interfaces/IExams'

interface IExamTableProps {
  onVideoBtnClick: (item: TabItem) => void
}

export interface TestTableColumns {
  id: string
  selected: boolean
  check: ReactNode
  listener: ReactNode
  proctor: ReactNode
  exam: ReactNode
  type: ReactNode
  start: ReactNode
  status: ReactNode
  video: ReactNode
  more: ReactNode
}

const ExamTable: FC<IExamTableProps> = ({ onVideoBtnClick }) => {
  const [fullRows, setFullRows] = useState<ITableColumns[]>([])

  useEffect(() => {
    const getExams = async () => {
      await request.exam.getListOfExams().then((r) => {
        console.log(r.data.rows)
        const obj: ITableColumns[] = r.data.rows.map((item: IExams) => {
          const row: TestTableColumns = {
            id: item._id,
            selected: false,
            listener: `${item.student.middlename} ${item.student.firstname} ${item.student.lastname}`,
            proctor: getProctorName(item.async, item.inspector, item.expert),
            exam: <TwoRowCell firstRow={item.subject} secondRow={item.assignment} />,
            type: <TypeBadge async={item.async} />,
            start: <TwoRowCell firstRow={item.startDate} secondRow={item.endDate} />,
            status: <StatusBadge status={badgePropStatus[getExamStatus(item)]} />,
            check: <Checkbox checked={false} onClick={this} />,
            video: (
              <Button
                size='xs'
                onlyIcon
                iconRight={IconVideo}
                onClick={() =>
                  onVideoBtnClick({
                    id: item._id,
                    title: item._id,
                    path: `exam/${item._id}`,
                    type: 'exam'
                  })
                }
              />
            ),
            more: <Button size='xs' onlyIcon iconRight={IconBento} view='secondary' />
          }
          return row
        })

        setFullRows(obj)
      })
    }

    getExams().catch((e) => console.log(e))
  }, [])

  const [selectedRow, setSelectedRow] = useState<string>()

  const handleClickRow = ({
    id,
    e
  }: {
    id: string | undefined
    e?: React.SyntheticEvent
  }): void => {
    setSelectedRow(id)
  }

  return (
    <Table
      getCellWrap={() => 'truncate'}
      stickyHeader={true}
      size='s'
      activeRow={{ id: selectedRow, onChange: handleClickRow }}
      rows={fullRows}
      columns={columns}
      zebraStriped={'odd'}
      borderBetweenColumns
      borderBetweenRows
      className={cl.table}
      emptyRowsPlaceholder={<Text>Дата не пришла(</Text>}
    />
  )
}

export default ExamTable
