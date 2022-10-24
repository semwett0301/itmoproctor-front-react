import {IPagination} from '../components/shared/SharedPagination/SharedPagination';
import {Dispatch, SetStateAction, useState} from 'react';
import {totalRowsVariants} from '../components/shared/SharedPagination/PaginationField/PaginationField';

export const usePagination: () => [IPagination, Dispatch<SetStateAction<IPagination>>, (total: number) => void] = () => {
  const [pagination, setPagination] = useState<IPagination>({
    displayedRows: totalRowsVariants[1],
    currentPage: 1,
    totalPages: 1,
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
    setTotalPages(total)
  }

  return [pagination, setPagination, setTotal]
}
