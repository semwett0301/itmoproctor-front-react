import React, { FC, useEffect, useState } from 'react'
import { Table } from '@consta/uikit/Table'
import cl from './ExamTable.module.scss'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Text } from '@consta/uikit/Text'
import { columns, ITableColumns } from './tableRowModel'
import { responseTableData } from '../../mockData/examTableData'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
import { TabItem } from '../../Exams'

interface IExamTableProps {
  onVideoBtnClick: (item: TabItem) => void
}

const ExamTable: FC<IExamTableProps> = ({ onVideoBtnClick }) => {
  const [fullRows, setFullRows] = useState<ITableColumns[]>([])

  useEffect(() => {
    const obj = responseTableData.map((item) => {
      return {
        ...item,
        check: <Checkbox checked={true} />,
        video: (
          <Button
            size='xs'
            onlyIcon
            iconRight={IconVideo}
            onClick={() => onVideoBtnClick({ id: +item.id, title: item.listener })}
          />
        ),
        more: <Button size='xs' onlyIcon iconRight={IconBento} view='secondary' />,
      }
    })

    setFullRows(obj)
  }, [])

  return (
    <Table
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
