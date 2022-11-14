import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ITableRow } from '../components/shared/SharedTable/SharedTable'

export function useTableRequest<ROWS extends ITableRow>(
  request: () => Promise<ROWS[]>,
  filterArray: unknown[],
  paginationArray: unknown[],
  dropPagination: () => void
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
    dropPagination()
    update().catch((e) => console.log(e))
  }, filterArray)

  useEffect(() => {
    update().catch((e) => console.log(e))
  }, paginationArray)

  return { isLoading, rows, setRows, update }
}
