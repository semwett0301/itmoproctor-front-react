import React, { FC } from 'react'
import cl from '../FilterField.module.scss'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { DatePicker, DatePickerPropOnChange } from '@consta/uikit/DatePicker'

interface IDatePeriodPickerProp {
  value: [Date, Date]
  onChange: DatePickerPropOnChange<'date-range'>
}

const DatePeriodPicker: FC<IDatePeriodPickerProp> = ({ value, onChange }) => {
  return (
    <DatePicker
      className={cl.datePickerField}
      size={'s'}
      type='date-range'
      value={value}
      onChange={onChange}
      rightSide={[IconCalendar, IconCalendar]}
    />
  )
}

export default DatePeriodPicker
