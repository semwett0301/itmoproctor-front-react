import React, { FC, useState } from 'react'
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
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'
import { IExamRow } from '../../../ts/interfaces/IExams'
import { getProctor, getStudentName } from '../../../utils/nameHelper'
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
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
import ExamView from '../modals/ExamView/ExamView'
import ProctorView from '../modals/ProctorView/ProctorView'
import ListenerView from '../modals/ListenerView/ListenerView'
import dayjs from 'dayjs'

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
  const { isLoading, rows } = useTableRequest(
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
                listener: (
                  <TextWithTooltip
                    text={studentName}
                    tooltipText={'Профиль слушателя – ' + studentName}
                    onClick={() => openModal(<ListenerView profileId={item.student._id} />)}
                  />
                ),
                proctor: (
                  <TextWithTooltip
                    text={proctor.shortName}
                    tooltipText={
                      proctor.exists
                        ? 'Профиль проктора – ' + proctor.fullName
                        : 'Проктор на экзамен не назначен'
                    }
                    onClick={() => openModal(<ProctorView profileId={proctor.id} />)}
                  />
                ),
                exam: (
                  <TwoRowCell
                    firstRow={item.subject}
                    secondRow={item.assignment}
                    tooltipText={'Карточка экзамена – ' + item.subject}
                    onClick={() => openModal(<ExamView examId={item._id} />)}
                  />
                ),
                type: <TypeBadge async={item.async} />,
                start: item.beginDate && (
                  <TwoRowCell
                    firstRow={dayjs(item.beginDate).format('DD.MM.YYYY')}
                    secondRow={
                      dayjs(item.beginDate).format('hh:mm') +
                      (item.startDate ? dayjs(item.startDate).format(' (hh:mm)') : '')
                    }
                  />
                ),
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
                key: 'search;',
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
