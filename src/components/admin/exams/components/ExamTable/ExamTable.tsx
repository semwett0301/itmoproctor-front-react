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
import { TabItem } from '../../../Admin'
import axios, { AxiosResponse } from 'axios'
import { IExams } from '../../../../../ts/interfaces/IExams'
import { filterInterface } from '../../../../../api/axios/modules/admin/exams'

function getListOfExams(
  filter: filterInterface = {
    from: new Date().toISOString(),
    to: new Date().toISOString(),
    text: '',
    status: null,
    reset: null,
    organizations: null,
    myStudents: false,
    async: null,
    page: 1,
    rows: 50
  }
): Promise<AxiosResponse<IExams>> {
  return axios.get(`https://de-dev.itmo.ru/admin/exams`, { data: filter })
}

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
            onClick={() =>
              onVideoBtnClick({
                id: +item.id,
                title: item.listener,
                path: 'exam',
                type: 'exam'
              })
            }
          />
        ),
        more: <Button size='xs' onlyIcon iconRight={IconBento} view='secondary' />
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
