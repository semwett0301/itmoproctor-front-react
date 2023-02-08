import {Dispatch, SetStateAction, useEffect, useState} from 'react'

export function useTableRequest<ROWS extends { id: string }>(
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

  const updateSelected = (deselectedRows: ROWS[]): ROWS[] => {
    const newSelected: string[] = []

    const newRows = deselectedRows.map((item) => {
      if (selectedRowsId.includes(item.id)) {
        return { ...item, selected: true }
      }
      return { ...item, selected: false }
    })

    for (const row of newRows) {
      if (selectedRowsId.includes(row.id)) newSelected.push(row.id)
    }

    setSelectedRowsId(newSelected)

    return newRows
  }

  const update = async (): Promise<ROWS[]> => {
    setIsLoading(true)
    setRows(() => [])
    const r = await request()
    const newRows = updateSelected(r)
    setRows(newRows)
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
