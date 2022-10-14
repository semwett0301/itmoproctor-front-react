import React, { FC, useRef, useState } from 'react'
import cl from './FilterField.module.scss'
import { Button } from '@consta/uikit/Button'
import { DatePicker } from '@consta/uikit/DatePicker'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { TextField } from '@consta/uikit/TextField'
import { FieldGroup } from '@consta/uikit/FieldGroup'
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
import { Tag } from '@consta/uikit/Tag'

type contextMenuItem = {
  label: string
  iconLeft: IconComponent
}

const organizationsList: DefaultItem[] = [
  {
    label: 'Любой правообладатель',
    id: 1
  },
  {
    label: 'Университет ИТМО',
    id: 2
  }
]

const statusList: DefaultItem[] = [
  {
    label: 'Любой статус',
    id: 1,
    disabled: false
  },
  {
    label: 'Кроме запланированных',
    id: 2,
    disabled: false
  },
  {
    label: 'Не запланирован',
    id: 3,
    disabled: false
  },
  {
    label: 'Запланирован',
    id: 4,
    disabled: false
  },
  {
    label: 'Ожидает',
    id: 5,
    disabled: false
  },
  {
    label: 'Идет (без проктора)',
    id: 6,
    disabled: false
  },
  {
    label: 'Идет (с проктором)',
    id: 7,
    disabled: false
  },
  {
    label: 'Идет (асинхронно)',
    id: 8,
    disabled: false
  },
  {
    label: 'Формируется протокол',
    id: 9,
    disabled: false
  },
  {
    label: 'Ожидается заключение',
    id: 10,
    disabled: false
  },
  {
    label: 'На проверке',
    id: 11,
    disabled: false
  },
  {
    label: 'Принят',
    id: 12,
    disabled: false
  },
  {
    label: 'Прерван',
    id: 13,
    disabled: false
  },
  {
    label: 'Пропущен',
    id: 14,
    disabled: false
  },
  {
    label: 'Неявка',
    id: 15,
    disabled: false
  }
]

const typesList: DefaultItem[] = [
  {
    label: 'Любой тип',
    id: 1
  },
  {
    label: 'Асинхронный',
    id: 2
  },
  {
    label: 'Синхроннный',
    id: 3
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

const FilterField: FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined | null>(null)
  const [endDate, setEndDate] = useState<Date | undefined | null>(null)

  const [examType, setExamType] = useState<DefaultItem | null>()
  const [organizations, setOrganizations] = useState<DefaultItem[] | null>([organizationsList[0]])
  const [status, setStatus] = useState<DefaultItem[] | null>([statusList[1]])

  const tooltipAnchor = useRef<HTMLButtonElement>(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const [searchField, setSearchField] = useState<string | null>(null)
  const tooltipAnchorOnClick = (): void => {
    setIsPopoverVisible(!isPopoverVisible)
  }

  return (
    <Layout direction='column' className={cl.wrapper}>
      <Layout direction={'row'} className={cl.rowWrapper}>
        <Layout>
          <FieldGroup size='s' className={cl.datePickerField}>
            <DatePicker
              value={startDate}
              onChange={({ value }) => setStartDate(value)}
              minDate={startDate as Date}
              maxDate={endDate as Date}
              rightSide={IconCalendar}
              size={'s'}
            />
            <DatePicker
              value={endDate}
              onChange={({ value }) => setEndDate(value)}
              minDate={startDate as Date}
              maxDate={endDate as Date}
              rightSide={IconCalendar}
              size={'s'}
            />
          </FieldGroup>
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

        <Layout flex={3}>
          <Combobox
            placeholder={'Статус'}
            className={cl.combobox}
            items={statusList}
            multiple={true}
            value={status}
            onChange={({ value }) => setStatus(value)}
            renderValue={(props) => (
              <Tag
                className={cl.selectTag}
                key={props.item.id}
                mode={'cancel'}
                label={props.item.label}
                size={'s'}
                onCancel={() => {
                  setStatus((prevState) => {
                    const newState = prevState?.filter((value) => value.id !== props.item.id)
                    return typeof newState === 'undefined' ? null : newState
                  })
                }}
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
            size='s'
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
