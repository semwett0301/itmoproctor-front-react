import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export function useTableRequest<ROWS>(
  request: () => Promise<ROWS[]>,
  filterArray: unknown[],
  paginationArray: unknown[],
  dropPagination: () => void
): { isLoading: boolean; rows: ROWS[]; setRows: Dispatch<SetStateAction<ROWS[]>> } {
  const [rows, setRows] = useState<ROWS[]>([])
  const [flag, setFlag] = useState<boolean>(false)

  const req = async (): Promise<void> => {
    setFlag(true)
    setRows([])
    const r = await request()
    setRows(r)
    setFlag(false)
  }

  useEffect(() => {
    dropPagination()
    req().catch((e) => console.log(e))
  }, filterArray)

  useEffect(() => {
    req().catch((e) => console.log(e))
  }, paginationArray)

  return { isLoading: flag, rows: rows, setRows: setRows }
}
