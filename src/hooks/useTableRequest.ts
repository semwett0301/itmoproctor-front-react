import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ITableRow } from '../components/shared/SharedTable/SharedTable'

export function useTableRequest<ROWS extends ITableRow>(
  request: () => Promise<ROWS[]>,
  filterArray: unknown[],
  paginationArray: unknown[],
  dropPagination: () => void,
  selectedRowsId: string[],
  setSelectedRowsId: (rowId: string | string[]) => void
): {
  isLoading: boolean
  rows: ROWS[]
  setRows: Dispatch<SetStateAction<ROWS[]>>
  update: () => Promise<ROWS[]>
} {
  const [rows, setRows] = useState<ROWS[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isFirst, setIsFirst] = useState<boolean>(true)

  const updateSelected = (): void =>
    setRows((prevState) =>
      prevState.map((item) =>
        selectedRowsId.includes(item.id)
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )

  const update = async (): Promise<ROWS[]> => {
    setIsLoading(true)
    setRows(() => [])
    const r = await request()
    setRows(r)
    updateSelected()
    setIsLoading(false)
    return r
  }

  useEffect(() => {
    setRows((prevState) =>
      prevState.map((item) =>
        selectedRowsId.includes(item.id)
          ? { ...item, selected: true }
          : { ...item, selected: false }
      )
    )
  }, [JSON.stringify(rows), JSON.stringify(selectedRowsId.length)])

  useEffect(() => {
    if (!isFirst) {
      console.log(isFirst)
      dropPagination()
      setSelectedRowsId([])
    } else {
      setIsFirst(false)
    }
    update().catch((e) => console.log(e))
  }, filterArray)

  useEffect(() => {
    if (!isFirst) {
      setSelectedRowsId([])
    } else {
      setIsFirst(false)
    }
    update().catch((e) => console.log(e))
  }, paginationArray)

  return { isLoading, rows, setRows, update }
}
