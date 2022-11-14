import React, { FC, useEffect, useState } from 'react'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import { usePagination } from '../../../hooks/paginationHooks'
import { IOrganization } from '../../../ts/interfaces/IOrganizations'
import { Layout } from '@consta/uikit/Layout'
import SharedTable from '../../shared/SharedTable/SharedTable'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconTrash } from '@consta/uikit/IconTrash'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'
import { useOrganizations } from '../../../hooks/organizationsHooks'
import { IOrganizationsTableModel, organizationsColumn } from './organizationsTableData'
import { IconBento } from '@consta/uikit/IconBento'
import { Button } from '@consta/uikit/Button'
import cl from './Organizations.module.scss'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'

interface IFilter {
  searchQuery: string | null
}

const Organizations: FC = () => {
  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  // table
  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)

  const [fullRows, setFullRows] = useState<IOrganizationsTableModel[]>([])

  const { loading, getOrganizations } = useOrganizations()

  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  const [currentOrganizations, setCurrentOrganizations] = useState<IOrganization[]>([])

  // filter
  // filterState
  const [{ searchQuery }, setFilter] = useState<IFilter>({
    searchQuery: null
  })

  const setSearchQuery = (query: string | null): void =>
    setFilter((prevState) => ({
      ...prevState,
      searchQuery: query
    }))

  useEffect(() => {
    if (!loading) {
      setCurrentOrganizations(getOrganizations())
    }
  }, [loading])

  useEffect(() => {
    if (searchQuery) {
      setCurrentOrganizations(
        getOrganizations().filter((e) => {
          return (
            e.shortName?.includes(searchQuery) ||
            e.fullName?.includes(searchQuery) ||
            e.code?.includes(searchQuery)
          )
        })
      )
    } else {
      setCurrentOrganizations(getOrganizations())
    }

    pagination.currentPage = 0
  }, [searchQuery])

  useEffect(() => {
    const newFullRows: IOrganizationsTableModel[] = []

    setTotal(currentOrganizations.length)

    for (
      let i = pagination.displayedRows.id * pagination.currentPage;
      i < pagination.displayedRows.id * pagination.currentPage + pagination.displayedRows.id;
      i++
    ) {
      console.log(currentOrganizations[i])
      if (currentOrganizations[i]) {
        newFullRows.push({
          id: currentOrganizations[i]._id,
          selected: false,
          fullName: currentOrganizations[i].fullName,
          shortName: currentOrganizations[i].shortName,
          code: currentOrganizations[i].code,
          more: (
            <Button
              size='xs'
              onlyIcon
              iconRight={IconBento}
              view='secondary'
              onClick={(click: React.MouseEvent<HTMLElement>) => {
                const { x, y } = click.currentTarget.getBoundingClientRect()
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
        })
      }
    }

    setFullRows(newFullRows)
  }, [currentOrganizations, pagination.displayedRows, pagination.currentPage])

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
        {/* <SharedTable<IOrganizationsTableModel> */}
        {/*   className={cl.table} */}
        {/*   rows={fullRows} */}
        {/*   setRows={setFullRows} */}
        {/*   columns={organizationsColumn} */}
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

export default Organizations
