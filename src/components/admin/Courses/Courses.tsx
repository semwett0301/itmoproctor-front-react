import React, { FC, useEffect, useState } from 'react'
import cl from './Courses.module.scss'
import { Layout } from '@consta/uikit/Layout'
import { usePagination } from '../../../hooks/paginationHooks'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import OrganizationSelect from '../../shared/Filter/OrganizationSelect/OrganizationSelect'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconTrash } from '@consta/uikit/IconTrash'
import { IOrganization } from '../../../ts/interfaces/IOrganizations'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'
import { IconEdit } from '@consta/uikit/IconEdit'
import SharedTable from '../../shared/SharedTable/SharedTable'
import { coursesColumns, ICoursesTableModel } from './coursesTableModel'
import { request } from '../../../api/axios/request'
import twoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
import { Button } from '@consta/uikit/Button'
import { IconBento } from '@consta/uikit/IconBento'
import { ICourseRow } from '../../../ts/interfaces/ICourses'

// TYPES
interface IFilter {
  searchQuery: string | null
  organizations: IOrganization[] | null
}

const Courses: FC = () => {
  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)
  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  // filter
  // filterState
  const [{ searchQuery, organizations }, setFilter] = useState<IFilter>({
    searchQuery: null,
    organizations: null
  })
  const setSearchQuery = (query: string | null): void =>
    setFilter((prevState) => ({
      ...prevState,
      searchQuery: query
    }))
  const setOrganizations = (item: IOrganization[] | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      organizations: item
    }))
  }

  // Exams table request
  const [fullRows, setFullRows] = useState<ICoursesTableModel[]>([])
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  useEffect(() => {
    const getCourses = async (): Promise<void> => {
      await request.courses
        .getListOfCourses({
          text: searchQuery,
          organization: organizations?.map((item) => item._id).join(',') || null,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          console.log(r)
          setOrganizationsIds(() => r.data.organizations || [])
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            const obj: ICoursesTableModel[] = r.data.rows.map((item: ICourseRow) => {
              const row: ICoursesTableModel = {
                id: item._id,
                selected: false,
                name: twoRowCell({
                  firstRow: 'Название курса, Артем добавить и я заменю...',
                  secondRow: '...на тексмт в 2 строках'
                }),
                courseCode: item.courseCode,
                sessionCode: item.sessionCode,
                organization: item.organization.shortName,
                accessAllowed: item.accessAllowed.map((i) => i.shortName).join(', ') || null,
                updated: item.updated,
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
              return row
            })

            setFullRows(obj)
          } else setFullRows([])
        })
    }

    getCourses().catch((e) => console.log(e))
  }, [searchQuery, organizations, pagination.displayedRows, pagination.currentPage])
  return (
    <Layout direction={'column'} className={cl.courses}>
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
                    value={searchQuery}
                  />
                ),
                flex: 1
              },
              {
                key: 'Organization',
                component: (
                  <OrganizationSelect
                    value={organizations}
                    onChange={({ value }) => setOrganizations(value)}
                    organizationsIds={organizationsIds}
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
                        iconLeft: IconAdd
                      },
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit
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
        <SharedTable<ICoursesTableModel>
          className={cl.table}
          rows={fullRows}
          setRows={setFullRows}
          columns={coursesColumns}
          contextMenuItems={[
            {
              label: 'Изменить',
              iconLeft: IconEdit
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

export default Courses
