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

const FilterField: FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const [examType, setExamType] = useState<DefaultItem | null>()

  const [organizations, setOrganizations] = useState<DefaultItem[] | null>([organizationsList[0]])

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const tooltipAnchor = useRef<HTMLButtonElement>(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const tooltipAnchorOnClick = (): void => {
    setIsPopoverVisible(!isPopoverVisible)
  }

  const contextMenuItems: contextMenuItem[] = [
    { label: 'Добавить', iconLeft: IconAdd },
    { label: 'Изменить', iconLeft: IconEdit },
    { label: 'Сбросить', iconLeft: IconRevert },
    { label: 'Дублировать', iconLeft: IconCopy },
    { label: 'Скачать (csv)', iconLeft: IconDocExport },
    { label: 'Импорт', iconLeft: IconUpload },
    { label: 'Удалить', iconLeft: IconTrash }
  ]

  return (
    <Layout direction='column' className={cl.wrapper}>
      <Layout direction={'row'} className={cl.rowWrapper}>
        <Layout>
          <FieldGroup size='s' className={cl.datePickerField}>
            <DatePicker
              value={startDate}
              onChange={({ value }) => setStartDate(value)}
              rightSide={IconCalendar}
              size={'s'}
            />
            <DatePicker
              value={endDate}
              onChange={({ value }) => setEndDate(value)}
              rightSide={IconCalendar}
              size={'s'}
            />
          </FieldGroup>
        </Layout>

        <Layout flex={1}>
          <TextField
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
            items={organizationsList}
            onChange={({ value }) => setExamType(value)}
            placeholder='Тип'
            size='s'
          />
        </Layout>

        <Layout flex={3}>
          <Select
            items={organizationsList}
            onChange={({ value }) => setExamType(value)}
            placeholder='Статус'
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
