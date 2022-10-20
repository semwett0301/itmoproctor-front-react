import React, { FC, ReactNode, useState } from 'react'
import { Table } from '@consta/uikit/Table'
import cl from './ExamTable.module.scss'
import { Text } from '@consta/uikit/Text'
import { columns } from './tableRowModel'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconEdit } from '@consta/uikit/IconEdit'
import { contextMenuItem } from '../../../../shared/CustomHeader/CustomHeader'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconTrash } from '@consta/uikit/IconTrash'
import { Position } from '@consta/uikit/Popover'
import { useFlag } from '@consta/uikit/useFlag'

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

interface IExamTableProps {
  rows: TestTableColumns[]
}

const ExamTable: FC<IExamTableProps> = ({ rows }) => {
  const [selectedRow, setSelectedRow] = useState<string>()
  const [menuPosition, setMenuPosition] = useState<Position>(undefined)
  const [isMenuOpen, setIsMenuOpen] = useFlag(false)

  return (
    <>
      <Table
        getCellWrap={() => 'truncate'}
        stickyHeader={true}
        size='s'
        rows={rows}
        columns={columns}
        zebraStriped={'odd'}
        borderBetweenColumns
        borderBetweenRows
        className={cl.table}
        onCellClick={({ columnIdx, rowId }) => {
          console.log(columnIdx)
          // getRow(columnIdx, rowId)
        }}
        getAdditionalClassName={({ row }) => (row.selected ? cl.activeRow : '')}
        emptyRowsPlaceholder={<Text>Дата не пришла(</Text>}
      />

      <ContextMenu
        size='xs'
        className={cl.contextMenu}
        items={items}
        isOpen={isMenuOpen}
        getItemLeftIcon={(item) => item.iconLeft}
        position={menuPosition}
        onClickOutside={setIsMenuOpen.off}
      />
    </>
  )
}

export default ExamTable
