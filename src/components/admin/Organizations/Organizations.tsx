import React, { FC, useEffect, useLayoutEffect } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconTrash } from '@consta/uikit/IconTrash'
import { IOrganizationsTableModel, organizationsColumn } from './organizationsTableData'
import cl from './Organizations.module.scss'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { useTableRequest } from '../../../hooks/useTableRequest'
import { useTable } from '../../../hooks/tableHooks'
import { OrganizationsFilter, TablesEnum } from '../../../config/tablesReducerConfig'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { closeModal, openModal } from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import { useOrganizations } from '../../../hooks/organizationsHooks'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import { IOrganization } from '../../../ts/interfaces/IOrganizations'

const Organizations: FC = () => {
  const {
    filter,
    setFilter,
    pagination,
    selectedRowsId,
    setCurrentPage,
    setDisplayedRows,
    setSelectedRowsId,
    setTotal,
    dropPagination
  } = useTable<OrganizationsFilter>(TablesEnum.ORGANIZATIONS)

  const { loading, getOrganizations } = useOrganizations()

  useLayoutEffect(() => {
    const current = pagination.currentPage
    if (current < 0) {
      setCurrentPage(current + 1)
    } else {
      setCurrentPage(current - 1)
    }
  }, [loading])

  const { isLoading, rows } = useTableRequest(
    async () => {
      const currentRows: IOrganization[] = await getOrganizations().then((o) =>
        o.filter(
          (r) =>
            !filter.searchQuery ||
            r.fullName?.includes(filter.searchQuery) ||
            r.shortName?.includes(filter.searchQuery) ||
            r.code?.includes(filter.searchQuery)
        )
      )

      const newRows: IOrganizationsTableModel[] = []

      setTotal(currentRows.length)

      for (
        let i = pagination.displayedRows.id * pagination.currentPage;
        i < pagination.displayedRows.id * pagination.currentPage + pagination.displayedRows.id;
        i++
      ) {
        if (currentRows[i]) {
          newRows.push({
            id: currentRows[i]._id,
            selected: false,
            fullName: currentRows[i].fullName,
            shortName: currentRows[i].shortName,
            code: currentRows[i].code,
            more: (
              <MoreButton
                items={[
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
                    iconLeft: IconTrash,
                    onClick: () =>
                      openModal(
                        <DeleteSubmit
                          onSubmit={() => {
                            closeModal()
                          }}
                          onCancel={() => closeModal()}
                        />
                      )
                  }
                ]}
              />
            )
          })
        }
      }

      return newRows
    },
    [filter.searchQuery],
    [pagination.displayedRows, pagination.currentPage],
    dropPagination,
    selectedRowsId
  )

  const setSearchQuery = (query: string | null): void =>
    setFilter({
      ...filter,
      searchQuery: query
    })

  return (
    <Layout direction={'column'} className={cl.organizations}>
      <FilterConstructor
        items={[
          {
            key: '1',
            components: [
              {
                key: 'search;',
                component: (
                  <SearchField
                    placeholder={'Поиск университета'}
                    onChange={({ value }) => setSearchQuery(value)}
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
        <SharedTable<IOrganizationsTableModel>
          className={cl.table}
          rows={rows || isLoading}
          columns={organizationsColumn}
          isLoading={loading}
          onRowSelect={setSelectedRowsId}
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

export default Organizations
