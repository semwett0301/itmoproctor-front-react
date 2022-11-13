import React, { FC } from 'react'
import { Badge } from '@consta/uikit/Badge'
import cl from './TypeBadge.module.scss'
import { withTooltip } from '@consta/uikit/withTooltip'

interface TypeBadgeProps {
  async: boolean
}

const TypeBadge: FC<TypeBadgeProps> = ({ async }) => {
  const BadgeWithTooltip = withTooltip({
    content: async ? 'Асинхронный' : 'Синхронный',
    mode: 'mouseover'
  })(Badge)
  return (
    <BadgeWithTooltip
      view={'stroked'}
      label={async ? 'А' : 'С'}
      className={async ? cl.async : cl.sync}
    />
  )
}

export default TypeBadge
