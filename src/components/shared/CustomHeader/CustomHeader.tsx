import React, { FC, ReactElement, useRef, useState } from 'react'
import { Header, HeaderLogin, HeaderModule } from '@consta/uikit/Header'
import userLogo from '../../../mockData/logos/UserLogo.png'
import { useLogout } from '../../../hooks/authHooks'
import cl from './CustomHeader.module.scss'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconComponent } from '@consta/uikit/Icon'
import { IconUser } from '@consta/uikit/IconUser'
import { IconSettings } from '@consta/uikit/IconSettings'
import { IconScreen } from '@consta/uikit/IconScreen'
import { IconExit } from '@consta/uikit/IconExit'

export type contextMenuItem = {
  label: string
  onClick?: (params: { e: React.MouseEvent<HTMLDivElement>; item: contextMenuItem }) => void
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
}

const CustomHeader: FC<ICustomHeader> = ({ leftSide, rightSide }) => {
  const [isLogged] = useState<boolean>(true)
  const clickHandler = useLogout()

  const items: contextMenuItem[] = [
    {
      label: 'Профиль',
      group: 1,
      iconLeft: IconUser
    },
    {
      label: 'Настройки',
      group: 1,
      iconLeft: IconSettings
    },
    {
      label: 'Проверка',
      group: 1,
      iconLeft: IconScreen
    },
    {
      label: 'Выход',
      onClick: () => {
        clickHandler()
      },
      group: 2,
      iconLeft: IconExit
    }
  ]

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
        items={items}
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
