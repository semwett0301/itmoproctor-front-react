import React, { FC } from 'react'
import cl from './PaginationField.module.scss'
import { Select } from '@consta/uikit/Select'
import { Text } from '@consta/uikit/Text'
import { Pagination } from '@consta/uikit/Pagination'

export interface ITotalRowsVariants {
  label: string
  id: number
}

export const totalRowsVariants: ITotalRowsVariants[] = [
  {
    label: '5',
    id: 5
  },
  {
    label: '10',
    id: 10
  },
  {
    label: '15',
    id: 15
  },
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
  totalRows: ITotalRowsVariants | null
  setTotalRows: (value: ITotalRowsVariants | null) => void
  setCurrentPage: (item: number) => void
}

const PaginationField: FC<IPaginationProp> = ({
  page,
  totalPages,
  totalRows,
  setTotalRows,
  setCurrentPage
}) => {
  return (
    <div className={cl.pagination}>
      <Select
        size={'xs'}
        items={totalRowsVariants}
        value={totalRows}
        onChange={({ value }) => setTotalRows(value)}
        className={cl.countRowsSelect}
      />

      <Pagination
        size={'s'}
        currentPage={page}
        totalPages={page}
        onChange={(item) => setCurrentPage(item)}
        className={cl.minLayout}
        hotkeys={hotKeys}
      />

      <Text size={'2xs'} view={'secondary'} className={cl.footerText}>
        Показ с {totalRows ? page * totalRows.id - totalRows.id + 1 : 0} по{' '}
        {totalRows ? page * totalRows.id : 0} из {totalRows ? totalPages * totalRows.id : 0} записей
      </Text>
    </div>
  )
}

export default PaginationField
