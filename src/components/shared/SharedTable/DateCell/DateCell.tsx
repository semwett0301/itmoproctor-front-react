import React, { FC } from 'react';
import dayjs from 'dayjs';
import TwoRowCell from '../TwoRowCell/TwoRowCell';

// TYPES
interface IDateCellProp {
  date?: string;
  noSecondRow?: boolean;
}

const DateCell: FC<IDateCellProp> = ({ date, noSecondRow = false }) => {
  return (
    <TwoRowCell firstRow={date ? dayjs(date).format('DD.MM.YYYY') : 'Дата'}
                secondRow={!noSecondRow && date ? dayjs(date).format('hh:mm') : 'не назначена'} />
  );
};

export default DateCell;
