import React, { FC, useEffect, useState } from 'react'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'

import { usePagination } from '../../../hooks/paginationHooks'
import { statusComboboxItem } from '../../shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import { typeItem } from '../../shared/Filter/ExamTypeSelect/ExamTypeSelect'
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
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
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

  const [organizations, setOrganizations] = useState<IOrganization[]>([])
  const [loading, getOrganizations] = useOrganizations(setOrganizations)

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
    getOrganizations()

  useEffect(() => {
    const newFullRows: IOrganizationsTableModel[] = []

    const filteredOrganizations = organizations.filter(
      (e) => !searchQuery || e.shortName?.includes(searchQuery) || e.fullName?.includes(searchQuery)
    )

    setTotal(filteredOrganizations.length)

    for (
      let i = pagination.displayedRows.id * pagination.currentPage;
      i < pagination.displayedRows.id * pagination.currentPage + pagination.displayedRows.id;
      i++
    ) {
      if (filteredOrganizations[i]) {
        if (
          !searchQuery ||
          filteredOrganizations[i].fullName?.includes(searchQuery) ||
          filteredOrganizations[i].shortName?.includes(searchQuery)
        ) {
          newFullRows.push({

    setCurrentOrganizations(organizations)
  }, [loading])

  useEffect(() => {
    setCurrentOrganizations(organizations.filter(e => !searchQuery || e.shortName?.includes(searchQuery) || e.fullName?.includes(searchQuery)))
    pagination.currentPage = 0
  }, [searchQuery])

  useEffect(() => {
    const newFullRows: IOrganizationsTableModel[] = []

    setTotal(currentOrganizations.length)

    for (let i = pagination.displayedRows.id * pagination.currentPage; i < pagination.displayedRows.id * pagination.currentPage + pagination.displayedRows.id; i++) {
      if (currentOrganizations[i]) {
        if (!searchQuery || currentOrganizations[i].fullName?.includes(searchQuery) || currentOrganizations[i].shortName?.includes(searchQuery)) {
          newFullRows.push  ({
            id: organizations[i]._id,
            selected: false,
            fullName: organizations[i].fullName,
            shortName: organizations[i].shortName,
            code: organizations[i].code,
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
    }

    setFullRows(newFullRows)
  }, [organizations, pagination.displayedRows, pagination.currentPage, searchQuery])

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
        <SharedTable<IOrganizationsTableModel>
          className={cl.table}
          rows={fullRows}
          setRows={setFullRows}
          columns={organizationsColumn}
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
          closeMenu={setIsTableMenuOpen.off}
          selectedRows={selectedRowsId}
          setSelectedRows={setSelectedRowsId}
        />
      </Layout>

      <SharedPagination pagination={pagination} setPagination={setPagination} />
    </Layout>
  )
}

export default Organizations
