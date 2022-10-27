import React, { FC, useEffect, useState } from 'react'
import cl from './exams.module.scss'
import { request } from '../../../api/axios/request'
import { IExams } from '../../../ts/interfaces/IExams'
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell'
import TypeBadge from '../../shared/SharedTable/TypeBadge/TypeBadge'
import { Button } from '@consta/uikit/Button'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconBento } from '@consta/uikit/IconBento'
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
  getExamStatus,
  getProctorName
} from '../../shared/SharedTable/StatusBadge/StatusBadge'
import { examsColumn, ExamsTableData } from './examsTableData'
import SharedTable from '../../shared/SharedTable/SharedTable'
import SharedPagination from '../../shared/SharedPagination/SharedPagination'
import { usePagination } from '../../../hooks/paginationHooks'
import ExamStatusCombobox, {
  statusComboboxItem,
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

interface IFilter {
  date: [Date, Date]
  searchQuery: string | null
  type: typeItem | null
  status: statusComboboxItem[] | null
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
    date: [new Date(), new Date()],
    searchQuery: null,
    type: null,
    status: [statusList[0]],
    organizations: null
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

  const setType = (item: typeItem | null): void => {
    setFilter((prevState) => ({
      ...prevState,
      type: item
    }))
  }

  const setStatus = (item: statusComboboxItem[] | null): void => {
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
  const [fullRows, setFullRows] = useState<ExamsTableData[]>([])
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  // Select rows

  useEffect(() => {
    const getExams = async (): Promise<void> => {
      await request.exam
        .getListOfExams({
          from: filter.date[0].toISOString(),
          to: filter.date[1].toISOString(),
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
          reset: null, // false,
          organization: filter.organizations
            ? filter.organizations.map((item) => item._id).join('&')
            : null,
          myStudents: false,
          async: filter.type ? filter.type.flag : null,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          setOrganizationsIds(() => r.data.organizations)
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            const obj: ExamsTableData[] = r.data.rows.map((item: IExams) => {
              const row: ExamsTableData = {
                id: item._id,
                selected: false,
                listener: `${item.student.middlename} ${item.student.firstname} ${item.student.lastname}`,
                proctor: getProctorName(item.async, item.inspector, item.expert),
                exam: <TwoRowCell firstRow={item.subject} secondRow={item.assignment} />,
                type: <TypeBadge async={item.async} />,
                start: <TwoRowCell firstRow={item.startDate} secondRow={item.endDate} />,
                status: <StatusBadge status={customBadgePropStatus[getExamStatus(item)]} />,
                check: null,
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

    getExams().catch((e) => console.log(e))
  }, [
    filter.date,
    filter.type,
    filter.status,
    filter.organizations,
    filter.searchQuery,
    pagination.displayedRows,
    pagination.currentPage
  ])
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
                flex: 3
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
                flex: 5
              }
            ]
          }
        ]}
      />

      <Layout flex={1} className={cl.table}>
        <SharedTable<ExamsTableData>
          rows={fullRows}
          setRows={setFullRows}
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
