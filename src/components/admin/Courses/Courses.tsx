import React, {FC, useState} from 'react'
import cl from './Courses.module.scss'
import {Layout} from '@consta/uikit/Layout'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import OrganizationSelect from '../../shared/Filter/OrganizationSelect/OrganizationSelect'
import {IconAdd} from '@consta/uikit/IconAdd'
import {IconTrash} from '@consta/uikit/IconTrash'
import {IOrganization} from '../../../ts/interfaces/IOrganizations'
import {IconEdit} from '@consta/uikit/IconEdit'
import SharedTable from '../../shared/SharedTable/SharedTable'
import {coursesColumns, ICoursesTableModel} from './coursesTableModel'
import {request} from '../../../api/axios/request'
import twoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
import {ICourseRow} from '../../../ts/interfaces/ICourses'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import {useTableRequest} from '../../../hooks/useTableRequest';
import {useTable} from '../../../hooks/tableHooks';
import {CoursesFilter, TablesEnum} from '../../../config/tablesReducerConfig';
import {IconRevert} from '@consta/uikit/IconRevert';
import {IconCopy} from '@consta/uikit/IconCopy';
import {closeModal, openModal} from '../../shared/ModalView/ModalView';
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit';
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton';

// TYPES
interface IFilter {
  searchQuery: string | null
  organizations: IOrganization[] | null
}

const Courses: FC = () => {

  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  const {
    filter,
    pagination,
    selectedRowsId,
    setSelectedRowsId,
    setFilter,
    setCurrentPage,
    setDisplayedRows,
    dropPagination,
    setTotal
  } = useTable<CoursesFilter>(TablesEnum.COURSES)

  const setSearchQuery = (query: string | null): void =>
    setFilter({
      searchQuery: query
    })

  const setOrganizations = (item: IOrganization[] | null): void => {
    setFilter({
      organizations: item
    })
  }
  const {isLoading, rows} = useTableRequest(
    () => request.courses
      .getListOfCourses({
        text: filter.searchQuery,
        organization: filter.organizations?.map((item) => item._id).join(',') || null,
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
              updated: <DateCell date={item.updated}/>,
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
                              console.log(row.id)
                            }}
                            onCancel={() => closeModal()}
                          />
                        )
                    }
                  ]}
                />
              )
            }
            return row
          })

          return obj
        } else return []
      }),
    [
      filter.organizations,
      filter.searchQuery
    ],
    [],
    dropPagination,
    selectedRowsId
  )
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
                    onChange={({value}) => setSearchQuery(value)}
                    placeholder={'Поиск курса'}
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
                    onChange={({value}) => setOrganizations(value)}
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
          rows={rows}
          columns={coursesColumns}
          onRowSelect={setSelectedRowsId}
          isLoading={isLoading}/>
      </Layout>

      <SharedPagination pagination={pagination} setCurrentPage={setCurrentPage} setDisplayedRows={setDisplayedRows}/>
    </Layout>
  )
}

export default Courses
