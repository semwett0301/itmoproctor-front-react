import React, {FC} from 'react'
import {withTooltip} from '@consta/uikit/withTooltip'
import {Text} from '@consta/uikit/Text'
import cl from './TextWithTooltip.module.scss'
import {classJoiner} from '../../../../utils/common/styleClassesUtills';

// TYPES
interface ITextWithTooltipProp {
  children?: never
  text: string
  tooltipText?: string
  isLinkable?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const TextWithTooltip: FC<ITextWithTooltipProp> = ({ text, tooltipText, isLinkable, onClick }) => {
  const WithToolTip = withTooltip({
    mode: 'mouseover',
    content: tooltipText,
    direction: 'upStartLeft',
    appearTimeout: 400,
    possibleDirections: ['upStartRight'],
    size: 'l'
  })(Text)
  return tooltipText ? (
    <WithToolTip as={'div'} onClick={onClick} size={'s'} truncate={true} className={classJoiner(cl.text, isLinkable && cl.linkText)}>
      {text}
    </WithToolTip>
  ) : (
    <Text as={'div'} onClick={onClick} size={'s'} truncate={true} className={classJoiner(cl.text, isLinkable && cl.linkText)}>
      {text}
    </Text>
  )
}

export default TextWithTooltip
