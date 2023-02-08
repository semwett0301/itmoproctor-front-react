import React, {FC} from 'react'
import cn from './IconWithTooltip.module.scss'
import {IconComponent} from '@consta/uikit/Icon'
import {TooltipProps, withTooltip} from '@consta/uikit/withTooltip'
import {IconProps} from '@consta/uikit/__internal__/src/icons/Icon/Icon'

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IIconWithTooltipProp {
  icon: IconComponent
  tooltipProps: TooltipProps
  iconProps?: IconProps
}

const IconWithTooltip: FC<IIconWithTooltipProp> = ({ icon, tooltipProps, iconProps }) => {
  const IconTooltip = withTooltip({ content: 'Текст тултипа', appearTimeout: 200 })(icon)
  return <IconTooltip size='s' className={cn.icon} {...iconProps} tooltipProps={tooltipProps} />
}

export default IconWithTooltip
