import React, {Dispatch, FC, SetStateAction} from 'react'

import PaginationField, {ITotalRowsVariants, totalRowsVariants} from './PaginationField/PaginationField'

export interface IPagination {
  displayedRows: ITotalRowsVariants
  currentPage: number
  totalRows: number
  totalPages: number
}

interface ISharedPaginationProps {
  pagination: IPagination
  setPagination: (currentPage: number) => void
  setDisplayedRows: (displayedRows: ITotalRowsVariants) => void
}

const SharedPagination: FC<ISharedPaginationProps> = (props) => {
  // pagination setters
  const setDisplayedRows: (value: ITotalRowsVariants | null) => void = (value) => {
    props.setDisplayedRows(value || totalRowsVariants[1])
  }

  const setCurrentPage: (value: number) => void = (value) => {
    props.setPagination(value)
  }

  return (
    <PaginationField
      totalRows={props.pagination.totalRows}
      page={props.pagination.currentPage}
      totalPages={props.pagination.totalPages}
      displayedRows={props.pagination.displayedRows}
      setDisplayedRows={setDisplayedRows}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default SharedPagination
