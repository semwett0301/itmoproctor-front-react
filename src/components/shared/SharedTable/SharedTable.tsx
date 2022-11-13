import React, { useEffect } from 'react'
import { Table, TableColumn } from '@consta/uikit/Table'
import cl from './SharedTable.module.scss'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { Position } from '@consta/uikit/Popover'
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound'
import { IContextMenuItem } from '../CustomHeader/CustomHeader'
import { Loader } from '@consta/uikit/Loader'
import { classJoiner } from '../../../utils/styleClassesUtills'
import './SharedTable.module.css'

export interface ITableRow {
  id: string
  selected: boolean
}

interface ISharedTableProps<T extends ITableRow> {
  isLoading?: boolean
  columns: TableColumn<T>[]
  isMenuOpen: boolean
  menuPosition: Position
  closeMenu: () => void
  contextMenuItems: IContextMenuItem[]
  className?: string
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
  className,
  columns,
  isMenuOpen,
  menuPosition,
  closeMenu,
  contextMenuItems,
  isLoading
}: ISharedTableProps<T>): JSX.Element {
  useEffect(() => {
    console.log(selectedRows)
    setRows((prevState) => {
      return prevState.map((row) => {
        row.selected = selectedRows && selectedRows.includes(row.id)
        return row
      })
    })
  }, [selectedRows, setRows])

  return (
    <div className={cl.tableWrapper}>
      <Table
        stickyHeader={true}
        getCellWrap={() => 'truncate'}
        size='s'
        rows={rows}
        columns={columns}
        zebraStriped={'odd'}
        borderBetweenColumns
        borderBetweenRows
        className={className ? classJoiner(cl.table, className) : cl.table}
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
          }
        }}
        getAdditionalClassName={({ row }) => (row.selected ? cl.activeRow : '')}
        emptyRowsPlaceholder={
          isLoading ? (
            <div>
              <Loader size={'m'} className={cl.loader} />
            </div>
          ) : (
            <ResponsesNothingFound
              actions={<></>}
              description={'Попробуйте изменить критерии поиска'}
            />
          )
        }
      />

      <ContextMenu
        size='xs'
        direction={'leftCenter'}
        possibleDirections={['leftCenter']}
        spareDirection={'leftCenter'}
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
