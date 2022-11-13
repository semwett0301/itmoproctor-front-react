import React, { FC, useState } from 'react'
import cl from './Exams.module.scss'
import { request } from '../../../api/axios/request'
import { IExamRow } from '../../../ts/interfaces/IExams'
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
import TypeBadge from '../../shared/SharedTable/TypeBadge/TypeBadge'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { useOpenTab } from '../Admin'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconDocExport } from '@consta/uikit/IconDocExport'
import { IconUpload } from '@consta/uikit/IconUpload'
import { IconTrash } from '@consta/uikit/IconTrash'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'
import StatusBadge, {
  customBadgePropStatus,
  getExamStatus
} from '../../shared/SharedTable/StatusBadge/StatusBadge'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import { usePagination } from '../../../hooks/paginationHooks'
import ExamStatusCombobox, {
  StatusComboboxItem,
  statusList
} from '../../shared/Filter/ExamStatusCombobox/ExamStatusCombobox'
import ExamTypeSelect, { typeItem } from '../../shared/Filter/ExamTypeSelect/ExamTypeSelect'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import SearchField from '../../shared/Filter/SearchField/SearchField'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import OrganizationSelect from '../../shared/Filter/OrganizationSelect/OrganizationSelect'
import { IOrganization } from '../../../ts/interfaces/IOrganizations'
import { Layout } from '@consta/uikit/Layout'
import { getFullName, getProctorName } from '../../../utils/nameHelper'
import { examsColumn, IExamsTableModel } from './examsTableModel'
import { useTableRequest } from '../../../hooks/useTableRequest'
import MoreButton from '../../shared/SharedTable/MoreButton/MoreButton'
import dayjs, { Dayjs } from 'dayjs'
import { Checkbox } from '@consta/uikit/Checkbox'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import TextWithTooltip from '../../shared/SharedTable/TextWithTooltip/TextWithTooltip'

interface IFilter {
  date: [Dayjs, Dayjs]
  searchQuery: string | null
  type: typeItem | null
  status: StatusComboboxItem[] | null
  organizations: IOrganization[] | null
}

const Exams: FC = () => {
  const { openTab } = useOpenTab()

  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)
  const [organizationsIds, setOrganizationsIds] = useState<string[]>([])

  // filter
  // filterState
  const [filter, setFilter] = useState<IFilter>({
    date: [dayjs(), dayjs()],
    searchQuery: null,
    type: null,
    status: [statusList[0]],
    organizations: null
  })

  // filter setters

  const setDatePeriod = (value: [Date?, Date?] | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      date: [dayjs(value && value[0]), dayjs(value && value[1])]
    }))
  }

  const setSearchQuery = (query: string | null): void =>
    setFilter((prevState) => ({
      ...prevState,
      searchQuery: query
    }))

  const setType = (item: typeItem | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      type: item
    }))
  }

  const setStatus = (item: StatusComboboxItem[] | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      status: item
    }))
  }

  const setOrganizations = (item: IOrganization[] | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      organizations: item
    }))
  }

  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  // Exams table request
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  const { isLoading, rows, setRows } = useTableRequest(
    () =>
      request.exam
        .getListOfExams({
          from: dayjs(filter.date[0]).startOf('D').toISOString(),
          to: dayjs(filter.date[1]).endOf('D').toISOString(),
          text: filter.searchQuery,
          status: filter.status
            ? filter.status
                .map((item) => {
                  if (item.getStatus) {
                    return item.getStatus
                  }
                })
                .filter((item) => item != null)
                .join(',')
            : null,
          reset: null, // filter.status?.filter((e) => e.groupId === 2)[0].getStatus as boolean | null,
          organization: filter.organizations
            ? filter.organizations.map((item) => item._id).join(',')
            : null,
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
              const row: IExamsTableModel = {
                async: item.async,
                id: item._id,
                selected: false,
                listener: (
                  <TextWithTooltip
                    text={getFullName(
                      item.student.lastname,
                      item.student.firstname,
                      item.student.middlename
                    )}
                    tooltipText={
                      'Профиль слушателя – ' +
                      getFullName(
                        item.student.lastname,
                        item.student.firstname,
                        item.student.middlename
                      )
                    }
                  />
                ),
                proctor: (
                  <TextWithTooltip
                    text={getProctorName(item.async, item.inspector, item.expert).shortName}
                    tooltipText={
                      'Профиль проктора – ' +
                      getProctorName(item.async, item.inspector, item.expert).fullName
                    }
                    onClick={() =>
                      console.log(getProctorName(item.async, item.inspector, item.expert))
                    }
                  />
                ),
                exam: (
                  <TwoRowCell
                    firstRow={item.subject}
                    secondRow={item.assignment}
                    tooltipText={'Карточка экзамена – ' + item.subject}
                  />
                ),
                type: <TypeBadge async={item.async} />,
                start: <DateCell date={item.startDate} />,
                status: <StatusBadge status={customBadgePropStatus[getExamStatus(item)]} />,
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
                        onClick: () => console.log(item._id)
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
                  />
                )
              }
              return row
            })
            return obj
          } else return []
        }),
    [filter.date, filter.type, filter.status, filter.organizations, filter.searchQuery],
    [pagination.displayedRows, pagination.currentPage],
    () => {
      setTotal(0)
      setPagination((prevState) => ({
        ...prevState,
        currentPage: 0
      }))
    }
  )

  examsColumn[1].title = (
    <Checkbox
      checked={pagination.displayedRows.id === selectedRowsId.length && !!pagination.totalRows}
      onClick={() =>
        pagination.displayedRows.id === selectedRowsId.length && !!pagination.totalRows
          ? setSelectedRowsId([])
          : setSelectedRowsId(rows.map((item) => item.id))
      }
    />
  )

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
                      { label: 'Сбросить', iconLeft: IconRevert },
                      { label: 'Дублировать', iconLeft: IconCopy },
                      { label: 'Скачать (csv)', iconLeft: IconDocExport },
                      { label: 'Импорт', iconLeft: IconUpload },
                      { label: 'Удалить', iconLeft: IconTrash }
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
                  <ExamTypeSelect value={filter.type} onChange={({ value }) => setType(value)} />
                ),
                flex: 2
              },
              {
                key: 'Status',
                component: <ExamStatusCombobox value={filter.status} onChange={setStatus} />,
                flex: 4
              },
              {
                key: 'Organization',
                component: (
                  <OrganizationSelect
                    value={filter.organizations}
                    onChange={({ value }) => setOrganizations(value)}
                    organizationsIds={organizationsIds}
                  />
                ),
                flex: 4
              }
            ]
          }
        ]}
      />

      <Layout flex={1} className={cl.tableLayout}>
        <SharedTable<IExamsTableModel>
          isLoading={isLoading}
          className={cl.table}
          rows={rows}
          setRows={setRows}
          columns={examsColumn}
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

export default Exams
