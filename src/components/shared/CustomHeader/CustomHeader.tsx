import React, { FC, ReactElement, useRef, useState } from 'react'
import { Header, HeaderLogin, HeaderModule } from '@consta/uikit/Header'
import userLogo from '../../../mockData/logos/UserLogo.png'
import cl from './CustomHeader.module.scss'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconComponent } from '@consta/uikit/Icon'

export type IContextMenuItem = {
  label: string
  onClick?: (params: { e: React.MouseEvent<HTMLDivElement>; item: IContextMenuItem }) => void
  group?: number
  iconLeft: IconComponent
}

interface IHeaderModule {
  key: string | number
  component: FC
  onCLick?: (e: React.SyntheticEvent) => void
}

interface ICustomHeader {
  leftSide?: ReactElement
  rightSide?: IHeaderModule[]
  contextMenuItems: IContextMenuItem[]
}

const CustomHeader: FC<ICustomHeader> = ({ leftSide, rightSide, contextMenuItems }) => {
  const [isLogged] = useState<boolean>(true)

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef(null)

  return (
    <>
      <Header
        leftSide={<>{leftSide}</>}
        rightSide={
          <>
            {rightSide?.map((item) => (
              <item.component key={item.key} />
            ))}
            <HeaderModule indent={'m'}>
              <HeaderLogin
                ref={menuRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cl.headerLogin}
                isLogged={isLogged}
                personName='Наруто Удзумаки'
                personInfo='Хокаге'
                personStatus='available'
                personAvatarUrl={userLogo}
              />
            </HeaderModule>
          </>
        }
      />
      <ContextMenu
        size={'xs'}
        items={contextMenuItems}
        isOpen={isMenuOpen}
        anchorRef={menuRef}
        className={cl.headerContextMenu}
        onClickOutside={() => setIsMenuOpen(false)}
        getItemGroupId={(item) => item.group}
        getItemLeftIcon={(item) => item.iconLeft}
        offset={'s'}
        getItemOnClick={(item) => item.onClick}
      />
    </>
  )
}

export default CustomHeader
