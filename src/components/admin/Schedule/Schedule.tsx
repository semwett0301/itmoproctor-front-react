import React, { FC, useState } from 'react'
import cl from './Schedule.module.scss'
import { Layout } from '@consta/uikit/Layout'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconTrash } from '@consta/uikit/IconTrash'
import FilterConstructor from '../../shared/Filter/FilterConstructor'

// TYPES
interface IFilter {
  date: [Date, Date]
  searchQuery: string | null
}

const Schedule: FC = () => {
  // const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  // const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)
  // const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  // filter
  // filterState
  const [filter, setFilter] = useState<IFilter>({
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
                    onChange={({ value }) => setDatePeriod(value)}
                  />
                )
              },
              {
                key: 'search;',
                component: (
                  <SearchField
                    placeholder={'Поиск по экзамену'}
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
    </Layout>
  )
}

export default Schedule
