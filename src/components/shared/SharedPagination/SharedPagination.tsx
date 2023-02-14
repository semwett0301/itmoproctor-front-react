import React, { FC, useEffect } from 'react'

import PaginationField, {ITotalRowsVariants, totalRowsVariants} from './PaginationField/PaginationField'
import {IPagination} from '../../../ts/interfaces/IPagination'

interface ISharedPaginationProps {
  pagination: IPagination
  setCurrentPage: (currentPage: number) => void
  setDisplayedRows: (displayedRows: ITotalRowsVariants) => void
  isRowsFinished: boolean | null
}

const SharedPagination: FC<ISharedPaginationProps> = (props) => {
  // pagination setters
  const setDisplayedRows: (value: ITotalRowsVariants | null) => void = (value) => {
    props.setDisplayedRows(value || totalRowsVariants[1])
  }

  const setCurrentPage: (value: number) => void = (value) => {
    if (props.isRowsFinished !== null) {
      if (props.isRowsFinished) {
        props.setCurrentPage(value - 1)
      } else {
        props.setCurrentPage(value + 1)
      }
    } else {
      props.setCurrentPage(value)
    }
  }

  useEffect(() => {
    props.isRowsFinished !== null && setCurrentPage(props.pagination.currentPage)
  }, [props.isRowsFinished])

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
