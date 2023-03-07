import React, {FC, useRef, useState} from 'react'
import cl from './TwoRowCell.module.scss'
import {Text, TextPropView} from '@consta/uikit/Text'
import {Tooltip} from '@consta/uikit/Tooltip'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface ITwoRowCellProp {
  firstRow?: string
  firstView?: TextPropView
  secondRow?: string
  secondView?: TextPropView
  tooltipText?: string
  isLinkable?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const TwoRowCell: FC<ITwoRowCellProp> = ({ firstRow, firstView, secondRow, secondView, tooltipText, isLinkable, onClick }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const onEnter = (): void => {
    setIsTooltipVisible(true)
  }

  const onLeave = (): void => {
    setIsTooltipVisible(false)
  }

  return (
    <>
      <div
        className={classJoiner(cl.TwoRowCell, isLinkable && cl.linkText)}
        ref={anchorRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        <Text size={'s'} truncate={true} view={firstView}>
          {firstRow}
        </Text>
        <Text size={'2xs'} truncate={true} view={secondView ?? 'secondary'}>
          {secondRow}
        </Text>
      </div>

      {isTooltipVisible && tooltipText && (
        <Tooltip size='l' anchorRef={anchorRef} direction={'upStartLeft'} isInteractive={false}>
          {tooltipText}
        </Tooltip>
      )}
    </>
  )
}

export default TwoRowCell
