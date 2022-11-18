import React, { FC } from 'react'
import TwoBlockModalRow from './TwoBlockModalRow'

export type IRowViewItem = {
  title: string
  content: string
}

interface IModalViewConstructorProps {
  items: IRowViewItem[]
}

const ModalViewConstructor: FC<IModalViewConstructorProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <TwoBlockModalRow title={item.title} content={item.content} key={item.title} />
      ))}
    </>
  )
}

export default ModalViewConstructor
