import React, { FC, useRef, useState } from 'react'
import { Button } from '@consta/uikit/Button'
import { IconBento } from '@consta/uikit/IconBento'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import cl from '../FilterConstructor.module.scss'
import { IContextMenuItem } from '../../CustomHeader/CustomHeader'

interface IFilterButtonProp {
  MenuItems: IContextMenuItem[]
}

// CONSTANTS

// DEFAULT FUNCTIONS

const FilterButton: FC<IFilterButtonProp> = ({ MenuItems }) => {
  const tooltipAnchor = useRef<HTMLButtonElement>(null)
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)

  const tooltipAnchorOnClick = (): void => {
    setIsPopoverVisible(!isPopoverVisible)
  }

  return (
    <>
      <Button
        size='s'
        view='secondary'
        onlyIcon={true}
        iconRight={IconBento}
        ref={tooltipAnchor}
        onClick={tooltipAnchorOnClick}
      />
      <ContextMenu
        className={cl.contextMenu}
        size={'xs'}
        items={MenuItems}
        isOpen={isPopoverVisible}
        anchorRef={tooltipAnchor}
        getItemLeftIcon={(item) => item.iconLeft}
        getItemOnClick={(item) => item.onClick}
        onClickOutside={() => setIsPopoverVisible(false)}
      />
    </>
  )
}

export default FilterButton
