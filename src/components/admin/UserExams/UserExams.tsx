import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import cl from './UserExams.module.scss'
import { Layout } from '@consta/uikit/Layout'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import { useOpenTab } from '../Admin'
import { useTable } from '../../../hooks/shared/tables/useTable'
import { ExamFilter, TablesEnum } from '../../../config/store/tablesReducerConfig'
import { IExamRow } from '../../../ts/interfaces/IExams'
import { getProctor, getStudentName } from '../../../utils/common/nameHelper'
import TypeBadge from '../../shared/SharedTable/TypeBadge/TypeBadge'
import StatusBadge, {
  customBadgePropStatus,
  getExamStatus
} from '../../shared/SharedTable/StatusBadge/StatusBadge'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconTrash } from '@consta/uikit/IconTrash'
import { closeModal, openModal } from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import { useTableRequest } from '../../../hooks/shared/tables/useTableRequest'
import { request } from '../../../api/axios/request'
import {
  organizationsFormat,
  resetFormat,
  statusFormat
} from '../../../utils/admin/requestFormatters'
import { selectAll } from '../../../utils/admin/selectAll'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconDocExport } from '@consta/uikit/IconDocExport'
import { IconUpload } from '@consta/uikit/IconUpload'
import ExamTypeSelect from '../../shared/Filter/ExamTypeSelect/ExamTypeSelect'
import ExamStatusCombobox from '../../shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import OrganizationCombobox from '../../shared/Filter/OrganizationCombobox/OrganizationCombobox'
import { examsColumn, IExamsTableModel } from '../Exams/examsTableModel'
import AddEditDuplicateExam from '../modals/AddEditExam/AddEditDuplicateExam'
import { deleteSelected } from '../../../utils/admin/deleteSelected'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

const UserExams: FC = () => {
  const { id } = useParams()
  const { openTab } = useOpenTab()

  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  // const [sortSetting, setSortSetting] = useState<SortByProps<IExamsTableModel> | null>(null)

  // filter
  const {
    pagination,
    setCurrentPage,
    setDisplayedRows,
    setTotal,
    selectedRowsId,
    filter,
    setSelectedRowsId,
    setFilter,
    dropPagination
  } = useTable<ExamFilter>(TablesEnum.EXAMS)

  const castToTableRow: (item: IExamRow, update: () => void) => IExamsTableModel = (
    item,
    update
  ) => {
    const proctor = getProctor(item.async, item.inspector, item.expert),
      studentName = getStudentName(item.student)

    return {
      async: item.async,
      id: item._id,
      selected: false,
      listener: studentName,
      proctor: proctor,
      exam: {
        _id: item._id,
        assigment: item.assignment,
        subject: item.subject
      },
      type: <TypeBadge async={item.async} />,
      start: { startDate: item.startDate, beginDate: item.beginDate },
      status: (
        <StatusBadge
          status={customBadgePropStatus[getExamStatus(item)]}
          reset={!item.examId || !item.examId.startsWith('course-v1')}
        />
      ),
      // Если есть фактическая дата начала(startDate), то отображать
      video: item.startDate && (
        <Button
          size='xs'
          onlyIcon
          iconRight={IconVideo}
          onClick={() =>
            openTab({
              id: item._id,
              title: item._id,
              path: `exam/${item._id}`,
              type: 'exam'
            })
          }
        />
      ),
      more: (
        <MoreButton
          items={[
            {
              label: 'Изменить',
              iconLeft: IconEdit,
              onClick: () => openModal(<AddEditDuplicateExam examId={item._id} onSubmit={update} />)
            },
            {
              label: 'Сбросить',
              iconLeft: IconRevert
            },
            {
              label: 'Дублировать',
              iconLeft: IconCopy,
              onClick: () =>
                openModal(
                  <AddEditDuplicateExam examId={item._id} onSubmit={update} isDuplicate={true} />
                )
            },
            {
              label: 'Удалить',
              iconLeft: IconTrash,
              onClick: () =>
                openModal(
                  <DeleteSubmit
                    onSubmit={async () => {
                      await request.exam.deleteExam(item._id)
                      closeModal()
                      await update()
                    }}
                    onCancel={() => closeModal()}
                  />
                )
            }
          ]}
        />
      )
    }
  }

  // Exams table request
  const { isLoading, rows, update, isRowsFinished } = useTableRequest<IExamsTableModel>(
    () =>
      request.exam
        .getUserExams({
          userId: id ?? '',
          from: filter.date[0].toISOString(),
          to: filter.date[1].toISOString(),
          text: filter.searchQuery,
          status: statusFormat(filter.status),
          reset: resetFormat(filter.status),
          organization: organizationsFormat(filter.organizations),
          myStudents: false,
          async: filter.type ? filter.type.flag : null,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          setTotal(0)
          setOrganizationsIds(() => r.data.organizations || [])
          setTotal(r.data.total)

          let obj: IExamsTableModel[] = []
          if (r.data.rows.length > 0) {
            obj = r.data.rows.map((item: IExamRow) => {
              return castToTableRow(item, update)
            })
            return obj
          } else return []
        }),
    [
      filter.date[0],
      filter.date[1],
      filter.searchQuery,
      filter.type,
      filter.status,
      filter.organizations
    ],
    [pagination.displayedRows, pagination.currentPage],
    dropPagination,
    selectedRowsId,
    setSelectedRowsId
  )

  selectAll(examsColumn, rows, selectedRowsId, setSelectedRowsId, pagination)

  return (
    <Layout direction={'column'} className={cl.exams}>
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
                    onChange={(value) => setFilter({ date: value })}
                  />
                )
              },
              {
                key: 'search',
                component: (
                  <SearchField
                    placeholder={'Поиск по экзамену'}
                    onChange={({ value }) => setFilter({ searchQuery: value })}
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
                        onClick: () => openModal(<AddEditDuplicateExam onSubmit={update} />)
                      },
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        disabled: selectedRowsId.length !== 1,
                        onClick: () =>
                          openModal(
                            <AddEditDuplicateExam examId={selectedRowsId[0]} onSubmit={update} />
                          )
                      },
                      {
                        label: 'Сбросить',
                        iconLeft: IconRevert,
                        disabled: !selectedRowsId.length
                      },
                      {
                        label: 'Дублировать',
                        iconLeft: IconCopy,
                        disabled: selectedRowsId.length !== 1,
                        onClick: () => {
                          openModal(
                            <AddEditDuplicateExam
                              examId={selectedRowsId[0]}
                              onSubmit={update}
                              isDuplicate={true}
                            />
                          )
                        }
                      },
                      {
                        label: 'Скачать (csv)',
                        iconLeft: IconDocExport,
                        disabled: true
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
                              onSubmit={async () => {
                                await deleteSelected(selectedRowsId, request.exam.deleteExam)
                                closeModal()
                                await update()
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
          },
          {
            key: '2',
            components: [
              {
                key: 'Type',
                component: (
                  <ExamTypeSelect
                    value={filter.type}
                    onChange={({ value }) => setFilter({ type: value })}
                  />
                ),
                flex: 2
              },
              {
                key: 'Status',
                component: (
                  <ExamStatusCombobox
                    value={filter.status}
                    onChange={(value) => setFilter({ status: value })}
                  />
                ),
                flex: 4
              },
              {
                key: 'Organization',
                component: (
                  <OrganizationCombobox
                    value={filter.organizations || []}
                    onChange={({ value }) => setFilter({ organizations: value })}
                    organizationsIds={organizationsIds}
                    isIdsLoading={isLoading}
                  />
                ),
                flex: 4
              }
            ]
          }
        ]}
      />

      <Layout flex={1} className={cl.tableLayout}>
        <SharedTable
          isLoading={isLoading}
          className={cl.table}
          rows={rows}
          columns={examsColumn}
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

export default UserExams
