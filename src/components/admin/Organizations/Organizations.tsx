import React, {FC, useLayoutEffect} from 'react'
import {Layout} from '@consta/uikit/Layout'
import {IconEdit} from '@consta/uikit/IconEdit'
import {IconTrash} from '@consta/uikit/IconTrash'
import {IOrganizationsTableModel, organizationsColumn} from './organizationsTableData'
import cl from './Organizations.module.scss'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import {IconAdd} from '@consta/uikit/IconAdd'
import {useTableRequest} from '../../../hooks/shared/tables/useTableRequest'
import {useTable} from '../../../hooks/shared/tables/useTable'
import {OrganizationsFilter, TablesEnum} from '../../../config/store/tablesReducerConfig'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import {closeModal, openModal} from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import {useOrganizations} from '../../../hooks/admin/useOrganizations'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import {IOrganization, IOrganizationFull} from '../../../ts/interfaces/IOrganizations'
import {selectAll} from '../../../utils/admin/selectAll'
import AddEditOrganization from '../modals/AddEditOrganization/AddEditOrganization'
import {request} from '../../../api/axios/request'

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

  const {loading, getOrganizations, changeOrganizations} = useOrganizations()

  useLayoutEffect(() => {
    if (loading) setCurrentPage(1)
    else setCurrentPage(0)
  }, [loading])

  const {isLoading, rows, update, isRowsFinished} = useTableRequest(
    async () => {
      const currentRows: IOrganization[] = getOrganizations().filter(
            (r) =>
              !filter.searchQuery ||
              r.fullName?.includes(filter.searchQuery) ||
              r.shortName?.includes(filter.searchQuery) ||
              r.code?.includes(filter.searchQuery)
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
            fullName: currentRows[i].fullName || '',
            shortName: currentRows[i].shortName || '',
            code: currentRows[i].code || '',
            more: (
              <MoreButton
                items={[
                  {
                    label: 'Изменить',
                    iconLeft: IconEdit,
                    onClick: () =>
                      openModal(
                        <AddEditOrganization
                          organizationId={currentRows[i]._id}
                          onSubmit={async (res: IOrganizationFull) => {
                            await changeOrganizations(res, 'change')
                            await update()
                          }}
                        />
                      )
                  },
                  {
                    label: 'Удалить',
                    iconLeft: IconTrash,
                    onClick: () =>
                      openModal(
                        <DeleteSubmit
                          onSubmit={() => {
                            request.organizations
                              .deleteOrganization(currentRows[i]._id)
                              .then((r => changeOrganizations(r.data, 'delete')))
                              .then(update)
                              .then(closeModal)
                              .catch(console.log)
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
    selectedRowsId,
    setSelectedRowsId
  )

  selectAll(organizationsColumn, rows, selectedRowsId, setSelectedRowsId, pagination)

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
                    onChange={({value}) => setSearchQuery(value)}
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
                        onClick: () =>
                          openModal(
                            <AddEditOrganization
                              onSubmit={async (res: IOrganizationFull) => {
                                await changeOrganizations(res, 'add')
                                await update()
                              }}
                            />
                          )
                      },
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        disabled: !(selectedRowsId.length === 1),
                        onClick: () =>
                          openModal(
                            <AddEditOrganization
                              organizationId={selectedRowsId[0]}
                              onSubmit={async (res: IOrganizationFull) => {
                                await changeOrganizations(res, 'change')
                                await update()
                              }}
                            />
                          )
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        onClick: () =>
                          openModal(
                            <DeleteSubmit
                              onSubmit={() => {
                                Promise.all(
                                    selectedRowsId.map((id) =>
                                      request.organizations.deleteOrganization(id)
                                    )
                                  )
                                  .then(r => r.forEach(org => changeOrganizations(org.data, 'delete')))
                                  .then(update)
                                  .then(() => closeModal())
                                  .catch((e) => console.log(e))
                              }}
                              onCancel={() => closeModal()}
                            />
                          ),
                        disabled: !selectedRowsId.length
                      }
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
          rows={rows}
          columns={organizationsColumn}
          isLoading={loading || isLoading}
          onRowSelect={setSelectedRowsId}
        />
      </Layout>

      <SharedPagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        setDisplayedRows={setDisplayedRows}
        isRowsFinished={isRowsFinished}
      />
    </Layout>
  )
}

export default Organizations
