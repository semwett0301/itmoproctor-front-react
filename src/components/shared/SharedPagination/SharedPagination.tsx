import React, { Dispatch, FC, SetStateAction } from 'react'

import PaginationField, {
  ITotalRowsVariants,
  totalRowsVariants
} from './PaginationField/PaginationField'

export interface IPagination {
  displayedRows: ITotalRowsVariants
  currentPage: number
  totalRows: number
  totalPages: number
}

interface ISharedPaginationProps {
  pagination: IPagination
  setPagination: Dispatch<SetStateAction<IPagination>>
}

const SharedPagination: FC<ISharedPaginationProps> = ({ pagination, setPagination }) => {
  // pagination setters
  const setDisplayedRows: (value: ITotalRowsVariants | null) => void = (value) => {
    setPagination((prevState) => ({
      ...prevState,
      displayedRows: value || totalRowsVariants[1]
    }))
  }

  const setCurrentPage: (value: number) => void = (value) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: value
    }))
  }

  return (
    <PaginationField
      totalRows={pagination.totalRows}
      page={pagination.currentPage}
      totalPages={pagination.totalPages}
      displayedRows={pagination.displayedRows}
      setDisplayedRows={setDisplayedRows}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default SharedPagination
