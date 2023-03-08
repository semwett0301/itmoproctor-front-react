import React, {FC} from 'react';
import dayjs from 'dayjs';
import TwoRowCell from '../TwoRowCell/TwoRowCell';

// TYPES
interface IDateCellProp {
  date?: string;
  noSecondRow?: boolean;
  dateFormat?: string
  timeFormat?: string
}

const DateCell: FC<IDateCellProp> = ({ date,dateFormat, timeFormat, noSecondRow = false }) => {
  return (
    <TwoRowCell firstRow={date ? dateFormat ? dayjs(date).format(dateFormat) : dayjs(date).format('DD.MM.YYYY') : ''}
                secondRow={!noSecondRow && date ? timeFormat ? dayjs(date).format(timeFormat) : dayjs(date).format('hh:mm') : ''} />
  );
};

export default DateCell;
