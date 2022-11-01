import React, { FC, useEffect, useState } from 'react'
import cl from './Users.module.scss'
import { Layout } from '@consta/uikit/Layout'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconUpload } from '@consta/uikit/IconUpload'
import { IconTrash } from '@consta/uikit/IconTrash'
import OrganizationSelect from '../../shared/Filter/OrganizationSelect/OrganizationSelect'
import { IOrganization } from '../../../ts/interfaces/IOrganizations'
import ProviderSelect, { providerItem } from '../../shared/Filter/ProviderSelect/ProviderSelect'
import { DefaultItem } from '@consta/uikit/__internal__/src/components/Combobox/helpers'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'
import RoleCombobox from '../../shared/Filter/RoleCombobox/RoleCombobox'
import { usePagination } from '../../../hooks/paginationHooks'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import { request } from '../../../api/axios/request'
import { IUsersRow } from '../../../ts/interfaces/IUsers'
import { Button } from '@consta/uikit/Button'
import { IconBento } from '@consta/uikit/IconBento'
import SharedTable from '../../shared/SharedTable/SharedTable'
import { useTranslation } from 'react-i18next'
import { IconAllDone } from '@consta/uikit/IconAllDone'
import { getFullName } from '../../../utils/nameHelper'
import { IUsersTableModel, usersColumns } from './usersTableModel'

// TYPES
interface IFilter {
  searchQuery: string | null
  organizations: IOrganization[] | null
  provider: providerItem | null
  role: DefaultItem[] | null
}

const Users: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'admin.users' })

  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)
  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  // Users table request
  const [fullRows, setFullRows] = useState<IUsersTableModel[]>([])
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  // filter
  // filterState
  const [filter, setFilter] = useState<IFilter>({
    searchQuery: null,
    organizations: null,
    provider: null,
    role: null
  })

  // filter setters
  const setSearchQuery = (query: string | null): void =>
    setFilter((prevState) => ({
      ...prevState,
      searchQuery: query
    }))

  const setProvider = (item: providerItem | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      provider: item
    }))
  }

  const setRole = (item: DefaultItem[] | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      role: item
    }))
  }

  const setOrganizations = (item: IOrganization[] | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      organizations: item
    }))
  }

  // Users table request
  useEffect(() => {
    console.log(organizationsIds)
    const getUsers = async (): Promise<void> => {
      await request.users
        .getListOfUsers({
          text: filter.searchQuery,
          organization: null,
          role: null,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          console.log(r)
          setOrganizationsIds(() => r.data.organizations)
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            const obj: IUsersTableModel[] = r.data.rows.map((item: IUsersRow) => {
              return {
                id: item._id,
                selected: false,
                // check: null,
                user: getFullName(item.firstname, item.middlename, item.lastname),
                login: item.username,
                provider: t(`table.providers.${item.provider}`),
                role: t(`table.roles.${item.role}`),
                university: item.organization,
                regDate: item.created,
                lastDate: item.active,
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
    getUsers().catch((e) => console.log(e))
  }, [
    filter.searchQuery,
    filter.role,
    filter.provider,
    filter.organizations,
    pagination.currentPage,
    pagination.displayedRows.id
  ])

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
                    onChange={({ value }) => setSearchQuery(value)}
                    value={filter.searchQuery}
                  />
                ),
                flex: 1
              },
              {
                key: 'Organization',
                component: (
                  <OrganizationSelect
                    value={filter.organizations}
                    onChange={({ value }) => setOrganizations(value)}
                    organizationsIds={organizationsIds}
                  />
                ),
                flex: 1
              },
              {
                key: 'role',
                component: (
                  <ProviderSelect
                    value={filter.provider}
                    onChange={({ value }) => setProvider(value)}
                  />
                ),
                flex: 1
              },
              {
                key: 'provider',
                component: (
                  <RoleCombobox onChange={({ value }) => setRole(value)} value={filter.role} />
                ),
                flex: 1
              },
              {
                key: 'more_btn',
                component: (
                  <FilterButton
                    MenuItems={[
                      {
                        label: 'Добавить',
                        iconLeft: IconAdd
                      },
                      {
                        label: 'Импоорт',
                        iconLeft: IconUpload
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash
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
        <SharedTable<IUsersTableModel>
          className={cl.table}
          rows={fullRows}
          setRows={setFullRows}
          columns={usersColumns}
          contextMenuItems={[
            { label: 'Изменить', iconLeft: IconEdit },
            { label: 'Все экзамены', iconLeft: IconAllDone }
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

export default Users
