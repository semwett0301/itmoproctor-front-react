import React, { FC, useState } from 'react'
import cl from './Users.module.scss'
import { Layout } from '@consta/uikit/Layout'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconDocExport } from '@consta/uikit/IconDocExport'
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
import { ExamsTableData } from '../Exams/examsTableData'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'

// TYPES
interface IFilter {
  searchQuery: string | null
  organizations: IOrganization[] | null
  provider: providerItem | null
  role: DefaultItem[] | null
}

const Users: FC = () => {
  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)
  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  // Users table request
  const [fullRows, setFullRows] = useState<ExamsTableData[]>([])
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
                key: 'btn',
                component: (
                  <FilterButton
                    MenuItems={[
                      { label: 'Добавить', iconLeft: IconAdd },
                      { label: 'Изменить', iconLeft: IconEdit },
                      { label: 'Сбросить', iconLeft: IconRevert },
                      { label: 'Дублировать', iconLeft: IconCopy },
                      { label: 'Скачать (csv)', iconLeft: IconDocExport },
                      { label: 'Импорт', iconLeft: IconUpload },
                      { label: 'Удалить', iconLeft: IconTrash }
                    ]}
                  />
                )
              }
            ]
          }
        ]}
      />

      <Layout flex={1} className={cl.table} style={{ backgroundColor: '#87293822' }}>
        {/* <SharedTable<ExamsTableData> */}
        {/*   rows={fullRows} */}
        {/*   setRows={setFullRows} */}
        {/*   columns={examsColumn} */}
        {/*   contextMenuItems={[ */}
        {/*     { */}
        {/*       label: 'Изменить', */}
        {/*       iconLeft: IconEdit */}
        {/*     }, */}
        {/*     { */}
        {/*       label: 'Сбросить', */}
        {/*       iconLeft: IconRevert */}
        {/*     }, */}
        {/*     { */}
        {/*       label: 'Дублировать', */}
        {/*       iconLeft: IconCopy */}
        {/*     }, */}
        {/*     { */}
        {/*       label: 'Удалить', */}
        {/*       iconLeft: IconTrash */}
        {/*     } */}
        {/*   ]} */}
        {/*   isMenuOpen={isTableMenuOpen} */}
        {/*   menuPosition={tableMenuPosition} */}
        {/*   closeMenu={setIsTableMenuOpen.off} */}
        {/*   selectedRows={selectedRowsId} */}
        {/*   setSelectedRows={setSelectedRowsId} */}
        {/* /> */}
      </Layout>

      <SharedPagination pagination={pagination} setPagination={setPagination} />
    </Layout>
  )
}

export default Users
