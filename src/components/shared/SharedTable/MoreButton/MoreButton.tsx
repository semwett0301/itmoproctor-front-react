import React, {FC, useRef} from 'react'
import {IconBento} from '@consta/uikit/IconBento'
import {Button} from '@consta/uikit/Button'
import cl from '../SharedTable.module.scss'
import {ContextMenu} from '@consta/uikit/ContextMenu'
import {useFlag} from '@consta/uikit/useFlag'
import {IContextMenuItem} from '../../CustomHeader/CustomHeader'

// TYPES

type IMoreButtonProps = {
  items: IContextMenuItem[]
}

const MoreButton: FC<IMoreButtonProps> = ({ items }) => {
  const [isMenuOpen, setIsMenuOpen] = useFlag(false)
  const anchorRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Button
        size='xs'
        onlyIcon
        iconRight={IconBento}
        view='secondary'
        onClick={() => setIsMenuOpen.toogle()}
        ref={anchorRef}
      />
      <ContextMenu
        size='xs'
        direction={'leftCenter'}
        possibleDirections={['leftCenter']}
        spareDirection={'leftCenter'}
        className={cl.contextMenu}
        items={items}
        isOpen={isMenuOpen}
        offset={0}
        getItemLeftIcon={(item) => item.iconLeft}
        anchorRef={anchorRef}
        onClickOutside={setIsMenuOpen.off}
      />
    </>
  )
}

export default MoreButton
