import React, { FC, useEffect, useState } from 'react'
import { Table } from '@consta/uikit/Table'
import cl from './ExamTable.module.scss'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Text } from '@consta/uikit/Text'
import { columns, ITableColumns } from './tableRowModel'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
import { TabItem } from '../../../Admin'
import { useRequest } from '../../../../../hooks/requestHooks'

interface IExamTableProps {
  onVideoBtnClick: (item: TabItem) => void
}

const ExamTable: FC<IExamTableProps> = ({ onVideoBtnClick }) => {
  const [fullRows, setFullRows] = useState<ITableColumns[]>([])
  const request = useRequest()

  useEffect(() => {
    const getExams = async () => {
      await request.exams.getListOfExams().then((r) => {
        console.log(r.data.rows)
        const obj = r.data.rows.map((item) => {
          return {
            id: item._id,
            listener: item.student._id,
            proctor: item.student._id,
            exam: item.subject,
            type: item.async,
            start: item.startDate,
            status: 'sdkhg',
            check: <Checkbox checked={true} />,
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
        })

        setFullRows(obj)
      })
    }

    getExams().catch((e) => console.log(e))
  }, [])

  return (
    <Table
      stickyHeader={true}
      size='s'
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
