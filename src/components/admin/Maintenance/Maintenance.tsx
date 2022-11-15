import React, { FC, useEffect, useState } from 'react'
import cl from './Maintenance.module.scss'
import { Layout } from '@consta/uikit/Layout'
import { usePagination } from '../../../hooks/paginationHooks'
import FilterConstructor from '../../shared/Filter/FilterConstructor'
import DatePeriodPicker from '../../shared/Filter/DatePeriodPicker/DatePeriodPicker'
import FilterButton from '../../shared/Filter/FilterButton/FilterButton'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconTrash } from '@consta/uikit/IconTrash'
import { Button } from '@consta/uikit/Button'
import { IconRestart } from '@consta/uikit/IconRestart'
import { request } from '../../../api/axios/request'
import { IconBento } from '@consta/uikit/IconBento'
import { useFlag } from '@consta/uikit/useFlag'
import { Position } from '@consta/uikit/Popover'
import { IMaintenanceTableModel } from './maintenanceTableModel'
import { IMaintenanceRow } from '../../../ts/interfaces/IMaintenance'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import dayjs, { Dayjs } from 'dayjs'

// TYPES
interface IFilter {
  date: [Dayjs, Dayjs]
}

const Maintenance: FC = () => {
  // pagination
  const [pagination, setPagination, setTotal] = usePagination()

  // filter
  // filterState
  const [{ date }, setFilter] = useState<IFilter>({
    date: [dayjs(), dayjs()]
  })

  // filter setters

  const setDatePeriod = (value: [Dayjs, Dayjs]): void => {
    const newValue: [Dayjs, Dayjs] = [dayjs(), dayjs()]
    if (value && value[0]) {
      newValue[0] = dayjs(value[0])
    }
    if (value && value[1]) {
      newValue[1] = dayjs(value[1])
    }

    setFilter((prevState) => ({
      ...prevState,
      date: newValue
    }))
  }

  const [isTableMenuOpen, setIsTableMenuOpen] = useFlag(true)
  const [tableMenuPosition, setTableMenuPosition] = useState<Position>(undefined)

  // Exams table
  const [fullRows, setFullRows] = useState<IMaintenanceTableModel[]>([])
  const [selectedRowsId, setSelectedRowsId] = useState<string[]>([])

  useEffect(() => {
    const getMaintenance = async (): Promise<void> => {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: 0
      }))
      await request.maintenance
        .getMaintenance({
          from: date[0].toISOString(),
          to: null,
          page: pagination.currentPage + 1,
          rows: pagination.displayedRows.id
        })
        .then((r) => {
          console.log(r)
          setTotal(r.data.total)
          if (r.data.rows.length > 0) {
            const obj: IMaintenanceTableModel[] = r.data.rows.map((item: IMaintenanceRow) => {
              return {
                id: item._id,
                selected: false,
                beginDate: <DateCell date={item.beginDate} />,
                endDate: <DateCell date={item.endDate} />,
                created: <DateCell date={item.created} />,
                active: item.active,
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
            })

            setFullRows(obj)
          } else setFullRows([])
        })
    }
    getMaintenance().catch((e) => console.log(e))
  }, [date])

  return (
    <Layout direction={'column'} className={cl.maintenance}>
      <FilterConstructor
        items={[
          {
            key: '1',
            components: [
              {
                key: 'date',
                component: (
                  <DatePeriodPicker value={date} onChange={(value) => setDatePeriod(value)} />
                )
              },
              {
                key: 'gap;',
                component: <></>,
                flex: 1
              },
              {
                key: 'reload_btn',
                component: (
                  <Button onlyIcon={true} iconLeft={IconRestart} size={'s'} view={'secondary'} />
                )
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
      <Layout flex={1}>
        {/* <SharedTable<IMaintenanceTableModel> */}
        {/*   className={cl.table} */}
        {/*   rows={fullRows} */}
        {/*   setRows={setFullRows} */}
        {/*   columns={maintenanceColumns} */}
        {/*   contextMenuItems={[ */}
        {/*     { label: 'Изменить', iconLeft: IconEdit }, */}
        {/*     { label: 'Удалить', iconLeft: IconTrash } */}
        {/*   ]} */}
        {/*   isMenuOpen={isTableMenuOpen} */}
        {/*   menuPosition={tableMenuPosition} */}
        {/*   closeMenu={setIsTableMenuOpen.off} */}
        {/*   selectedRows={selectedRowsId} */}
        {/*   setSelectedRows={setSelectedRowsId} */}
        {/* /> */}
      </Layout>
    </Layout>
  )
}

export default Maintenance
