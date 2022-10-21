import React, { FC, useRef, useState } from 'react'
import cl from './FilterField.module.scss'
import { Button } from '@consta/uikit/Button'
import { DatePicker } from '@consta/uikit/DatePicker'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { TextField } from '@consta/uikit/TextField'
import { IconSearch } from '@consta/uikit/IconSearch'
import { DefaultItem, Select } from '@consta/uikit/Select'
import { Layout } from '@consta/uikit/Layout'
import { IconBento } from '@consta/uikit/IconBento'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconComponent } from '@consta/uikit/Icon'
import { IconAdd } from '@consta/uikit/IconAdd'
import { IconEdit } from '@consta/uikit/IconEdit'
import { IconRevert } from '@consta/uikit/IconRevert'
import { IconCopy } from '@consta/uikit/IconCopy'
import { IconDocExport } from '@consta/uikit/IconDocExport'
import { IconUpload } from '@consta/uikit/IconUpload'
import { IconTrash } from '@consta/uikit/IconTrash'
import { Combobox } from '@consta/uikit/Combobox'
import { SelectItem } from '@consta/uikit/__internal__/src/components/SelectComponents/SelectItem/SelectItem'
import StatusTag, { TagPropStatus } from './StatusTag/StatusTag'
import { IFilter } from '../../admin/exams/Exams'

type contextMenuItem = {
  label: string
  iconLeft: IconComponent
}

export const organizationsList: DefaultItem[] = [
  {
    label: 'Университет ИТМО',
    id: 1
  },
  {
    label: 'ВШЭ',
    id: 2
  },
  {
    label: 'ДВФУ',
    id: 3
  },
  {
    label: 'Политех',
    id: 4
  },
  {
    label: 'Ростехнадзор',
    id: 5
  },
  {
    label: 'ТГУ',
    id: 6
  }
]

export type statusComboboxItem = {
  label: string
  id: TagPropStatus
  disabled: false
}

export const statusList: statusComboboxItem[] = [
  {
    label: 'Кроме запланированных',
    id: 'exceptPlanned',
    disabled: false
  },
  {
    label: 'Не запланирован',
    id: 'unplanned',
    disabled: false
  },
  {
    label: 'Запланирован',
    id: 'planned',
    disabled: false
  },
  {
    label: 'Ожидает',
    id: 'waiting',
    disabled: false
  },
  {
    label: 'Идет (без проктора)',
    id: 'withoutProctor',
    disabled: false
  },
  {
    label: 'Идет (с проктором)',
    id: 'withProctor',
    disabled: false
  },
  {
    label: 'Идет (асинхронно)',
    id: 'async',
    disabled: false
  },
  {
    label: 'Формируется протокол',
    id: 'forming',
    disabled: false
  },
  {
    label: 'Ожидается заключение',
    id: 'conclusionWaiting',
    disabled: false
  },
  {
    label: 'На проверке',
    id: 'review',
    disabled: false
  },
  {
    label: 'Принят',
    id: 'success',
    disabled: false
  },
  {
    label: 'Прерван',
    id: 'interrupted',
    disabled: false
  },
  {
    label: 'Пропущен',
    id: 'missed',
    disabled: false
  },
  {
    label: 'Неявка',
    id: 'noAppearance',
    disabled: false
  }
]

const typesList: DefaultItem[] = [
  {
    label: 'Асинхронный',

    id: 1
  },
  {
    label: 'Синхроннный',
    id: 2
  }
]

const contextMenuItems: contextMenuItem[] = [
  { label: 'Добавить', iconLeft: IconAdd },
  { label: 'Изменить', iconLeft: IconEdit },
  { label: 'Сбросить', iconLeft: IconRevert },
  { label: 'Дублировать', iconLeft: IconCopy },
  { label: 'Скачать (csv)', iconLeft: IconDocExport },
  { label: 'Импорт', iconLeft: IconUpload },
  { label: 'Удалить', iconLeft: IconTrash }
]

interface IFilterHandlers {
  datePicker: (value: [Date?, Date?] | null) => void
}

interface IFilterField {
  filter: IFilter
  filterHandlers: IFilterHandlers
}

const FilterField: FC<IFilterField> = ({ filter, filterHandlers }) => {
  console.log(filter)

  const [datePeriod, setDatePeriod] = useState<[Date?, Date?] | null>([new Date(), new Date()])

  const [examType, setExamType] = useState<DefaultItem | null>()
  const [organizations, setOrganizations] = useState<DefaultItem[] | null>([organizationsList[0]])
  const [status, setStatus] = useState<statusComboboxItem[] | null>([statusList[1]])

  const tooltipAnchor = useRef<HTMLButtonElement>(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const [searchField, setSearchField] = useState<string | null>(null)
  const tooltipAnchorOnClick = (): void => {
    setIsPopoverVisible(!isPopoverVisible)
  }

  return (
    <Layout direction={'column'} className={cl.wrapper}>
      <Layout direction={'row'} className={cl.rowWrapper}>
        <Layout>
          <DatePicker
            className={cl.datePickerField}
            size={'s'}
            type='date-range'
            value={filter.date}
            onChange={({ value }) => filterHandlers.datePicker(value)}
            rightSide={[IconCalendar, IconCalendar]}
          />
        </Layout>

        <Layout flex={1}>
          <TextField
            onChange={({ value }) => setSearchField(value)}
            value={searchField}
            placeholder='Поиск по экзамену'
            leftSide={IconSearch}
            width={'full'}
            size='s'
          />
        </Layout>

        <Layout>
          <Button
            size='s'
            view='secondary'
            onlyIcon={true}
            iconRight={IconBento}
            ref={tooltipAnchor}
            onClick={tooltipAnchorOnClick}
          />
          <ContextMenu
            className={cl.contextMenu}
            size={'xs'}
            items={contextMenuItems}
            isOpen={isPopoverVisible}
            anchorRef={tooltipAnchor}
            getItemLeftIcon={(item) => item.iconLeft}
            onClickOutside={() => setIsPopoverVisible(false)}
          />
        </Layout>
      </Layout>

      <Layout direction={'row'} className={cl.rowWrapper}>
        <Layout flex={2}>
          <Select
            items={typesList}
            value={examType}
            onChange={({ value }) => setExamType(value)}
            placeholder='Тип'
            size='s'
          />
        </Layout>

        <Layout flex={3} style={{ position: 'relative' }}>
          <Combobox
            size='s'
            placeholder={'Статус'}
            className={cl.combobox}
            items={statusList}
            multiple={true}
            value={status}
            onChange={({ value }) => setStatus(value)}
            renderValue={(props) => (
              <StatusTag
                key={props.item.id}
                status={props.item.id}
                item={props.item}
                onCancel={props.handleRemove}
              />
            )}
            renderItem={({ item, hovered, active, onClick, onMouseEnter }) => (
              <SelectItem
                label={item.label}
                active={active}
                hovered={hovered}
                multiple={true}
                size={'s'}
                indent={'normal'}
                disabled={item.disabled}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                className={cl.yellow}
              />
            )}
          />
        </Layout>
        <Layout flex={5}>
          <Combobox
            items={organizationsList}
            value={organizations}
            multiple={true}
            onChange={({ value }) => setOrganizations(value)}
            placeholder='Правообладатель'
            size='s'
          />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default FilterField
