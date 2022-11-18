import React, { FC } from 'react'
import cl from './HeaderCell.module.scss'
import { Text } from '@consta/uikit/Text'

// TYPES
interface IHeaderCellProp {
  title: string
}

const HeaderCell: FC<IHeaderCellProp> = ({ title }) => {
  return (
    <Text as={'div'} className={cl.cell} size={'xs'}>
      {title}
    </Text>
  )
}

export default HeaderCell
