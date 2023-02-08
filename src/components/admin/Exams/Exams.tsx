// noinspection DuplicatedCode

import React, {FC, useCallback, useEffect, useState} from 'react'
import cl from './Exams.module.scss'
import {useOpenTab} from '../Admin'
import {IconAdd} from '@consta/uikit/IconAdd'
import {IconEdit} from '@consta/uikit/IconEdit'
import {IconRevert} from '@consta/uikit/IconRevert'
import {IconCopy} from '@consta/uikit/IconCopy'
import {IconDocExport} from '@consta/uikit/IconDocExport'
import {IconUpload} from '@consta/uikit/IconUpload'
import {IconTrash} from '@consta/uikit/IconTrash'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import ExamStatusCombobox from '../../shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import ExamTypeSelect from '../../shared/Filter/ExamTypeSelect/ExamTypeSelect'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import OrganizationCombobox from '../../shared/Filter/OrganizationCombobox/OrganizationCombobox'
import {Layout} from '@consta/uikit/Layout'
import {useTableRequest} from '../../../hooks/shared/tables/useTableRequest'
import {useTable} from '../../../hooks/shared/tables/useTable'
import {ExamFilter, TablesEnum} from '../../../config/store/tablesReducerConfig'
import {request} from '../../../api/axios/request'
import {IExamRow} from '../../../ts/interfaces/IExams'
import {getProctor, getShortName, getStudentName} from '../../../utils/common/nameHelper'
import TypeBadge from '../../shared/SharedTable/TypeBadge/TypeBadge'
import StatusBadge, {customBadgePropStatus, getExamStatus} from '../../shared/SharedTable/StatusBadge/StatusBadge'
import {IconVideo} from '@consta/uikit/IconVideo'
import {Button} from '@consta/uikit/Button'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import {organizationsFormat, resetFormat, statusFormat} from '../../../utils/admin/requestFormatters'
import {closeModal, openModal} from '../../shared/ModalView/ModalView'
import DeleteSubmit from '../modals/DeleteSubmit/DeleteSubmit'
import {selectAll} from '../../../utils/admin/selectAll'
import {socket} from '../../../api/socket/socket'
import AddEditExam from '../modals/AddEditExam/AddEditExam'
import {examsColumn, IExamsTableModel} from './examsTableModel'
import {adminButtonChecker} from '../../../utils/admin/adminButtonChecker';
import {deleteSelected} from '../../../utils/admin/deleteSelected';
import {useAppSelector} from '../../../hooks/store/useAppSelector';
import {IExam} from '../../../ts/interfaces/IExam';

const Exams: FC = () => {
  const {openTab} = useOpenTab()

  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  const system = useAppSelector<boolean>(state => state.user.system ?? false)

  // const [sortSetting, setSortSetting] = useState<SortByProps<IExamsTableModel> | null>(null)

  const duplicateExam = useCallback<(item: IExam | IExamRow ) => Promise<void>>(async (item) => {
    const deletedProperties: Array<keyof IExam | keyof IExamRow> = [
      '_id',
      'examCode',
      'inspector',
      'inspectorConnected',
      'expert',
      'inCheck',
      'verified',
      'beginDate',
      'endDate',
      'startDate',
      'stopDate',
      'planDate',
      'resolution',
      'videoAvailable',
      'comment',
      'note',
    ]

    deletedProperties.forEach(e => Reflect.deleteProperty(item, e))

    await request.exam.addExam(item)
  }, [])

  const castToTableRow: (item: IExamRow, update: () => Promise<IExamsTableModel[]>) => IExamsTableModel = (item, update) => {
    const proctor = getProctor(item.async, item.inspector, item.expert),
      studentName = getStudentName(item.student),
      studentShortName = getShortName(
        item.student.firstname,
        item.student.middlename,
        item.student.lastname
      )

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
      type: <TypeBadge async={item.async}/>,
      start: {startDate: item.startDate, beginDate: item.beginDate},
      status: (
        <StatusBadge
          status={customBadgePropStatus[getExamStatus(item)]}
          reset={!item.examId || !item.examId.startsWith('course-v1')}
        />
      ),
      // Если есть фактическая дата начала(startDate), то отображать
      video: item.startDate && (
        <Button
          size="xs"
          onlyIcon
          iconRight={IconVideo}
          onClick={() =>
            openTab({
              id: `exam/${item._id}${studentShortName}`,
              title: studentShortName,
              path: `exam/${item._id}`,
              type: 'exam'
            })
          }
        />
      ),
      more: (
        <MoreButton
          items={adminButtonChecker([
            {
              label: 'Изменить',
              iconLeft: IconEdit,
              onClick: () => openModal(<AddEditExam examId={item._id} onSubmit={update}/>)
            },
            {
              label: 'Сбросить',
              iconLeft: IconRevert,
              disabled: true
            },
            {
              label: 'Дублировать',
              iconLeft: IconCopy,
              onClick: async () => {
                const currentExam = await request.exam.getExam(item._id)
                await duplicateExam(currentExam.data)
                await update()
              }
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
          ], system, ['Удалить'])}
        />
      )
    }
  }

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
  const {isLoading, rows, setRows, update} = useTableRequest<IExamsTableModel>(
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

  // // sorting
  // const [sortSetting, setSortSetting] = useState<SortByProps<IExamsTableModel> | null>(null)
  //
  // const sortingFunction: (sortRows: IExamsTableModel[]) => IExamsTableModel[] = (sortRows) => {
  //   if (sortSetting) {
  //     return sortRows.sort((a, b) => {
  //       switch (sortSetting?.sortingBy) {
  //         case 'proctor': {
  //           const [firstProctorName, secondProctorName]: string[] =
  //             sortSetting.sortOrder === 'asc'
  //               ? [a.proctor.shortName, b.proctor.shortName]
  //               : [b.proctor.shortName, a.proctor.shortName]
  //           const compareProctor1 = (secondProctorName < firstProctorName) as unknown
  //           const compareProctor2 = (firstProctorName < secondProctorName) as unknown
  //           return (compareProctor1 as number) - (compareProctor2 as number)
  //         }
  //
  //         case 'exam': {
  //           const [firstExamName, secondExamName]: string[] =
  //             sortSetting.sortOrder === 'asc'
  //               ? [a.exam.subject, b.exam.subject]
  //               : [b.exam.subject, a.exam.subject]
  //           const compareExam1 = (secondExamName < firstExamName) as unknown
  //           const compareExam2 = (firstExamName < secondExamName) as unknown
  //           return (compareExam1 as number) - (compareExam2 as number)
  //         }
  //         case 'listener': {
  //           return sortSetting.sortOrder === 'asc'
  //             ? a.listener.toLowerCase().localeCompare(b.listener.toLowerCase())
  //             : b.listener.toLowerCase().localeCompare(a.listener.toLowerCase())
  //         }
  //         // case 'start':
  //         //   return sortSetting.sortOrder === 'asc'
  //         //     ? a.start.toLowerCase().localeCompare(b.start.toLowerCase())
  //         //     : b.start.toLowerCase().localeCompare(a.start.toLowerCase())
  //         default:
  //           return 0
  //       }
  //     })
  //   }
  //
  //   return sortRows
  // }

  useEffect(() => {
    socket.exams.subscribe((newRow) => {
      const newTableRow = castToTableRow(newRow, update)
      const currentRows = rows.map((e) => {
        if (e.id === newTableRow.id) {
          return newTableRow
        } else {
          return e
        }
      })
      setRows(currentRows)
    })

    return () => {
      socket.exams.unsubscribe()
    }
  }, [rows.length])

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
                    onChange={(value) => setFilter({date: value})}
                  />
                )
              },
              {
                key: 'search',
                component: (
                  <SearchField
                    placeholder={'Поиск по экзамену'}
                    onChange={({value}) => setFilter({searchQuery: value})}
                    value={filter.searchQuery}
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
                        onClick: () => openModal(<AddEditExam onSubmit={update}/>)
                      },
                      {
                        label: 'Изменить',
                        iconLeft: IconEdit,
                        onClick: () => openModal(<AddEditExam examId={selectedRowsId[0]} onSubmit={update}/>),
                        disabled: selectedRowsId.length !== 1
                      },
                      {
                        label: 'Сбросить',
                        iconLeft: IconRevert,
                        disabled: true
                      },
                      {
                        label: 'Дублировать',
                        iconLeft: IconCopy,
                        onClick: async () => {
                          for (const rowId of selectedRowsId) {
                            const exam = await request.exam.getExam(rowId)
                            await duplicateExam(exam.data)
                          }
                          await update()
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
                        onClick: () => openModal(
                          <DeleteSubmit
                            onSubmit={async () => {
                              await deleteSelected(selectedRowsId, request.exam.deleteExam)
                              closeModal()
                              await update()
                            }}
                            onCancel={() => closeModal()}
                          />),
                        disabled: !selectedRowsId.length
                      },
                    ], system, ['Удалить'])}
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
                    onChange={({value}) => setFilter({type: value})}
                  />
                ),
                flex: 2
              },
              {
                key: 'Status',
                component: (
                  <ExamStatusCombobox
                    value={filter.status}
                    onChange={(value) => setFilter({status: value})}
                  />
                ),
                flex: 4
              },
              {
                key: 'Organization',
                component: (
                  <OrganizationCombobox
                    value={filter.organizations || []}
                    onChange={({value}) => setFilter({organizations: value})}
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
          // onSortByProps={setSortSetting}
          // sortingFunction={sortingFunction}
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
