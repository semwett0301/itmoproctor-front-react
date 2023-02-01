import React, {FC, useEffect, useState} from 'react'
import cl from './Schedule.module.scss'
import { Layout } from '@consta/uikit/Layout'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconTrash } from '@consta/uikit/IconTrash'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import SharedTable from '../../shared/SharedTable/SharedTable'
import { IScheduleTableModel, scheduleColumns } from './scheduleTableModel'
import { request } from '../../../api/axios/request'
import { IScheduleRow } from '../../../ts/interfaces/IShedule'
import { useTable } from '../../../hooks/tableHooks'
import { ScheduleFilter, TablesEnum } from '../../../config/tablesReducerConfig'
import { useTableRequest } from '../../../hooks/useTableRequest'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import { selectAll } from '../../../utils/selectAll'
import { openModal } from '../../shared/ModalView/ModalView'
import AddEditSchedule from '../modals/AddEditSchedule/AddEditSchedule'
import {IContextMenuItem} from '../../shared/CustomHeader/CustomHeader';

const defaultOptionalButtonsInFilter: IContextMenuItem[] = [
  { label: 'Изменить', iconLeft: IconEdit },
  { label: 'Удалить', iconLeft: IconTrash }
]

const Schedule: FC = () => {
  // filter
  const {
    filter,
    pagination,
    selectedRowsId,
    setSelectedRowsId,
    setFilter,
    setCurrentPage,
    setDisplayedRows,
    dropPagination,
    setTotal
  } = useTable<ScheduleFilter>(TablesEnum.SCHEDULE)

  const [optionalButtonsInFilter, setChosenButtons] = useState<IContextMenuItem[]>(defaultOptionalButtonsInFilter)

  useEffect(() => {
    if (selectedRowsId.length == 0) {
      setChosenButtons([])
    } else {
      setChosenButtons(defaultOptionalButtonsInFilter)
    }
  }, [selectedRowsId])

  // Exams table request
  const { isLoading, rows } = useTableRequest(
    () =>
      request.schedule
        .getSchedules({
          from: filter.date[0].toISOString(),
          to: filter.date[1].toISOString(),
          text: filter.searchQuery,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          setTotal(0)
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            return r.data.rows.map((item: IScheduleRow) => {
              return {
                id: item._id,
                selected: false,
                proctor: {
                  firstname: item.inspector.firstname,
                  middlename: item.inspector.middlename,
                  lastname: item.inspector.lastname,
                  id: item.inspector._id
                },

                beginDate: item.beginDate,
                endDate: item.endDate,
                concurrent: item.concurrent,
                maxExamsBeginnings: item.maxExamsBeginnings,
                more: (
                  <MoreButton
                    items={[
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        onClick: () => openModal(<AddEditSchedule scheduleId={item._id} />)
                      },
                      { label: 'Удалить', iconLeft: IconTrash }
                    ]}
                  />
                )
              }
            })
          } else return []
        }),
    [filter.searchQuery, filter.date],
    [pagination.currentPage, pagination.displayedRows.id],
    dropPagination,
    selectedRowsId,
    setSelectedRowsId
  )

  selectAll(scheduleColumns, rows, selectedRowsId, setSelectedRowsId, pagination)

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
                  <DatePeriodPicker
                    value={filter.date}
                    onChange={(value) => setFilter({ ...filter, date: value })}
                  />
                )
              },
              {
                key: 'search;',
                component: (
                  <SearchField
                    placeholder={'Поиск проктора'}
                    onChange={({ value }) => setFilter({ ...filter, searchQuery: value })}
                    value={filter.searchQuery}
                  />
                ),
                flex: 1
              },
              {
                key: 'btn',
                component: (
                  <FilterButton
                    MenuItems={[
                      {
                        label: 'Добавить',
                        iconLeft: IconAdd,
                        onClick: () => openModal(<AddEditSchedule />)
                      },
                      ...optionalButtonsInFilter
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
          rows={rows}
          columns={scheduleColumns}
          onRowSelect={setSelectedRowsId}
          isLoading={isLoading}
        />
      </Layout>

      <SharedPagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        setDisplayedRows={setDisplayedRows}
      />
    </Layout>
  )
}

export default Schedule
