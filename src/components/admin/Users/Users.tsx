import React, {FC, useState} from 'react'
import cl from './Users.module.scss'
import {Layout} from '@consta/uikit/Layout'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import {IconAdd} from '@consta/uikit/IconAdd'
import {IconUpload} from '@consta/uikit/IconUpload'
import {IconTrash} from '@consta/uikit/IconTrash'
import OrganizationCombobox from '../../shared/Filter/OrganizationCombobox/OrganizationCombobox'
import ProviderCombobox from '../../shared/Filter/ProviderCombobox/ProviderCombobox'
import RoleCombobox from '../../shared/Filter/RoleCombobox/RoleCombobox'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import {request} from '../../../api/axios/request'
import {IUsersRow} from '../../../ts/interfaces/IUsers'
import {useTranslation} from 'react-i18next'
import {getUserColumns, IUsersTableModel, usersColumns} from './usersTableModel'
import {useTable} from '../../../hooks/shared/tables/useTable'
import {TablesEnum, UserFilter} from '../../../config/store/tablesReducerConfig'
import {useOrganizations} from '../../../hooks/admin/useOrganizations'
import {useTableRequest} from '../../../hooks/shared/tables/useTableRequest'
import {IconEdit} from '@consta/uikit/IconEdit'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import {IconAllDone} from '@consta/uikit/IconAllDone'
import SharedTable from '../../shared/SharedTable/SharedTable'
import {organizationsFormat, roleFormat} from '../../../utils/admin/requestFormatters'
import {selectAll} from '../../../utils/admin/selectAll'
import AddEditUser from '../modals/AddEditUser/AddEditUser'

import {closeModal, openModal} from '../../shared/ModalView/ModalView'
import {useOpenTab} from '../Admin'
import {openUserExams} from '../../../utils/admin/openUserExams'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import {adminButtonChecker} from '../../../utils/admin/adminButtonChecker';
import {deleteSelected} from '../../../utils/admin/deleteSelected';
import {useAppSelector} from '../../../hooks/store/useAppSelector';


const Users: FC = () => {
  const {t} = useTranslation('translation')

  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  const {getOrganizations, getOrganization, loading} = useOrganizations()

  const system = useAppSelector(state => state.user.system ?? false)

  const {openTab} = useOpenTab()

  // filter
  const {
    selectedRowsId,
    filter,
    pagination,
    setSelectedRowsId,
    setFilter,
    setDisplayedRows,
    setCurrentPage,
    setTotal,
    dropPagination
  } = useTable<UserFilter>(TablesEnum.USERS)

  // Users table request
  const {isLoading, rows, update, isRowsFinished} = useTableRequest(
    () =>
      Promise.resolve(getOrganizations())
        .then(() =>
          request.users.getListOfUsers({
            text: filter.searchQuery,
            organization: organizationsFormat(filter.organizations),
            role: roleFormat(filter.role),
            provider: filter.provider?.provider || null,
            page: pagination.currentPage + 1,
            rows: pagination.displayedRows.id
          })
        )
        .then((r): IUsersTableModel[] => {
          setOrganizationsIds(() => r.data.organizations || [])
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            return r.data.rows.map((item: IUsersRow) => {
              let university = null
              if (item.organization) {
                university = getOrganization(item.organization)
              }
              return {
                id: item._id,
                selected: false,
                user: {
                  lastname: item.lastname,
                  firstname: item.firstname,
                  middlename: item.middlename,
                  id: item._id
                },
                login: item.username,
                provider: t(`shared.providers.${item.provider}`),
                role: t(`shared.roles.${item.role}`),
                university: university ? university.shortName || university.fullName : null,
                regDate: item.created || '',
                lastDate: item.activityDate || '',

                more: (
                  <MoreButton
                    items={adminButtonChecker([
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        onClick: () =>
                          openModal(<AddEditUser userId={item._id} onSubmit={update}/>)
                      },
                      {
                        label: 'Все экзамены',
                        iconLeft: IconAllDone,
                        onClick: () => {
                          openUserExams(openTab, item)
                        }
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        onClick: () =>
                          openModal(
                            <DeleteSubmit
                              onSubmit={() => {
                                request.users
                                  .deleteUser(item._id)
                                  .then(closeModal)
                                  .then(update)
                                  .catch(console.log)
                              }}
                              onCancel={() => closeModal()}
                            />
                          )
                      }
                    ], system, ['Удалить'])}
                  />
                )
              }
            })
          } else return []
        }),
    [filter.searchQuery, filter.role, filter.provider, filter.organizations, loading],
    [pagination.displayedRows, pagination.currentPage],
    dropPagination,
    selectedRowsId,
    setSelectedRowsId
  )

  selectAll(usersColumns, rows, selectedRowsId, setSelectedRowsId, pagination)

  return (
    <Layout direction={'column'} className={cl.users}>
      <FilterConstructor
        items={[
          {
            key: '1',
            components: [
              {
                key: 'search',
                component: (
                  <SearchField
                    placeholder={'Поиск пользователя'}
                    onChange={({value}) => setFilter({...filter, searchQuery: value})}
                    value={filter.searchQuery}
                  />
                ),
                flex: 1
              },
              {
                key: 'Organization',
                component: (
                  <OrganizationCombobox
                    value={filter.organizations || []}
                    onChange={({value}) => setFilter({organizations: value})}
                    organizationsIds={organizationsIds}
                    isIdsLoading={isLoading}
                  />
                ),
                flex: 1
              },
              {
                key: 'role',
                component: (
                  <ProviderCombobox
                    value={filter.provider}
                    onChange={({value}) => setFilter({provider: value})}
                  />
                ),
                flex: 1
              },
              {
                key: 'provider',
                component: (
                  <RoleCombobox
                    value={filter.role}
                    onChange={({value}) => setFilter({role: value})}
                  />
                ),
                flex: 1
              },
              {
                key: 'more_btn',
                component: (
                  <FilterButton
                    MenuItems={adminButtonChecker([
                      {
                        label: 'Добавить',
                        iconLeft: IconAdd,
                        onClick: () => openModal(<AddEditUser onSubmit={update}/>)
                      },
                      {
                        label: 'Импорт',
                        iconLeft: IconUpload,
                        disabled: true
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        onClick: () =>
                          openModal(
                            <DeleteSubmit
                              onSubmit={() => {
                                deleteSelected(selectedRowsId, request.users.deleteUser)
                                  .then(closeModal)
                                  .then(update)
                                  .catch(console.log)
                              }}
                              onCancel={() => closeModal()}
                            />
                          )
                      }
                    ], selectedRowsId.length !== 0 && system, ['Удалить'])}
                  />
                )
              }
            ]
          }
        ]}
      />

      <Layout flex={1} className={cl.tableLayout}>
        <SharedTable<IUsersTableModel>
          isLoading={isLoading || loading}
          className={cl.table}
          rows={rows}
          columns={getUserColumns(openTab)}
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

export default Users
