import React, { FC } from 'react'
import { Badge } from '@consta/uikit/Badge'
import cl from './TypeBadge.module.scss'

interface TypeBadgeProps {
  async: boolean
}

const TypeBadge: FC<TypeBadgeProps> = ({ async }) => {
  return <Badge view={'stroked'} label={async ? 'А' : 'С'} className={async ? cl.async : cl.sync} />
}

export default TypeBadge
