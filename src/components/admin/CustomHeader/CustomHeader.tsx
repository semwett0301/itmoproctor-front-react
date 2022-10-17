import React, { FC, useEffect, useRef, useState } from 'react'
import { Header, HeaderLogin, HeaderLogo, HeaderModule } from '@consta/uikit/Header'
import logo from '../../../mockData/logos/Group_12df.svg'
import userLogo from '../../../mockData/logos/UserLogo.png'
import { useLogout } from '../../../hooks/authHooks'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { Text } from '@consta/uikit/Text'
import cl from './CustomHeader.module.scss'
import { IconWatch } from '@consta/uikit/IconWatch'
import { ContextMenu } from '@consta/uikit/ContextMenu'
import { IconComponent } from '@consta/uikit/Icon'
import { IconUser } from '@consta/uikit/IconUser'
import { IconSettings } from '@consta/uikit/IconSettings'
import { IconExit } from '@consta/uikit/IconExit'
import { IconScreen } from '@consta/uikit/IconScreen'

type contextMenuItem = {
  label: string
  onClick?: (params: { e: React.MouseEvent<HTMLDivElement>; item: contextMenuItem }) => void
  group: number
  iconLeft: IconComponent
}

const CustomHeader: FC = () => {
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

  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menuRef = useRef(null)

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }, [])

  return (
    <>
      <Header
        leftSide={
          <>
            <HeaderModule>
              <HeaderLogo>
                <img src={logo} alt='LOGO' />
              </HeaderLogo>
            </HeaderModule>
          </>
        }
        rightSide={
          <>
            <HeaderModule indent={'m'} className={cl.timeDateModule}>
              <IconCalendar size={'m'} />
              <Text>{currentTime.toLocaleDateString()}</Text>
            </HeaderModule>
            <HeaderModule indent={'m'} className={cl.timeDateModule}>
              <IconWatch size={'m'} />
              <Text>{currentTime.toLocaleTimeString()}</Text>
            </HeaderModule>
            <HeaderModule>
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
        className={cl.adminContextMenu}
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
