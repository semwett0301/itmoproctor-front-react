import React, { FC, useEffect, useState } from 'react'
import cl from './Schedule.module.scss'
import { Layout } from '@consta/uikit/Layout'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconTrash } from '@consta/uikit/IconTrash'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import { usePagination } from '../../../hooks/paginationHooks'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import SharedTable from '../../shared/SharedTable/SharedTable'
import { IconAllDone } from '@consta/uikit/IconAllDone'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'
import { IScheduleTableModel, scheduleColumns } from './scheduleTableModel'
import { request } from '../../../api/axios/request'
import { getFullName } from '../../../utils/nameHelper'
import { Button } from '@consta/uikit/Button'
import { IconBento } from '@consta/uikit/IconBento'
import { IScheduleRow } from '../../../ts/interfaces/IShedule'

// TYPES
interface IFilter {
  date: [Date, Date]
  searchQuery: string | null
}

const Schedule: FC = () => {
  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)

  // Exams table
  const [fullRows, setFullRows] = useState<IScheduleTableModel[]>([])
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  // filter
  // filterState
  const [{ date, searchQuery }, setFilter] = useState<IFilter>({
    date: [new Date(), new Date()],
    searchQuery: null
  })

  // filter setters

  const setDatePeriod = (value: [Date?, Date?] | null): void => {
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

  const setSearchQuery = (query: string | null): void =>
    setFilter((prevState) => ({
      ...prevState,
      searchQuery: query
    }))

  // Schedule table request
  useEffect(() => {
    const getSchedule = async (): Promise<void> => {
      await request.schedule
        .getSchedule({
          from: date[0].toISOString(),
          to: date[1].toISOString(),
          text: searchQuery,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          console.log(r)
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            const obj: IScheduleTableModel[] = r.data.rows.map((item: IScheduleRow) => {
              return {
                id: item._id,
                selected: false,
                proctor: getFullName(
                  item.inspector.firstname,
                  item.inspector.middlename,
                  item.inspector.lastname
                ),
                beginDate: item.beginDate,
                endDate: item.endDate,
                concurrent: item.concurrent,
                maxExamsBeginnings: item.maxExamsBeginnings,
                more: (
                  <Button
                    size='xs'
                    onlyIcon
                    iconRight={IconBento}
                    view='secondary'
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      const { x, y } = e.currentTarget.getBoundingClientRect()
                      setTableMenuPosition((prevState) => {
                        if (prevState && x === prevState.x && y === prevState.y) {
                          setIsTableMenuOpen.toogle()
                        } else {
                          setIsTableMenuOpen.on()
                          return { x: x, y: y }
                        }
                      })
                    }}
                  />
                )
              }
            })

            setFullRows(obj)
          } else setFullRows([])
        })
    }
    getSchedule().catch((e) => console.log(e))
  }, [searchQuery, date, pagination.currentPage, pagination.displayedRows.id])
  return (
    <Layout direction={'column'} className={cl.schedule}>
      <FilterConstructor
        items={[
          {
            key: '1',
            components: [
              {
                key: 'date',
                component: (
                  <DatePeriodPicker value={date} onChange={({ value }) => setDatePeriod(value)} />
                )
              },
              {
                key: 'search;',
                component: (
                  <SearchField
                    placeholder={'Поиск по экзамену'}
                    onChange={({ value }) => setSearchQuery(value)}
                    value={searchQuery}
                  />
                ),
                flex: 1
              },
              {
                key: 'btn',
                component: (
                  <FilterButton
                    MenuItems={[
                      { label: 'Добавить', iconLeft: IconAdd },
                      { label: 'Изменить', iconLeft: IconEdit },
                      { label: 'Удалить', iconLeft: IconTrash }
                    ]}
                  />
                )
              }
            ]
          }
        ]}
      />

      <Layout flex={1} className={cl.tableLayout}>
        <SharedTable<IScheduleTableModel>
          className={cl.table}
          rows={fullRows}
          setRows={setFullRows}
          columns={scheduleColumns}
          contextMenuItems={[
            { label: 'Изменить', iconLeft: IconEdit },
            { label: 'Удалить', iconLeft: IconTrash }
          ]}
          isMenuOpen={isTableMenuOpen}
          menuPosition={tableMenuPosition}
          closeMenu={setIsTableMenuOpen.off}
          selectedRows={selectedRowsId}
          setSelectedRows={setSelectedRowsId}
        />
      </Layout>

      <SharedPagination pagination={pagination} setPagination={setPagination} />
    </Layout>
  )
}

export default Schedule
