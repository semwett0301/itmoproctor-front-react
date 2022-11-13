import React, { FC } from 'react'
import cl from './DatePeriodPicker.module.scss'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { DatePicker, DatePickerPropOnChange } from '@consta/uikit/DatePicker'
import { Dayjs } from 'dayjs'
import { minDate } from './DatePickerConfig'

interface IDatePeriodPickerProp {
  value: [Dayjs, Dayjs]
  onChange: DatePickerPropOnChange<'date-range'>
}

const DatePeriodPicker: FC<IDatePeriodPickerProp> = ({ value, onChange }) => {
  return (
    <DatePicker
      minDate={minDate}
      className={cl.datePickerField}
      size={'s'}
      type='date-range'
      value={[value[0].toDate(), value[1].toDate()]}
      onChange={onChange}
      rightSide={[IconCalendar, IconCalendar]}
    />
  )
}

export default DatePeriodPicker
