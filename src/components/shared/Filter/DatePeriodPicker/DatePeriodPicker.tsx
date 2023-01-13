import React, { FC } from 'react'
import cl from './DatePeriodPicker.module.scss'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { DatePicker } from '@consta/uikit/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { minDate } from './DatePickerConfig'

interface IDatePeriodPickerProp {
  value?: [Dayjs, Dayjs] | [Dayjs]
  onChange: (value: [Dayjs, Dayjs]) => void
}

const DatePeriodPicker: FC<IDatePeriodPickerProp> = ({ value, onChange }) => {
  let firstDate: Dayjs | undefined
  let secondDate: Dayjs | undefined

  if (value) {
    firstDate = value[0]
    secondDate = value[1]
  }

  return (
    <DatePicker
      minDate={minDate}
      className={cl.datePickerField}
      size={'s'}
      type='date-range'
      value={[firstDate?.toDate() || new Date(), secondDate?.toDate()]}
      onChange={(props) => {
        onChange([
          dayjs(props.value && props.value[0]).startOf('D'),
          dayjs(props.value && props.value[1]).endOf('D')
        ])
      }}
      rightSide={[IconCalendar, IconCalendar]}
    />
  )
}

export default DatePeriodPicker
