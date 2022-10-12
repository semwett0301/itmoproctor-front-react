import React, { FC, useState } from 'react'
import cl from './exams.module.scss'
import { Pagination } from '@consta/uikit/Pagination'
import FilterField from './components/FilterField/FilterField'
import { useOutletContext } from 'react-router-dom'
import { DefaultItem, Select } from '@consta/uikit/Select'
import { Text } from '@consta/uikit/Text'
import ExamTable from './components/ExamTable/ExamTable'

interface ExamsProps {
  openTab: () => void
}

const Exams: FC = () => {
  const context = useOutletContext<ExamsProps>()

  const amountOfRowsVariants: DefaultItem[] = [
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

  const [amountOfRows, setAmountOsRows] = useState<DefaultItem | null>(amountOfRowsVariants[1])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const countOfPages = 20

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

  return (
    <div className={cl.examTableModule}>
      <FilterField />

      <div className={cl.examTable}>
        <ExamTable onVideoBtnClick={context.openTab} />
      </div>

      <div className={cl.pagination}>
        <Select
          size={'xs'}
          items={amountOfRowsVariants}
          value={amountOfRows}
          onChange={({ value }) => setAmountOsRows(value)}
          className={cl.countRowsSelect}
        />
        <Pagination
          size={'s'}
          currentPage={currentPage}
          totalPages={countOfPages}
          onChange={(item) => setCurrentPage(item)}
          className={cl.minLayout}
          hotkeys={hotKeys}
        />
        <Text size={'2xs'} view={'secondary'} className={cl.footerText}>
          Показ с 1 по 5 из 15 страниц
        </Text>
      </div>
    </div>
  )
}

export default Exams
