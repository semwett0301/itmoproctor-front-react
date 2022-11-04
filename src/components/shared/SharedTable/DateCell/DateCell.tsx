import React, {FC} from 'react'
import {Text} from '@consta/uikit/Text'
import dayjs from 'dayjs'
import cl from './DateCell.module.scss'

// TYPES
interface IDateCellProp {
  date?: string
  noSecondRow?: boolean
}

const DateCell: FC<IDateCellProp> = ({ date, noSecondRow = false }) => {
  return (
    <div className={cl.DateCell}>
      <Text size={'s'} truncate={true}>
        {dayjs(date).format('DD.MM.YYYY')}
      </Text>
      {!noSecondRow && (
        <Text size={'2xs'} truncate={true} view={'secondary'}>
          {dayjs(date).format('hh:mm')}
        </Text>
      )}
    </div>
  )
}

export default DateCell
