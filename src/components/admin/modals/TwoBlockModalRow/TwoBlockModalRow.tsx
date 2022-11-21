import React, { FC } from 'react'
import { Text } from '@consta/uikit/Text'
import cl from './TwoBlockModalRow.module.scss'

// TYPES
interface ITwoBlockModalRowProp {
  title: string
  content: string | number | JSX.Element
}

const TwoBlockModalRow: FC<ITwoBlockModalRowProp> = ({ title, content }) => {
  return (
    <tr className={cl.tableRow}>
      <td className={cl.titleColumn}>
        <Text size={'s'} align={'left'} view={'ghost'}>
          {title}
        </Text>
      </td>
      <td className={cl.contentColumn}>
        <Text size={'s'} align={'left'}>
          {content}
        </Text>
      </td>
    </tr>
  )
}

export default TwoBlockModalRow
