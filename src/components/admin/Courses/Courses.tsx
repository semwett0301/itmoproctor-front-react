import React, {FC, useState} from 'react'
import cl from './Courses.module.scss'
import {Layout} from '@consta/uikit/Layout'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import OrganizationCombobox from '../../shared/Filter/OrganizationCombobox/OrganizationCombobox'
import {IconAdd} from '@consta/uikit/IconAdd'
import {IconTrash} from '@consta/uikit/IconTrash'
import {IOrganization} from '../../../ts/interfaces/IOrganizations'
import {IconEdit} from '@consta/uikit/IconEdit'
import SharedTable from '../../shared/SharedTable/SharedTable'
import {coursesColumns, ICoursesTableModel} from './coursesTableModel'
import {request} from '../../../api/axios/request'
import {ICourseRow} from '../../../ts/interfaces/ICourses'
import {useTableRequest} from '../../../hooks/shared/tables/useTableRequest'
import {useTable} from '../../../hooks/shared/tables/useTable'
import {CoursesFilter, TablesEnum} from '../../../config/store/tablesReducerConfig'
import {closeModal, openModal} from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import {selectAll} from '../../../utils/admin/selectAll'
import AddEditCourse from '../modals/AddEditCourse/AddEditCourse'
import {AxiosResponse} from 'axios'
import {RoleEnum} from '../../../config/router/authСonfig'
import {adminButtonChecker} from '../../../utils/admin/adminButtonChecker';
import {useAppSelector} from '../../../hooks/store/useAppSelector';

// DEFAULT FUNCTIONS
const deleteSelected = async (selected: string[]): Promise<AxiosResponse[]> =>
  Promise.all(selected.map((item) => request.courses.deleteCourse(item)))

const Courses: FC = () => {
  const user = useAppSelector((state) => state.user);
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

  const system = useAppSelector<boolean>(state => state.user.system ?? false)

  const { isLoading, rows, update, isRowsFinished } = useTableRequest<ICoursesTableModel>(
    () =>
      request.courses
        .getListOfCourses({
          text: filter.searchQuery,
          organization: filter.organizations?.map((item) => item._id).join(',') || null,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          setOrganizationsIds(() => r.data.organizations || [])
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            return r.data.rows.map((item: ICourseRow) => {
              const row: ICoursesTableModel = {
                id: item._id,
                selected: false,
                name: item.name ?? '',
                courseCode: item.courseCode,
                sessionCode: item.sessionCode,
                organization: item.organization.shortName,
                accessAllowed: item.accessAllowed.map((i) => i.shortName).join(', ') || null,
                updated: item.updated,
                more: (
                  <MoreButton
                    items={adminButtonChecker([
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        onClick: () =>
                          openModal(<AddEditCourse courseId={item._id} onSubmit={update} />)
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        onClick: () =>
                          openModal(
                            <DeleteSubmit
                              onSubmit={() => {
                                request.courses
                                  .deleteCourse(item._id)
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
              return row
            })
          } else return []
        }),
    [filter.organizations, filter.searchQuery],
    [pagination.displayedRows, pagination.currentPage],
    dropPagination,
    selectedRowsId,
    setSelectedRowsId
  )

  selectAll(coursesColumns, rows, selectedRowsId, setSelectedRowsId, pagination)

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
                    placeholder={'Поиск курса'}
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
                    onChange={({ value }) => setOrganizations(value)}
                    organizationsIds={organizationsIds}
                    isIdsLoading={isLoading}
                  />
                ),
                flex: 1
              },
              {
                key: 'btn',
                component: (
                  <FilterButton
                    MenuItems={adminButtonChecker([
                      {
                        label: 'Добавить',
                        iconLeft: IconAdd,
                        onClick: () => openModal(<AddEditCourse onSubmit={update} />)
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        disabled:
                          user.role === RoleEnum.ADMIN && user.system
                            ? !selectedRowsId.length
                            : selectedRowsId.length !== 1,
                        onClick: () =>
                          openModal(
                            <DeleteSubmit
                              onSubmit={() => {
                                deleteSelected(selectedRowsId)
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
          isLoading={isLoading}
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

export default Courses
