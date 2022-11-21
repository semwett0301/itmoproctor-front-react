import React, { FC } from 'react'
import cl from './Maintenance.module.scss'
import { Layout } from '@consta/uikit/Layout'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconTrash } from '@consta/uikit/IconTrash'
import { Button } from '@consta/uikit/Button'
import { IconRestart } from '@consta/uikit/IconRestart'
import { request } from '../../../api/axios/request'
import { IMaintenanceTableModel, maintenanceColumns } from './maintenanceTableModel'
import { IMaintenanceRow } from '../../../ts/interfaces/IMaintenance'
import { useTable } from '../../../hooks/tableHooks'
import { MaintenanceFilter, TablesEnum } from '../../../config/tablesReducerConfig'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import { closeModal, openModal } from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import { useTableRequest } from '../../../hooks/useTableRequest'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import { selectAll } from '../../../utils/selectAll'

const Maintenance: FC = () => {
  const {
    pagination,
    setCurrentPage,
    setDisplayedRows,
    setTotal,
    selectedRowsId,
    filter,
    setSelectedRowsId,
    setFilter,
    dropPagination
  } = useTable<MaintenanceFilter>(TablesEnum.MAINTENANCE)

  // Exams table request
  const { isLoading, rows, update } = useTableRequest(
    () =>
      request.maintenance
        .getMaintenance({
          from: filter.date[0].toISOString(),
          to: filter.date[1].toISOString(),
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r): IMaintenanceTableModel[] => {
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            return r.data.rows.map((row: IMaintenanceRow) => {
              return {
                id: row._id,
                selected: false,
                beginDate: row.beginDate,
                endDate: row.endDate,
                created: row.created,
                active: row.active,
                more: (
                  <MoreButton
                    items={[
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        onClick: () =>
                          openModal(
                            <DeleteSubmit
                              onSubmit={() => {
                                closeModal()
                                console.log(row._id)
                              }}
                              onCancel={() => closeModal()}
                            />
                          )
                      }
                    ]}
                  />
                )
              }
            })
          } else return []
        }),
    [filter.date[0], filter.date[1]],
    [pagination.displayedRows, pagination.currentPage],
    dropPagination,
    selectedRowsId,
    setSelectedRowsId
  )

  selectAll(maintenanceColumns, rows, selectedRowsId, setSelectedRowsId, pagination)

  return (
    <Layout direction={'column'} className={cl.maintenance}>
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
                    onChange={(value) => setFilter({ date: value })}
                  />
                )
              },
              {
                key: 'gap;',
                component: <></>,
                flex: 1
              },
              {
                key: 'reload_btn',
                component: (
                  <Button
                    onlyIcon={true}
                    iconLeft={IconRestart}
                    size={'s'}
                    view={'secondary'}
                    onClick={() => {
                      setSelectedRowsId([])
                      update().catch((e) => console.log(e))
                    }}
                  />
                )
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
      <Layout flex={1}>
        <SharedTable
          className={cl.table}
          rows={rows}
          columns={maintenanceColumns}
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

export default Maintenance
