import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ITableRow } from '../components/shared/SharedTable/SharedTable'
import { Simulate } from 'react-dom/test-utils'
import select = Simulate.select

export function useTableRequest<ROWS extends ITableRow>(
  request: () => Promise<ROWS[]>,
  filterArray: unknown[],
  paginationArray: unknown[],
  dropPagination: () => void,
  selectedRowsId: string[]
): {
  isLoading: boolean
  rows: ROWS[]
  setRows: Dispatch<SetStateAction<ROWS[]>>
  update: () => Promise<void>
} {
  const [rows, setRows] = useState<ROWS[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const update = async (): Promise<void> => {
    setIsLoading(true)
    setRows([])
    const r = await request()
    setRows(r)
    setIsLoading(false)
  }

  useEffect(() => {
    setRows((prevState) =>
      prevState.map((item) =>
        selectedRowsId.includes(item.id)
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }, [rows.length, selectedRowsId.length])

  useEffect(() => {
    dropPagination()
    update().catch((e) => console.log(e))
  }, filterArray)

  useEffect(() => {
    update().catch((e) => console.log(e))
  }, paginationArray)

  return { isLoading, rows, setRows, update }
}
