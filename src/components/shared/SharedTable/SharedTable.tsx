import React from 'react'
import { Table, TableColumn } from '@consta/uikit/Table'
import cl from './SharedTable.module.scss'
import { ResponsesNothingFound } from '@consta/uikit/ResponsesNothingFound'
import { Loader } from '@consta/uikit/Loader'
import { classJoiner } from '../../../utils/styleClassesUtills'

export interface ITableRow {
  id: string
  selected: boolean
}

interface ISharedTableProps<T extends ITableRow> {
  rows: T[]
  onRowSelect: (rowId: string) => void
  columns: TableColumn<T>[]
  isLoading: boolean
  className: string
  // onSortByProps?: onSortBy<T>
  // sortingFunction?: (rows: T[]) => T[]
}

function SharedTable<T extends ITableRow>({
  rows,
  onRowSelect,
  columns,
  isLoading,
  className
}: // onSortByProps,
// sortingFunction
ISharedTableProps<T>): JSX.Element {
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
              onRowSelect(rowId)
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
        // onSortBy={onSortByProps}
      />
    </div>
  )
}

export default SharedTable
