import React, { FC, useEffect, useState } from 'react'
import cl from './exams.module.scss'
import { DefaultItem } from '@consta/uikit/Select'
import ExamTable, { TestTableColumns } from './components/ExamTable/ExamTable'
import FilterField, { statusComboboxItem, statusList } from '../../shared/FilterField/FilterField'
import PaginationField, {
  ITotalRowsVariants,
  totalRowsVariants
} from './components/PaginationField/PaginationField'
import { request } from '../../../api/axios/request'
import { IExams } from '../../../ts/interfaces/IExams'
import StatusBadge, {
  badgePropStatus,
  getExamStatus,
  getProctorName
} from './components/ExamTable/StatusBadge/StatusBadge'
import TwoRowCell from './components/ExamTable/TwoRowCell/TwoRowCell'
import TypeBadge from './components/ExamTable/TypeBadge/TypeBadge'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
import { useOpenTab } from '../Admin'

interface ExamsProps {
  openTab: () => void
}

export interface IPagination {
  totalRows: ITotalRowsVariants | null
  currentPage: number
  totalPages: number
}

export interface IFilter {
  date: [Date?, Date?] | null
  searchQuery: string | null
  type: DefaultItem | null
  status: statusComboboxItem[] | null
  organizations: DefaultItem[] | null
}

export interface IFilterAndPagination {
  pagination: IPagination
  filter: IFilter
}

const Exams: FC = () => {
  const { openTab } = useOpenTab()

  const [filterAndPagination, setFilterAndPagination] = useState<IFilterAndPagination>({
    filter: {
      date: [new Date(), new Date()],
      searchQuery: null,
      type: null,
      status: [statusList[1]],
      organizations: null
    },
    pagination: {
      totalRows: totalRowsVariants[1],
      currentPage: 1,
      totalPages: 1
    }
  })

  // filter set functions

  const setDatePeriod = (value: [Date?, Date?] | null) => {
    setFilterAndPagination((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        date: value
      }
    }))
  }

  // pagination set functions
  const setTotalRows = (value: ITotalRowsVariants | null) => {
    setFilterAndPagination((prevState) => ({
      ...prevState,
      pagination: { ...prevState.pagination, totalRows: value }
    }))
  }

  const setCurrentPage = (value: number) => {
    setFilterAndPagination((prevState) => ({
      ...prevState,
      pagination: { ...prevState.pagination, currentPage: value }
    }))
  }

  // Exams table request
  const [fullRows, setFullRows] = useState<TestTableColumns[]>([])
  // const moreButtonClickHandler = (event: React.MouseEvent) => {
  //   setMenuPosition((prevState) => {
  //     console.log(prevState)
  //     return { x: event.clientX, y: event.clientY }
  //   })
  // }

  const getRow = (columnIdx: number, rowId: string | undefined): void => {
    if (typeof rowId !== 'undefined' && columnIdx === 0) {
      const newRows = fullRows.map((item) => {
        if (item.id === rowId) {
          return { ...item, selected: !item.selected }
        } else return item
      })
      setFullRows(newRows)
    }
  }

  useEffect(() => {
    const getExams = async (): Promise<void> => {
      await request.exam.getListOfExams().then((r) => {
        console.log(r.data.rows)
        if (r.data.rows.length > 0) {
          const obj: TestTableColumns[] = r.data.rows.map((item: IExams) => {
            const row: TestTableColumns = {
              id: item._id,
              selected: false,
              listener: `${item.student.middlename} ${item.student.firstname} ${item.student.lastname}`,
              proctor: getProctorName(item.async, item.inspector, item.expert),
              exam: <TwoRowCell firstRow={item.subject} secondRow={item.assignment} />,
              type: <TypeBadge async={item.async} />,
              start: <TwoRowCell firstRow={item.startDate} secondRow={item.endDate} />,
              status: <StatusBadge status={badgePropStatus[getExamStatus(item)]} />,
              check: null,
              video: (
                <Button
                  size='xs'
                  onlyIcon
                  iconRight={IconVideo}
                  onClick={() =>
                    openTab({
                      id: item._id,
                      title: item._id,
                      path: `exam/${item._id}`,
                      type: 'exam'
                    })
                  }
                />
              ),
              more: <Button size='xs' onlyIcon iconRight={IconBento} view='secondary' />
            }
            return row
          })

          setFullRows(obj)
        }
      })
    }

    getExams().catch((e) => console.log(e))
  }, [filterAndPagination.filter.date])
  return (
    <div className={cl.examTableModule}>
      <FilterField
        filter={filterAndPagination.filter}
        filterHandlers={{ datePicker: setDatePeriod }}
      />

      <ExamTable rows={fullRows} />

      <PaginationField
        page={filterAndPagination.pagination.currentPage}
        totalPages={filterAndPagination.pagination.totalPages}
        totalRows={filterAndPagination.pagination.totalRows}
        setTotalRows={setTotalRows}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Exams
