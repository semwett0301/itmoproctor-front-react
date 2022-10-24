import React from 'react'
import {onCellClick, Table, TableColumn} from '@consta/uikit/Table'
import cl from '../../admin/Exams/components/ExamTable/ExamTable.module.scss'
import {ContextMenu} from '@consta/uikit/ContextMenu'
import {Position} from '@consta/uikit/Popover'
import {ResponsesNothingFound} from '@consta/uikit/ResponsesNothingFound'
import {contextMenuItem} from '../CustomHeader/CustomHeader'

export interface ITableRow {
  id: string,
  selected: boolean
}

interface ISharedTableProps<T extends ITableRow> {
  rows: T[],
  columns: TableColumn<T>[]
  isMenuOpen: boolean
  menuPosition: Position
  onOneCellClick: onCellClick
  closeMenu: () => void
  contextMenuItems: contextMenuItem[]
}

function SharedTable<T extends ITableRow = ITableRow>({
  rows,
  columns,
  isMenuOpen,
  menuPosition,
  closeMenu,
  onOneCellClick,
  contextMenuItems
}: ISharedTableProps<T>): JSX.Element {
  return (
    <>
      <Table
        getCellWrap={() => 'truncate'}
        stickyHeader={true}
        size="s"
        rows={rows}
        columns={columns}
        zebraStriped={'odd'}
        borderBetweenColumns
        borderBetweenRows
        className={cl.table}
        onCellClick={onOneCellClick}
        getAdditionalClassName={({row}) => (row.selected ? cl.activeRow : '')}
        emptyRowsPlaceholder={
          <ResponsesNothingFound
            actions={<></>}
            description={'Попробуйте изменить критерии поиска'}
          />
        }
      />

      <ContextMenu
        size="xs"
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

export default SharedTable
