import React, { FC, ReactNode } from 'react'
import { onCellClick, Table } from '@consta/uikit/Table'
import cl from './ExamTable.module.scss'
import { columns, tableRow } from './tableRowModel'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { Position } from '@consta/uikit/Popover'
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound'
import { IContextMenuItem } from '../../../../shared/CustomHeader/CustomHeader'

export interface TestTableColumns extends tableRow {
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
  isMenuOpen: boolean
  menuPosition: Position
  onOneCellClick: onCellClick
  closeMenu: () => void
  contextMenuItems: IContextMenuItem[]
  rows: TestTableColumns[]
}

const ExamTable: FC<IExamTableProps> = ({
  rows,
  isMenuOpen,
  menuPosition,
  closeMenu,
  onOneCellClick,
  contextMenuItems
}) => {
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
        onCellClick={onOneCellClick}
        getAdditionalClassName={({ row }) => (row.selected ? cl.activeRow : '')}
        emptyRowsPlaceholder={
          <ResponsesNothingFound
            actions={<></>}
            description={'Попробуйте изменить критерии поиска'}
          />
        }
      />

      <ContextMenu
        size='xs'
        className={cl.contextMenu}
        items={contextMenuItems}
        isOpen={isMenuOpen}
        offset={0}
        getItemLeftIcon={(item) => item.iconLeft}
        position={menuPosition}
        onClickOutside={closeMenu}
      />
    </>
  )
}

export default ExamTable
