import React, {FC} from 'react'
import cl from './TwoRowCell.module.scss'
import {Text} from '@consta/uikit/Text'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface ITwoRowCellProp {
  firstRow?: string
  secondRow?: string
}

const TwoRowCell: FC<ITwoRowCellProp> = ({ firstRow, secondRow }) => {
  return (
    <div className={cl.TwoRowCell}>
      <Text size={'s'} truncate={true}>
        {firstRow}
      </Text>
      <Text size={'2xs'} truncate={true} view={'secondary'}>
        {secondRow}
      </Text>
    </div>
  )
}

export default TwoRowCell
