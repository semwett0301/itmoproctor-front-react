import React, { FC } from 'react'
import { withTooltip } from '@consta/uikit/withTooltip'
import { Text } from '@consta/uikit/Text'
import cl from './TextWithTooltip.module.scss'

// TYPES
interface ITextWithTooltipProp {
  children?: never
  text: string
  tooltipText?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const TextWithTooltip: FC<ITextWithTooltipProp> = ({ text, tooltipText, onClick }) => {
  const WithToolTip = withTooltip({
    mode: 'mouseover',
    content: tooltipText,
    direction: 'upStartLeft',
    appearTimeout: 400,
    possibleDirections: ['upStartRight'],
    size: 'l'
  })(Text)
  return tooltipText ? (
    <WithToolTip as={'div'} onClick={onClick} size={'s'} truncate={true} className={cl.text}>
      {text}
    </WithToolTip>
  ) : (
    <Text as={'div'} onClick={onClick} size={'s'} truncate={true} className={cl.text}>
      {text}
    </Text>
  )
}

export default TextWithTooltip
