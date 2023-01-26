import React, { FC } from 'react'
import TwoBlockModalRow from './TwoBlockModalRow'

export type IRowViewItem = {
  title: string
  content: JSX.Element | string | null
}

interface IModalViewConstructorProps {
  items: IRowViewItem[]
}

const ModalViewConstructor: FC<IModalViewConstructorProps> = ({ items }) => {
  console.log(items)
  return (
    <table>
      <tbody>
        {items.map(
          (item) =>
            item.content !== null && (
              <TwoBlockModalRow title={item.title} content={item.content} key={item.title} />
            )
        )}
      </tbody>
    </table>
  )
}

export default ModalViewConstructor
