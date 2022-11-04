import React, {FC} from 'react'
import cl from './PaginationField.module.scss'
import {Select} from '@consta/uikit/Select'
import {Text} from '@consta/uikit/Text'
import {Pagination} from '@consta/uikit/Pagination'

export interface ITotalRowsVariants {
  label: string
  id: number
}

export const totalRowsVariants: ITotalRowsVariants[] = [
  {
    label: '50',
    id: 50
  },
  {
    label: '100',
    id: 100
  },
  {
    label: '250',
    id: 250
  },
  {
    label: '500',
    id: 500
  },
  {
    label: '1000',
    id: 1000
  },
  {
    label: '10000',
    id: 10000
  }
]

const hotKeys = {
  prevPage: {
    label: '',
    values: ['Shift', 'ArrowLeft']
  },
  nextPage: {
    label: '',
    values: ['Shift', 'ArrowRight']
  }
}

interface IPaginationProp {
  page: number
  totalPages: number
  totalRows: number
  displayedRows: ITotalRowsVariants
  setDisplayedRows: (value: ITotalRowsVariants | null) => void
  setCurrentPage: (item: number) => void
}

const PaginationField: FC<IPaginationProp> = ({
  page,
  totalPages,
  totalRows,
  displayedRows,
  setDisplayedRows,
  setCurrentPage
}) => {
  const startRow: number = totalRows ? page * displayedRows.id + 1 : 0,
    endRow: number =
      totalPages - 1 === page || !totalPages ? totalRows : (page + 1) * displayedRows.id - 1
  return (
    <div className={cl.pagination}>
      <Select
        size={'xs'}
        items={totalRowsVariants}
        value={displayedRows}
        onChange={({ value }) => setDisplayedRows(value)}
        className={cl.countRowsSelect}
      />

      <Pagination
        size={'s'}
        currentPage={page}
        totalPages={totalPages}
        onChange={(item) => {
          setCurrentPage(item)
        }}
        className={cl.minLayout}
        hotkeys={hotKeys}
      />

      <Text size={'2xs'} view={'secondary'} className={cl.footerText}>
        Показано с {startRow} по {endRow} из {totalRows}
      </Text>
    </div>
  )
}

export default PaginationField
