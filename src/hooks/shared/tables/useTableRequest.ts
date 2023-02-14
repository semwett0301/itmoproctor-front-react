import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import { ITotalRowsVariants } from '../../../components/shared/SharedPagination/PaginationField/PaginationField'

export function useTableRequest<ROWS extends { id: string }>(
  request: () => Promise<ROWS[]>,
  filterArray: unknown[],
  paginationArray: [ITotalRowsVariants, number],
  dropPagination: () => void,
  selectedRowsId: string[],
  setSelectedRowsId: (rowId: string | string[]) => void
): {
  isLoading: boolean
  rows: ROWS[]
  setRows: Dispatch<SetStateAction<ROWS[]>>
  update: () => Promise<ROWS[]>
  isRowsFinished: null | boolean
} {
  const [rows, setRows] = useState<ROWS[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isRowsFinished, setIsRowsFinished] = useState<boolean | null>(null)

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

    if (paginationArray[1] !== 0 && newRows.length === 0) {
      setIsRowsFinished(true)
    } else {
      setIsRowsFinished(null)
    }

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
    update()
      .catch((e) => console.log(e))
      .finally(() => setIsFirst(false))
  }, [])

  useEffect(() => {
    if (!isFirst) {
      dropPagination()
      setSelectedRowsId([])
      update().catch((e) => console.log(e))
    }
  }, filterArray)

  useEffect(() => {
    if (!isFirst) {
      setSelectedRowsId([])
      update().catch((e) => console.log(e))
    }
  }, paginationArray)

  return { isLoading, rows, setRows, update, isRowsFinished }
}
