import React, { FC, ReactElement, useRef, useState } from 'react'
import { Header, HeaderLogin, HeaderModule } from '@consta/uikit/Header'
import userLogo from '../../../mockData/logos/UserLogo.png'
import cl from './CustomHeader.module.scss'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconComponent } from '@consta/uikit/Icon'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { getShortName } from '../../../utils/nameHelper'

export type IContextMenuItem = {
  label: string
  onClick?: (params: { e: React.MouseEvent<HTMLDivElement>; item: IContextMenuItem }) => void
  group?: number
  disabled?: boolean
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
  const user = useAppSelector((state) => state.user)

  return (
    <>
      <Header
        leftSide={<>{leftSide}</>}
        rightSide={
          <>
            {rightSide?.map((item) => (
              <item.component key={item.key} />
            ))}
            <HeaderModule indent={'l'}>
              <HeaderLogin
                ref={menuRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cl.headerLogin}
                isLogged={isLogged}
                personName={getShortName(user.firstname, user.middlename, user.lastname)}
                personInfo={user.username}
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
