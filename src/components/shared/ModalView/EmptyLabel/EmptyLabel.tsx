import React, { FC } from 'react'
import cl from './EmptyLabel.module.scss'

const EmptyLabel: FC = () => {
  return <div className={cl.label}></div>
}

export default EmptyLabel
