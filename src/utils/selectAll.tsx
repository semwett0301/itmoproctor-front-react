import { TableColumn } from '@consta/uikit/Table'
import { ITableRow } from '../components/shared/SharedTable/SharedTable'
import { Checkbox } from '@consta/uikit/Checkbox'
import React from 'react'
import { IPagination } from '../ts/interfaces/IPagination'

export function selectAll<T extends ITableRow>(
  columns: TableColumn<T>[],
  rows: T[],
  selectedRowsId: string[],
  setSelectedRowsId: (arr: string[]) => void,
  pagination: IPagination
): void {
  console.log(rows.length)
  console.log(columns[1].title)
  columns[1].title = rows.length ? (
    <Checkbox
      checked={
        selectedRowsId.length > 0 &&
        rows.length > 0 &&
        JSON.stringify(rows.map((i) => i.id)) === JSON.stringify(selectedRowsId)
      }
      onClick={() => {
        if (JSON.stringify(rows.map((i) => i.id)) === JSON.stringify(selectedRowsId)) {
          setSelectedRowsId([])
        } else {
          setSelectedRowsId(Array.from(rows, (r) => r.id))
        }
      }}
    />
  ) : (
    <></>
  )
}
