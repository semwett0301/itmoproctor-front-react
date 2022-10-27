import React, { useEffect } from 'react'
import { Table, TableColumn } from '@consta/uikit/Table'
import cl from './SharedTable.module.scss'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { Position } from '@consta/uikit/Popover'
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound'
import { IContextMenuItem } from '../CustomHeader/CustomHeader'

export interface ITableRow {
  id: string
  selected: boolean
}

interface ISharedTableProps<T extends ITableRow> {
  columns: TableColumn<T>[]
  isMenuOpen: boolean
  menuPosition: Position
  closeMenu: () => void
  contextMenuItems: IContextMenuItem[]

  rows: T[]
  setRows: React.Dispatch<React.SetStateAction<T[]>>
  selectedRows: string[]
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>
}

function SharedTable<T extends ITableRow = ITableRow>({
  rows,
  setRows,
  selectedRows,
  setSelectedRows,

  columns,
  isMenuOpen,
  menuPosition,
  closeMenu,
  contextMenuItems
}: ISharedTableProps<T>): JSX.Element {
  useEffect(() => {
    console.log('effect')
    setRows((prevState) => {
      return prevState.map((row) => {
        row.selected = selectedRows && selectedRows.includes(row.id)
        return row
      })
    })
  }, [selectedRows])

  return (
    <div className={cl.tableWrapper}>
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
        onCellClick={({ rowId, columnIdx }) => {
          if (columnIdx === 0) {
            if (rowId) {
              setSelectedRows((prevState) => {
                if (selectedRows.includes(rowId)) {
                  const newState = prevState.filter((item) => item != rowId)
                  return [...newState]
                } else {
                  return [...prevState, rowId]
                }
              })
            }

            // toggleSelected(rowId)
          }
        }}
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
    </div>
  )
}

export default SharedTable
