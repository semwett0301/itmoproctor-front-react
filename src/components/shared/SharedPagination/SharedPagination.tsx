import React, { FC } from 'react'

import PaginationField, {
  ITotalRowsVariants,
  totalRowsVariants
} from './PaginationField/PaginationField'
import { IPagination } from '../../../ts/interfaces/IPagination'

interface ISharedPaginationProps {
  pagination: IPagination
  setCurrentPage: (currentPage: number) => void
  setDisplayedRows: (displayedRows: ITotalRowsVariants) => void
}

const SharedPagination: FC<ISharedPaginationProps> = (props) => {
  // pagination setters
  const setDisplayedRows: (value: ITotalRowsVariants | null) => void = (value) => {
    props.setDisplayedRows(value || totalRowsVariants[1])
  }

  const setCurrentPage: (value: number) => void = (value) => {
    props.setCurrentPage(value)
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
