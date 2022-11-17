import { TableColumn } from '@consta/uikit/Table'
import { coursesColumns, ICoursesTableModel } from '../components/admin/Courses/coursesTableModel'
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
  columns[1].title = (
    <Checkbox
      checked={
        JSON.stringify(rows.map((i) => i.id)) === JSON.stringify(selectedRowsId) &&
        !!pagination.totalRows
      }
      onClick={() =>
        pagination.displayedRows.id === selectedRowsId.length && !!pagination.totalRows
          ? setSelectedRowsId([])
          : setSelectedRowsId(Array.from(rows, (r) => r.id))
      }
    />
  )
}
