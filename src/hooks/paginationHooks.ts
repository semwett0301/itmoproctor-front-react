import { Dispatch, SetStateAction, useState } from 'react'
import { totalRowsVariants } from '../components/shared/SharedPagination/PaginationField/PaginationField'
import { IPagination } from '../ts/interfaces/IPagination'

export const usePagination: () => [
  IPagination,
  Dispatch<SetStateAction<IPagination>>,
  (total: number) => void
] = () => {
  const [pagination, setPagination] = useState<IPagination>({
    displayedRows: totalRowsVariants[1],
    currentPage: 0,
    totalPages: 0,
    totalRows: 0
  })

  const setTotalRows: (value: number) => void = (value) => {
    setPagination((prevState) => ({
      ...prevState,
      totalRows: value
    }))
  }

  const setTotalPages: (value: number) => void = (value) => {
    setPagination((prevState) => ({
      ...prevState,
      totalPages: value
    }))
  }

  const setTotal: (total: number) => void = (total) => {
    setTotalRows(total)
    setTotalPages(Math.ceil(total / pagination.displayedRows.id))
  }

  return [pagination, setPagination, setTotal]
}
