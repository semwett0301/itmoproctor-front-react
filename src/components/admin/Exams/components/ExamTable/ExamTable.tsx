import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Table } from '@consta/uikit/Table'
import cl from './ExamTable.module.scss'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
import { TabItem } from '../../../Admin'
import { columns } from './tableRowModel'
import StatusBadge, {
  badgePropStatus,
  getExamStatus,
  getProctorName
} from './StatusBadge/StatusBadge'
import TwoRowCell from './TwoRowCell/TwoRowCell'
import TypeBadge from './TypeBadge/TypeBadge'
import { request } from '../../../../../api/axios/request'
import { IExams } from '../../../../../ts/interfaces/IExams'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconEdit } from '@consta/uikit/IconEdit'
import { contextMenuItem } from '../../../../shared/CustomHeader/CustomHeader'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconTrash } from '@consta/uikit/IconTrash'
import { Position } from '@consta/uikit/Popover'

interface IExamTableProps {
  onVideoBtnClick: (item: TabItem) => void
}

export interface TestTableColumns {
  id: string
  selected: boolean
  check: ReactNode | null
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
  const [fullRows, setFullRows] = useState<TestTableColumns[]>([])
  const [selectedRow, setSelectedRow] = useState<string>()
  const [menuPosition, setMenuPosition] = useState<Position>(undefined)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const moreButtonClickHandler = (event: React.MouseEvent) => {
    if (
      typeof menuPosition !== 'undefined' &&
      Math.abs(menuPosition.x - event.clientX) < 24 &&
      Math.abs(menuPosition.y - event.clientY) < 24 &&
      isMenuOpen
    ) {
      setIsMenuOpen((prevState) => !prevState)
    } else {
      setIsMenuOpen(() => false)
      setMenuPosition(() => ({ x: event.clientX, y: event.clientY }))
      setIsMenuOpen(() => true)
    }

    // console.log(event.clientX, event.clientY)
    // console.log(event)
    //
    // setIsMenuOpen((prevState) => !prevState)
    // setMenuPosition((prevState) => ({ x: event.clientX, y: event.clientY }))
    // console.log(menuPosition)
  }

  const getRow = (columnIdx: number, rowId: string | undefined): void => {
    if (typeof rowId !== 'undefined' && columnIdx === 0) {
      const newRows = fullRows.map((item) => {
        if (item.id === rowId) {
          return { ...item, selected: !item.selected }
        } else return item
      })
      setFullRows(newRows)
    }
  }

  useEffect(() => {
    const getExams = async () => {
      await request.exam.getListOfExams().then((r) => {
        console.log(r.data.rows)
        if (r.data.rows.length > 0) {
          const obj: TestTableColumns[] = r.data.rows.map((item: IExams) => {
            const row: TestTableColumns = {
              id: item._id,
              selected: false,
              listener: `${item.student.middlename} ${item.student.firstname} ${item.student.lastname}`,
              proctor: getProctorName(item.async, item.inspector, item.expert),
              exam: <TwoRowCell firstRow={item.subject} secondRow={item.assignment} />,
              type: <TypeBadge async={item.async} />,
              start: <TwoRowCell firstRow={item.startDate} secondRow={item.endDate} />,
              status: <StatusBadge status={badgePropStatus[getExamStatus(item)]} />,
              check: null,
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
              more: (
                <Button
                  size='xs'
                  onlyIcon
                  iconRight={IconBento}
                  view='secondary'
                  onClick={moreButtonClickHandler}
                />
              )
            }
            return row
          })

          setFullRows(obj)
        }
      })
    }

    getExams().catch((e) => console.log(e))
  }, [])

  const items: contextMenuItem[] = [
    {
      label: 'Изменить',
      iconLeft: IconEdit
    },
    {
      label: 'Сбросить',
      iconLeft: IconRevert
    },
    {
      label: 'Дублировать',
      iconLeft: IconCopy
    },
    {
      label: 'Удалить',
      iconLeft: IconTrash
    }
  ]

  return (
    <>
      <Table
        getCellWrap={() => 'truncate'}
        stickyHeader={true}
        size='s'
        rows={fullRows}
        columns={columns}
        zebraStriped={'odd'}
        borderBetweenColumns
        borderBetweenRows
        className={cl.table}
        onCellClick={({ columnIdx, rowId }) => {
          getRow(columnIdx, rowId)
        }}
        getAdditionalClassName={({ row }) => {
          if (row.selected) {
            return cl.activeRow
          }
          return ''
        }}
        emptyRowsPlaceholder={<Text>Дата не пришла(</Text>}
      />

      <ContextMenu
        size={'s'}
        items={items}
        isOpen={isMenuOpen}
        getItemLeftIcon={(item) => item.iconLeft}
        position={menuPosition}
        onClickOutside={() => setIsMenuOpen(false)}
      />
    </>
  )
}

export default ExamTable
