import React, { FC, useEffect, useState } from 'react'
import cl from './Exams.module.scss'
import { useOpenTab } from '../Admin'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconDocExport } from '@consta/uikit/IconDocExport'
import { IconUpload } from '@consta/uikit/IconUpload'
import { IconTrash } from '@consta/uikit/IconTrash'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import ExamStatusCombobox from '../../shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import ExamTypeSelect from '../../shared/Filter/ExamTypeSelect/ExamTypeSelect'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import OrganizationCombobox from '../../shared/Filter/OrganizationCombobox/OrganizationCombobox'
import { Layout } from '@consta/uikit/Layout'
import { useTableRequest } from '../../../hooks/useTableRequest'
import { useTable } from '../../../hooks/tableHooks'
import { ExamFilter, TablesEnum } from '../../../config/tablesReducerConfig'
import { request } from '../../../api/axios/request'
import { IExamRow } from '../../../ts/interfaces/IExams'
import { getProctor, getStudentName } from '../../../utils/nameHelper'
import TypeBadge from '../../shared/SharedTable/TypeBadge/TypeBadge'
import StatusBadge, {
  customBadgePropStatus,
  getExamStatus
} from '../../shared/SharedTable/StatusBadge/StatusBadge'
import { IconVideo } from '@consta/uikit/IconVideo'
import { Button } from '@consta/uikit/Button'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import { organizationsFormat, resetFormat, statusFormat } from '../../../utils/requestFormatters'
import { closeModal, openModal } from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import { examsColumn, IExamsTableModel } from './examsTableModel'
import { selectAll } from '../../../utils/selectAll'
import { SortByProps } from '@consta/uikit/Table'

const Exams: FC = () => {
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

  // Exams table request
  const { isLoading, rows, setRows } = useTableRequest(
    () =>
      request.exam
        .getListOfExams({
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
              const proctor = getProctor(item.async, item.inspector, item.expert),
                studentName = getStudentName(item.student)
              const row: IExamsTableModel = {
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

  // sorting
  const [sortSetting, setSortSetting] = useState<SortByProps<IExamsTableModel> | null>(null)

  useEffect(() => {
    setRows(
      rows.sort((a, b) => {
        switch (sortSetting?.sortingBy) {
          case 'proctor':
            const [firstProctorName, secondProctorName]: string[] =
              sortSetting.sortOrder === 'asc'
                ? [a.proctor.shortName, b.proctor.shortName]
                : [b.proctor.shortName, a.proctor.shortName]
            const compareProctor1 = (secondProctorName < firstProctorName) as unknown
            const compareProctor2 = (firstProctorName < secondProctorName) as unknown
            return (compareProctor1 as number) - (compareProctor2 as number)
          case 'exam':
            const [firstExamName, secondExamName]: string[] =
              sortSetting.sortOrder === 'asc'
                ? [a.exam.subject, b.exam.subject]
                : [b.exam.subject, a.exam.subject]
            const compareExam1 = (secondExamName < firstExamName) as unknown
            const compareExam2 = (firstExamName < secondExamName) as unknown
            return (compareExam1 as number) - (compareExam2 as number)
          case 'listener':
            return sortSetting.sortOrder === 'asc'
              ? a.listener.toLowerCase().localeCompare(b.listener.toLowerCase())
              : b.listener.toLowerCase().localeCompare(a.listener.toLowerCase())

          // case 'start':
          //   return sortSetting.sortOrder === 'asc'
          //     ? a.start.toLowerCase().localeCompare(b.start.toLowerCase())
          //     : b.start.toLowerCase().localeCompare(a.start.toLowerCase())
          default:
            return 0
        }
      })
    )
    console.log(rows)
    console.log(sortSetting)
  }, [sortSetting])

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
                        onClick: () => console.log('OpenModal')
                      },
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        disabled: selectedRowsId.length !== 1,
                        onClick: () => console.log(selectedRowsId)
                      },
                      {
                        label: 'Сбросить',
                        iconLeft: IconRevert,
                        disabled: !selectedRowsId.length,
                        onClick: () => console.log(selectedRowsId)
                      },
                      {
                        label: 'Дублировать',
                        iconLeft: IconCopy,
                        disabled: selectedRowsId.length !== 1,
                        onClick: () => console.log(selectedRowsId)
                      },
                      {
                        label: 'Скачать (csv)',
                        iconLeft: IconDocExport,
                        onClick: () => console.log(selectedRowsId)
                      },
                      {
                        label: 'Импорт',
                        iconLeft: IconUpload,
                        onClick: () => console.log(selectedRowsId)
                      },
                      {
                        label: 'Удалить',
                        iconLeft: IconTrash,
                        disabled: !selectedRowsId.length,
                        onClick: () => console.log(selectedRowsId)
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
          onSortByProps={setSortSetting}
        />
      </Layout>

      <SharedPagination
        pagination={pagination}
        setCurrentPage={setCurrentPage}
        setDisplayedRows={setDisplayedRows}
      />
    </Layout>
  )
}

export default Exams
