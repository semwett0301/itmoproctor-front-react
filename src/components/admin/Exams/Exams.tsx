import React, { FC, useEffect, useState } from 'react'
import cl from './exams.module.scss'
import { DefaultItem } from '@consta/uikit/Select'
import ExamTable, { TestTableColumns } from './components/ExamTable/ExamTable'
import FilterField, {
  statusComboboxItem,
  statusList,
  typeItem
} from '../../shared/FilterField/FilterField'
import PaginationField, {
  ITotalRowsVariants,
  totalRowsVariants
} from './components/PaginationField/PaginationField'
import { request } from '../../../api/axios/request'
import { IExams } from '../../../ts/interfaces/IExams'
import TwoRowCell from './components/ExamTable/TwoRowCell/TwoRowCell'
import TypeBadge from './components/ExamTable/TypeBadge/TypeBadge'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
import { useOpenTab } from '../Admin'

import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconDocExport } from '@consta/uikit/IconDocExport'
import { IconUpload } from '@consta/uikit/IconUpload'
import { IconTrash } from '@consta/uikit/IconTrash'
import { CellClickType } from '@consta/uikit/Table'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'


export interface IPagination {
  displayedRows: ITotalRowsVariants
  totalRows: number
  currentPage: number
  totalPages: number
}

export interface IFilter {
  date: [Date, Date]
  searchQuery: string | null
  type: typeItem | null
  status: statusComboboxItem[] | null
  organizations: DefaultItem[] | null
}

const Exams: FC = () => {
  const { openTab } = useOpenTab()

  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)

  // filter
  // filterState
  const [filter, setFilter] = useState<IFilter>({
    date: [new Date(), new Date()],
    searchQuery: null,
    type: null,
    status: [statusList[1]],
    organizations: null
  })

  // filter setters

  const setDatePeriod = (value: [Date?, Date?] | null) => {
    const newValue: [Date, Date] = [new Date(), new Date()]
    if (value && value[0]) {
      newValue[0] = value[0]
    }
    if (value && value[1]) {
      newValue[1] = value[1]
    }

    setFilter((prevState) => ({
      ...prevState,
      date: newValue
    }))
  }

  const setSearchQuery = (query: string | null) =>
    setFilter((prevState) => ({
      ...prevState,
      searchQuery: query
    }))

  const setType = (item: typeItem | null) => {
    setFilter((prevState) => ({
      ...prevState,
      type: item
    }))
  }

  const setStatus = (item: statusComboboxItem[] | null) => {
    setFilter((prevState) => ({
      ...prevState,
      status: item
    }))
  }

  const setOrganizations = (item: DefaultItem[] | null) => {
    setFilter((prevState) => ({
      ...prevState,
      organizations: item
    }))
  }

  // pagination
  // paginationState
  const [pagination, setPagination] = useState<IPagination>({
    displayedRows: totalRowsVariants[1],
    currentPage: 1,
    totalPages: 1,
    totalRows: 0
  })

  // pagination setters
  const setDisplayedRows = (value: ITotalRowsVariants | null) => {
    setPagination((prevState) => ({
      ...prevState,
      displayedRows: value || totalRowsVariants[1]
    }))
  }
  const setTotalRows = (value: number) => {
    setPagination((prevState) => ({
      ...prevState,
      totalRows: value
    }))
  }

  const setCurrentPage = (value: number) => {
    console.log(value)
    setPagination((prevState) => ({
      ...prevState,
      currentPage: value
    }))
  }

  const setTotalPages = (value: number) => {
    setPagination((prevState) => ({
      ...prevState,
      totalPages: value
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
      await request.exam
        .getListOfExams({
          from: filter.date[0].toISOString(),
          to: filter.date[1].toISOString(),
          text: filter.searchQuery,
          status: filter.status
            ? filter.status
                .map((item) => badgePropStatus.findIndex((value) => item.id === value))
                .join(',')
            : null,
          reset: null, // false,
          organizations: null,
          myStudents: false,
          async: filter.type ? filter.type.flag : null,
          page: pagination.currentPage,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          setTotalPages(Math.ceil(r.data.total / pagination.displayedRows.id))
          setTotalRows(r.data.total)
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
                more: (
                  <Button
                    size='xs'
                    onlyIcon
                    iconRight={IconBento}
                    view='secondary'
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      const { x, y } = e.currentTarget.getBoundingClientRect()

                      console.log('target', x, y)

                      setTableMenuPosition((prevState) => {
                        console.log('prevState', prevState)
                        if (prevState && x === prevState.x && y === prevState.y) {
                          setIsTableMenuOpen.toogle()
                          console.log('toogle')
                        } else {
                          setIsTableMenuOpen.on()
                          console.log('on')
                          return { x: x, y: y }
                        }
                      })
                    }}
                  />
                )
              }
              return row
            })

            setFullRows(obj)
          } else setFullRows([])
        })
    }

    getExams().catch((e) => console.log(e))
  }, [filter.date, filter.type, filter.status, pagination.displayedRows, pagination.currentPage])
  return (
    <div className={cl.examTableModule}>
      <FilterField
        filter={filter}
        filterHandlers={{
          setDate: setDatePeriod,
          setSearchQuery: setSearchQuery,
          setType: setType,
          setStatus: setStatus,
          setOrganizations: setOrganizations
        }}
        contextMenuItems={[
          { label: 'Добавить', iconLeft: IconAdd },
          { label: 'Изменить', iconLeft: IconEdit },
          { label: 'Сбросить', iconLeft: IconRevert },
          { label: 'Дублировать', iconLeft: IconCopy },
          { label: 'Скачать (csv)', iconLeft: IconDocExport },
          { label: 'Импорт', iconLeft: IconUpload },
          { label: 'Удалить', iconLeft: IconTrash }
        ]}
      />

      <ExamTable
        rows={fullRows}
        contextMenuItems={[
          {
            label: 'Изменить',
            iconLeft: IconEdit
          },
          {
            label: 'Сбросить',
            iconLeft: IconRevert
          },
          {
            label: 'Дублировать',
            iconLeft: IconCopy
          },
          {
            label: 'Удалить',
            iconLeft: IconTrash
          }
        ]}
        isMenuOpen={isTableMenuOpen}
        menuPosition={tableMenuPosition}
        onOneCellClick={function ({
          e,
          type,
          rowId,
          columnIdx,
          ref
        }: {
          e: React.SyntheticEvent<Element, Event>
          type: CellClickType
          columnIdx: number
          ref: React.RefObject<HTMLDivElement>
          rowId?: string | undefined
        }): void {
          console.log(columnIdx)
        }}
        closeMenu={setIsTableMenuOpen.off}
      />

      <PaginationField
        totalRows={pagination.totalRows}
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        displayedRows={pagination.displayedRows}
        setDisplayedRows={setDisplayedRows}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default Exams
